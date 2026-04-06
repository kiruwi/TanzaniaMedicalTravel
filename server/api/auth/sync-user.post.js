import { assertAuthenticated } from '~/server/utils/permissions'
import { getSupabaseAdmin } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertAuthenticated(event)
  const config = useRuntimeConfig(event)
  const adminEmail = String(config.adminEmail || config.public.adminEmail || '').trim().toLowerCase()
  const authUser = event.context.user
  const userId = event.context.userId
  const email = String(authUser?.email || '').trim().toLowerCase()

  if (!userId || !email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authenticated user details are required'
    })
  }

  if (!adminEmail || email !== adminEmail) {
    return {
      synced: false,
      reason: 'Access is restricted to the configured admin account.'
    }
  }

  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return {
      synced: false,
      reason: 'Supabase service credentials are not configured'
    }
  }

  const payload = {
    id: userId,
    email: authUser.email,
    role: 'admin'
  }

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

  return {
    synced: true,
    user
  }
})
