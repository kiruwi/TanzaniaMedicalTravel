<template>
  <div class="cms-page stack">
    <section class="surface-card cms-page__hero">
      <div>
        <span class="status-badge">Website CMS</span>
        <h2>Treatments</h2>
        <p>Add and update treatment pages that appear across the public website, pricing, search, and quote flows.</p>
      </div>
      <button class="button button--ghost" type="button" @click="startNew">
        New treatment
      </button>
    </section>

    <p v-if="errorMessage" class="cms-page__error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="cms-page__success">{{ successMessage }}</p>

    <div class="cms-page__grid">
      <section class="surface-card cms-list">
        <div class="cms-list__header">
          <div>
            <h3>Published catalog</h3>
            <p>{{ treatments.length }} treatment records in Supabase.</p>
          </div>
        </div>

        <div v-if="treatments.length" class="cms-list__items">
          <button
            v-for="item in treatments"
            :key="item.id"
            :class="['cms-list__item', { 'cms-list__item--active': form.id === item.id }]"
            type="button"
            @click="selectTreatment(item)"
          >
            <strong>{{ item.name }}</strong>
            <span>{{ item.specialties?.name || 'No specialty' }}</span>
            <small>{{ item.slug }}</small>
          </button>
        </div>

        <p v-else class="cms-list__empty">No treatments have been created yet.</p>
      </section>

      <section class="surface-card cms-editor">
        <div class="cms-editor__header">
          <div>
            <h3>{{ form.id ? 'Edit treatment' : 'Create treatment' }}</h3>
            <p>These fields feed the treatment listing, detail page, pricing, search, and form dropdowns.</p>
          </div>
        </div>

        <form class="cms-form" @submit.prevent="saveTreatment">
          <div class="grid-two">
            <label class="cms-form__field">
              <span>Name</span>
              <input v-model="form.name" required type="text" />
            </label>
            <label class="cms-form__field">
              <span>Slug</span>
              <input v-model="form.slug" type="text" placeholder="Leave blank to generate from name" />
            </label>
            <label class="cms-form__field">
              <span>Specialty</span>
              <input v-model="form.specialty" required type="text" placeholder="Cardiology" />
            </label>
            <label class="cms-form__field">
              <span>Estimated stay</span>
              <input v-model="form.duration" type="text" placeholder="7 to 10 days" />
            </label>
            <label class="cms-form__field">
              <span>Primary hospital</span>
              <select v-model="form.hospital_id">
                <option value="">No linked hospital</option>
                <option v-for="hospital in catalog.hospitals" :key="hospital.id" :value="hospital.id">
                  {{ hospital.name }}
                </option>
              </select>
            </label>
            <label class="cms-form__field">
              <span>Primary doctor</span>
              <select v-model="form.primary_doctor_id">
                <option value="">No linked doctor</option>
                <option v-for="doctor in catalog.doctors" :key="doctor.id" :value="doctor.id">
                  {{ doctor.full_name }}
                </option>
              </select>
            </label>
            <label class="cms-form__field">
              <span>Price guidance (USD)</span>
              <input v-model.number="form.price_from" min="0" step="100" type="number" />
            </label>
            <label class="cms-form__field cms-form__field--checkbox">
              <input v-model="form.featured" type="checkbox" />
              <span>Show as featured on the home page</span>
            </label>
          </div>

          <label class="cms-form__field">
            <span>Summary</span>
            <textarea v-model="form.summary" rows="3" />
          </label>

          <label class="cms-form__field">
            <span>Overview</span>
            <textarea v-model="form.overview" rows="6" />
          </label>

          <div class="cms-form__actions">
            <button class="button" :disabled="pendingSave" type="submit">
              {{ pendingSave ? 'Saving...' : (form.id ? 'Update treatment' : 'Create treatment') }}
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

const catalog = reactive({
  hospitals: [],
  doctors: []
})

const treatments = ref([])
const pendingSave = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const emptyForm = () => ({
  id: '',
  name: '',
  slug: '',
  specialty: '',
  summary: '',
  overview: '',
  price_from: 0,
  duration: '',
  hospital_id: '',
  primary_doctor_id: '',
  featured: false
})

const form = reactive(emptyForm())

async function loadPage() {
  errorMessage.value = ''

  try {
    const [catalogResponse, treatmentResponse] = await Promise.all([
      request('/api/admin/catalog'),
      request('/api/admin/treatments')
    ])

    catalog.hospitals = catalogResponse.hospitals || []
    catalog.doctors = catalogResponse.doctors || []
    treatments.value = treatmentResponse.treatments || []
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to load treatment CMS.'
  }
}

function applyForm(values) {
  Object.assign(form, emptyForm(), values)
}

function startNew() {
  successMessage.value = ''
  applyForm(emptyForm())
}

function selectTreatment(item) {
  successMessage.value = ''
  applyForm({
    id: item.id,
    name: item.name || '',
    slug: item.slug || '',
    specialty: item.specialties?.name || '',
    summary: item.summary || '',
    overview: item.overview || '',
    price_from: Number(item.price_from || 0),
    duration: item.duration || '',
    hospital_id: item.hospital_id || '',
    primary_doctor_id: item.primary_doctor_id || '',
    featured: Boolean(item.featured)
  })
}

async function saveTreatment() {
  pendingSave.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await request('/api/admin/treatments', {
      method: 'POST',
      body: form
    })

    await loadPage()

    const saved = treatments.value.find((item) => item.id === response?.treatment?.id)

    if (saved) {
      selectTreatment(saved)
    }

    successMessage.value = form.id ? 'Treatment updated.' : 'Treatment created.'
  } catch (error) {
    errorMessage.value = error?.data?.statusMessage || error?.message || 'Unable to save treatment.'
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

.cms-form__field--checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.95rem;
}

.cms-form__field--checkbox input {
  width: auto;
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

  .cms-form__field--checkbox {
    padding-top: 0;
  }
}
</style>
