<template>
  <BookingTable :items="bookings" />
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

import BookingTable from '~/components/admin/BookingTable.vue'
import { bookings } from '~/utils/mockPortalData'
</script>
