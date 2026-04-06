<template>
  <div class="quotes-page">
    <p v-if="errorMessage" class="quotes-page__error">{{ errorMessage }}</p>

    <section class="surface-card quotes-page__hero">
      <div>
        <span class="status-badge">Quote operations</span>
        <h1>Review, price, and approve personalised quotes.</h1>
        <p>Keep the request context, cost breakdown, and final approval action in one place without jumping across routes.</p>
      </div>
      <div class="quotes-page__hero-metrics">
        <article>
          <strong>{{ quotes.length }}</strong>
          <span>Total quotes</span>
        </article>
        <article>
          <strong>{{ approvedCount }}</strong>
          <span>Approved</span>
        </article>
      </div>
    </section>

    <div class="quotes-page__grid">
      <section class="surface-card quotes-list">
        <div class="quotes-list__header">
          <div>
            <h2>Quotes</h2>
            <p>Generated personalised quotes from the `public.quotes` and `public.quote_items` tables.</p>
          </div>
          <div class="quotes-list__header-actions">
            <span class="status-badge">{{ quotes.length }} records</span>
            <button class="button button--ghost" :disabled="pendingList" type="button" @click="loadQuotes()">
              {{ pendingList ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>
        </div>

        <ul v-if="quotes.length" class="quotes-list__items">
          <li v-for="quote in quotes" :key="quote.id">
            <button
              class="quotes-list__item"
              :class="{ 'quotes-list__item--active': selectedQuoteId === quote.id }"
              type="button"
              @click="selectQuote(quote.id)"
            >
              <div class="quotes-list__item-top">
                <strong>{{ quote.quote_number }}</strong>
                <span class="status-badge">{{ quote.status }}</span>
              </div>
              <div class="quotes-list__item-summary">
                <p>{{ formatCurrency(quote.total_cost, quote.currency) }}</p>
                <small>
                  Valid until {{ formatDate(quote.valid_until) }}
                  <span v-if="quote.created_at">· Created {{ formatDate(quote.created_at) }}</span>
                </small>
              </div>
            </button>
          </li>
        </ul>

        <p v-else class="quotes-list__empty">No quotes have been created yet.</p>
      </section>

      <section class="surface-card quote-detail">
        <template v-if="selectedQuote">
          <div class="quote-detail__header">
            <div class="quote-detail__identity">
              <span class="status-badge">{{ selectedQuote.status }}</span>
              <h2>{{ selectedQuote.quote_number }}</h2>
              <p>
                {{ selectedQuote.full_name || 'No patient name recorded' }}
                <span v-if="selectedQuote.email">· {{ selectedQuote.email }}</span>
              </p>
            </div>
            <div class="quote-detail__header-actions">
              <strong>{{ formatCurrency(selectedQuote.total_cost, selectedQuote.currency) }}</strong>
              <span class="quote-detail__validity">Valid until {{ formatDate(selectedQuote.valid_until) }}</span>
              <button
                v-if="selectedQuote.status !== 'approved'"
                class="button"
                :disabled="pendingApprove"
                type="button"
                @click="approveQuote"
              >
                {{ pendingApprove ? 'Approving...' : 'Approve quote' }}
              </button>
            </div>
          </div>

          <section class="quote-detail__spotlight">
            <div class="quote-detail__spotlight-copy">
              <span class="quote-detail__eyebrow">Clinical summary</span>
              <p>{{ selectedQuote.diagnosis_summary || 'No diagnosis summary was saved with this quote request.' }}</p>
            </div>
            <dl class="quote-detail__cost-strip">
              <div>
                <dt>Medical</dt>
                <dd>{{ formatCurrency(selectedQuote.medical_cost, selectedQuote.currency) }}</dd>
              </div>
              <div>
                <dt>Travel</dt>
                <dd>{{ formatCurrency(selectedQuote.travel_cost, selectedQuote.currency) }}</dd>
              </div>
              <div>
                <dt>Stay</dt>
                <dd>{{ formatCurrency(selectedQuote.accommodation_cost, selectedQuote.currency) }}</dd>
              </div>
              <div>
                <dt>Coordination</dt>
                <dd>{{ formatCurrency(selectedQuote.coordinator_fee, selectedQuote.currency) }}</dd>
              </div>
            </dl>
          </section>

          <div class="quote-detail__card-grid">
            <article class="quote-detail__card">
              <h3>Request details</h3>
              <dl class="quote-detail__meta">
                <div>
                  <dt>Treatment</dt>
                  <dd>{{ selectedQuote.treatment_interest || 'Not provided' }}</dd>
                </div>
                <div>
                  <dt>Travel window</dt>
                  <dd>{{ selectedQuote.travel_window || 'Not provided' }}</dd>
                </div>
                <div>
                  <dt>Valid until</dt>
                  <dd>{{ formatDate(selectedQuote.valid_until) }}</dd>
                </div>
                <div>
                  <dt>Case ID</dt>
                  <dd>{{ selectedQuote.case_id || 'Not linked yet' }}</dd>
                </div>
              </dl>
            </article>

            <article class="quote-detail__card">
              <h3>Cost breakdown</h3>
              <dl class="quote-detail__meta">
                <div>
                  <dt>Medical</dt>
                  <dd>{{ formatCurrency(selectedQuote.medical_cost, selectedQuote.currency) }}</dd>
                </div>
                <div>
                  <dt>Travel</dt>
                  <dd>{{ formatCurrency(selectedQuote.travel_cost, selectedQuote.currency) }}</dd>
                </div>
                <div>
                  <dt>Accommodation</dt>
                  <dd>{{ formatCurrency(selectedQuote.accommodation_cost, selectedQuote.currency) }}</dd>
                </div>
                <div>
                  <dt>Coordinator fee</dt>
                  <dd>{{ formatCurrency(selectedQuote.coordinator_fee, selectedQuote.currency) }}</dd>
                </div>
              </dl>
            </article>
          </div>

          <article class="quote-detail__card">
            <div class="quote-detail__section-header">
              <h3>Line items</h3>
              <span class="status-badge">{{ selectedQuote.items?.length || 0 }} items</span>
            </div>
            <div v-if="selectedQuote.items?.length" class="quote-detail__table-wrap">
              <table class="quote-detail__table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedQuote.items" :key="item.id">
                    <td>{{ item.item_type }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ formatCurrency(item.unit_price, selectedQuote.currency) }}</td>
                    <td>{{ formatCurrency(item.total_price, selectedQuote.currency) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="quotes-list__empty">No line items were found for this quote.</p>
          </article>
        </template>

        <p v-else class="quotes-list__empty">Select a quote to view its details.</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'
import { formatDate } from '~/utils/formatDate'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { request } = useAdminApi()
const quotes = ref([])
const selectedQuoteId = ref('')
const selectedQuote = ref(null)
const errorMessage = ref('')
const pendingList = ref(false)
const pendingDetail = ref(false)
const pendingApprove = ref(false)
const approvedCount = computed(() => quotes.value.filter((quote) => quote.status === 'approved').length)

function normalizeQuoteId(value) {
  return typeof value === 'string' ? value : ''
}

async function loadQuotes(preferredQuoteId = '') {
  pendingList.value = true
  errorMessage.value = ''

  try {
    const response = await request('/api/quotes/list')
    quotes.value = response.quotes || []

    const nextQuoteId =
      normalizeQuoteId(preferredQuoteId) ||
      normalizeQuoteId(selectedQuoteId.value) ||
      normalizeQuoteId(quotes.value[0]?.id) ||
      ''

    if (nextQuoteId) {
      await selectQuote(nextQuoteId)
    } else {
      selectedQuoteId.value = ''
      selectedQuote.value = null
    }
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load quotes.'
  } finally {
    pendingList.value = false
  }
}

async function selectQuote(quoteId) {
  const normalizedQuoteId = normalizeQuoteId(quoteId)

  if (!normalizedQuoteId) {
    return
  }

  selectedQuoteId.value = normalizedQuoteId
  pendingDetail.value = true
  errorMessage.value = ''

  try {
    const response = await request(`/api/quotes/${normalizedQuoteId}`)
    selectedQuote.value = response.quote || null
  } catch (error) {
    selectedQuote.value = null
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load quote details.'
  } finally {
    pendingDetail.value = false
  }
}

async function approveQuote() {
  if (!selectedQuote.value?.id) {
    return
  }

  pendingApprove.value = true
  errorMessage.value = ''

  try {
    await request(`/api/quotes/${selectedQuote.value.id}/approve`, {
      method: 'POST'
    })
    await loadQuotes(selectedQuote.value.id)
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to approve quote.'
  } finally {
    pendingApprove.value = false
  }
}

onMounted(loadQuotes)
</script>

<style scoped>
.quotes-page {
  display: grid;
  gap: 1.25rem;
}

.quotes-page__hero {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.7fr) minmax(16rem, 0.9fr);
  padding: 1.6rem;
  background: rgba(255, 255, 255, 0.96);
}

.quotes-page__hero h1 {
  margin: 0.85rem 0 0.5rem;
  font-size: clamp(1.9rem, 3vw, 2.8rem);
  line-height: 1.06;
}

.quotes-page__hero p {
  max-width: 42rem;
  margin-bottom: 0;
}

.quotes-page__hero-metrics {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.quotes-page__hero-metrics article {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.72);
}

.quotes-page__hero-metrics strong {
  font-size: 1.8rem;
  color: var(--color-heading);
}

.quotes-page__hero-metrics span {
  color: var(--color-text-soft);
}

.quotes-page__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(18rem, 26rem) minmax(0, 1fr);
  align-items: start;
}

.quotes-page__error {
  margin-bottom: 0;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(180, 35, 24, 0.15);
  border-radius: var(--radius-sm);
  background: rgba(180, 35, 24, 0.06);
  color: var(--color-danger);
}

.quotes-list,
.quote-detail {
  padding: 1.5rem;
}

.quotes-list {
  background: rgba(255, 255, 255, 0.96);
}

.quote-detail {
  display: grid;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.96);
}

