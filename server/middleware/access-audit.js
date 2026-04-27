import { populateRequestAuthContext } from '~/server/utils/auth'
import { shouldAuditAdminPath, writeAccessLog } from '~/server/utils/access-log'

export default defineEventHandler(async (event) => {
  if (!shouldAuditAdminPath(event.path)) {
    return
  }

  await populateRequestAuthContext(event)

  if (event.context.userRole !== 'admin') {
    return
  }

  await writeAccessLog(event, {
    accessType: 'api'
  })
})
