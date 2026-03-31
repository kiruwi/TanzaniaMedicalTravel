import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabasePublishableKey =
    config.public.supabasePublishableKey ||
    config.public.supabaseAnonKey ||
    config.public.supabaseKey

  const supabase = supabaseUrl && supabasePublishableKey
    ? createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      })
    : null

  return {
    provide: {
      supabase
    }
  }
})
