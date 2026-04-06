<template>
  <div class="stack">
    <p v-if="errorMessage" class="admin-page__error">{{ errorMessage }}</p>
    <BookingTable
      :items="bookings"
      title="Bookings"
      description="Operational travel records now loading directly from the `public.bookings` table."
    />
  </div>
</template>

<script setup>
import BookingTable from '~/components/admin/BookingTable.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { request } = useAdminApi()
const bookings = ref([])
const errorMessage = ref('')

async function loadBookings() {
  errorMessage.value = ''

  try {
    const response = await request('/api/bookings/list')
    bookings.value = response.bookings || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load booking data.'
  }
}

onMounted(loadBookings)
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
