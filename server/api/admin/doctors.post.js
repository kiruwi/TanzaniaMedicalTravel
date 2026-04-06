import {
  ensureSpecialtyRecord,
  normalizeContentValue,
  parseLanguages,
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
  const fullName = String(body?.full_name || '').trim()
  const slug = slugify(body?.slug || fullName)
  const specialty = await ensureSpecialtyRecord(supabase, body?.specialty)
  const hospitalId = normalizeUuid(body?.hospital_id) || null

  if (!fullName || !slug || !specialty) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Full name, slug, and specialty are required.'
    })
  }

  const payload = {
    full_name: fullName,
    slug,
    specialty_id: specialty.id,
    hospital_id: hospitalId,
    title: normalizeContentValue(body?.title),
    summary: normalizeContentValue(body?.summary),
    languages: parseLanguages(body?.languages),
    updated_at: new Date().toISOString()
  }

  const query = id
    ? supabase.from('doctors').update(payload).eq('id', id)
    : supabase.from('doctors').insert(payload)

  const { data, error } = await query
    .select('id, full_name, slug')
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    doctor: data
  }
})
