import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  let supabaseUrl = config.public.supabaseUrl
  let supabasePublishableKey =
    config.public.supabasePublishableKey ||
    config.public.supabaseAnonKey ||
    config.public.supabaseKey

  if (!supabaseUrl || !supabasePublishableKey) {
    try {
      const fallbackConfig = await $fetch('/api/auth/client-config')
      supabaseUrl = supabaseUrl || fallbackConfig.supabaseUrl
      supabasePublishableKey = supabasePublishableKey || fallbackConfig.supabasePublishableKey
    } catch {
      // Leave the client unset when public auth config is unavailable.
    }
  }

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
