import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin, getSupabaseUser, normalizeUuid } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])
  const supabase = getSupabaseUser(event)
  const adminSupabase = getSupabaseAdmin()
  const bookingId = getRouterParam(event, 'id')
  const actorId = normalizeUuid(event.context.userId)
  const updates = await readBody(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const allowedFields = ['booking_type', 'provider_name', 'booking_reference', 'start_date', 'end_date', 'status', 'notes']
  const bookingUpdates = Object.fromEntries(
    Object.entries(updates || {}).filter(([key, value]) => allowedFields.includes(key) && value !== undefined)
  )

  if (Object.keys(bookingUpdates).length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No valid booking fields were provided'
    })
  }

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .update(bookingUpdates)
    .eq('id', bookingId)
    .select()
    .single()

  if (bookingError) {
    if (bookingError.code === 'PGRST116') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Booking not found'
      })
    }

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
        action: 'update',
        metadata: {
          updates: bookingUpdates
        }
      })

    if (auditError) {
      console.error('Failed to write booking update audit log', {
        bookingId: booking.id,
        error: auditError.message
      })
    }
  }

  return {
    booking
  }
})
