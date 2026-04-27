<template>
  <div class="stack">
    <p v-if="errorMessage" class="admin-page__error">{{ errorMessage }}</p>
    <LeadTable
      :items="leads"
      title="Leads"
      description="Inquiry submissions now loading directly from the `public.inquiries` table."
    />
  </div>
</template>

<script setup>
import LeadTable from '~/components/admin/LeadTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  path: '/tmt-admin/leads'
})

const { request } = useAdminApi()
const leads = ref([])
const errorMessage = ref('')

async function loadLeads() {
  errorMessage.value = ''

  try {
    const response = await request('/api/inquiries/list')
    leads.value = response.inquiries || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load inquiry data.'
  }
}

onMounted(loadLeads)
</script>

<style scoped>
.admin-page__error {
  margin-bottom: 0;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(180, 35, 24, 0.15);
  border-radius: var(--radius-sm);
  background: rgba(180, 35, 24, 0.06);
  color: var(--color-danger);
}
</style>
