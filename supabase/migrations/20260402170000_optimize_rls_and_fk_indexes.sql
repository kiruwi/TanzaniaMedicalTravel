create index if not exists idx_inquiries_patient_id on public.inquiries(patient_id);
create index if not exists idx_medical_documents_patient_id on public.medical_documents(patient_id);
create index if not exists idx_medical_documents_uploaded_by on public.medical_documents(uploaded_by);
create index if not exists idx_medical_documents_reviewed_by on public.medical_documents(reviewed_by);
create index if not exists idx_quotes_created_by on public.quotes(created_by);
create index if not exists idx_quote_items_quote_id on public.quote_items(quote_id);
create index if not exists idx_appointments_doctor_id on public.appointments(doctor_id);
create index if not exists idx_appointments_hospital_id on public.appointments(hospital_id);
create index if not exists idx_payments_case_id on public.payments(case_id);
create index if not exists idx_messages_sender_id on public.messages(sender_id);
create index if not exists idx_audit_logs_actor_id on public.audit_logs(actor_id);
create index if not exists idx_doctors_hospital_id on public.doctors(hospital_id);
create index if not exists idx_doctors_specialty_id on public.doctors(specialty_id);
create index if not exists idx_treatments_specialty_id on public.treatments(specialty_id);

drop policy if exists "users read own record" on public.users;
create policy "users read own record"
on public.users
for select
using (id = (select auth.uid()));

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

drop policy if exists "coordinators manage assigned cases" on public.medical_cases;
create policy "coordinators manage assigned cases"
on public.medical_cases
for all
using (public.can_manage_case(id))
with check (
  public.is_admin()
  or assigned_coordinator_id = (select auth.uid())
);
