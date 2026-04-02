import { sendTransactionalEmail } from '~/server/utils/email'
import { getSupabaseAdmin } from '~/server/utils/supabase'
import { inquirySchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  const input = await validateBody(event, inquirySchema)
  const supabase = getSupabaseAdmin()
  let emailStatus = {
    skipped: true
  }

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase service credentials are not configured'
    })
  }

  const inquiryPayload = {
    ...input,
    source: 'website',
    status: 'new'
  }

  const { data: inquiry, error: inquiryError } = await supabase
    .from('inquiries')
    .insert(inquiryPayload)
    .select()
    .single()

  if (inquiryError) {
    throw createError({
      statusCode: 500,
      statusMessage: inquiryError.message
    })
  }

  const { error: auditError } = await supabase
    .from('audit_logs')
    .insert({
      actor_id: null,
      entity_type: 'inquiry',
      entity_id: inquiry.id,
      action: 'create',
      metadata: {
        source: 'website'
      }
    })

  if (auditError) {
    console.error('Failed to write inquiry audit log', {
      inquiryId: inquiry.id,
      error: auditError.message
    })
  }

  try {
    emailStatus = await sendTransactionalEmail({
      to: input.email,
      subject: 'We received your inquiry',
      html: `<p>Your inquiry for ${input.treatment_interest} has been received.</p>`
    })
  } catch (error) {
    console.error('Failed to send inquiry confirmation email', {
      inquiryId: inquiry.id,
      error: error instanceof Error ? error.message : error
    })

    emailStatus = {
      skipped: false,
      failed: true
    }
  }

  return {
    inquiry,
    email: emailStatus
  }
})
