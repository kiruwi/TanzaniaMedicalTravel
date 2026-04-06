import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])
  const supabase = getSupabaseUser(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('id, booking_type, provider_name, booking_reference, start_date, end_date, status, medical_cases(case_code)')
    .order('start_date', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    bookings: bookings || []
  }
})
