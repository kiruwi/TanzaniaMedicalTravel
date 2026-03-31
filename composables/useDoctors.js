import { doctors, hospitals } from '~/utils/mockData'

export function useDoctors() {
  function all() {
    return doctors
  }

  function findBySlug(slug) {
    return doctors.find((item) => item.slug === slug) || null
  }

  function linkedHospital(doctor) {
    return hospitals.find((hospital) => hospital.slug === doctor?.hospitalSlug) || null
  }

  return {
    all,
    findBySlug,
    linkedHospital
  }
}
