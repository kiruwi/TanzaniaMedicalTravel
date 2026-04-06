import { assertRole } from '~/server/utils/permissions'
import { getSupabaseAdmin, getSupabaseUser, normalizeUuid } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  assertRole(event, ['coordinator', 'admin'])
  const supabase = getSupabaseUser(event)
  const adminSupabase = getSupabaseAdmin()
  const quoteId = getRouterParam(event, 'id')
  const actorId = normalizeUuid(event.context.userId)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase auth client is not configured'
    })
  }

  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .update({
      status: 'approved'
    })
    .eq('id', quoteId)
    .select()
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

  if (adminSupabase) {
    const { error: auditError } = await adminSupabase
      .from('audit_logs')
      .insert({
        actor_id: actorId,
        entity_type: 'quote',
        entity_id: quote.id,
        action: 'approve',
        metadata: {
          approved_at: new Date().toISOString()
        }
      })

    if (auditError) {
      console.error('Failed to write quote approval audit log', {
        quoteId: quote.id,
        error: auditError.message
      })
    }
  }

  return {
    quote
  }
})
