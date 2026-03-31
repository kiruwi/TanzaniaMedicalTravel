<template>
  <section class="stack">
    <CaseStatusCard v-for="item in cases" :key="item.id" :item="item" />
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const { cases } = usePatient()
</script>
