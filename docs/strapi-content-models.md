# Strapi Content Model Starter

Use Strapi for public-facing editorial content and keep operational patient data in Supabase.

## Collection Types

- `treatments`
  - `title`
  - `slug`
  - `summary`
  - `overview`
  - `specialty`
  - `hero_image`
  - `seo`
  - `highlights`
  - relation to `doctors`
  - relation to `hospitals`
- `hospitals`
  - `name`
  - `slug`
  - `city`
  - `country`
  - `summary`
  - `hero_image`
  - `seo`
- `doctors`
  - `name`
  - `slug`
  - `title`
  - `summary`
  - `languages`
  - `photo`
  - `seo`
- `destinations`
  - `name`
  - `country_code`
  - `slug`
  - `summary`
  - `travel_tips`
  - `seo`
- `blog-posts`
  - `title`
  - `slug`
  - `excerpt`
  - `published_at`
  - `cover_image`
  - `body`
  - `seo`
- `faqs`
  - `question`
  - `answer`
  - `category`
- `testimonials`
  - `name`
  - `quote`
  - `location`
- `reviews`
  - `reviewer_name`
  - `rating`
  - `body`
- `partner-hospitals`
  - `name`
  - `slug`
  - `city`
  - `summary`
- `visa-guides`
  - `title`
  - `slug`
  - `country`
  - `body`

## Single Types

- `homepage`
- `about-page`
- `contact-page`
- `pricing-page`
- `privacy-policy`
- `terms-page`

## Components

- `shared.seo`
  - `meta_title`
  - `meta_description`
  - `canonical_url`
  - `share_image`
- `shared.hero-section`
  - `eyebrow`
  - `headline`
  - `summary`
  - `primary_cta`
  - `secondary_cta`
- `shared.rich-text-block`
- `shared.cta-block`
- `shared.doctor-summary-card`
- `shared.hospital-summary-card`
- `shared.treatment-highlights`
- `shared.faq-item`
- `shared.testimonial-item`

## Frontend Fetch Pattern

- Use Strapi REST or GraphQL only for public content.
- Keep fetches in composables so the mock data layer can be replaced cleanly.
- Request only published content for public routes.
- Normalize Strapi records into page-friendly objects before rendering.
