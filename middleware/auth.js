export default defineNuxtRouteMiddleware(async () => {
  const { getSession } = useAuth()
  const session = await getSession()

  if (!session.value) {
    return navigateTo('/auth/login')
  }
})
