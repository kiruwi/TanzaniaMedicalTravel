import { addAuditLog, updateBooking } from '~/server/utils/mockStore'
import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])

  const updates = await readBody(event)
  const booking = updateBooking(getRouterParam(event, 'id'), updates)

  if (!booking) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Booking not found'
    })
  }

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: event.context.userId || 'system',
    entity_type: 'booking',
    entity_id: booking.id,
    action: 'update',
    created_at: new Date().toISOString()
  })

  return {
    booking
  }
})
