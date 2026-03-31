export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  return {
    supabaseUrl: config.public.supabaseUrl || config.supabaseUrl || '',
    supabasePublishableKey:
      config.public.supabasePublishableKey ||
      config.public.supabaseAnonKey ||
      config.public.supabaseKey ||
      config.supabasePublishableKey ||
      config.supabaseKey ||
      ''
  }
})
