export async function useWebsiteContent() {
  const { data, pending, error, refresh } = await useAsyncData('website-content', () => $fetch('/api/content/site'))

  const content = computed(() => data.value || {
    specialties: [],
    hospitals: [],
    doctors: [],
    treatments: []
  })

  return {
    content,
    pending,
    error,
    refresh
  }
}
