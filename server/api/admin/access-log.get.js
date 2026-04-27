import { assertRole } from '~/server/utils/permissions'
import { searchAccessLogs } from '~/server/utils/access-log'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])

  const query = getQuery(event)
  const items = await searchAccessLogs({
    search: query.search,
    accessType: query.access_type,
    limit: query.limit
  })

  return {
    items
  }
})
