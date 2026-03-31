import { doctors, hospitals, treatments } from '~/utils/mockData'

export function useTreatments() {
  function all() {
    return treatments
  }

  function bySpecialty(specialty) {
    return treatments.filter((item) => item.specialty === specialty)
  }

  function findBySlug(specialty, slug) {
    return treatments.find((item) => item.specialty === specialty && item.slug === slug) || null
  }

  function relatedDoctors(treatment) {
    return doctors.filter((doctor) => treatment?.doctorSlugs?.includes(doctor.slug))
  }

  function relatedHospitals(treatment) {
    return hospitals.filter((hospital) => treatment?.hospitalSlugs?.includes(hospital.slug))
  }

  return {
    all,
    bySpecialty,
    findBySlug,
    relatedDoctors,
    relatedHospitals
  }
}
