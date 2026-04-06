import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin, getSupabaseUser, normalizeUuid } from '~/server/utils/supabase'
import { uploadCompleteSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  assertRole(event, ['patient', 'coordinator', 'admin'])
  const input = await validateBody(event, uploadCompleteSchema)
  const supabase = getSupabaseUser(event)
  const adminSupabase = getSupabaseAdmin()
  const actorId = normalizeUuid(event.context.userId)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const { data: medicalCase, error: caseError } = await supabase
    .from('medical_cases')
    .select('id, patient_id')
    .eq('id', input.case_id)
    .single()

  if (caseError) {
    if (caseError.code === 'PGRST116') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Medical case not found'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: caseError.message
    })
  }

  const { data: document, error: documentError } = await supabase
    .from('medical_documents')
    .insert({
      ...input,
      patient_id: medicalCase.patient_id,
      uploaded_by: actorId,
      review_status: 'pending'
    })
    .select()
    .single()

  if (documentError) {
    throw createError({
      statusCode: 500,
      statusMessage: documentError.message
    })
  }

  if (adminSupabase) {
    const { error: auditError } = await adminSupabase
      .from('audit_logs')
      .insert({
        actor_id: actorId,
        entity_type: 'medical_document',
        entity_id: document.id,
        action: 'upload_complete',
        metadata: {
          file_path: input.file_path,
          category: input.category
        }
      })

    if (auditError) {
      console.error('Failed to write upload audit log', {
        documentId: document.id,
        error: auditError.message
      })
    }
  }

  return {
    document
  }
})
