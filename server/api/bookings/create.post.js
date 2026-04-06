import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin, getSupabaseUser, normalizeUuid } from '~/server/utils/supabase'
import { bookingSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])
  const input = await validateBody(event, bookingSchema)
  const supabase = getSupabaseUser(event)
  const adminSupabase = getSupabaseAdmin()
  const actorId = normalizeUuid(event.context.userId)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const { error: caseError } = await supabase
    .from('medical_cases')
    .select('id')
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

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      ...input,
      booking_reference: null,
      status: 'pending'
    })
    .select()
    .single()

  if (bookingError) {
    throw createError({
      statusCode: 500,
      statusMessage: bookingError.message
    })
  }

  if (adminSupabase) {
    const { error: auditError } = await adminSupabase
      .from('audit_logs')
      .insert({
        actor_id: actorId,
        entity_type: 'booking',
        entity_id: booking.id,
        action: 'create',
        metadata: {
          case_id: input.case_id
        }
      })

    if (auditError) {
      console.error('Failed to write booking audit log', {
        bookingId: booking.id,
        error: auditError.message
      })
    }
  }

  return {
    booking
  }
})
