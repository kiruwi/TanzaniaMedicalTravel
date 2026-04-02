create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'patient',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.patient_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  first_name text,
  last_name text,
  phone text,
  country_of_residence text,
  date_of_birth date,
  gender text,
  passport_number text,
  emergency_contact_name text,
  emergency_contact_phone text,
  preferred_contact_method text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.specialties (
  id bigint generated always as identity primary key,
  name text not null unique,
  slug text not null unique
);

create table if not exists public.hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text,
  country text,
  created_at timestamptz not null default now()
);

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  hospital_id uuid references public.hospitals(id) on delete set null,
  specialty_id bigint references public.specialties(id) on delete set null,
  full_name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.treatments (
  id uuid primary key default gen_random_uuid(),
  specialty_id bigint references public.specialties(id) on delete set null,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references public.patient_profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  country text,
  treatment_interest text,
  message text,
  source text default 'website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.medical_cases (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patient_profiles(id) on delete cascade,
  case_code text not null unique,
  specialty text,
  diagnosis_summary text,
  treatment_goal text,
  urgency_level text,
  status text not null default 'intake',
  assigned_coordinator_id uuid references public.users(id) on delete set null,
  destination_country text,
  destination_city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.medical_documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.medical_cases(id) on delete cascade,
  patient_id uuid not null references public.patient_profiles(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text not null,
  category text not null,
  uploaded_by uuid references public.users(id) on delete set null,
  reviewed_by uuid references public.users(id) on delete set null,
  review_status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.medical_cases(id) on delete cascade,
  quote_number text not null unique,
  currency text not null default 'USD',
  medical_cost numeric(12,2) not null default 0,
  travel_cost numeric(12,2) not null default 0,
  accommodation_cost numeric(12,2) not null default 0,
  coordinator_fee numeric(12,2) not null default 0,
  total_cost numeric(12,2) not null default 0,
  valid_until date,
  status text not null default 'draft',
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes(id) on delete cascade,
  item_type text not null,
  description text not null,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null default 0,
  total_price numeric(12,2) not null default 0
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.medical_cases(id) on delete cascade,
  booking_type text not null,
  provider_name text not null,
  booking_reference text,
  start_date date,
  end_date date,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.medical_cases(id) on delete cascade,
  doctor_id uuid references public.doctors(id) on delete set null,
  hospital_id uuid references public.hospitals(id) on delete set null,
  appointment_type text not null,
  scheduled_at timestamptz,
  timezone text,
  status text not null default 'pending',
  meeting_link text,
  notes text
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid references public.medical_cases(id) on delete set null,
  quote_id uuid references public.quotes(id) on delete set null,
  provider text not null,
  provider_payment_id text,
  amount numeric(12,2) not null,
  currency text not null default 'USD',
  payment_type text,
  status text not null default 'pending',
  receipt_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.medical_cases(id) on delete cascade,
  sender_id uuid references public.users(id) on delete set null,
  message_body text not null,
  is_internal boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id text not null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_inquiries_status_created_at on public.inquiries(status, created_at desc);
create index if not exists idx_inquiries_patient_id on public.inquiries(patient_id);
create index if not exists idx_medical_cases_patient_id on public.medical_cases(patient_id);
create index if not exists idx_medical_cases_assigned_coordinator_id on public.medical_cases(assigned_coordinator_id);
create index if not exists idx_medical_documents_case_id on public.medical_documents(case_id);
create index if not exists idx_medical_documents_patient_id on public.medical_documents(patient_id);
create index if not exists idx_medical_documents_uploaded_by on public.medical_documents(uploaded_by);
create index if not exists idx_medical_documents_reviewed_by on public.medical_documents(reviewed_by);
create index if not exists idx_quotes_case_id on public.quotes(case_id);
create index if not exists idx_quotes_created_by on public.quotes(created_by);
create index if not exists idx_quote_items_quote_id on public.quote_items(quote_id);
create index if not exists idx_bookings_case_id on public.bookings(case_id);
create index if not exists idx_appointments_case_id on public.appointments(case_id);
create index if not exists idx_appointments_doctor_id on public.appointments(doctor_id);
create index if not exists idx_appointments_hospital_id on public.appointments(hospital_id);
create index if not exists idx_payments_case_id on public.payments(case_id);
create index if not exists idx_payments_quote_id on public.payments(quote_id);
create index if not exists idx_messages_case_id on public.messages(case_id);
create index if not exists idx_messages_sender_id on public.messages(sender_id);
create index if not exists idx_audit_logs_actor_id on public.audit_logs(actor_id);
create index if not exists idx_audit_logs_entity on public.audit_logs(entity_type, entity_id);
create index if not exists idx_doctors_hospital_id on public.doctors(hospital_id);
create index if not exists idx_doctors_specialty_id on public.doctors(specialty_id);
create index if not exists idx_treatments_specialty_id on public.treatments(specialty_id);

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (
      select role
      from public.users
      where id = auth.uid()
    ),
    'public'
  );
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'admin';
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('admin', 'coordinator');
$$;

create or replace function public.current_patient_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.patient_profiles
  where user_id = auth.uid();
$$;

create or replace function public.can_access_case(target_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.medical_cases medical_case
    left join public.patient_profiles patient_profile
      on patient_profile.id = medical_case.patient_id
    where medical_case.id = target_case_id
      and (
        patient_profile.user_id = auth.uid()
        or medical_case.assigned_coordinator_id = auth.uid()
        or public.is_admin()
      )
  );
$$;

create or replace function public.can_manage_case(target_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.medical_cases medical_case
    where medical_case.id = target_case_id
      and (
        medical_case.assigned_coordinator_id = auth.uid()
        or public.is_admin()
      )
  );
$$;

create or replace function public.can_access_quote(target_quote_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.quotes quote_record
    where quote_record.id = target_quote_id
      and quote_record.case_id is not null
      and public.can_access_case(quote_record.case_id)
  );
$$;

create or replace function public.can_manage_quote(target_quote_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.quotes quote_record
    where quote_record.id = target_quote_id
      and quote_record.case_id is not null
      and public.can_manage_case(quote_record.case_id)
  );
$$;

create or replace function public.handle_auth_user_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  app_role text := coalesce(new.raw_app_meta_data ->> 'role', new.raw_user_meta_data ->> 'role', 'patient');
  full_name text := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  first_name text := nullif(split_part(full_name, ' ', 1), '');
  last_name text := nullif(trim(substr(full_name, char_length(split_part(full_name, ' ', 1)) + 1)), '');
begin
  insert into public.users (id, email, role, created_at, updated_at)
  values (new.id, new.email, app_role, coalesce(new.created_at, now()), now())
  on conflict (id) do update
    set email = excluded.email,
        role = excluded.role,
        updated_at = now();

  if app_role = 'patient' then
    insert into public.patient_profiles (user_id, first_name, last_name, created_at, updated_at)
    values (new.id, first_name, last_name, coalesce(new.created_at, now()), now())
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_synced on auth.users;
create trigger on_auth_user_synced
after insert or update of email, raw_user_meta_data, raw_app_meta_data on auth.users
for each row execute function public.handle_auth_user_sync();

alter table public.users enable row level security;
alter table public.patient_profiles enable row level security;
alter table public.specialties enable row level security;
alter table public.hospitals enable row level security;
alter table public.doctors enable row level security;
alter table public.treatments enable row level security;
alter table public.inquiries enable row level security;
alter table public.medical_cases enable row level security;
alter table public.medical_documents enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;
alter table public.bookings enable row level security;
alter table public.appointments enable row level security;
alter table public.payments enable row level security;
alter table public.messages enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "users read own record" on public.users;
create policy "users read own record"
on public.users
for select
using (id = (select auth.uid()));

drop policy if exists "admins manage users" on public.users;
create policy "admins manage users"
on public.users
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "patients create own profile" on public.patient_profiles;
create policy "patients create own profile"
on public.patient_profiles
for insert
with check (user_id = (select auth.uid()));

drop policy if exists "patients read own profile" on public.patient_profiles;
create policy "patients read own profile"
on public.patient_profiles
for select
using (user_id = (select auth.uid()));

drop policy if exists "coordinators read assigned patient profiles" on public.patient_profiles;
create policy "coordinators read assigned patient profiles"
on public.patient_profiles
for select
using (
  exists (
    select 1
    from public.medical_cases medical_case
    where medical_case.patient_id = patient_profiles.id
      and medical_case.assigned_coordinator_id = (select auth.uid())
  )
);

drop policy if exists "patients update own profile" on public.patient_profiles;
create policy "patients update own profile"
on public.patient_profiles
for update
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists "admins manage patient profiles" on public.patient_profiles;
create policy "admins manage patient profiles"
on public.patient_profiles
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read specialties" on public.specialties;
create policy "public read specialties"
on public.specialties
for select
using (true);

drop policy if exists "admins manage specialties" on public.specialties;
create policy "admins manage specialties"
on public.specialties
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read hospitals" on public.hospitals;
create policy "public read hospitals"
on public.hospitals
for select
using (true);

drop policy if exists "admins manage hospitals" on public.hospitals;
create policy "admins manage hospitals"
on public.hospitals
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read doctors" on public.doctors;
create policy "public read doctors"
on public.doctors
for select
using (true);

drop policy if exists "admins manage doctors" on public.doctors;
create policy "admins manage doctors"
on public.doctors
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public read treatments" on public.treatments;
create policy "public read treatments"
on public.treatments
for select
using (true);

drop policy if exists "admins manage treatments" on public.treatments;
create policy "admins manage treatments"
on public.treatments
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public submit inquiries" on public.inquiries;
create policy "public submit inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (
  patient_id is null
  or patient_id = public.current_patient_profile_id()
);

