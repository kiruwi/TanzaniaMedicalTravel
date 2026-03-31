import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler((event) => {
  if (event.path.startsWith('/api/admin')) {
    assertRole(event, ['admin'])
  }
})