.quotes-list__header,
.quote-detail__section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.quotes-list__header-actions {
  display: grid;
  gap: 0.75rem;
  justify-items: end;
}

.quotes-list__header p,
.quote-detail__header p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.quotes-list__items {
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;
  max-height: 70vh;
  padding-right: 0.2rem;
  overflow: auto;
}

.quotes-list__item {
  width: 100%;
  display: grid;
  gap: 0.65rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.82);
  text-align: left;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.quotes-list__item:hover,
.quotes-list__item--active {
  border-color: rgba(15, 118, 110, 0.35);
  box-shadow: 0 12px 28px rgba(15, 40, 44, 0.08);
  transform: translateY(-1px);
}

.quotes-list__item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.quotes-list__item-top strong {
  min-width: 0;
  overflow-wrap: anywhere;
}

.quotes-list__item-summary {
  display: grid;
  gap: 0.2rem;
}

.quotes-list__item p,
.quotes-list__item small,
.quotes-list__empty,
.quote-detail__summary {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.quotes-list__item p {
  font-size: 1.2rem;
  color: var(--color-heading);
}

.quote-detail__header {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1.3fr) minmax(12rem, auto);
  align-items: start;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(15, 118, 110, 0.12);
}

.quote-detail__identity {
  display: grid;
  gap: 0.45rem;
  min-width: 0;
}

