import { blogPosts, doctors, hospitals, treatments } from '~/utils/mockData'

export default defineEventHandler((event) => {
  const query = (getQuery(event).q || '').toString().toLowerCase()

  if (!query) {
    return {
      results: []
    }
  }

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
