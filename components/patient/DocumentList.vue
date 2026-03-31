<template>
  <div class="surface-card document-list">
    <h2>Documents</h2>
    <ul class="stack">
      <li v-for="item in items" :key="item.id" class="document-list__row">
        <div>
          <strong>{{ item.file_name }}</strong>
          <p>{{ item.category }}</p>
        </div>
        <span class="status-badge">{{ item.review_status }}</span>
      </li>
    </ul>
  </div>
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
.document-list {
  padding: 1.5rem;
}

.document-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.document-list__row p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}
</style>
