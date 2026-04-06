<template>
  <div class="cms-page stack">
    <section class="surface-card cms-page__hero">
      <div>
        <span class="status-badge">Website CMS</span>
        <h2>Doctors</h2>
        <p>Add and update specialist profiles that appear on doctor pages and treatment pathways.</p>
      </div>
      <button class="button button--ghost" type="button" @click="startNew">
        New doctor
      </button>
    </section>

    <p v-if="errorMessage" class="cms-page__error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="cms-page__success">{{ successMessage }}</p>

    <div class="cms-page__grid">
      <section class="surface-card cms-list">
        <div class="cms-list__header">
          <div>
            <h3>Doctor profiles</h3>
            <p>{{ doctors.length }} doctor records in Supabase.</p>
          </div>
        </div>

        <div v-if="doctors.length" class="cms-list__items">
          <button
            v-for="item in doctors"
            :key="item.id"
            :class="['cms-list__item', { 'cms-list__item--active': form.id === item.id }]"
            type="button"
            @click="selectDoctor(item)"
          >
            <strong>{{ item.full_name }}</strong>
            <span>{{ item.specialties?.name || 'No specialty' }}</span>
            <small>{{ item.slug }}</small>
          </button>
        </div>

        <p v-else class="cms-list__empty">No doctors have been created yet.</p>
      </section>

      <section class="surface-card cms-editor">
        <div class="cms-editor__header">
          <div>
            <h3>{{ form.id ? 'Edit doctor' : 'Create doctor' }}</h3>
            <p>Doctor profiles appear in the public directory and are linked from treatment pages.</p>
          </div>
        </div>

        <form class="cms-form" @submit.prevent="saveDoctor">
          <div class="grid-two">
            <label class="cms-form__field">
              <span>Full name</span>
              <input v-model="form.full_name" required type="text" />
            </label>
            <label class="cms-form__field">
              <span>Slug</span>
              <input v-model="form.slug" type="text" placeholder="Leave blank to generate from name" />
            </label>
            <label class="cms-form__field">
              <span>Specialty</span>
              <input v-model="form.specialty" required type="text" placeholder="Orthopedics" />
            </label>
            <label class="cms-form__field">
              <span>Hospital</span>
              <select v-model="form.hospital_id">
                <option value="">No linked hospital</option>
                <option v-for="hospital in hospitals" :key="hospital.id" :value="hospital.id">
                  {{ hospital.name }}
                </option>
              </select>
            </label>
            <label class="cms-form__field">
              <span>Professional title</span>
              <input v-model="form.title" type="text" placeholder="Interventional Cardiologist" />
            </label>
            <label class="cms-form__field">
              <span>Languages</span>
              <input v-model="form.languages" type="text" placeholder="English, Swahili" />
            </label>
          </div>

          <label class="cms-form__field">
            <span>Summary</span>
            <textarea v-model="form.summary" rows="5" />
          </label>

          <div class="cms-form__actions">
            <button class="button" :disabled="pendingSave" type="submit">
              {{ pendingSave ? 'Saving...' : (form.id ? 'Update doctor' : 'Create doctor') }}
            </button>
            <button class="button button--ghost" type="button" @click="startNew">
              Clear form
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

const { request } = useAdminApi()

const hospitals = ref([])
const doctors = ref([])
const pendingSave = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const emptyForm = () => ({
  id: '',
  full_name: '',
  slug: '',
  specialty: '',
  hospital_id: '',
  title: '',
  summary: '',
  languages: ''
})

const form = reactive(emptyForm())

async function loadPage() {
  errorMessage.value = ''

  try {
    const [catalogResponse, doctorResponse] = await Promise.all([
      request('/api/admin/catalog'),
      request('/api/admin/doctors')
    ])

    hospitals.value = catalogResponse.hospitals || []
    doctors.value = doctorResponse.doctors || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load doctor CMS.'
  }
}

function applyForm(values) {
  Object.assign(form, emptyForm(), values)
}

function startNew() {
  successMessage.value = ''
  applyForm(emptyForm())
}

function selectDoctor(item) {
  successMessage.value = ''
  applyForm({
    id: item.id,
    full_name: item.full_name || '',
    slug: item.slug || '',
    specialty: item.specialties?.name || '',
    hospital_id: item.hospital_id || '',
    title: item.title || '',
    summary: item.summary || '',
    languages: Array.isArray(item.languages) ? item.languages.join(', ') : ''
  })
}

async function saveDoctor() {
  pendingSave.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await request('/api/admin/doctors', {
      method: 'POST',
      body: form
    })

    await loadPage()

    const saved = doctors.value.find((item) => item.id === response?.doctor?.id)

    if (saved) {
      selectDoctor(saved)
    }

    successMessage.value = form.id ? 'Doctor updated.' : 'Doctor created.'
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to save doctor.'
  } finally {
    pendingSave.value = false
  }
}

onMounted(loadPage)
</script>

<style scoped>
.cms-page__hero,
.cms-list,
.cms-editor {
  padding: 1.5rem;
}

.cms-page__hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.cms-page__hero p,
.cms-list__header p,
.cms-editor__header p {
  margin-bottom: 0;
  color: var(--color-text-soft);
}

.cms-page__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(16rem, 22rem) minmax(0, 1fr);
  align-items: start;
}

.cms-list__items {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
}

.cms-list__item {
  display: grid;
  gap: 0.25rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.92);
  text-align: left;
}

.cms-list__item span,
.cms-list__item small,
.cms-list__empty {
  color: var(--color-text-soft);
}

.cms-list__item--active {
  border-color: rgba(15, 118, 110, 0.35);
  box-shadow: 0 12px 28px rgba(15, 40, 44, 0.08);
}

.cms-editor {
  display: grid;
  gap: 1rem;
}

.cms-form {
  display: grid;
  gap: 1rem;
}

.cms-form__field {
  display: grid;
  gap: 0.45rem;
}

.cms-form__field input,
.cms-form__field select,
.cms-form__field textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  background: #fff;
}

.cms-form__actions {
  display: flex;
  gap: 0.75rem;
}

.cms-page__error,
.cms-page__success {
  margin-bottom: 0;
  padding: 1rem 1.2rem;
  border-radius: var(--radius-sm);
}

.cms-page__error {
  border: 1px solid rgba(180, 35, 24, 0.15);
  background: rgba(180, 35, 24, 0.06);
  color: var(--color-danger);
}

.cms-page__success {
  border: 1px solid rgba(6, 118, 71, 0.14);
  background: rgba(6, 118, 71, 0.07);
  color: var(--color-success);
}

@media (max-width: 1000px) {
  .cms-page__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .cms-page__hero,
  .cms-form__actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
