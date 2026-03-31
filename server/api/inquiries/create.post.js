import { addAuditLog, addInquiry } from '~/server/utils/mockStore'
import { sendTransactionalEmail } from '~/server/utils/email'
import { inquirySchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  const input = await validateBody(event, inquirySchema)
  let emailStatus = {
    skipped: true
  }

  const inquiry = addInquiry({
    id: `INQ-${Date.now()}`,
    ...input,
    source: 'website',
    status: 'new',
    created_at: new Date().toISOString()
  })

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: 'public',
    entity_type: 'inquiry',
    entity_id: inquiry.id,
    action: 'create',
    created_at: new Date().toISOString()
  })

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
