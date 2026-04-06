<template>
  <div class="surface-card admin-table">
    <div class="admin-table__header">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <span class="status-badge">{{ items.length }} records</span>
    </div>
    <div v-if="items.length" class="admin-table__scroll">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Treatment</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <strong>{{ item.full_name || 'Unknown lead' }}</strong>
              <p>{{ item.email || 'No email provided' }}</p>
            </td>
            <td>{{ item.country || 'Not set' }}</td>
            <td>{{ item.treatment_interest || 'General inquiry' }}</td>
            <td>
              <span class="status-badge">{{ item.status || 'new' }}</span>
            </td>
            <td>{{ formatDate(item.created_at) }}</td>
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
    default: 'Leads'
  },
  description: {
    type: String,
    default: 'New inquiry records flowing in from Supabase.'
  },
  emptyMessage: {
    type: String,
    default: 'No inquiries have been captured yet.'
  }
})
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
