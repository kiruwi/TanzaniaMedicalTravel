import { assertRole } from '~/server/utils/permissions'
import { listAuditLogs } from '~/server/utils/mockStore'

export default defineEventHandler((event) => {
  assertRole(event, ['admin'])

  return {
    audit_logs: listAuditLogs()
  }
})
