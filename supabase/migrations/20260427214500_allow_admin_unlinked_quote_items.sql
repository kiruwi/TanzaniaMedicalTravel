create or replace function app_private.can_access_quote(target_quote_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, app_private
as $$
  select
    app_private.is_admin()
    or exists (
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
  select
    app_private.is_admin()
    or exists (
      select 1
      from public.quotes quote_record
      where quote_record.id = target_quote_id
        and quote_record.case_id is not null
        and app_private.can_manage_case(quote_record.case_id)
    );
$$;
