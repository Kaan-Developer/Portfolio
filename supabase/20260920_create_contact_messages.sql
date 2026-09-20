create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;