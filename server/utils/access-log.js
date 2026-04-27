import { getHeader, getRequestIP, getRequestURL } from 'h3'
import { getSupabaseAdmin, normalizeUuid } from '~/server/utils/supabase'

function normalizeText(value) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim()
}

export function shouldAuditAdminPath(path = '') {
  return (
    path.startsWith('/api/admin') &&
    !path.startsWith('/api/admin/access-log')
  )
}

export function buildAccessLogPayload(event, overrides = {}) {
  const url = getRequestURL(event)
  const actorId = normalizeUuid(overrides.actorId ?? event.context.userId)
  const actorEmail = normalizeText(
    overrides.actorEmail ??
      event.context.appUser?.email ??
      event.context.user?.email
  )
  const actorRole = normalizeText((overrides.actorRole ?? event.context.userRole) || 'public')
  const path = normalizeText(overrides.path ?? event.path ?? url.pathname)
  const method = normalizeText(overrides.method ?? event.method ?? 'GET').toUpperCase()
  const ipAddress = normalizeText(
    overrides.ipAddress ??
      getRequestIP(event, { xForwardedFor: true }) ??
      ''
  )
  const forwardedFor = normalizeText(overrides.forwardedFor ?? getHeader(event, 'x-forwarded-for') ?? '')
  const countryCode = normalizeText(
    overrides.countryCode ??
      getHeader(event, 'x-vercel-ip-country') ??
      getHeader(event, 'cf-ipcountry') ??
      ''
  )
  const city = normalizeText(overrides.city ?? getHeader(event, 'x-vercel-ip-city') ?? '')
  const userAgent = normalizeText(overrides.userAgent ?? getHeader(event, 'user-agent') ?? '')
  const referer = normalizeText(overrides.referer ?? getHeader(event, 'referer') ?? '')
  const queryString = normalizeText(overrides.queryString ?? url.searchParams.toString())

  return {
    actor_id: actorId,
    actor_email: actorEmail || null,
    actor_role: actorRole || 'public',
    access_type: overrides.accessType === 'page' ? 'page' : 'api',
    path,
    method,
    ip_address: ipAddress || null,
    forwarded_for: forwardedFor || null,
    country_code: countryCode || null,
    city: city || null,
    user_agent: userAgent || null,
    referer: referer || null,
    query_string: queryString || null,
    metadata:
      overrides.metadata && typeof overrides.metadata === 'object'
        ? overrides.metadata
        : {}
  }
}

export async function writeAccessLog(event, overrides = {}) {
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    return
  }

  const payload = buildAccessLogPayload(event, overrides)
  const { error } = await supabase.rpc('write_access_log', payload)

  if (error) {
    console.error('Failed to write access log', {
      path: payload.path,
      accessType: payload.access_type,
      error: error.message
    })
  }
}

export async function searchAccessLogs({ search = '', accessType = '', limit = 50 } = {}) {
  const supabase = getSupabaseAdmin()

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase audit client is not configured'
    })
  }

  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 250)
  const { data, error } = await supabase.rpc('search_access_logs', {
    search_term: normalizeText(search) || null,
    access_kind: normalizeText(accessType) || null,
    max_rows: safeLimit
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return data || []
}
