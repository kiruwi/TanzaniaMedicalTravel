<template>
  <section class="grid-two">
    <InvoiceCard v-for="item in payments" :key="item.id" :item="item" />
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'patient',
  middleware: ['patient']
})

const { payments } = usePatient()
</script>
