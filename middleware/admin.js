export default defineNuxtRouteMiddleware(async () => {
  const { getSession, userRole } = useAuth()
  const session = await getSession()

  if (!session.value) {
    return navigateTo('/auth/login')
  }

  if (userRole.value !== 'admin') {
    return navigateTo('/patient')
  }
})
