export default defineNuxtRouteMiddleware(async () => {
  const { getSession, userRole } = useAuth()
  const session = await getSession()

  if (!session.value) {
    return navigateTo('/tmt-admin/login')
  }

  if (userRole.value !== 'admin') {
    return navigateTo('/tmt-admin/login')
  }
})
