<template>
  <section class="stack">
    <section class="surface-card access-log-page__filters">
      <label>
        <span>Search</span>
        <input v-model="search" type="search" placeholder="Email, path, IP, location" />
      </label>
      <label>
        <span>Type</span>
        <select v-model="accessType">
          <option value="">All</option>
          <option value="page">Page</option>
          <option value="api">API</option>
        </select>
      </label>
      <button class="button" :disabled="pending" type="button" @click="loadAccessLog">
        {{ pending ? 'Loading...' : 'Refresh log' }}
      </button>
    </section>

    <p v-if="errorMessage" class="access-log-page__error">{{ errorMessage }}</p>

    <AccessLogTable
      :items="items"
      title="Admin access log"
      description="Immutable access events with actor, target, time, and request origin."
      empty-message="No matching access events found."
    />
  </section>
</template>

<script setup>
import AccessLogTable from '~/components/admin/AccessLogTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  path: '/tmt-admin/access-log'
})

const { request } = useAdminApi()
const search = ref('')
const accessType = ref('')
const pending = ref(true)
const errorMessage = ref('')
const items = ref([])

async function loadAccessLog() {
  pending.value = true
  errorMessage.value = ''

  try {
    const response = await request('/api/admin/access-log', {
      query: {
        search: search.value || undefined,
        access_type: accessType.value || undefined,
        limit: 100
      }
    })

    items.value = response.items || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load access log.'
  } finally {
    pending.value = false
  }
}

watch([search, accessType], () => {
  void loadAccessLog()
})

onMounted(loadAccessLog)
</script>

<style scoped>
.access-log-page__filters {
  display: flex;
  align-items: end;
  gap: 0.85rem;
  flex-wrap: wrap;
  padding: 1rem;
}

.access-log-page__filters label {
  display: grid;
  gap: 0.4rem;
  flex: 1 1 220px;
  min-width: min(220px, 100%);
}

.access-log-page__filters input,
.access-log-page__filters select {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
}

.access-log-page__filters .button {
  flex: 0 0 auto;
}

.access-log-page__error {
  margin-bottom: 0;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(180, 35, 24, 0.15);
  border-radius: var(--radius-sm);
  background: rgba(180, 35, 24, 0.06);
  color: var(--color-danger);
}

@media (max-width: 640px) {
  .access-log-page__filters {
    align-items: stretch;
  }

  .access-log-page__filters .button {
    width: 100%;
  }
}
</style>
