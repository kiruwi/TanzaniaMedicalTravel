import { assertRole } from '~/server/utils/permissions'
import { findQuote } from '~/server/utils/mockStore'

export default defineEventHandler((event) => {
  assertRole(event, ['patient', 'coordinator', 'admin'])

  const quote = findQuote(getRouterParam(event, 'id'))

  if (!quote) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quote not found'
    })
  }

  return {
    quote
  }
})
