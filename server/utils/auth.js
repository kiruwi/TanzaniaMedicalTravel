import { getSupabaseAdmin, getAccessToken, normalizeUuid } from '~/server/utils/supabase'

export async function populateRequestAuthContext(event) {
  if (event.context.authResolved) {
    return event.context
  }

  event.context.authResolved = true
  event.context.accessToken = getAccessToken(event) || null
  event.context.authError = null
  event.context.user = null
  event.context.appUser = null
  event.context.userId = null
  event.context.userRole = 'public'

  if (!event.context.accessToken) {
    return event.context
  }

  const supabase = getSupabaseAdmin()

  if (!supabase) {
    event.context.authError = 'Supabase service credentials are not configured.'
    return event.context
  }

  const { data, error } = await supabase.auth.getUser(event.context.accessToken)

  if (error || !data?.user) {
    event.context.authError = error?.message || 'Invalid or expired session.'
    return event.context
  }

  const authUser = data.user
  const userId = normalizeUuid(authUser.id)

  event.context.user = authUser
  event.context.userId = userId

  const { data: appUser, error: appUserError } = await supabase
    .from('users')
    .select('id, email, role')
    .eq('id', authUser.id)
    .maybeSingle()

  if (appUserError) {
    console.error('Failed to load request user role', {
      userId: authUser.id,
      error: appUserError.message
    })
  }

  event.context.appUser = appUser || null
  event.context.userRole =
    appUser?.role ||
    authUser.app_metadata?.role ||
    'authenticated'

  return event.context
}
