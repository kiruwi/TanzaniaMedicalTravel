export async function useDoctors() {
  const { content } = await useWebsiteContent()

  const items = computed(() => content.value.doctors || [])
  const hospitals = computed(() => content.value.hospitals || [])

  function all() {
    return items
  }

  function findBySlug(slug) {
    return computed(() => items.value.find((item) => item.slug === slug) || null)
  }

  function linkedHospital(doctor) {
    return computed(() => {
      const currentDoctor = doctor?.value || doctor

      if (!currentDoctor?.hospitalId) {
        return null
      }

      return hospitals.value.find((hospital) => hospital.id === currentDoctor.hospitalId) || null
    })
  }

  return {
    items,
    all,
    findBySlug,
    linkedHospital
  }
}
