<template>
  <div>
    <HeroSection />
    <TreatmentCards :items="featuredTreatments" />
    <WhyChooseUs />
    <TestimonialSlider :items="testimonials" />
  </div>
</template>

<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import TestimonialSlider from '~/components/home/TestimonialSlider.vue'
import TreatmentCards from '~/components/home/TreatmentCards.vue'
import WhyChooseUs from '~/components/home/WhyChooseUs.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createOrganizationSchema, createWebsiteSchema } from '~/utils/schema'
import { testimonials } from '~/utils/mockData'

const route = useRoute()
const { items } = await useTreatments()
const featuredTreatments = computed(() => items.value.filter((item) => item.featured))

useSeoMeta(buildSeoMeta({
  title: 'Trusted medical travel support in East Africa',
  description: 'Explore trusted treatment options, clear pricing, and caring travel support that helps you move forward with confidence.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createOrganizationSchema())
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(createWebsiteSchema())
    }
  ]
})
</script>
