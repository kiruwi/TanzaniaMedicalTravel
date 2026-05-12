drop policy if exists "staff manage quotes for assigned cases" on public.quotes;
create policy "staff manage quotes for assigned cases"
on public.quotes
for all
using (
  app_private.is_admin()
  or (
    case_id is not null
    and app_private.can_manage_case(case_id)
  )
)
with check (
  app_private.is_admin()
  or (
    case_id is not null
    and app_private.can_manage_case(case_id)
  )
);
