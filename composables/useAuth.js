export function useAuth() {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const user = useState('auth:user', () => null)
  const session = useState('auth:session', () => null)
  const userRole = useState('auth:role', () => 'guest')
  const syncedUserId = useState('auth:synced-user-id', () => null)
  const adminEmail = computed(() => String(config.public.adminEmail || '').trim().toLowerCase())

  function normalizeEmail(value) {
    return String(value || '').trim().toLowerCase()
  }

  function isAllowedAdminEmail(value) {
    return Boolean(adminEmail.value) && normalizeEmail(value) === adminEmail.value
  }

  function buildAdminOnlyError() {
    return new Error('Access is restricted to the configured admin account.')
  }

  async function syncUser(authUser) {
    if (!authUser?.id || !authUser?.email || syncedUserId.value === authUser.id) {
      return { synced: true }
    }

    if (!isAllowedAdminEmail(authUser.email)) {
      return {
        synced: false,
        reason: buildAdminOnlyError().message
      }
    }

    try {
      const response = await $fetch('/api/auth/sync-user', {
        method: 'POST',
        headers: session.value?.access_token
          ? {
              Authorization: `Bearer ${session.value.access_token}`
            }
          : undefined
      })

      if (response?.synced === false) {
        return response
      }

      syncedUserId.value = authUser.id
      return response
    } catch (error) {
      return {
        synced: false,
        reason: error?.data?.statusMessage || error?.message || 'Unable to sync user record.'
      }
    }
  }

  async function getSession() {
    if (!nuxtApp.$supabase) {
      return session
    }

    const { data } = await nuxtApp.$supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user || null

    if (!data.session?.user) {
      userRole.value = 'guest'
      syncedUserId.value = null
      return session
    }

    if (!isAllowedAdminEmail(data.session.user.email)) {
      await signOut()
      return session
    }

    userRole.value = 'admin'

    if (data.session?.user) {
      const response = await syncUser(data.session.user)

      if (response?.synced === false) {
        await signOut()
      }
    }

    return session
  }

  async function signIn(credentials) {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    if (!isAllowedAdminEmail(credentials?.email)) {
      return { error: buildAdminOnlyError() }
    }

    const response = await nuxtApp.$supabase.auth.signInWithPassword(credentials)

    if (response.error) {
      return response
    }

    await getSession()

    if (!session.value || userRole.value !== 'admin') {
      return { error: buildAdminOnlyError() }
    }

    return response
  }

  async function signUp() {
    return {
      error: new Error('Self-service account creation is disabled.')
    }
  }

  async function requestPasswordReset(email, next = '/tmt-admin/reset-password') {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    if (!isAllowedAdminEmail(email)) {
      return { error: buildAdminOnlyError() }
    }

    const origin = window.location.origin || config.public.siteUrl

    return nuxtApp.$supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}${next}`
    })
  }

  async function updatePassword(password) {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    const response = await nuxtApp.$supabase.auth.updateUser({
      password
    })

    await getSession()
    return response
  }

  async function signInWithGoogle(next = '/patient') {
    return {
      error: new Error('Google sign-in is disabled for this portal.')
    }
  }

  async function signOut() {
    if (nuxtApp.$supabase) {
      await nuxtApp.$supabase.auth.signOut()
    }

    user.value = null
    session.value = null
    userRole.value = 'guest'
    syncedUserId.value = null
  }

  return {
    adminEmail,
    user,
    session,
    userRole,
    getSession,
    signIn,
    signUp,
    requestPasswordReset,
    updatePassword,
    signInWithGoogle,
    signOut
  }
}
