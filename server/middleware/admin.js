import { populateRequestAuthContext } from '~/server/utils/auth'
import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin')) {
    await populateRequestAuthContext(event)
    assertRole(event, ['admin'])
  }
})
