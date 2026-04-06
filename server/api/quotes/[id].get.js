import { assertRole } from '~/server/utils/permissions'
import { getSupabaseUser } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  const role = assertRole(event, ['patient', 'coordinator', 'admin'])
  const supabase = getSupabaseUser(event)
  const quoteId = getRouterParam(event, 'id')

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*, quote_items(*)')
    .eq('id', quoteId)
    .single()

  if (quoteError) {
    if (quoteError.code === 'PGRST116') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Quote not found'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: quoteError.message
    })
  }

  let request = {}

  if (role === 'admin') {
    const { data: auditLog } = await supabase
      .from('audit_logs')
      .select('metadata')
      .eq('entity_type', 'quote')
      .eq('entity_id', quoteId)
      .eq('action', 'create')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    request = auditLog?.metadata?.request || {}
  }

  return {
    quote: {
      ...quote,
      items: quote.quote_items || [],
      full_name: request.full_name || null,
      email: request.email || null,
      treatment_interest: request.treatment_interest || null,
      travel_window: request.travel_window || null,
      diagnosis_summary: request.diagnosis_summary || null
    }
  }
})
