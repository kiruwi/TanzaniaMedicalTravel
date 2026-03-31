export function useAuth() {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const user = useState('auth:user', () => null)
  const session = useState('auth:session', () => null)
  const userRole = useState('auth:role', () => 'guest')
  const syncedUserId = useState('auth:synced-user-id', () => null)

  async function syncUser(authUser) {
    if (!authUser?.id || !authUser?.email || syncedUserId.value === authUser.id) {
      return { synced: true }
    }

    const response = await $fetch('/api/auth/sync-user', {
      method: 'POST',
      body: {
        id: authUser.id,
        email: authUser.email,
        role: authUser.user_metadata?.role || 'patient',
        full_name: authUser.user_metadata?.full_name || ''
      }
    })

    if (response?.synced === false) {
      return response
    }

    syncedUserId.value = authUser.id
    return response
  }

  async function getSession() {
    if (!nuxtApp.$supabase) {
      return session
    }

    const { data } = await nuxtApp.$supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user || null
    userRole.value = data.session?.user?.user_metadata?.role || 'patient'

    if (data.session?.user) {
      await syncUser(data.session.user)
    }

    return session
  }

  async function signIn(credentials) {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    const response = await nuxtApp.$supabase.auth.signInWithPassword(credentials)
    await getSession()
    return response
  }

  async function signUp(credentials) {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    const response = await nuxtApp.$supabase.auth.signUp(credentials)
    await getSession()
    return response
  }

  async function signInWithGoogle(next = '/patient') {
    if (!nuxtApp.$supabase) {
      return { error: new Error('Supabase client is not configured.') }
    }

    const origin = window.location.origin || config.public.siteUrl

    return nuxtApp.$supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}${next}`
      }
    })
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
    user,
    session,
    userRole,
    getSession,
    signIn,
    signUp,
    signInWithGoogle,
    signOut
  }
}
