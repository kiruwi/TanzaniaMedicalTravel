<template>
  <section class="surface-card treatment-overview">
    <span class="status-badge">{{ treatment.specialty }}</span>
    <h1>{{ treatment.name }}</h1>
    <p>{{ treatment.overview }}</p>
    <div class="treatment-overview__meta">
      <div>
        <strong>Estimated stay</strong>
        <span>{{ treatment.duration }}</span>
      </div>
      <div>
        <strong>Price guidance</strong>
        <span>From {{ formatCurrency(treatment.priceFrom) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'

defineProps({
  treatment: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.treatment-overview {
  display: grid;
  gap: 1rem;
  padding: 1.75rem;
}

.treatment-overview p {
  color: var(--color-text-soft);
}

.treatment-overview__meta {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.treatment-overview__meta div {
  padding: 1rem;
  border-radius: 1rem;
  background: var(--color-surface-muted);
}

.treatment-overview__meta strong,
.treatment-overview__meta span {
  display: block;
}

@media (max-width: 900px) {
  .treatment-overview__meta {
    grid-template-columns: 1fr;
  }
}
</style>
