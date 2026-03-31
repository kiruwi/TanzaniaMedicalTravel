import { appointments, documents, medicalCases, patientProfile, payments } from '~/utils/mockPortalData'

export function usePatient() {
  return {
    profile: patientProfile,
    cases: medicalCases,
    documents,
    payments,
    appointments
  }
}
