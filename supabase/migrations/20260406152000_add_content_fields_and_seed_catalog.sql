alter table public.hospitals
  add column if not exists specialty_focus text,
  add column if not exists summary text,
  add column if not exists address text,
  add column if not exists updated_at timestamp with time zone not null default now();

alter table public.doctors
  add column if not exists title text,
  add column if not exists summary text,
  add column if not exists languages text[] not null default '{}'::text[],
  add column if not exists updated_at timestamp with time zone not null default now();

alter table public.treatments
  add column if not exists summary text,
  add column if not exists overview text,
  add column if not exists price_from numeric not null default 0,
  add column if not exists duration text,
  add column if not exists hospital_id uuid references public.hospitals(id),
  add column if not exists primary_doctor_id uuid references public.doctors(id),
  add column if not exists featured boolean not null default false,
  add column if not exists updated_at timestamp with time zone not null default now();

create index if not exists idx_treatments_hospital_id on public.treatments(hospital_id);
create index if not exists idx_treatments_primary_doctor_id on public.treatments(primary_doctor_id);

insert into public.specialties (name, slug)
values
  ('Cardiology', 'cardiology'),
  ('Orthopedics', 'orthopedics'),
  ('Fertility and IVF', 'ivf')
on conflict (slug) do update
set name = excluded.name;

insert into public.hospitals (
  name,
  slug,
  city,
  country,
  specialty_focus,
  summary,
  address,
  updated_at
)
values
  (
    'Muhimbili Heart Center',
    'muhimbili-heart-center',
    'Dar es Salaam',
    'tanzania',
    'Cardiology and cardiothoracic care',
    'Referral-ready cardiac services with catheterization, diagnostics, and inpatient care.',
    'Upanga West, Dar es Salaam',
    now()
  ),
  (
    'Ocean Road Specialist Hospital',
    'ocean-road-specialist-hospital',
    'Dar es Salaam',
    'tanzania',
    'Orthopedics and oncology support',
    'Regional specialist facility with coordinated surgery and rehabilitation pathways.',
    'Ocean Road, Dar es Salaam',
    now()
  ),
  (
    'Aga Khan Women''s Center',
    'agakhan-womens-center',
    'Dar es Salaam',
    'tanzania',
    'Fertility and women''s health',
    'Private fertility-focused care with structured appointment coordination for international patients.',
    'Msasani Peninsula, Dar es Salaam',
    now()
  )
on conflict (slug) do update
set
  name = excluded.name,
  city = excluded.city,
  country = excluded.country,
  specialty_focus = excluded.specialty_focus,
  summary = excluded.summary,
  address = excluded.address,
  updated_at = now();

insert into public.doctors (
  hospital_id,
  specialty_id,
  full_name,
  slug,
  title,
  summary,
  languages,
  updated_at
)
values
  (
    (select id from public.hospitals where slug = 'muhimbili-heart-center'),
    (select id from public.specialties where slug = 'cardiology'),
    'Dr. Neema Mwakalebela',
    'dr-neema-mwakalebela',
    'Interventional Cardiologist',
    'Focuses on catheter-based interventions and cross-border treatment planning.',
    array['English', 'Swahili'],
    now()
  ),
  (
    (select id from public.hospitals where slug = 'ocean-road-specialist-hospital'),
    (select id from public.specialties where slug = 'orthopedics'),
    'Dr. Joseph Mkapa',
    'dr-joseph-mkapa',
    'Orthopedic Surgeon',
    'Specializes in complex joint replacement and recovery planning.',
    array['English', 'Swahili'],
    now()
  ),
  (
    (select id from public.hospitals where slug = 'agakhan-womens-center'),
    (select id from public.specialties where slug = 'ivf'),
    'Dr. Zawadi Katabaro',
    'dr-zawadi-katabaro',
    'Fertility Specialist',
    'Supports IVF planning, monitoring, and post-travel follow-up for couples.',
    array['English', 'Swahili', 'French'],
    now()
  )
on conflict (slug) do update
set
  hospital_id = excluded.hospital_id,
  specialty_id = excluded.specialty_id,
  full_name = excluded.full_name,
  title = excluded.title,
  summary = excluded.summary,
  languages = excluded.languages,
  updated_at = now();

insert into public.treatments (
  specialty_id,
  name,
  slug,
  summary,
  overview,
  price_from,
  duration,
  hospital_id,
  primary_doctor_id,
  featured,
  updated_at
)
values
  (
    (select id from public.specialties where slug = 'cardiology'),
    'Angioplasty and Stent Care',
    'angioplasty-and-stent-care',
    'Structured referral, procedure planning, and aftercare coordination for patients with coronary artery disease.',
    'Patients receive case review, hospital matching, travel support, and recovery planning around interventional cardiology.',
    6800,
    '7 to 10 days',
    (select id from public.hospitals where slug = 'muhimbili-heart-center'),
    (select id from public.doctors where slug = 'dr-neema-mwakalebela'),
    true,
    now()
  ),
  (
    (select id from public.specialties where slug = 'orthopedics'),
    'Hip Replacement Program',
    'hip-replacement-program',
    'Joint replacement pathways with surgical evaluation, inpatient care, and rehabilitation support.',
    'Built for patients seeking surgical planning, cost visibility, and accommodation support for orthopedic recovery.',
    9200,
    '12 to 16 days',
    (select id from public.hospitals where slug = 'ocean-road-specialist-hospital'),
    (select id from public.doctors where slug = 'dr-joseph-mkapa'),
    true,
    now()
  ),
  (
    (select id from public.specialties where slug = 'ivf'),
    'IVF Cycle Coordination',
    'ivf-cycle-coordination',
    'End-to-end fertility travel planning with consultations, labs, accommodation, and family support.',
    'Includes clinic matching, medication guidance, travel windows, and continuity planning after return home.',
    5400,
    '14 to 21 days',
    (select id from public.hospitals where slug = 'agakhan-womens-center'),
    (select id from public.doctors where slug = 'dr-zawadi-katabaro'),
    true,
    now()
  )
on conflict (slug) do update
set
  specialty_id = excluded.specialty_id,
  name = excluded.name,
  summary = excluded.summary,
  overview = excluded.overview,
  price_from = excluded.price_from,
  duration = excluded.duration,
  hospital_id = excluded.hospital_id,
  primary_doctor_id = excluded.primary_doctor_id,
  featured = excluded.featured,
  updated_at = now();
