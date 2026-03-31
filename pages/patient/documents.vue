<template>
  <div class="stack">
    <MedicalUploadForm />
    <DocumentList :items="documents" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

import MedicalUploadForm from '~/components/forms/MedicalUploadForm.vue'

const { documents } = usePatient()
</script>
