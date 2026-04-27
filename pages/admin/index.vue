<template>
  <div class="stack admin-dashboard">
    <section class="surface-card admin-dashboard__hero">
      <div>
        <span class="status-badge">Supabase live data</span>
        <h2>Operations overview</h2>
        <p>These cards and queues are reading from the operational tables in your Supabase project.</p>
      </div>
      <button class="button button--ghost" :disabled="pending" type="button" @click="loadDashboard">
        {{ pending ? 'Refreshing...' : 'Refresh dashboard' }}
      </button>
    </section>

    <p v-if="errorMessage" class="admin-dashboard__error">{{ errorMessage }}</p>

    <template v-else>
      <DashboardStats :items="dashboardStats" />
      <div class="grid-two">
        <LeadTable
          :items="recentInquiries"
          title="Latest leads"
          description="Recent inquiry submissions from the public website."
        />
        <FileReviewPanel
          :items="documentQueue"
          title="Document review queue"
          description="Files uploaded to case records that still need operational review."
        />
      </div>
      <BookingTable
        :items="upcomingBookings"
        title="Upcoming bookings"
        description="Travel and accommodation items scheduled from today onward."
      />
      <AccessLogTable
        :items="recentAccessLogs"
        title="Recent access log"
        description="Append-only admin access events stored separately from operational records."
        empty-message="No access events have been recorded yet."
        cta-label="View full access log"
        cta-to="/tmt-admin/access-log"
      />
    </template>
  </div>
</template>

<script setup>
import AccessLogTable from '~/components/admin/AccessLogTable.vue'
import BookingTable from '~/components/admin/BookingTable.vue'
import DashboardStats from '~/components/admin/DashboardStats.vue'
import FileReviewPanel from '~/components/admin/FileReviewPanel.vue'
import LeadTable from '~/components/admin/LeadTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
  path: '/tmt-admin'
})

const { request } = useAdminApi()
const pending = ref(true)
const errorMessage = ref('')
const dashboardStats = ref([])
const recentInquiries = ref([])
const documentQueue = ref([])
const upcomingBookings = ref([])
const recentAccessLogs = ref([])

async function loadDashboard() {
  pending.value = true
  errorMessage.value = ''

  try {
    const response = await request('/api/admin/dashboard')
    dashboardStats.value = response.stats || []
    recentInquiries.value = response.recent_inquiries || []
    documentQueue.value = response.document_queue || []
    upcomingBookings.value = response.upcoming_bookings || []
    recentAccessLogs.value = response.recent_access_logs || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load dashboard data.'
  } finally {
    pending.value = false
  }
}

onMounted(loadDashboard)
</script>

<style scoped>
.admin-dashboard__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.6rem;
  background: rgba(255, 255, 255, 0.96);
}

.admin-dashboard__hero h2 {
  margin: 0.75rem 0 0.45rem;
}

.admin-dashboard__hero p {
  margin-bottom: 0;
}

.admin-dashboard__error {
  margin-bottom: 0;
  padding: 1rem 1.2rem;
  border: 1px solid rgba(180, 35, 24, 0.15);
  border-radius: var(--radius-sm);
  background: rgba(180, 35, 24, 0.06);
  color: var(--color-danger);
}

@media (max-width: 900px) {
  .admin-dashboard__hero {
    flex-direction: column;
  }
}
</style>