.quote-detail__identity h2,
.quote-detail__identity p {
  overflow-wrap: anywhere;
}

.quote-detail__header-actions {
  display: grid;
  gap: 0.75rem;
  justify-items: end;
  text-align: right;
}

.quote-detail__header-actions strong {
  font-size: clamp(1.55rem, 2vw, 2.1rem);
  color: var(--color-heading);
}

.quote-detail__validity {
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.quote-detail__spotlight {
  display: grid;
  gap: 1rem;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  padding: 1.2rem;
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: var(--radius-sm);
  background: var(--color-surface-muted);
}

.quote-detail__spotlight-copy {
  display: grid;
  gap: 0.55rem;
}

.quote-detail__eyebrow {
  color: var(--color-primary);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quote-detail__spotlight-copy p {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.7;
}

.quote-detail__cost-strip {
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
}

.quote-detail__cost-strip div {
  display: grid;
  gap: 0.2rem;
  padding: 0.85rem 0.95rem;
  border-radius: 0.9rem;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(15, 118, 110, 0.1);
}

.quote-detail__cost-strip dt {
  color: var(--color-text-soft);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.quote-detail__cost-strip dd {
  margin: 0;
  font-size: 1.05rem;
}

.quote-detail__card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.quote-detail__card {
  padding: 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.92);
}

.quote-detail__meta {
  display: grid;
  gap: 0.85rem;
  margin: 1rem 0;
}

.quote-detail__meta div {
  display: grid;
  gap: 0.2rem;
}

.quote-detail__meta dt {
  color: var(--color-text-soft);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.quote-detail__meta dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.quote-detail__table-wrap {
  overflow-x: auto;
}

.quote-detail__table {
  width: 100%;
  border-collapse: collapse;
}

.quote-detail__table th,
.quote-detail__table td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.quote-detail__table th {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.quote-detail__table td {
  overflow-wrap: anywhere;
}

tbody tr:nth-child(odd) {
  background: rgba(238, 245, 243, 0.35);
}

@media (max-width: 1100px) {
  .quotes-page__hero,
  .quotes-page__grid {
    grid-template-columns: 1fr;
  }

  .quotes-list__items {
    max-height: none;
  }

  .quote-detail__spotlight,
  .quote-detail__card-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .quotes-page__hero-metrics,
  .quote-detail__cost-strip {
    grid-template-columns: 1fr;
  }

  .quotes-list__header,
  .quote-detail__header,
  .quote-detail__section-header,
  .quotes-list__item-top {
    grid-template-columns: 1fr;
    flex-direction: column;
    align-items: flex-start;
  }

  .quotes-list__header-actions,
  .quote-detail__header-actions {
    justify-items: start;
    text-align: left;
  }
}
</style>
