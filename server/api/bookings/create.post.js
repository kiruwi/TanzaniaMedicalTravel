import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin, normalizeUuid } from '~/server/utils/supabase'
import { bookingSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])
  const input = await validateBody(event, bookingSchema)
  const supabase = getSupabaseAdmin()
  const actorId = normalizeUuid(event.context.userId)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase service credentials are not configured'
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

  const { error: auditError } = await supabase
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

  return {
    booking
  }
})
