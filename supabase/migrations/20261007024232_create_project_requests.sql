create table public.project_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'scoping', 'proposal', 'won', 'lost')),
  intent text not null check (intent in ('project', 'idea')),
  service text not null,
  service_other text,
  stage text not null,
  industry text,
  description text,
  timeline text not null,
  budget_amount integer check (budget_amount > 0),
  budget_unsure boolean not null default false,
  below_minimum boolean not null default false,
  open_to_flexible boolean not null default false,
  business_context text,
  payment_plan text,
  name text not null,
  email text not null,
  phone text,
  company text,
  source jsonb not null default '{}'::jsonb,
  notes text,
  constraint project_requests_budget_check check (budget_unsure or budget_amount is not null)
);

comment on table public.project_requests is 'Project and idea submissions from the Start a project intake form.';
comment on column public.project_requests.below_minimum is 'Budget is below the starting price of the selected service. Internal only.';
comment on column public.project_requests.notes is 'Internal notes. Never shown to the customer.';

create index project_requests_created_at_idx on public.project_requests (created_at desc);
create index project_requests_status_idx on public.project_requests (status);

-- Only the server (secret key) reads or writes this table. The admin dashboard will add policies.
alter table public.project_requests enable row level security;
revoke all on table public.project_requests from anon, authenticated;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

create trigger project_requests_set_updated_at
before update on public.project_requests
for each row execute function public.set_updated_at();
