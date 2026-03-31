<template>
  <div class="surface-card admin-table">
    <h2>Leads</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Treatment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.full_name }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.treatment_interest }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.admin-table {
  padding: 1.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem 0.5rem;
  border-bottom: 1px solid var(--color-border);
  text-align: left;
}
</style>
