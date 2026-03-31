<template>
  <section class="section">
    <div class="container contact">
      <div class="section-heading">
        <span class="eyebrow">Contact</span>
        <h1>Tell us what you need and we will guide you from there.</h1>
        <p>
          Whether you are just exploring or ready to travel, our team can help you understand your options, likely costs, and the best next step.
        </p>
      </div>
      <div class="contact__grid">
        <ContactForm />
        <aside class="surface-card contact__sidebar">
          <h2>What to include</h2>
          <ul class="stack contact__checklist">
            <li>
              <span class="contact__check" aria-hidden="true">&#10003;</span>
              <span>Current diagnosis or treatment goal</span>
            </li>
            <li>
              <span class="contact__check" aria-hidden="true">&#10003;</span>
              <span>Preferred travel timing</span>
            </li>
            <li>
              <span class="contact__check" aria-hidden="true">&#10003;</span>
              <span>Past reports or imaging availability</span>
            </li>
            <li>
              <span class="contact__check" aria-hidden="true">&#10003;</span>
              <span>Whether you need flights or accommodation support</span>
            </li>
          </ul>
          <NuxtLink class="button" to="/quote-request">Get a personalised quote</NuxtLink>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from '~/components/forms/ContactForm.vue'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Contact',
  description: 'Speak with our team about treatment options, travel support, and the next step toward a clear personalised quote.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.contact__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1.3fr 0.7fr;
}

.contact__sidebar {
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1.5rem;
}

.contact__checklist li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  align-items: start;
}

.contact__check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.12);
  color: var(--color-primary);
  font-size: 0.85rem;
  line-height: 1;
}

@media (max-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
