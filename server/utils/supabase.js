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

function getSupabaseConfig() {
  const config = useRuntimeConfig()
  const supabaseUrl =
    config.supabaseUrl ||
    getServerEnv('NUXT_SUPABASE_URL', 'SUPABASE_URL', 'NUXT_PUBLIC_SUPABASE_URL')
  const supabasePublishableKey =
    config.public?.supabasePublishableKey ||
    config.public?.supabaseAnonKey ||
    config.supabasePublishableKey ||
    getServerEnv(
      'NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
      'NUXT_PUBLIC_SUPABASE_ANON_KEY',
      'NUXT_SUPABASE_PUBLISHABLE_KEY',
      'SUPABASE_PUBLISHABLE_KEY',
      'SUPABASE_ANON_KEY'
    )
  const supabaseSecretKey =
    config.supabaseSecretKey ||
    config.supabaseServiceRoleKey ||
    getServerEnv(
      'NUXT_SUPABASE_SECRET_KEY',
      'NUXT_SUPABASE_SERVICE_ROLE_KEY',
      'SUPABASE_SECRET_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    )

  return {
    supabaseUrl,
    supabasePublishableKey,
    supabaseSecretKey
  }
}

export function getSupabaseAdmin() {
  const { supabaseUrl, supabaseSecretKey } = getSupabaseConfig()

  if (!supabaseUrl || !supabaseSecretKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false
    }
  })
}

export function getAccessToken(event) {
  const authorization = getHeader(event, 'authorization')

  if (typeof authorization !== 'string') {
    return ''
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i)
  return match?.[1]?.trim() || ''
}

export function getSupabaseUser(event) {
  const { supabaseUrl, supabasePublishableKey } = getSupabaseConfig()
  const accessToken =
    event?.context?.accessToken ||
    (typeof event === 'string' ? event : getAccessToken(event))

  if (!supabaseUrl || !supabasePublishableKey || !accessToken) {
    return null
  }

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
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
