import { populateRequestAuthContext } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await populateRequestAuthContext(event)
})
