<template>
  <div class="surface-card admin-table">
    <h2>Bookings</h2>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Provider</th>
          <th>Window</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.booking_type }}</td>
          <td>{{ item.provider_name }}</td>
          <td>{{ item.start_date }} to {{ item.end_date }}</td>
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
