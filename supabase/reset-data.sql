begin;

truncate table
  public.audit_logs,
  public.messages,
  public.payments,
  public.appointments,
  public.bookings,
  public.quote_items,
  public.quotes,
  public.medical_documents,
  public.medical_cases,
  public.inquiries,
  public.treatments,
  public.doctors,
  public.hospitals,
  public.specialties,
  public.patient_profiles,
  public.users
restart identity cascade;

commit;

-- This intentionally preserves auth.users so the configured admin can still sign in.
-- If you also want to remove all Supabase Auth users, delete them separately in the
-- Supabase Authentication dashboard after confirming you have a replacement admin path.
