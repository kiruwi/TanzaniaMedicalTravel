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

with missing_public_users as (
  select
    auth_user.id,
    auth_user.email,
    coalesce(auth_user.raw_app_meta_data ->> 'role', auth_user.raw_user_meta_data ->> 'role', 'patient') as role,
    auth_user.created_at
  from auth.users auth_user
  left join public.users public_user on public_user.id = auth_user.id
  where public_user.id is null
)
insert into public.users (id, email, role, created_at, updated_at)
select id, email, role, created_at, now()
from missing_public_users;

with missing_patient_profiles as (
  select
    auth_user.id as user_id,
    trim(coalesce(auth_user.raw_user_meta_data ->> 'full_name', '')) as full_name,
    auth_user.created_at
  from auth.users auth_user
  join public.users public_user on public_user.id = auth_user.id
  left join public.patient_profiles patient_profile on patient_profile.user_id = auth_user.id
  where patient_profile.user_id is null
    and public_user.role = 'patient'
)
insert into public.patient_profiles (user_id, first_name, last_name, created_at, updated_at)
select
  user_id,
  nullif(split_part(full_name, ' ', 1), '') as first_name,
  nullif(trim(substr(full_name, char_length(split_part(full_name, ' ', 1)) + 1)), '') as last_name,
  created_at,
  now()
from missing_patient_profiles;
