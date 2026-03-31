export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth()

  if (user.value && user.value.user_metadata?.profile_complete === false) {
    return navigateTo('/patient/profile')
  }
})
