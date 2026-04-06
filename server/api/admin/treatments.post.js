import {
  ensureSpecialtyRecord,
  normalizeContentValue,
  slugify
} from '~/server/utils/contentCatalog'
import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser, normalizeUuid } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['admin'])
  const supabase = getSupabaseUser(event)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const body = await readBody(event)
  const id = normalizeUuid(body?.id)
  const name = String(body?.name || '').trim()
  const slug = slugify(body?.slug || name)
  const specialty = await ensureSpecialtyRecord(supabase, body?.specialty)
  const hospitalId = normalizeUuid(body?.hospital_id) || null
  const primaryDoctorId = normalizeUuid(body?.primary_doctor_id) || null
  const priceFrom = Number(body?.price_from || 0)

  if (!name || !slug || !specialty) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, slug, and specialty are required.'
    })
  }

  if (!Number.isFinite(priceFrom) || priceFrom < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Price guidance must be a valid positive number.'
    })
  }

  const payload = {
    name,
    slug,
    specialty_id: specialty.id,
    hospital_id: hospitalId,
    primary_doctor_id: primaryDoctorId,
    summary: normalizeContentValue(body?.summary),
    overview: normalizeContentValue(body?.overview),
    price_from: priceFrom,
    duration: normalizeContentValue(body?.duration),
    featured: Boolean(body?.featured),
    updated_at: new Date().toISOString()
  }

  const query = id
    ? supabase.from('treatments').update(payload).eq('id', id)
    : supabase.from('treatments').insert(payload)

  const { data, error } = await query
    .select('id, name, slug')
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    treatment: data
  }
})
