<script setup>
import { createClient } from '@supabase/supabase-js'

const config = useRuntimeConfig()
const todos = ref([])
const errorMessage = ref('')
const pending = ref(false)

const supabase = config.public.supabaseUrl && (config.public.supabaseKey || config.public.supabaseAnonKey)
  ? createClient(config.public.supabaseUrl, config.public.supabaseKey || config.public.supabaseAnonKey)
  : null

async function getTodos() {
  if (!supabase) {
    errorMessage.value = 'Supabase public config is missing.'
    return
  }

  pending.value = true
  errorMessage.value = ''

  const { data, error } = await supabase.from('todos').select()

  if (error) {
    errorMessage.value = error.message
    todos.value = []
  } else {
    todos.value = data || []
  }

  pending.value = false
}

onMounted(() => {
  getTodos()
})
</script>

<template>
  <section class="section">
    <div class="container stack">
      <div class="section-heading">
        <span class="eyebrow">Supabase demo</span>
        <h1>Sample `todos` table query</h1>
        <p>
          This uses the same client-side pattern from your snippet, but on its own route so the main application shell stays intact.
        </p>
      </div>

      <div class="surface-card demo-card">
        <p v-if="pending">Loading todos...</p>
        <p v-else-if="errorMessage" class="demo-card__error">{{ errorMessage }}</p>
        <ul v-else class="stack">
          <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li>
          <li v-if="!todos.length">No rows returned from `todos`.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.demo-card {
  padding: 1.5rem;
}

.demo-card__error {
  color: var(--color-danger);
}
</style>
