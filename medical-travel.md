# One-Shot Scaffold Prompt for GPT-5.4 in VS Code
# Medical Travel Website with Nuxt, Vue, Plain CSS, and Google Search Console-Friendly SEO

You are a senior full-stack engineer. Build a production-ready scaffold for a **medical travel website** using the exact stack and structure below.

Your goal is to generate the project in a phased, maintainable way, with real starter code, clear file paths, and sensible defaults.

Do not replace the chosen stack unless there is a strong technical reason. When something is not specified, choose the simplest option that fits the architecture.

---

## Main objective

Scaffold a **medical travel website** with:

### Public site
- Home
- About
- Contact
- FAQ
- Treatments list
- Treatment detail
- Hospitals list
- Hospital detail
- Doctors list
- Doctor detail
- Destinations list
- Destination detail
- Pricing
- Blog
- Blog detail
- Quote request page

### Patient portal
- Register
- Login
- Forgot password
- Reset password
- Dashboard
- Profile
- Cases list
- Case detail
- Documents
- Payments
- Appointments

### Admin portal
- Dashboard
- Leads
- Patients
- Cases
- Quotes
- Bookings
- Treatments
- Hospitals
- Doctors
- Content

---

## Required stack

Use:

- **Nuxt 3 or Nuxt 4 target-compatible structure**
- **Vue 3**
- **JavaScript by default**
- **Plain CSS**
- **Scoped CSS in `.vue` files**
- **A small global stylesheet only for design tokens, reset, typography, and shared layout primitives**
- **Supabase** for database, auth, storage, and row-level security
- **Strapi** for CMS content
- **Stripe** for payments
- **Resend** for email
- **Vercel** for hosting

Do **not** use Tailwind.
Do **not** use styled-components.
Do **not** require TypeScript unless a file strongly benefits from it.

---

## Non-negotiable architecture rules

1. Use **Nuxt** for:
   - routing
   - layouts
   - SEO pages
   - patient portal
   - admin portal
   - middleware
   - server API routes in `server/api`

2. Use **Supabase** for:
   - auth
   - operational database
   - patient records
   - document metadata
   - quotes
   - bookings
   - payments
   - internal messages
   - audit logs
   - storage for uploaded files

3. Use **Strapi** for:
   - treatments
   - hospitals
   - doctors
   - destinations
   - blog posts
   - FAQs
   - homepage sections
   - testimonials
   - static marketing content blocks

4. Keep secrets on the server only.

5. Use JavaScript throughout unless a specific config file benefits from TypeScript.

6. Use composables for shared client logic.

7. Use middleware for auth and role access.

8. Prefer simple and readable code over abstract patterns.

9. Do not overbuild. Scaffold the foundation first, then add features.

10. Every generated file must be realistic starter code, not empty placeholders unless clearly marked.

---

## Styling rules

Use **plain CSS only**.

### Required styling approach
- Keep CSS split by the page or component it belongs to
- Use `assets/css/main.css` only for:
  - reset
  - base typography
  - CSS custom properties in `:root`
  - shared container rules
  - a very small set of reusable primitives
- Do **not** dump all styling into one global file
- Put page-specific styles inside the page component with `<style scoped>`
- Put component-specific styles inside the component with `<style scoped>`
- If a page grows large, split repeated UI into smaller components so their CSS stays close to the markup
- Keep class names semantic and readable
- Use a simple naming approach such as:
  - `.hero`
  - `.hero__title`
  - `.card`
  - `.card__body`
  - `.form-group`
  - `.status-badge`

### CSS organization rule
Make it easy to find styles quickly:
- homepage styles stay in homepage-related files
- treatment page styles stay in treatment page files
- admin page styles stay in admin page files
- shared header/footer styles stay in those layout components
- form styles stay in the form components they belong to

The goal is that a developer can open the related page or component and immediately find the CSS for it without searching through one large stylesheet.

### Avoid
- Tailwind
- CSS-in-JS
- styled-components
- utility-class overload
- deeply nested selectors
- oversized global CSS files

### Design direction
The site should feel:
- clean
- modern
- trustworthy
- medical but not cold
- easy to scan
- mobile friendly

---

## Google Search Console and Google-friendly SEO requirements

Build the site so it is easy to work with in **Google Search Console** and follows current Google Search basics.

