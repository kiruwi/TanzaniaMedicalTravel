export async function useTreatments() {
  const { content } = await useWebsiteContent()

  const items = computed(() => content.value.treatments || [])
  const doctors = computed(() => content.value.doctors || [])
  const hospitals = computed(() => content.value.hospitals || [])

  function all() {
    return items
  }

  function bySpecialty(specialty) {
    return computed(() => items.value.filter((item) => item.specialty === specialty))
  }

  function findBySlug(specialty, slug) {
    return computed(() => (
      items.value.find((item) => item.specialty === specialty && item.slug === slug) || null
    ))
  }

  function relatedDoctors(treatment) {
    return computed(() => {
      if (!treatment?.value && !treatment?.id) {
        return []
      }

      const currentTreatment = treatment?.value || treatment
      const related = []

      if (currentTreatment.primaryDoctorId) {
        const primaryDoctor = doctors.value.find((doctor) => doctor.id === currentTreatment.primaryDoctorId)

        if (primaryDoctor) {
          related.push(primaryDoctor)
        }
      }

      for (const doctor of doctors.value) {
        const sameSpecialty = currentTreatment.specialtyId && doctor.specialtyId === currentTreatment.specialtyId
        const sameHospital = currentTreatment.hospitalId && doctor.hospitalId === currentTreatment.hospitalId

        if (sameSpecialty || sameHospital) {
          related.push(doctor)
        }
      }

      return related.filter((doctor, index, collection) => (
        collection.findIndex((candidate) => candidate.id === doctor.id) === index
      ))
    })
  }

  function relatedHospitals(treatment) {
    return computed(() => {
      if (!treatment?.value && !treatment?.id) {
        return []
      }

      const currentTreatment = treatment?.value || treatment
      const related = []

      if (currentTreatment.hospitalId) {
        const primaryHospital = hospitals.value.find((hospital) => hospital.id === currentTreatment.hospitalId)

        if (primaryHospital) {
          related.push(primaryHospital)
        }
      }

      for (const doctor of doctors.value) {
        const matchesSpecialty = currentTreatment.specialtyId && doctor.specialtyId === currentTreatment.specialtyId
        const hospital = hospitals.value.find((item) => item.id === doctor.hospitalId)

        if (matchesSpecialty && hospital) {
          related.push(hospital)
        }
      }

      return related.filter((hospital, index, collection) => (
        collection.findIndex((candidate) => candidate.id === hospital.id) === index
      ))
    })
  }

  return {
    items,
    all,
    bySpecialty,
    findBySlug,
    relatedDoctors,
    relatedHospitals
  }
}
