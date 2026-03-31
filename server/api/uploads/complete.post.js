import { addAuditLog } from '~/server/utils/mockStore'
import { assertRole } from '~/server/utils/permissions'
import { uploadCompleteSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  assertRole(event, ['patient', 'coordinator', 'admin'])

  const input = await validateBody(event, uploadCompleteSchema)

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: event.context.userId || 'patient',
    entity_type: 'medical_document',
    entity_id: input.file_path,
    action: 'upload_complete',
    created_at: new Date().toISOString()
  })

  return {
    document: {
      id: `DOC-${Date.now()}`,
      ...input,
      review_status: 'pending',
      created_at: new Date().toISOString()
    }
  }
})
