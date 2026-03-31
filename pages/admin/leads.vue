<template>
  <LeadTable :items="leads" />
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

import LeadTable from '~/components/admin/LeadTable.vue'
import { leads } from '~/utils/mockPortalData'
</script>
