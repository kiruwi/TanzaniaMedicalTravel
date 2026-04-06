import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])
  const supabase = getSupabaseUser(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const [
    { data: specialties, error: specialtyError },
    { data: hospitals, error: hospitalError },
    { data: doctors, error: doctorError }
  ] = await Promise.all([
    supabase
      .from('specialties')
      .select('id, name, slug')
      .order('name', { ascending: true }),
    supabase
      .from('hospitals')
      .select('id, name, slug, city')
      .order('name', { ascending: true }),
    supabase
      .from('doctors')
      .select('id, full_name, slug')
      .order('full_name', { ascending: true })
  ])

  const firstError = specialtyError || hospitalError || doctorError

  if (firstError) {
    throw createError({
      statusCode: 500,
      statusMessage: firstError.message
    })
  }

  return {
    specialties: specialties || [],
    hospitals: hospitals || [],
    doctors: doctors || []
  }
})
