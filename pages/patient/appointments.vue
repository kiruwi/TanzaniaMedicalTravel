<template>
  <AppointmentList :items="appointments" />
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const { appointments } = usePatient()
</script>