### Technical SEO requirements
- Public pages must be crawlable and server-rendered
- Use clean URLs and clean slugs
- Add unique page titles and meta descriptions
- Add canonical URLs on indexable content pages
- Generate an XML sitemap
- Generate a robots.txt file
- Avoid blocking important public pages with robots rules or noindex
- Add internal links between related treatments, doctors, hospitals, destinations, and blog posts
- Use structured data where it makes sense
- Keep content pages indexable unless explicitly private
- Make page HTML useful without requiring client-only rendering for core content
- Add Open Graph and Twitter card metadata
- Keep heading structure clean: one H1, logical H2/H3 use
- Make images use descriptive alt text
- Ensure public pages are fast and mobile friendly

### Search Console-specific setup
- Include a clear `siteUrl` config variable
- Make sitemap location predictable, for example `/sitemap.xml`
- Make robots file predictable, for example `/robots.txt`
- Add support for domain verification via:
  - HTML meta tag in the head, or
  - static verification file in `public/`
- Prepare the site so the owner can connect it easily in Google Search Console after deployment

### Structured data
Add starter JSON-LD helpers for:
- Organization
- WebSite
- BreadcrumbList
- Article for blog posts
- FAQPage where appropriate
- MedicalBusiness only if the final business model and content actually fit that schema

Do not add fake structured data. Only mark up content that is visible on the page.

### Modules and implementation
Use Nuxt-compatible SEO tools where helpful, especially:
- `@nuxtjs/sitemap`
- `@nuxtjs/robots`

Also create reusable SEO helpers with `useSeoMeta` and `useHead`.

---

## Folder structure to scaffold

```bash
medical-travel/
├─ app.vue
├─ nuxt.config.js
├─ package.json
├─ .env.example
├─ assets/
│  ├─ css/
│  │  └─ main.css
│  ├─ images/
│  └─ icons/
├─ components/
│  ├─ layout/
│  │  ├─ SiteHeader.vue
│  │  ├─ SiteFooter.vue
│  │  └─ MobileMenu.vue
│  ├─ home/
│  │  ├─ HeroSection.vue
│  │  ├─ TreatmentCards.vue
│  │  ├─ WhyChooseUs.vue
│  │  └─ TestimonialSlider.vue
│  ├─ treatments/
│  │  ├─ TreatmentOverview.vue
│  │  ├─ DoctorCard.vue
│  │  ├─ HospitalCard.vue
│  │  └─ PriceEstimateBox.vue
│  ├─ forms/
│  │  ├─ InquiryForm.vue
│  │  ├─ QuoteRequestForm.vue
│  │  ├─ MedicalUploadForm.vue
│  │  └─ ContactForm.vue
│  ├─ patient/
│  │  ├─ CaseStatusCard.vue
│  │  ├─ DocumentList.vue
│  │  ├─ InvoiceCard.vue
│  │  └─ AppointmentList.vue
│  └─ admin/
│     ├─ LeadTable.vue
│     ├─ BookingTable.vue
│     ├─ FileReviewPanel.vue
│     └─ DashboardStats.vue
├─ composables/
│  ├─ useAuth.js
│  ├─ usePatient.js
│  ├─ useTreatments.js
│  ├─ useHospitals.js
│  ├─ useDoctors.js
│  ├─ useQuotes.js
│  └─ useUploads.js
├─ layouts/
│  ├─ default.vue
│  ├─ auth.vue
│  ├─ patient.vue
│  └─ admin.vue
├─ middleware/
│  ├─ auth.js
│  ├─ patient.js
│  ├─ admin.js
│  └─ verified-profile.js
├─ pages/
│  ├─ index.vue
│  ├─ about.vue
│  ├─ contact.vue
│  ├─ faq.vue
│  ├─ blog/
│  │  ├─ index.vue
│  │  └─ [slug].vue
│  ├─ treatments/
│  │  ├─ index.vue
│  │  ├─ [specialty].vue
│  │  └─ [specialty]/[slug].vue
│  ├─ hospitals/
│  │  ├─ index.vue
│  │  └─ [slug].vue
│  ├─ doctors/
│  │  ├─ index.vue
│  │  └─ [slug].vue
│  ├─ destinations/
│  │  ├─ index.vue
│  │  └─ [country].vue
│  ├─ pricing/
│  │  └─ index.vue
│  ├─ patient/
│  │  ├─ index.vue
│  │  ├─ profile.vue
│  │  ├─ cases.vue
│  │  ├─ cases/[id].vue
│  │  ├─ documents.vue
│  │  ├─ payments.vue
│  │  └─ appointments.vue
│  ├─ admin/
│  │  ├─ index.vue
│  │  ├─ leads.vue
│  │  ├─ patients.vue
│  │  ├─ cases.vue
│  │  ├─ bookings.vue
│  │  ├─ quotes.vue
│  │  ├─ hospitals.vue
│  │  ├─ doctors.vue
│  │  ├─ treatments.vue
│  │  └─ content.vue
│  └─ auth/
│     ├─ login.vue
│     ├─ register.vue
│     ├─ forgot-password.vue
│     └─ reset-password.vue
├─ plugins/
│  ├─ supabase.client.js
│  └─ dayjs.js
├─ server/
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ sync-user.post.js
│  │  ├─ inquiries/
│  │  │  ├─ create.post.js
│  │  │  └─ list.get.js
│  │  ├─ quotes/
│  │  │  ├─ create.post.js
│  │  │  ├─ [id].get.js
│  │  │  └─ [id]/approve.post.js
│  │  ├─ uploads/
│  │  │  ├─ sign.post.js
│  │  │  └─ complete.post.js
│  │  ├─ payments/
│  │  │  ├─ checkout.post.js
│  │  │  └─ webhook.post.js
│  │  ├─ bookings/
│  │  │  ├─ create.post.js
│  │  │  └─ [id].patch.js
│  │  ├─ search/
│  │  │  └─ index.get.js
│  │  └─ admin/
│  │     ├─ dashboard.get.js
│  │     └─ audit-logs.get.js
│  ├─ middleware/
│  │  ├─ auth.js
│  │  ├─ admin.js
│  │  └─ rate-limit.js
│  └─ utils/
│     ├─ supabase.js
│     ├─ permissions.js
│     ├─ validators.js
│     ├─ email.js
│     └─ pricing.js
├─ utils/
│  ├─ formatCurrency.js
│  ├─ formatDate.js
│  ├─ seo.js
│  ├─ schema.js
│  └─ slug.js
├─ public/
│  ├─ favicon.ico
│  ├─ robots.txt
│  ├─ images/
│  └─ google-site-verification.html
```

