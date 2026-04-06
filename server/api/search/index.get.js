import { blogPosts } from '~/utils/mockData'
import { getWebsiteContent } from '~/server/utils/contentCatalog'

export default defineEventHandler(async (event) => {
  const query = (getQuery(event).q || '').toString().toLowerCase()

  if (!query) {
    return {
      results: []
    }
  }

  const { doctors, hospitals, treatments } = await getWebsiteContent()
  const collections = [
    ...treatments.map((item) => ({ type: 'treatment', title: item.name, path: `/treatments/${item.specialty}/${item.slug}` })),
    ...hospitals.map((item) => ({ type: 'hospital', title: item.name, path: `/hospitals/${item.slug}` })),
    ...doctors.map((item) => ({ type: 'doctor', title: item.name, path: `/doctors/${item.slug}` })),
    ...blogPosts.map((item) => ({ type: 'blog', title: item.title, path: `/blog/${item.slug}` }))
  ]

  return {
    results: collections.filter((item) => item.title.toLowerCase().includes(query))
  }
})
