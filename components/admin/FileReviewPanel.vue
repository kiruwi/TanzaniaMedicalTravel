<template>
  <aside class="surface-card review-panel">
    <h2>File review queue</h2>
    <ul class="stack">
      <li v-for="item in items" :key="item.id" class="review-panel__row">
        <div>
          <strong>{{ item.file_name }}</strong>
          <p>{{ item.category }}</p>
        </div>
        <span class="status-badge">{{ item.review_status }}</span>
      </li>
    </ul>
  </aside>
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
.review-panel {
  padding: 1.5rem;
}

.review-panel__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.review-panel__row p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}
</style>