---

## Database design to implement

Create a Supabase schema with the following tables and relationships.

### users
- id
- email
- role
- created_at
- updated_at

### patient_profiles
- id
- user_id
- first_name
- last_name
- phone
- country_of_residence
- date_of_birth
- gender
- passport_number
- emergency_contact_name
- emergency_contact_phone
- preferred_contact_method
- created_at
- updated_at

### inquiries
- id
- patient_id
- full_name
- email
- phone
- country
- treatment_interest
- message
- source
- status
- created_at

### medical_cases
- id
- patient_id
- case_code
- specialty
- diagnosis_summary
- treatment_goal
- urgency_level
- status
- assigned_coordinator_id
- destination_country
- destination_city
- created_at
- updated_at

### medical_documents
- id
- case_id
- patient_id
- file_name
- file_path
- file_type
- category
- uploaded_by
- reviewed_by
- review_status
- notes
- created_at

### quotes
- id
- case_id
- quote_number
- currency
- medical_cost
- travel_cost
- accommodation_cost
- coordinator_fee
- total_cost
- valid_until
- status
- created_by
- created_at

### quote_items
- id
- quote_id
- item_type
- description
- quantity
- unit_price
- total_price

### bookings
- id
- case_id
- booking_type
- provider_name
- booking_reference
- start_date
- end_date
- status
- notes
- created_at

### appointments
- id
- case_id
- doctor_id
- hospital_id
- appointment_type
- scheduled_at
- timezone
- status
- meeting_link
- notes

### payments
- id
- case_id
- quote_id
- provider
- provider_payment_id
- amount
- currency
- payment_type
- status
- receipt_url
- paid_at
- created_at

### messages
- id
- case_id
- sender_id
- message_body
- is_internal
- created_at

### audit_logs
- id
- actor_id
- entity_type
- entity_id
- action
- metadata
- created_at

### reference tables
Also create:
- specialties
- hospitals
- doctors
- treatments

Use proper foreign keys and realistic indexes.

---

## Role and permission rules

Implement these access rules with **Supabase RLS** and server-side validation.

### Public users
- can submit inquiries
- can submit quote requests
- cannot read private records

### Patients
- can read and update only their own profile
- can read only their own cases
- can upload and read only their own documents
- can read only their own quotes, payments, bookings, appointments, and messages

### Coordinators
- can read and update assigned cases
- can review documents for assigned cases
- can create quotes and bookings
- can add internal notes

### Admins
- can manage all operational records
- can view audit logs
- can manage users and roles

### Doctor partners
- limited access only to assigned appointments or relevant shared records if implemented

---

## SEO implementation requirements

Generate these pieces in the scaffold:

### In `nuxt.config.js`
- `siteUrl` via runtime config or env
- sitemap module config
- robots module config
- default meta and app head config
- CSS registration for `assets/css/main.css` as a small global base file only

