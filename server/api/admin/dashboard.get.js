import { dashboardStats } from '~/utils/mockPortalData'
import { assertRole } from '~/server/utils/permissions'

export default defineEventHandler((event) => {
  assertRole(event, ['admin'])

  return {
    stats: dashboardStats
  }
})
