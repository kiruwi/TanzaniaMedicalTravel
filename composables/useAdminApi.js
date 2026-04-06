export function useAdminApi() {
  const { getSession, session } = useAuth()

  async function buildHeaders(extraHeaders = {}) {
    const currentSession = session.value || (await getSession()).value
    const accessToken = currentSession?.access_token

    return {
      ...extraHeaders,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    }
  }

  async function request(path, options = {}) {
    const headers = await buildHeaders(options.headers || {})

    return $fetch(path, {
      ...options,
      headers
    })
  }

  return {
    buildHeaders,
    request
  }
}
