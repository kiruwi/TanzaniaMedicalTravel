import { addAuditLog, updateQuote } from '~/server/utils/mockStore'
import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler((event) => {
  assertRole(event, ['coordinator', 'admin'])

  const quote = updateQuote(getRouterParam(event, 'id'), {
    status: 'approved',
    approved_at: new Date().toISOString()
  })

  if (!quote) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quote not found'
    })
  }

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: event.context.userId || 'system',
    entity_type: 'quote',
    entity_id: quote.id,
    action: 'approve',
    created_at: new Date().toISOString()
  })

  return {
    quote
  }
})
