import { addAuditLog, addQuote } from '~/server/utils/mockStore'
import { calculateQuoteTotals } from '~/server/utils/pricing'
import { quoteRequestSchema, validateBody } from '~/server/utils/validators'

export default defineEventHandler(async (event) => {
  const input = await validateBody(event, quoteRequestSchema)
  const pricing = calculateQuoteTotals([
    { total_price: 6000 },
    { total_price: 1200 },
    { total_price: 900 }
  ])

  const quote = addQuote({
    id: `QUO-${Date.now()}`,
    quote_number: `Q-${String(Date.now()).slice(-6)}`,
    full_name: input.full_name,
    email: input.email,
    treatment_interest: input.treatment_interest,
    travel_window: input.travel_window,
    diagnosis_summary: input.diagnosis_summary,
    currency: 'USD',
    medical_cost: 6000,
    travel_cost: 1200,
    accommodation_cost: 900,
    coordinator_fee: pricing.coordinator_fee,
    total_cost: pricing.total_cost,
    status: 'draft',
    created_at: new Date().toISOString()
  })

  addAuditLog({
    id: `AUD-${Date.now()}`,
    actor_id: 'public',
    entity_type: 'quote',
    entity_id: quote.id,
    action: 'create',
    created_at: new Date().toISOString()
  })

  return {
    quote
  }
})
