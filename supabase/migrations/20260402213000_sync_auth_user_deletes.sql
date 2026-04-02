create or replace function public.handle_auth_user_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.users
  where id = old.id;

  return old;
end;
$$;

drop trigger if exists on_auth_user_deleted on auth.users;
create trigger on_auth_user_deleted
after delete on auth.users
for each row execute function public.handle_auth_user_delete();

delete from public.users public_user
where not exists (
  select 1
  from auth.users auth_user
  where auth_user.id = public_user.id
);
