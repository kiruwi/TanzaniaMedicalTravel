<template>
  <section class="grid-four">
    <article v-for="item in items" :key="item.label" class="surface-card stat-card">
      <span class="stat-card__label">{{ item.label }}</span>
      <strong>{{ item.value }}</strong>
      <p>{{ item.note }}</p>
    </article>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.grid-four {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.stat-card {
  display: grid;
  gap: 0.5rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.96);
}

.stat-card__label {
  color: var(--color-text-soft);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.stat-card strong {
  color: var(--color-heading);
  font-size: 2rem;
}

.stat-card p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .grid-four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
