import { createClient } from '@supabase/supabase-js'

function getServerEnv(...names) {
  for (const name of names) {
    const value = process.env[name]

    if (typeof value === 'string' && value.trim()) {
      return value
    }
  }

  return ''
}

export function getSupabaseAdmin() {
  const config = useRuntimeConfig()
  const supabaseUrl =
    config.supabaseUrl ||
    getServerEnv('NUXT_SUPABASE_URL', 'SUPABASE_URL', 'NUXT_PUBLIC_SUPABASE_URL')
  const supabaseSecretKey =
    config.supabaseSecretKey ||
    config.supabaseServiceRoleKey ||
    getServerEnv(
      'NUXT_SUPABASE_SECRET_KEY',
      'NUXT_SUPABASE_SERVICE_ROLE_KEY',
      'SUPABASE_SECRET_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    )

  if (!supabaseUrl || !supabaseSecretKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
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
