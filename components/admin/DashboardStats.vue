<template>
  <section class="grid-four">
    <article v-for="item in items" :key="item.label" class="surface-card stat-card">
      <strong>{{ item.value }}</strong>
      <span>{{ item.label }}</span>
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
  gap: 0.35rem;
  padding: 1.25rem;
}

.stat-card strong {
  color: var(--color-heading);
  font-size: 2rem;
}

.stat-card span {
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .grid-four {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
