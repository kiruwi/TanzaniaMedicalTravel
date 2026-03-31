import { addAuditLog, addBooking } from '~/server/utils/mockStore'
import { assertRole } from '~/server/utils/permissions'
import { bookingSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])

  const input = await validateBody(event, bookingSchema)
  const booking = addBooking({
    id: `BOOK-${Date.now()}`,
    ...input,
    status: 'pending',
    created_at: new Date().toISOString()
  })

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: event.context.userId || 'system',
    entity_type: 'booking',
    entity_id: booking.id,
    action: 'create',
    created_at: new Date().toISOString()
  })

  return {
    booking
  }
})
