create schema if not exists app_private;

grant usage on schema app_private to anon, authenticated;

create or replace function app_private.current_user_role()
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

create or replace function app_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select app_private.current_user_role() = 'admin';
$$;

create or replace function app_private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select app_private.current_user_role() in ('admin', 'coordinator');
$$;

create or replace function app_private.current_patient_profile_id()
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

create or replace function app_private.can_access_case(target_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
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
        or app_private.is_admin()
      )
  );
$$;

create or replace function app_private.can_manage_case(target_case_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select exists (
    select 1
    from public.medical_cases medical_case
    where medical_case.id = target_case_id
      and (
        medical_case.assigned_coordinator_id = auth.uid()
        or app_private.is_admin()
      )
  );
$$;

create or replace function app_private.can_access_quote(target_quote_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select exists (
    select 1
    from public.quotes quote_record
    where quote_record.id = target_quote_id
      and quote_record.case_id is not null
      and app_private.can_access_case(quote_record.case_id)
  );
$$;

create or replace function app_private.can_manage_quote(target_quote_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select exists (
    select 1
    from public.quotes quote_record
    where quote_record.id = target_quote_id
      and quote_record.case_id is not null
      and app_private.can_manage_case(quote_record.case_id)
  );
$$;

grant execute on function app_private.current_user_role() to anon, authenticated;
grant execute on function app_private.is_admin() to anon, authenticated;
grant execute on function app_private.is_staff() to anon, authenticated;
grant execute on function app_private.current_patient_profile_id() to anon, authenticated;
grant execute on function app_private.can_access_case(uuid) to anon, authenticated;
grant execute on function app_private.can_manage_case(uuid) to anon, authenticated;
grant execute on function app_private.can_access_quote(uuid) to anon, authenticated;
grant execute on function app_private.can_manage_quote(uuid) to anon, authenticated;

alter function audit.prevent_access_log_mutation() set search_path = audit, public;

drop policy if exists "admins manage users" on public.users;
create policy "admins manage users"
on public.users
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage patient profiles" on public.patient_profiles;
create policy "admins manage patient profiles"
on public.patient_profiles
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage specialties" on public.specialties;
create policy "admins manage specialties"
on public.specialties
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage hospitals" on public.hospitals;
create policy "admins manage hospitals"
on public.hospitals
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage doctors" on public.doctors;
create policy "admins manage doctors"
on public.doctors
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "admins manage treatments" on public.treatments;
create policy "admins manage treatments"
on public.treatments
for all
using (app_private.is_admin())
with check (app_private.is_admin());

drop policy if exists "public submit inquiries" on public.inquiries;
create policy "public submit inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (
  patient_id is null
  or patient_id = app_private.current_patient_profile_id()
);

drop policy if exists "staff manage inquiries" on public.inquiries;
create policy "staff manage inquiries"
on public.inquiries
for all
using (app_private.is_staff())
with check (app_private.is_staff());

drop policy if exists "patients read own cases" on public.medical_cases;
create policy "patients read own cases"
on public.medical_cases
for select
using (patient_id = app_private.current_patient_profile_id());

drop policy if exists "coordinators manage assigned cases" on public.medical_cases;
create policy "coordinators manage assigned cases"
on public.medical_cases
for all
using (app_private.can_manage_case(id))
with check (
  app_private.is_admin()
  or assigned_coordinator_id = (select auth.uid())
);

drop policy if exists "patients read own documents" on public.medical_documents;
create policy "patients read own documents"
on public.medical_documents
for select
using (patient_id = app_private.current_patient_profile_id());

drop policy if exists "patients insert own documents" on public.medical_documents;
create policy "patients insert own documents"
on public.medical_documents
for insert
with check (
  patient_id = app_private.current_patient_profile_id()
  and exists (
    select 1
    from public.medical_cases medical_case
    where medical_case.id = medical_documents.case_id
      and medical_case.patient_id = app_private.current_patient_profile_id()
  )
);

drop policy if exists "staff manage documents for assigned cases" on public.medical_documents;
create policy "staff manage documents for assigned cases"
on public.medical_documents
for all
using (app_private.can_manage_case(case_id))
with check (app_private.can_manage_case(case_id));

drop policy if exists "patients read own quotes" on public.quotes;
create policy "patients read own quotes"
on public.quotes
for select
using (
  case_id is not null
  and app_private.can_access_case(case_id)
);

drop policy if exists "staff manage quotes for assigned cases" on public.quotes;
create policy "staff manage quotes for assigned cases"
on public.quotes
for all
using (
  case_id is not null
  and app_private.can_manage_case(case_id)
)
with check (
  case_id is not null
  and app_private.can_manage_case(case_id)
);

drop policy if exists "patients read own quote items" on public.quote_items;
create policy "patients read own quote items"
on public.quote_items
for select
using (app_private.can_access_quote(quote_id));

drop policy if exists "staff manage quote items for assigned cases" on public.quote_items;
create policy "staff manage quote items for assigned cases"
on public.quote_items
for all
using (app_private.can_manage_quote(quote_id))
with check (app_private.can_manage_quote(quote_id));

drop policy if exists "patients read own bookings" on public.bookings;
create policy "patients read own bookings"
on public.bookings
for select
using (app_private.can_access_case(case_id));

drop policy if exists "staff manage bookings for assigned cases" on public.bookings;
create policy "staff manage bookings for assigned cases"
on public.bookings
for all
using (app_private.can_manage_case(case_id))
with check (app_private.can_manage_case(case_id));

drop policy if exists "patients read own appointments" on public.appointments;
create policy "patients read own appointments"
on public.appointments
for select
using (app_private.can_access_case(case_id));

drop policy if exists "staff manage appointments for assigned cases" on public.appointments;
create policy "staff manage appointments for assigned cases"
on public.appointments
for all
using (app_private.can_manage_case(case_id))
with check (app_private.can_manage_case(case_id));

drop policy if exists "patients read own payments" on public.payments;
create policy "patients read own payments"
on public.payments
for select
using (
  (case_id is not null and app_private.can_access_case(case_id))
  or (quote_id is not null and app_private.can_access_quote(quote_id))
);

drop policy if exists "staff manage payments for assigned cases" on public.payments;
create policy "staff manage payments for assigned cases"
on public.payments
for all
using (
  (case_id is not null and app_private.can_manage_case(case_id))
  or (quote_id is not null and app_private.can_manage_quote(quote_id))
)
with check (
  (case_id is not null and app_private.can_manage_case(case_id))
  or (quote_id is not null and app_private.can_manage_quote(quote_id))
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
    where medical_case.patient_id = app_private.current_patient_profile_id()
  )
);

drop policy if exists "staff manage messages for assigned cases" on public.messages;
create policy "staff manage messages for assigned cases"
on public.messages
for all
using (app_private.can_manage_case(case_id))
with check (app_private.can_manage_case(case_id));

drop policy if exists "admins manage audit logs" on public.audit_logs;
create policy "admins manage audit logs"
on public.audit_logs
for all
using (app_private.is_admin())
with check (app_private.is_admin());

revoke execute on function public.current_user_role() from public, anon, authenticated;
revoke execute on function public.is_admin() from public, anon, authenticated;
revoke execute on function public.is_staff() from public, anon, authenticated;
revoke execute on function public.current_patient_profile_id() from public, anon, authenticated;
revoke execute on function public.can_access_case(uuid) from public, anon, authenticated;
revoke execute on function public.can_manage_case(uuid) from public, anon, authenticated;
revoke execute on function public.can_access_quote(uuid) from public, anon, authenticated;
revoke execute on function public.can_manage_quote(uuid) from public, anon, authenticated;
revoke execute on function public.handle_auth_user_sync() from public, anon, authenticated;
revoke execute on function public.handle_auth_user_delete() from public, anon, authenticated;
