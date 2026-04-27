<template>
  <section class="surface-card access-log">
    <div class="access-log__header">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <NuxtLink v-if="ctaLabel && ctaTo" class="button button--ghost" :to="ctaTo">
        {{ ctaLabel }}
      </NuxtLink>
    </div>

    <div v-if="items.length" class="access-log__scroll">
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Type</th>
            <th>Who</th>
            <th>Path</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              <strong>{{ formatTimestamp(item.created_at) }}</strong>
            </td>
            <td>
              <span class="status-badge">{{ item.access_type }}</span>
            </td>
            <td>
              <div>{{ item.actor_email || 'Unknown actor' }}</div>
              <small>{{ item.actor_role || 'unknown role' }}</small>
            </td>
            <td>
              <code>{{ item.path }}</code>
            </td>
            <td>
              <div>{{ formatOrigin(item) }}</div>
              <small>{{ item.method }}</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="access-log__empty">{{ emptyMessage }}</p>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Access log'
  },
  description: {
    type: String,
    default: ''
  },
  emptyMessage: {
    type: String,
    default: 'No audit entries yet.'
  },
  ctaLabel: {
    type: String,
    default: ''
  },
  ctaTo: {
    type: String,
    default: ''
  }
})

function formatTimestamp(value) {
  if (!value) {
    return 'Unknown time'
  }

  return new Date(value).toLocaleString()
}

function formatOrigin(item) {
  const location = [item.city, item.country_code].filter(Boolean).join(', ')
  return [item.ip_address, location].filter(Boolean).join(' · ') || 'Unknown origin'
}
</script>

<style scoped>
.access-log {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
}

.access-log__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.access-log__header h2,
.access-log__header p,
.access-log__empty {
  margin-bottom: 0;
}

.access-log__scroll {
  margin-inline: -1.25rem;
  overflow-x: auto;
}

.access-log table {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
}

.access-log th,
.access-log td {
  padding: 0.85rem 1.25rem;
  border-top: 1px solid rgba(15, 118, 110, 0.1);
  text-align: left;
  vertical-align: top;
}

.access-log th {
  border-top: none;
  color: var(--color-text-soft);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.access-log td small {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-text-soft);
}

.access-log td code {
  display: inline-block;
  max-width: 28rem;
  white-space: normal;
  overflow-wrap: anywhere;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .access-log__header {
    flex-direction: column;
  }

  .access-log {
    padding: 1rem;
  }

  .access-log__scroll {
    margin-inline: -1rem;
  }

  .access-log th,
  .access-log td {
    padding: 0.8rem 1rem;
  }
}
</style>
