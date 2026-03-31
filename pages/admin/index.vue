<template>
  <div class="stack">
    <DashboardStats :items="dashboardStats" />
    <div class="grid-two">
      <LeadTable :items="leads" />
      <FileReviewPanel :items="documents" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

import DashboardStats from '~/components/admin/DashboardStats.vue'
import FileReviewPanel from '~/components/admin/FileReviewPanel.vue'
import LeadTable from '~/components/admin/LeadTable.vue'
import { dashboardStats, documents, leads } from '~/utils/mockPortalData'
</script>
