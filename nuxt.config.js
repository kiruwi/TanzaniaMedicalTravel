import { defineNuxtConfig } from 'nuxt/config'

const siteUrl = process.env.NUXT_SITE_URL || 'https://example-medical-travel.com'
const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabasePublishableKey =
  process.env.NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_KEY ||
  ''
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  ''

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    siteUrl,
    supabaseUrl,
    supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '',
    supabasePublishableKey,
    supabaseSecretKey,
    supabaseServiceRoleKey: supabaseSecretKey,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFrom: process.env.RESEND_FROM || 'care@example-medical-travel.com',
    strapiUrl: process.env.STRAPI_URL || '',
    strapiToken: process.env.STRAPI_TOKEN || '',
    public: {
      siteUrl,
      siteName: 'Tanzania Medical Travel',
      siteDescription: 'Coordinated medical travel to trusted hospitals, specialists, and recovery destinations in East Africa.',
      supabaseUrl,
      supabaseKey: process.env.SUPABASE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || '',
      supabasePublishableKey,
      supabaseAnonKey: supabasePublishableKey,
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || '',
      googleSiteVerification: process.env.NUXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
      supportEmail: process.env.NUXT_PUBLIC_SUPPORT_EMAIL || 'care@example-medical-travel.com'
    }
  },
  site: {
    url: siteUrl,
    name: 'Tanzania Medical Travel'
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    },
    head: {
      titleTemplate: '%s | Tanzania Medical Travel',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0f766e' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', href: '/images/logo-mark.svg', type: 'image/svg+xml' }
      ]
    }
  },
  routeRules: {
    '/patient/**': {
      robots: false
    },
    '/admin/**': {
      robots: false
    },
    '/auth/**': {
      robots: false
    }
  },
  sitemap: {
    siteUrl,
    autoLastmod: true,
    exclude: ['/patient/**', '/admin/**', '/auth/**']
  },
  robots: {
    sitemap: `${siteUrl}/sitemap.xml`,
    disallow: ['/patient', '/patient/**', '/admin', '/admin/**', '/auth', '/auth/**']
  }
})
