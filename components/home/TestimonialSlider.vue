<template>
  <section class="home-testimonials section">
    <div class="container testimonials-layout">
      <div class="section-heading">
        <span class="eyebrow">Patient feedback</span>
        <h2 class="section-title-swoosh">What patients and families love about the experience.</h2>
      </div>
      <div class="testimonials">
        <article v-for="item in items" :key="item.name" class="surface-card testimonials__item">
          <p class="testimonials__quote">“{{ item.quote }}”</p>
          <strong>{{ item.name }}</strong>
          <span>{{ item.location }}</span>
        </article>
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
</script>

<style scoped>
.home-testimonials {
  --color-heading: #f4fbf9;
  --color-paragraph: #d6e7e3;
  background: #12393d;
}

.testimonials-layout {
  display: grid;
  gap: 2rem;
  align-items: center;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
}

.section-heading {
  justify-items: center;
  text-align: center;
}

.section-heading h2 {
  max-width: 18ch;
  font-size: clamp(1.94rem, 3.42vw, 3.02rem);
}

.testimonials {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
}

.testimonials__item {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(215, 235, 232, 0.12);
  box-shadow: none;
}

.testimonials__quote {
  margin-bottom: 1.25rem;
  color: var(--color-heading);
  font-size: 1.05rem;
}

.testimonials__item strong {
  color: #f4fbf9;
}

.testimonials__item span {
  display: block;
  margin-top: 0.25rem;
  color: #b9d3cf;
}

@media (max-width: 900px) {
  .testimonials-layout {
    grid-template-columns: 1fr;
  }

  .section-heading {
    justify-items: center;
    text-align: center;
  }

  .testimonials {
    grid-template-columns: 1fr;
  }
}
</style>
