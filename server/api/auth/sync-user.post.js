import { getSupabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.id || !body?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User id and email are required'
    })
  }

  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return {
      synced: false,
      reason: 'Supabase service credentials are not configured'
    }
  }

  const payload = {
    id: body.id,
    email: body.email,
    role: body.role || 'patient'
  }

  const { data, error } = await supabase
    .from('users')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    synced: true,
    user: data
  }
})
