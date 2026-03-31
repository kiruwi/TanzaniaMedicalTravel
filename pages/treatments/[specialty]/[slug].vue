<template>
  <section class="section">
    <div class="container stack">
      <TreatmentOverview :treatment="treatment" />
      <div class="detail-grid">
        <div class="stack">
          <section class="surface-card detail-section detail-section--card">
            <h2>Why this page matters for SEO</h2>
            <p>
              Treatment detail pages should carry the detailed clinical overview, cost context, doctor links, hospital links, and next-step CTAs
              without hiding critical information behind client-side interactions.
            </p>
          </section>

          <section class="detail-section">
            <div class="section-heading">
              <span class="eyebrow">Doctors</span>
              <h2>Related specialists</h2>
            </div>
            <div class="stack">
              <DoctorCard v-for="doctor in linkedDoctors" :key="doctor.slug" :doctor="doctor" />
            </div>
          </section>

          <section class="detail-section">
            <div class="section-heading">
              <span class="eyebrow">Hospitals</span>
              <h2>Related facilities</h2>
            </div>
            <div class="stack">
              <HospitalCard v-for="hospital in linkedHospitals" :key="hospital.slug" :hospital="hospital" />
            </div>
          </section>
        </div>

        <PriceEstimateBox :amount="treatment.priceFrom" />
      </div>
    </div>
  </section>
</template>

<script setup>
import DoctorCard from '~/components/treatments/DoctorCard.vue'
import HospitalCard from '~/components/treatments/HospitalCard.vue'
import PriceEstimateBox from '~/components/treatments/PriceEstimateBox.vue'
import TreatmentOverview from '~/components/treatments/TreatmentOverview.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createBreadcrumbSchema } from '~/utils/schema'

const route = useRoute()
const { specialty, slug } = route.params
const { findBySlug, relatedDoctors, relatedHospitals } = useTreatments()
const treatment = findBySlug(specialty, slug)

if (!treatment) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Treatment not found'
  })
}

const linkedDoctors = relatedDoctors(treatment)
const linkedHospitals = relatedHospitals(treatment)

useSeoMeta(buildSeoMeta({
  title: treatment.name,
  description: treatment.summary,
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Treatments', path: '/treatments' },
        { name: specialty, path: `/treatments/${specialty}` },
        { name: treatment.name, path: route.path }
      ]))
    }
  ]
})
</script>

<style scoped>
.detail-grid {
  display: grid;
  gap: 1.5rem;
  align-items: start;
  grid-template-columns: 1.3fr 0.7fr;
}

.detail-section {
  display: grid;
  gap: 1rem;
}

.detail-section--card {
  padding: 1.5rem;
}

@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
