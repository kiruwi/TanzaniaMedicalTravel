import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const config = useRuntimeConfig()
  const supabaseSecretKey = config.supabaseSecretKey || config.supabaseServiceRoleKey

  if (!config.supabaseUrl || !supabaseSecretKey) {
    return null
  }

  return createClient(config.supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false
    }
  })
}
