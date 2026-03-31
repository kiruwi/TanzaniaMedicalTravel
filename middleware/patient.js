export default defineNuxtRouteMiddleware(async () => {
  const { getSession, userRole } = useAuth()
  const session = await getSession()

  if (!session.value) {
    return navigateTo('/auth/login')
  }

  if (!['patient', 'coordinator', 'admin'].includes(userRole.value)) {
    return navigateTo('/auth/login')
  }
})
