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

export function normalizeUuid(value) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return uuidPattern.test(trimmed) ? trimmed : null
}
