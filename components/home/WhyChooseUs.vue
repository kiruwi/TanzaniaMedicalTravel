<template>
  <section class="home-why section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Why patients choose this model</span>
        <h2>Why patients and families feel safe choosing us.</h2>
      </div>
      <div class="why__grid">
        <article v-for="item in reasons" :key="item.title" class="surface-card why__card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const reasons = [
  {
    title: 'One team by your side',
    copy: 'You do not have to chase hospitals, doctors, flights, and updates alone. We help bring everything together for you.'
  },
  {
    title: 'Clear pricing before you travel',
    copy: 'We help you understand likely treatment, travel, and stay costs early so you can plan with fewer surprises.'
  },
  {
    title: 'Trusted hospital options',
    copy: 'We help match you with hospital and specialist options that fit your needs, timeline, and comfort level.'
  }
]
</script>

<style scoped>
.home-why {
  background: #e7f0ed;
}

.section-heading {
  justify-items: center;
  text-align: center;
}

.section-heading h2 {
  max-width: 18ch;
  font-size: clamp(1.94rem, 3.42vw, 3.02rem);
}

.why__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.why__card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
}

.why__card p {
  color: var(--color-text-soft);
}

@media (max-width: 900px) {
  .why__grid {
    grid-template-columns: 1fr;
  }
}
</style>
