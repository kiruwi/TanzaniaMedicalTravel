create schema if not exists audit;

create table if not exists audit.access_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.users(id) on delete set null,
  actor_email text,
  actor_role text not null default 'public',
  access_type text not null check (access_type in ('page', 'api')),
  path text not null,
  method text not null default 'GET',
  ip_address text,
  forwarded_for text,
  country_code text,
  city text,
  user_agent text,
  referer text,
  query_string text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_audit_access_logs_created_at on audit.access_logs(created_at desc);
create index if not exists idx_audit_access_logs_actor_id_created_at on audit.access_logs(actor_id, created_at desc);
create index if not exists idx_audit_access_logs_actor_email_created_at on audit.access_logs(actor_email, created_at desc);
create index if not exists idx_audit_access_logs_access_type_created_at on audit.access_logs(access_type, created_at desc);
create index if not exists idx_audit_access_logs_path_created_at on audit.access_logs(path, created_at desc);

create or replace function audit.prevent_access_log_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'audit.access_logs is immutable';
end;
$$;

drop trigger if exists access_logs_immutable on audit.access_logs;
create trigger access_logs_immutable
before update or delete on audit.access_logs
for each row execute function audit.prevent_access_log_mutation();

create or replace function public.write_access_log(
  actor_id uuid default null,
  actor_email text default null,
  actor_role text default 'public',
  access_type text default 'api',
  path text default '',
  method text default 'GET',
  ip_address text default null,
  forwarded_for text default null,
  country_code text default null,
  city text default null,
  user_agent text default null,
  referer text default null,
  query_string text default null,
  metadata jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public, audit
as $$
begin
  insert into audit.access_logs (
    actor_id,
    actor_email,
    actor_role,
    access_type,
    path,
    method,
    ip_address,
    forwarded_for,
    country_code,
    city,
    user_agent,
    referer,
    query_string,
    metadata
  )
  values (
    actor_id,
    nullif(trim(actor_email), ''),
    coalesce(nullif(trim(actor_role), ''), 'public'),
    case when access_type = 'page' then 'page' else 'api' end,
    coalesce(nullif(trim(path), ''), '/tmt-admin'),
    upper(coalesce(nullif(trim(method), ''), 'GET')),
    nullif(trim(ip_address), ''),
    nullif(trim(forwarded_for), ''),
    upper(nullif(trim(country_code), '')),
    nullif(trim(city), ''),
    nullif(trim(user_agent), ''),
    nullif(trim(referer), ''),
    nullif(trim(query_string), ''),
    coalesce(metadata, '{}'::jsonb)
  );
end;
$$;

create or replace function public.search_access_logs(
  search_term text default null,
  access_kind text default null,
  max_rows integer default 100
)
returns table (
  id bigint,
  actor_id uuid,
  actor_email text,
  actor_role text,
  access_type text,
  path text,
  method text,
  ip_address text,
  forwarded_for text,
  country_code text,
  city text,
  user_agent text,
  referer text,
  query_string text,
  metadata jsonb,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public, audit
as $$
  select
    access_logs.id,
    access_logs.actor_id,
    access_logs.actor_email,
    access_logs.actor_role,
    access_logs.access_type,
    access_logs.path,
    access_logs.method,
    access_logs.ip_address,
    access_logs.forwarded_for,
    access_logs.country_code,
    access_logs.city,
    access_logs.user_agent,
    access_logs.referer,
    access_logs.query_string,
    access_logs.metadata,
    access_logs.created_at
  from audit.access_logs access_logs
  where (
    access_kind is null
    or access_kind = ''
    or access_logs.access_type = access_kind
  )
    and (
      search_term is null
      or search_term = ''
      or access_logs.path ilike '%' || search_term || '%'
      or coalesce(access_logs.actor_email, '') ilike '%' || search_term || '%'
      or coalesce(access_logs.ip_address, '') ilike '%' || search_term || '%'
      or coalesce(access_logs.country_code, '') ilike '%' || search_term || '%'
      or coalesce(access_logs.city, '') ilike '%' || search_term || '%'
      or coalesce(access_logs.referer, '') ilike '%' || search_term || '%'
    )
  order by access_logs.created_at desc
  limit least(greatest(coalesce(max_rows, 100), 1), 250);
$$;

revoke all on schema audit from public, anon, authenticated;
revoke all on all tables in schema audit from public, anon, authenticated;
revoke all on function public.write_access_log(
  uuid,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
) from public, anon, authenticated;
revoke all on function public.search_access_logs(text, text, integer) from public, anon, authenticated;

grant execute on function public.write_access_log(
  uuid,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  jsonb
) to service_role;
grant execute on function public.search_access_logs(text, text, integer) to service_role;
