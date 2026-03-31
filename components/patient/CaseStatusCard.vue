<template>
  <article class="surface-card case-card">
    <div class="case-card__top">
      <strong>{{ item.case_code }}</strong>
      <span class="status-badge">{{ item.status }}</span>
    </div>
    <p>{{ item.specialty }}: {{ item.treatment_goal }}</p>
    <small>{{ item.destination_city }} · {{ item.urgency_level }}</small>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.case-card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
}

.case-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.case-card p,
.case-card small {
  color: var(--color-text-soft);
}
</style>
