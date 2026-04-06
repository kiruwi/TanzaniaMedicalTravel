import { getWebsiteContent } from '~/server/utils/contentCatalog'

export default defineEventHandler(async () => {
  return getWebsiteContent()
})
