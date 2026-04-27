import { assertRole } from '~/server/utils/permissions'
import { writeAccessLog } from '~/server/utils/access-log'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])

  const body = await readBody(event)
  const path = typeof body?.path === 'string' && body.path.trim()
    ? body.path.trim()
    : '/tmt-admin'

  await writeAccessLog(event, {
    accessType: 'page',
    path,
    method: 'GET'
  })

  return {
    ok: true
  }
})