drop policy if exists "staff manage inquiries" on public.inquiries;
create policy "staff manage inquiries"
on public.inquiries
for all
using (public.is_staff())
with check (public.is_staff());

drop policy if exists "patients read own cases" on public.medical_cases;
create policy "patients read own cases"
on public.medical_cases
for select
using (patient_id = public.current_patient_profile_id());

drop policy if exists "coordinators manage assigned cases" on public.medical_cases;
create policy "coordinators manage assigned cases"
on public.medical_cases
for all
using (public.can_manage_case(id))
with check (
  public.is_admin()
  or assigned_coordinator_id = (select auth.uid())
);

drop policy if exists "patients read own documents" on public.medical_documents;
create policy "patients read own documents"
on public.medical_documents
for select
using (patient_id = public.current_patient_profile_id());

drop policy if exists "patients insert own documents" on public.medical_documents;
create policy "patients insert own documents"
on public.medical_documents
for insert
with check (
  patient_id = public.current_patient_profile_id()
  and exists (
    select 1
    from public.medical_cases medical_case
    where medical_case.id = medical_documents.case_id
      and medical_case.patient_id = public.current_patient_profile_id()
  )
);

drop policy if exists "staff manage documents for assigned cases" on public.medical_documents;
create policy "staff manage documents for assigned cases"
on public.medical_documents
for all
using (public.can_manage_case(case_id))
with check (public.can_manage_case(case_id));

