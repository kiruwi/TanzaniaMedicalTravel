<template>
  <article class="surface-card invoice-card">
    <div class="invoice-card__top">
      <strong>{{ item.id }}</strong>
      <span class="status-badge">{{ item.status }}</span>
    </div>
    <p>{{ formatCurrency(item.amount, item.currency) }}</p>
    <small>{{ formatDate(item.created_at) }}</small>
  </article>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'
import { formatDate } from '~/utils/formatDate'

defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.invoice-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
}

.invoice-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.invoice-card small {
  color: var(--color-text-soft);
}
</style>
