<template>
  <aside class="surface-card review-panel">
    <div class="review-panel__header">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <span class="status-badge">{{ items.length }} files</span>
    </div>
    <ul v-if="items.length" class="stack">
      <li v-for="item in items" :key="item.id" class="review-panel__row">
        <div>
          <strong>{{ item.file_name }}</strong>
          <p>
            {{ item.category || 'Uncategorised' }}
            <span v-if="item.medical_cases?.case_code">· {{ item.medical_cases.case_code }}</span>
          </p>
        </div>
        <span class="status-badge">{{ item.review_status }}</span>
      </li>
    </ul>
    <p v-else class="review-panel__empty">{{ emptyMessage }}</p>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'File review queue'
  },
  description: {
    type: String,
    default: 'Medical documents waiting for verification and coordinator follow-up.'
  },
  emptyMessage: {
    type: String,
    default: 'No medical documents are waiting for review.'
  }
})
</script>

<style scoped>
.review-panel {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.96);
}

.review-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.review-panel__header h2 {
  margin-bottom: 0.35rem;
}

.review-panel__header p {
  margin-bottom: 0;
  color: var(--color-text-soft);
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

.review-panel__empty {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .review-panel__header,
  .review-panel__row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
