import { hospitals, treatments } from '~/utils/mockData'

export function useHospitals() {
  function all() {
    return hospitals
  }

  function findBySlug(slug) {
    return hospitals.find((item) => item.slug === slug) || null
  }

  function relatedTreatments(hospital) {
    return treatments.filter((treatment) => hospital?.treatmentSlugs?.includes(treatment.slug))
  }

  return {
    all,
    findBySlug,
    relatedTreatments
  }
}
