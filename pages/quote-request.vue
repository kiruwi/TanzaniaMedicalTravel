<template>
  <section class="section">
    <div class="container">
      <div class="quote-request-page">
        <div class="section-heading quote-request-page__intro">
          <span class="eyebrow">Quote request</span>
          <h1>Get a personalised treatment and travel quote.</h1>
          <p>
            If you already have a treatment in mind, share a few details and we will come back with clear options for care, travel, and stay support.
          </p>
          <ul class="quote-request-page__highlights">
            <li>Clear treatment and logistics estimate</li>
            <li>Built around your timing and case details</li>
            <li>Prepared by the operations workflow in Supabase</li>
          </ul>
        </div>
        <QuoteRequestForm />
      </div>
    </div>
  </section>
</template>

<script setup>
import QuoteRequestForm from '~/components/forms/QuoteRequestForm.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Quote request',
  description: 'Request a personalised quote for treatment, travel, accommodation, and support so you can plan with confidence.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.quote-request-page {
  display: grid;
  gap: 1.75rem;
}

.quote-request-page__intro {
  padding: 1.6rem;
  border: 1px solid rgba(15, 118, 110, 0.1);
  border-radius: var(--radius-md);
  background:
    radial-gradient(circle at top right, rgba(217, 119, 6, 0.08), transparent 26%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(238, 245, 243, 0.92));
}

.quote-request-page__intro .eyebrow {
  display: inline-flex;
}

.quote-request-page__intro p {
  max-width: 46rem;
}

.quote-request-page__highlights {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 1rem;
}

.quote-request-page__highlights li {
  padding: 0.9rem 1rem;
  border: 1px solid rgba(15, 118, 110, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: var(--color-heading);
  text-align: center;
}

@media (max-width: 900px) {
  .quote-request-page__highlights {
    grid-template-columns: 1fr;
  }

  .quote-request-page__highlights li {
    border-radius: var(--radius-sm);
    text-align: left;
  }
}
</style>
