<template>
  <section class="home-treatments section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Priority treatments</span>
        <h2>Popular treatment journeys patients ask us about most.</h2>
        <p>
          Explore the care options families often request and see how we help turn worry into a clear, manageable next step.
        </p>
      </div>

      <div class="cards">
        <article v-for="item in items" :key="item.slug" class="cards__item surface-card">
          <span class="status-badge">{{ item.specialty }}</span>
          <h3>{{ item.name }}</h3>
          <p>{{ item.summary }}</p>
          <div class="cards__meta">
            <span>From {{ formatCurrency(item.priceFrom) }}</span>
            <span>{{ item.duration }}</span>
          </div>
          <NuxtLink class="cards__link" :to="`/treatments/${item.specialty}/${item.slug}`">See this option</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatCurrency } from '~/utils/formatCurrency'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.home-treatments {
  background: #ffffff;
}

.section-heading {
  justify-items: center;
  text-align: center;
}

.section-heading h2 {
  max-width: 18ch;
  font-size: clamp(1.94rem, 3.42vw, 3.02rem);
}

.cards {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cards__item {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.82);
}

.cards__item p {
  color: var(--color-text-soft);
}

.cards__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  color: var(--color-heading);
  font-weight: 400;
}

.cards__link {
  color: var(--color-primary);
  font-weight: 400;
}

@media (max-width: 900px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
