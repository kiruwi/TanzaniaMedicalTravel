import { calculateQuoteTotals } from '~/server/utils/pricing'
import { getSupabaseAdmin, normalizeUuid } from '~/server/utils/supabase'
import { quoteRequestSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  const input = await validateBody(event, quoteRequestSchema)
  const supabase = getSupabaseAdmin()
  const pricing = calculateQuoteTotals([
    { total_price: 6000 },
    { total_price: 1200 },
    { total_price: 900 }
  ])
  const createdBy = normalizeUuid(event.context.userId)

  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase service credentials are not configured'
    })
  }

  const quoteNumber = `Q-${Date.now()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  const validUntil = new Date()
  validUntil.setDate(validUntil.getDate() + 30)

  const quotePayload = {
    quote_number: quoteNumber,
    currency: 'USD',
    medical_cost: 6000,
    travel_cost: 1200,
    accommodation_cost: 900,
    coordinator_fee: pricing.coordinator_fee,
    total_cost: pricing.total_cost,
    status: 'draft',
    valid_until: validUntil.toISOString().slice(0, 10),
    created_by: createdBy
  }

  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .insert(quotePayload)
    .select()
    .single()

  if (quoteError) {
    throw createError({
      statusCode: 500,
      statusMessage: quoteError.message
    })
  }

  const quoteItems = [
    {
      quote_id: quote.id,
      item_type: 'medical',
      description: `${input.treatment_interest} treatment planning`,
      quantity: 1,
      unit_price: 6000,
      total_price: 6000
    },
    {
      quote_id: quote.id,
      item_type: 'travel',
      description: 'Travel coordination',
      quantity: 1,
      unit_price: 1200,
      total_price: 1200
    },
    {
      quote_id: quote.id,
      item_type: 'accommodation',
      description: 'Accommodation planning',
      quantity: 1,
      unit_price: 900,
      total_price: 900
    },
    {
      quote_id: quote.id,
      item_type: 'coordination',
      description: 'Care coordination fee',
      quantity: 1,
      unit_price: Number(pricing.coordinator_fee),
      total_price: Number(pricing.coordinator_fee)
    }
  ]

  const { data: items, error: itemsError } = await supabase
    .from('quote_items')
    .insert(quoteItems)
    .select()

  if (itemsError) {
    throw createError({
      statusCode: 500,
      statusMessage: itemsError.message
    })
  }

  const { error: auditError } = await supabase
    .from('audit_logs')
    .insert({
      actor_id: createdBy,
      entity_type: 'quote',
      entity_id: quote.id,
      action: 'create',
      metadata: {
        quote_number: quote.quote_number,
        request: input
      }
    })

  if (auditError) {
    console.error('Failed to write quote audit log', {
      quoteId: quote.id,
      error: auditError.message
    })
  }

  return {
    quote: {
      ...quote,
      items,
      ...input
    }
  }
})
