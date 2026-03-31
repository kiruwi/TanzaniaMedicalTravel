<template>
  <div class="stack">
    <section class="grid-two">
      <CaseStatusCard v-for="item in cases" :key="item.id" :item="item" />
    </section>
    <section class="grid-two">
      <DocumentList :items="documents" />
      <AppointmentList :items="appointments" />
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const { cases, documents, appointments } = usePatient()
</script>
