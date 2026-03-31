import { assertRole } from '~/server/utils/permissions'
import { listInquiries } from '~/server/utils/mockStore'

export default defineEventHandler((event) => {
  assertRole(event, ['coordinator', 'admin'])

  return {
    inquiries: listInquiries()
  }
})
