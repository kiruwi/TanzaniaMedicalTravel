<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Blog</span>
        <h1>Editorial pages for search visibility and patient education.</h1>
      </div>
      <div class="stack">
        <article v-for="post in blogPosts" :key="post.slug" class="surface-card blog-card">
          <span class="status-badge">{{ formatDate(post.publishedAt) }}</span>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <NuxtLink :to="`/blog/${post.slug}`">Read article</NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatDate } from '~/utils/formatDate'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { blogPosts } from '~/utils/mockData'

const route = useRoute()

useSeoMeta(buildSeoMeta({
  title: 'Blog',
  description: 'Patient education articles about treatment planning, hospital selection, and medical travel logistics.',
  path: route.path
}))

useHead({
  link: buildHeadLinks(route.path)
})
</script>

<style scoped>
.blog-card {
  padding: 1.5rem;
}

.blog-card p {
  color: var(--color-text-soft);
}

.blog-card a {
  color: var(--color-primary);
  font-weight: 400;
}
</style>
