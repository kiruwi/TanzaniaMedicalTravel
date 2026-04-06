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

  const { data, error } = await supabase
    .from('treatments')
    .select(`
      id,
      specialty_id,
      hospital_id,
      primary_doctor_id,
      name,
      slug,
      summary,
      overview,
      price_from,
      duration,
      featured,
      created_at,
      updated_at,
      hospitals(id, name, slug, city),
      specialties(id, name, slug),
      primary_doctor:doctors!treatments_primary_doctor_id_fkey(id, full_name, slug)
    `)
    .order('featured', { ascending: false })
    .order('name', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    treatments: data || []
  }
})
