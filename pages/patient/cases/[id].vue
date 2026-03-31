<template>
  <section class="surface-card case-detail">
    <h2>{{ activeCase.case_code }}</h2>
    <p>{{ activeCase.specialty }} · {{ activeCase.treatment_goal }}</p>
    <p>Status: {{ activeCase.status }}</p>
    <p>Destination city: {{ activeCase.destination_city }}</p>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const route = useRoute()
const { cases } = usePatient()
const activeCase = cases.find((item) => item.id === route.params.id)

if (!activeCase) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Case not found'
  })
}
</script>

<style scoped>
.case-detail {
  padding: 1.5rem;
}

.case-detail p {
  color: var(--color-text-soft);
}
</style>