### In `utils/seo.js`
Create reusable helpers for:
- titles
- meta descriptions
- canonical URLs
- Open Graph data
- Twitter cards
- robots directives when needed

### In `utils/schema.js`
Create helpers for:
- organization schema
- website schema
- breadcrumb schema
- article schema
- faq schema

### In pages
Use `useSeoMeta` and `useHead` on all public pages.

### In `public/robots.txt`
Set a sane default if the module is not used in development.

### In sitemap handling
Make sure all public pages are included, especially:
- treatments
- hospitals
- doctors
- destinations
- blog posts
- static pages

### In content pages
Add:
- visible descriptive copy
- internal links
- useful headings
- indexable HTML content
- descriptive image alt text

---

## UI expectations

The UI should feel:
- clean
- modern
- trustworthy
- easy to scan
- mobile friendly

Use:
- cards
- forms
- summary blocks
- status badges
- tables
- clean navigation
- dashboard widgets

Do not overdesign the first version.

---

## Security requirements

Include:
- server-side validation
- rate limiting where useful
- safe secret handling
- upload validation
- role checks
- audit logging for admin actions
- no accidental client exposure of private data

Treat health-related data as sensitive.

---

## Strapi content model

Create these content types:

### Collection types
- Treatments
- Hospitals
- Doctors
- Destinations
- Blog Posts
- FAQs
- Testimonials
- Reviews
- Partner Hospitals
- Visa Guides

### Single types
- Homepage
- About Page
- Contact Page
- Pricing Page
- Privacy Policy
- Terms Page

### Components
- SEO fields
- Hero section
- Rich text block
- CTA block
- Doctor summary card
- Hospital summary card
- Treatment highlights
- FAQ item
- Testimonial item

---

## Output format rules

When you generate the scaffold:

1. Show output grouped by file path.
2. Generate real code.
3. Keep the code minimal but usable.
4. Explain key choices briefly only when needed.
5. If the output is too large, work in phases automatically.
6. Do not stop after planning. Start generating code.
7. Keep page and component CSS close to the files it styles. Use global CSS only for shared foundations.

---

## Execution plan

Work in the following order.

### Phase 1: foundation
Generate:
- `package.json`
- `nuxt.config.js`
- `.env.example`
- small global CSS setup
- base CSS design tokens
- app shell
- main layouts
- helper utilities
- Supabase client plugin
- middleware stubs

### Phase 2: public pages
Generate:
- home page
- about
- contact
- faq
- treatments list and detail shell
- hospitals list and detail shell
- doctors list and detail shell
- destinations list and detail shell
- pricing page
- blog list and detail shell
- reusable public components

### Phase 3: auth and patient portal
Generate:
- login
- register
- forgot password
- reset password
- patient layout
- patient dashboard
- patient profile
- patient cases list and detail
- patient documents
- patient payments
- patient appointments
- basic composables for auth and patient data

### Phase 4: admin portal
Generate:
- admin layout
- admin dashboard
- leads page
- patients page
- cases page
- quotes page
- bookings page
- hospitals page
- doctors page
- treatments page
- content page
- admin components

### Phase 5: server routes
Generate:
- auth sync route
- inquiry create route
- inquiry list route
- quote create route
- quote get route
- quote approve route
- upload sign route
- upload complete route
- payments checkout route
- Stripe webhook route
- booking create route
- booking update route
- search route
- admin dashboard stats route
- audit log list route

### Phase 6: database
Generate:
- SQL schema for Supabase
- indexes
- foreign keys
- starter RLS policies
- brief notes on how to apply migrations

### Phase 7: CMS wiring
Generate:
- Strapi content type definitions or setup notes
- frontend fetch patterns for CMS data
- shared CMS structures

### Phase 8: search readiness review
Generate:
- checklist for Google Search Console launch
- sitemap submission steps
- robots review
- canonical review
- structured data review
- metadata review
- internal linking review

---

## Start now

Begin with **Phase 1** immediately.

Generate the files in this order:
1. `package.json`
2. `nuxt.config.js`
3. `.env.example`
4. `assets/css/main.css`
5. `app.vue`
6. `layouts/default.vue`
7. `layouts/auth.vue`
8. `layouts/patient.vue`
9. `layouts/admin.vue`
10. `plugins/supabase.client.js`
11. `middleware/auth.js`
12. `middleware/patient.js`
13. `middleware/admin.js`
14. `utils/seo.js`
15. `utils/schema.js`
16. `public/robots.txt`

After Phase 1, continue automatically into Phase 2 unless the user stops you.
