<template>
  <div class="surface-card admin-table">
    <div class="admin-table__header">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <span class="status-badge">{{ items.length }} bookings</span>
    </div>
    <div v-if="items.length" class="admin-table__scroll">
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Provider</th>
            <th>Case</th>
            <th>Window</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.booking_type || 'Booking' }}</td>
            <td>
              <strong>{{ item.provider_name || 'Pending provider' }}</strong>
              <p v-if="item.booking_reference">{{ item.booking_reference }}</p>
            </td>
            <td>{{ item.medical_cases?.case_code || 'Unassigned' }}</td>
            <td>{{ formatWindow(item.start_date, item.end_date) }}</td>
            <td>
              <span class="status-badge">{{ item.status || 'pending' }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="admin-table__empty">{{ emptyMessage }}</p>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/formatDate'

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Bookings'
  },
  description: {
    type: String,
    default: 'Travel and accommodation arrangements stored against patient cases.'
  },
  emptyMessage: {
    type: String,
    default: 'No bookings have been created yet.'
  }
})

function formatWindow(startDate, endDate) {
  if (!startDate && !endDate) {
    return 'Schedule pending'
  }

  if (startDate && endDate && startDate !== endDate) {
    return `${formatDate(startDate)} to ${formatDate(endDate)}`
  }

  return formatDate(startDate || endDate)
}
</script>

<style scoped>
.admin-table {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.96);
}

.admin-table__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.admin-table__header h2 {
  margin-bottom: 0.35rem;
}

.admin-table__header p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.admin-table__scroll {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

th {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

tbody strong {
  display: block;
  margin-bottom: 0.15rem;
}

tbody p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.admin-table__empty {
  margin-bottom: 0;
  padding: 1rem 0 0.25rem;
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .admin-table__header {
    flex-direction: column;
  }
}
</style>
