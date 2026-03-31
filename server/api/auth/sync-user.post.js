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

  const fullName = String(body.full_name || '').trim()
  const [firstName = '', ...lastNameParts] = fullName.split(/\s+/).filter(Boolean)
  const lastName = lastNameParts.join(' ')

  const { data: user, error: userError } = await supabase
    .from('users')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single()

  if (userError) {
    throw createError({
      statusCode: 500,
      statusMessage: userError.message
    })
  }

  let profile = null

  if (payload.role === 'patient') {
    const profilePayload = {
      user_id: body.id,
      first_name: firstName || null,
      last_name: lastName || null
    }

    const { data: syncedProfile, error: profileError } = await supabase
      .from('patient_profiles')
      .upsert(profilePayload, { onConflict: 'user_id' })
      .select()
      .single()

    if (profileError) {
      throw createError({
        statusCode: 500,
        statusMessage: profileError.message
      })
    }

    profile = syncedProfile
  }

  return {
    synced: true,
    user,
    profile
  }
})
