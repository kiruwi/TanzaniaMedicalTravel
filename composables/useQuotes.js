import { medicalCases } from '~/utils/mockPortalData'

export function useQuotes() {
  return {
    quotes: [
      {
        id: 'QUO-104',
        case_id: medicalCases[1].id,
        status: 'Ready',
        total_cost: 9800,
        currency: 'USD',
        valid_until: '2026-04-30'
      }
    ]
  }
}
