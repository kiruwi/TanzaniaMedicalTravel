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
    .from('doctors')
    .select(`
      id,
      hospital_id,
      specialty_id,
      full_name,
      slug,
      title,
      summary,
      languages,
      created_at,
      updated_at,
      hospitals(id, name, slug, city),
      specialties(id, name, slug)
    `)
    .order('full_name', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    doctors: data || []
  }
})
