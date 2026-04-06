export async function useHospitals() {
  const { content } = await useWebsiteContent()

  const items = computed(() => content.value.hospitals || [])
  const treatments = computed(() => content.value.treatments || [])
  const doctors = computed(() => content.value.doctors || [])

  function all() {
    return items
  }

  function findBySlug(slug) {
    return computed(() => items.value.find((item) => item.slug === slug) || null)
  }

  function relatedTreatments(hospital) {
    return computed(() => {
      const currentHospital = hospital?.value || hospital

      if (!currentHospital?.id) {
        return []
      }

      return treatments.value.filter((treatment) => {
        if (treatment.hospitalId === currentHospital.id) {
          return true
        }

        return doctors.value.some((doctor) => (
          doctor.hospitalId === currentHospital.id &&
          treatment.specialtyId &&
          doctor.specialtyId === treatment.specialtyId
        ))
      })
    })
  }

  return {
    items,
    all,
    findBySlug,
    relatedTreatments
  }
}
