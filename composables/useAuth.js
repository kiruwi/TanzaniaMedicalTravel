export function useAuth() {
  const nuxtApp = useNuxtApp()
  const user = useState('auth:user', () => null)
  const session = useState('auth:session', () => null)
  const userRole = useState('auth:role', () => 'guest')

  async function getSession() {
    if (!nuxtApp.$supabase) {
      return session
    }

    const { data } = await nuxtApp.$supabase.auth.getSession()
    session.value = data.session
    user.value = data.session?.user || null
    userRole.value = data.session?.user?.user_metadata?.role || 'patient'
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

  async function signOut() {
    if (nuxtApp.$supabase) {
      await nuxtApp.$supabase.auth.signOut()
    }

    user.value = null
    session.value = null
    userRole.value = 'guest'
  }

  return {
    user,
    session,
    userRole,
    getSession,
    signIn,
    signOut
  }
}