drop policy if exists "patients read own quotes" on public.quotes;
create policy "patients read own quotes"
on public.quotes
for select
using (
  case_id is not null
  and public.can_access_case(case_id)
);

drop policy if exists "staff manage quotes for assigned cases" on public.quotes;
create policy "staff manage quotes for assigned cases"
on public.quotes
for all
using (
  case_id is not null
  and public.can_manage_case(case_id)
)
with check (
  case_id is not null
  and public.can_manage_case(case_id)
);

drop policy if exists "patients read own quote items" on public.quote_items;
create policy "patients read own quote items"
on public.quote_items
for select
using (public.can_access_quote(quote_id));

drop policy if exists "staff manage quote items for assigned cases" on public.quote_items;
create policy "staff manage quote items for assigned cases"
on public.quote_items
for all
using (public.can_manage_quote(quote_id))
with check (public.can_manage_quote(quote_id));

drop policy if exists "patients read own bookings" on public.bookings;
create policy "patients read own bookings"
on public.bookings
for select
using (public.can_access_case(case_id));

drop policy if exists "staff manage bookings for assigned cases" on public.bookings;
create policy "staff manage bookings for assigned cases"
on public.bookings
for all
using (public.can_manage_case(case_id))
with check (public.can_manage_case(case_id));

drop policy if exists "patients read own appointments" on public.appointments;
create policy "patients read own appointments"
on public.appointments
for select
using (public.can_access_case(case_id));

drop policy if exists "staff manage appointments for assigned cases" on public.appointments;
create policy "staff manage appointments for assigned cases"
on public.appointments
for all
using (public.can_manage_case(case_id))
with check (public.can_manage_case(case_id));

drop policy if exists "patients read own payments" on public.payments;
create policy "patients read own payments"
on public.payments
for select
using (
  (case_id is not null and public.can_access_case(case_id))
  or (quote_id is not null and public.can_access_quote(quote_id))
);

drop policy if exists "staff manage payments for assigned cases" on public.payments;
create policy "staff manage payments for assigned cases"
on public.payments
for all
using (
  (case_id is not null and public.can_manage_case(case_id))
  or (quote_id is not null and public.can_manage_quote(quote_id))
)
with check (
  (case_id is not null and public.can_manage_case(case_id))
  or (quote_id is not null and public.can_manage_quote(quote_id))
);

drop policy if exists "patients read own external messages" on public.messages;
create policy "patients read own external messages"
on public.messages
for select
using (
  not is_internal
  and case_id in (
    select medical_case.id
    from public.medical_cases medical_case
    where medical_case.patient_id = public.current_patient_profile_id()
  )
);

drop policy if exists "staff manage messages for assigned cases" on public.messages;
create policy "staff manage messages for assigned cases"
on public.messages
for all
using (public.can_manage_case(case_id))
with check (public.can_manage_case(case_id));

drop policy if exists "admins manage audit logs" on public.audit_logs;
create policy "admins manage audit logs"
on public.audit_logs
for all
using (public.is_admin())
with check (public.is_admin());
