import { addAuditLog, addInquiry } from '~/server/utils/mockStore'
import { sendTransactionalEmail } from '~/server/utils/email'
import { inquirySchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  const input = await validateBody(event, inquirySchema)

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

  await sendTransactionalEmail({
    to: input.email,
    subject: 'We received your inquiry',
    html: `<p>Your inquiry for ${input.treatment_interest} has been received.</p>`
  })

  return {
    inquiry
  }
})
