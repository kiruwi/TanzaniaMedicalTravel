<template>
  <section class="home-treatments section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Priority treatments</span>
        <h2 class="section-title-swoosh">Popular treatment journeys patients ask us about most.</h2>
        <p>
          Explore the care options families often request and see how we help turn worry into a clear, manageable next step.
        </p>
      </div>

      <div class="cards">
        <NuxtLink
          v-for="item in items"
          :key="item.slug"
          :class="['cards__item', 'surface-card', `cards__item--${item.specialty}`]"
          :to="`/treatments/${item.specialty}/${item.slug}`"
        >
          <div class="cards__content">
            <p class="cards__label">{{ formatSpecialty(item.specialty) }}</p>
            <h3>{{ shortTitle(item.specialty, item.name) }}</h3>
            <p class="cards__procedures">{{ proceduresLabel(item.specialty, item.name) }}</p>
          </div>
          <span class="cards__link">
            Learn more
            <span aria-hidden="true">&rarr;</span>
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

function formatSpecialty(specialty = '') {
  if (specialty.toLowerCase() === 'ivf') {
    return 'IVF'
  }

  return specialty.charAt(0).toUpperCase() + specialty.slice(1)
}

function shortTitle(specialty = '', name = '') {
  if (specialty.toLowerCase() === 'orthopedics') {
    return 'Orthopedic care'
  }

  if (specialty.toLowerCase() === 'cardiology') {
    return 'Heart care'
  }

  if (specialty.toLowerCase() === 'ivf') {
    return 'Fertility care'
  }

  return name
}

function proceduresLabel(specialty = '', name = '') {
  if (specialty.toLowerCase() === 'orthopedics') {
    return 'Hip replacement, joint reconstruction'
  }

  if (specialty.toLowerCase() === 'cardiology') {
    return 'Angioplasty, stent care'
  }

  if (specialty.toLowerCase() === 'ivf') {
    return 'IVF cycles, fertility workup'
  }

  return name
}
</script>

<style scoped>
.home-treatments {
  background: var(--color-surface);
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
  position: relative;
  display: grid;
  align-content: end;
  min-height: 24rem;
  padding: 1.75rem;
  overflow: hidden;
  border: none;
  color: var(--color-text-on-dark);
  box-shadow: var(--shadow-feature-card);
  isolation: isolate;
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.cards__item::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background-size: cover;
  background-position: center;
  transform: scale(1.01);
  transition: transform 0.35s ease;
}

.cards__item::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 25%;
  z-index: -1;
  background: var(--gradient-treatment-card);
}

.cards__item:hover,
.cards__item:focus-visible {
  transform: translateY(-4px);
  box-shadow: var(--shadow-feature-card-hover);
}

.cards__item:hover::before,
.cards__item:focus-visible::before {
  transform: scale(1.06);
}

.cards__item--cardiology::before {
  background-image: url('/images/heart.webp');
  background-position: center center;
}

.cards__item--orthopedics::before {
  background-image: url('/images/orthopedic.webp');
  background-position: center center;
}

.cards__item--ivf::before {
  background-image: url('/images/fertility.webp');
  background-position: center center;
}

.cards__content {
  display: grid;
  gap: 0.7rem;
}

.cards__label {
  margin-bottom: 0;
  color: var(--color-text-on-dark-faint);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.cards__item h3 {
  margin-bottom: 0;
  color: var(--color-text-inverse);
  font-size: clamp(1.55rem, 2.3vw, 2.15rem);
}

.cards__link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 1.35rem;
  color: var(--color-highlight);
  font-weight: 400;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.24s ease, transform 0.24s ease, color 0.24s ease;
}

.cards__item:hover .cards__link,
.cards__item:focus-visible .cards__link {
  color: var(--color-highlight);
  font-weight: 300;
  opacity: 1;
  transform: translateY(0);
}

.cards__procedures {
  margin-bottom: 0;
  color: var(--color-text-on-dark-body);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .cards__item {
    min-height: 20rem;
  }

  .cards__link {
    opacity: 1;
    transform: none;
  }
}
</style>
