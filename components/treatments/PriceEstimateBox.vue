<template>
  <aside class="price-estimate surface-card">
    <span class="eyebrow">Cost planning</span>
    <h2>Starter estimate</h2>
    <p>
      Quotes combine treatment, travel, accommodation, and coordinator support based on case complexity and timing.
    </p>
    <strong>{{ formatCurrency(amount) }}</strong>
    <NuxtLink class="button" to="/quote-request">Request a detailed quote</NuxtLink>
  </aside>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'

defineProps({
  amount: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.price-estimate {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
}

.price-estimate p {
  color: var(--color-text-soft);
}

.price-estimate strong {
  color: var(--color-primary);
  font-size: 2rem;
}
</style>
