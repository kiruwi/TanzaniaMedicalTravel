import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser } from '~/server/utils/supabase'
import { searchAccessLogs } from '~/server/utils/access-log'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])
  const supabase = getSupabaseUser(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const today = new Date().toISOString().slice(0, 10)

  const [
    leadCountResult,
    caseCountResult,
    quoteCountResult,
    bookingCountResult,
    inquiriesResult,
    documentsResult,
    bookingsResult,
    recentAccessLogs
  ] = await Promise.all([
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
    supabase.from('medical_cases').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .gte('start_date', today),
    supabase
      .from('inquiries')
      .select('id, full_name, email, country, treatment_interest, status, created_at')
      .order('created_at', { ascending: false })
      .limit(8),
    supabase
      .from('medical_documents')
      .select('id, file_name, category, review_status, created_at, medical_cases(case_code)')
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('bookings')
      .select('id, booking_type, provider_name, start_date, end_date, status, medical_cases(case_code)')
      .gte('start_date', today)
      .order('start_date', { ascending: true })
      .limit(6),
    searchAccessLogs({
      limit: 8
    })
  ])

  const errors = [
    leadCountResult.error,
    caseCountResult.error,
    quoteCountResult.error,
    bookingCountResult.error,
    inquiriesResult.error,
    documentsResult.error,
    bookingsResult.error
  ].filter(Boolean)

  if (errors.length > 0) {
    throw createError({
      statusCode: 500,
      statusMessage: errors[0].message
    })
  }

  return {
    stats: [
      {
        label: 'Inquiry leads',
        value: String(leadCountResult.count || 0),
        note: 'Captured from the website intake form'
      },
      {
        label: 'Cases in pipeline',
        value: String(caseCountResult.count || 0),
        note: 'Patient cases currently stored in Supabase'
      },
      {
        label: 'Quotes prepared',
        value: String(quoteCountResult.count || 0),
        note: 'All quote records across draft and issued states'
      },
      {
        label: 'Upcoming bookings',
        value: String(bookingCountResult.count || 0),
        note: 'Bookings with a start date from today forward'
      }
    ],
    recent_inquiries: inquiriesResult.data || [],
    document_queue: documentsResult.data || [],
    upcoming_bookings: bookingsResult.data || [],
    recent_access_logs: recentAccessLogs || []
  }
})
