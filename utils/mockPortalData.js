export const patientProfile = {
  first_name: 'Asha',
  last_name: 'Mollel',
  phone: '+255 700 123 456',
  country_of_residence: 'Tanzania',
  preferred_contact_method: 'WhatsApp',
  emergency_contact_name: 'John Mollel',
  emergency_contact_phone: '+255 710 987 654'
}

export const medicalCases = [
  {
    id: 'CASE-1042',
    case_code: 'CASE-1042',
    specialty: 'Cardiology',
    treatment_goal: 'Angioplasty planning',
    urgency_level: 'Priority',
    status: 'Awaiting records',
    destination_city: 'Dar es Salaam'
  },
  {
    id: 'CASE-1068',
    case_code: 'CASE-1068',
    specialty: 'Orthopedics',
    treatment_goal: 'Hip replacement review',
    urgency_level: 'Standard',
    status: 'Quote ready',
    destination_city: 'Dar es Salaam'
  }
]

export const documents = [
  {
    id: 'DOC-1',
    file_name: 'angiogram-report.pdf',
    category: 'Imaging',
    review_status: 'Reviewed',
    created_at: '2026-03-28'
  },
  {
    id: 'DOC-2',
    file_name: 'bloodwork-results.pdf',
    category: 'Lab work',
    review_status: 'Pending',
    created_at: '2026-03-30'
  }
]

export const payments = [
  {
    id: 'PAY-1',
    status: 'Paid',
    amount: 1200,
    currency: 'USD',
    created_at: '2026-03-12'
  },
  {
    id: 'PAY-2',
    status: 'Awaiting payment',
    amount: 300,
    currency: 'USD',
    created_at: '2026-03-29'
  }
]

export const appointments = [
  {
    id: 'APT-1',
    appointment_type: 'Virtual consultation',
    scheduled_at: '2026-04-05T10:00:00+03:00',
    status: 'Confirmed',
    notes: 'Initial review with cardiology specialist'
  },
  {
    id: 'APT-2',
    appointment_type: 'Travel planning call',
    scheduled_at: '2026-04-08T14:00:00+03:00',
    status: 'Pending',
    notes: 'Accommodation and airport pickup checklist'
  }
]

export const leads = [
  {
    id: 'LEAD-22',
    full_name: 'Michael Banda',
    country: 'Zambia',
    treatment_interest: 'Fertility support',
    status: 'New'
  },
  {
    id: 'LEAD-23',
    full_name: 'Grace Njeri',
    country: 'Kenya',
    treatment_interest: 'Cardiology consultation',
    status: 'Needs review'
  }
]

export const bookings = [
  {
    id: 'BOOK-1',
    booking_type: 'Accommodation',
    provider_name: 'Harbor Suites',
    start_date: '2026-04-11',
    end_date: '2026-04-20',
    status: 'Reserved'
  },
  {
    id: 'BOOK-2',
    booking_type: 'Airport transfer',
    provider_name: 'City Transfer Desk',
    start_date: '2026-04-11',
    end_date: '2026-04-11',
    status: 'Pending'
  }
]

export const dashboardStats = [
  { label: 'Active leads', value: '28' },
  { label: 'Open cases', value: '14' },
  { label: 'Pending quotes', value: '6' },
  { label: 'Upcoming arrivals', value: '4' }
]
