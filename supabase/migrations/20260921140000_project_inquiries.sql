-- Public project idea submissions from the marketing site
create table public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  project_type text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.project_inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on public.project_inquiries
  for insert
  to anon, authenticated
  with check (true);

comment on table public.project_inquiries is 'Public project idea submissions from the marketing site';
