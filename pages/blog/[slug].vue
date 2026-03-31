<template>
  <article class="section">
    <div class="container blog-article">
      <span class="status-badge">{{ formatDate(post.publishedAt) }}</span>
      <h1>{{ post.title }}</h1>
      <p class="blog-article__excerpt">{{ post.excerpt }}</p>
      <div class="blog-article__body">
        <p v-for="paragraph in post.body" :key="paragraph">{{ paragraph }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatDate } from '~/utils/formatDate'
import { buildHeadLinks, buildSeoMeta } from '~/utils/seo'
import { createArticleSchema, createBreadcrumbSchema } from '~/utils/schema'
import { blogPosts } from '~/utils/mockData'

const route = useRoute()
const post = blogPosts.find((item) => item.slug === route.params.slug)

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found'
  })
}

useSeoMeta(buildSeoMeta({
  title: post.title,
  description: post.excerpt,
  path: route.path,
  type: 'article'
}))

useHead({
  link: buildHeadLinks(route.path),
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(createArticleSchema({
        ...post,
        path: route.path
      }))
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(createBreadcrumbSchema([
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: route.path }
      ]))
    }
  ]
})
</script>

<style scoped>
.blog-article {
  max-width: 760px;
}

.blog-article__excerpt,
.blog-article__body p {
  color: var(--color-text-soft);
}

.blog-article__body {
  display: grid;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
