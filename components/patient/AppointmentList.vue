<template>
  <div class="surface-card appointment-list">
    <h2>Appointments</h2>
    <ul class="stack">
      <li v-for="item in items" :key="item.id" class="appointment-list__row">
        <div>
          <strong>{{ item.appointment_type }}</strong>
          <p>{{ formatDate(item.scheduled_at) }}</p>
        </div>
        <span class="status-badge">{{ item.status }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/formatDate'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.appointment-list {
  padding: 1.5rem;
}

.appointment-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.appointment-list__row p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}
</style>
