-- Developers (handled by Supabase Auth)
-- profiles table extends auth.users
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  email text,
  avatar_url text,
  stripe_customer_id text,
  plan text default 'free', -- free | pro
  created_at timestamp with time zone default now()
);

-- Projects (one per client engagement)
create table projects (
  id uuid primary key default gen_random_uuid(),
  dev_id uuid references profiles(id) on delete cascade,
  name text not null,
  client_name text,
  client_email text,
  website_url text,
  preview_type text default 'website', -- website | android | ios
  apk_url text,
  status text default 'active', -- active | in_review | completed | archived
  magic_token text unique default gen_random_uuid()::text,
  created_at timestamp with time zone default now()
);

-- Annotations (pins on the live preview)
create table annotations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  author_type text not null, -- 'dev' | 'client'
  author_name text,
  x_percent float not null, -- position as % of iframe width
  y_percent float not null, -- position as % of iframe height
  page_url text, -- which URL was being viewed
  status text default 'open', -- open | in_progress | resolved
  created_at timestamp with time zone default now()
);

-- Comments (threaded replies on annotations)
create table comments (
  id uuid primary key default gen_random_uuid(),
  annotation_id uuid references annotations(id) on delete cascade,
  author_type text not null, -- 'dev' | 'client'
  author_name text,
  body text not null,
  created_at timestamp with time zone default now()
);

-- Messages (project-level chat)
create table messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  author_type text not null, -- 'dev' | 'client'
  author_name text,
  body text not null,
  created_at timestamp with time zone default now()
);

-- Invoices
create table invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  dev_id uuid references profiles(id),
  amount_cents integer not null,
  currency text default 'usd',
  description text,
  status text default 'draft', -- draft | sent | paid | overdue
  stripe_payment_link text,
  due_date date,
  paid_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table projects enable row level security;
alter table annotations enable row level security;
alter table comments enable row level security;
alter table messages enable row level security;
alter table invoices enable row level security;

-- RLS Policies

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Projects: devs can CRUD their own projects
create policy "Devs can view own projects" on projects for select using (auth.uid() = dev_id);
create policy "Devs can create projects" on projects for insert with check (auth.uid() = dev_id);
create policy "Devs can update own projects" on projects for update using (auth.uid() = dev_id);
create policy "Devs can delete own projects" on projects for delete using (auth.uid() = dev_id);

-- Annotations: devs can manage annotations on their projects, service role handles client annotations
create policy "Devs can view annotations on own projects" on annotations for select
  using (project_id in (select id from projects where dev_id = auth.uid()));
create policy "Devs can create annotations on own projects" on annotations for insert
  with check (project_id in (select id from projects where dev_id = auth.uid()));
create policy "Devs can update annotations on own projects" on annotations for update
  using (project_id in (select id from projects where dev_id = auth.uid()));
create policy "Devs can delete annotations on own projects" on annotations for delete
  using (project_id in (select id from projects where dev_id = auth.uid()));

-- Comments: devs can manage comments on their project annotations
create policy "Devs can view comments on own project annotations" on comments for select
  using (annotation_id in (
    select a.id from annotations a join projects p on a.project_id = p.id where p.dev_id = auth.uid()
  ));
create policy "Devs can create comments on own project annotations" on comments for insert
  with check (annotation_id in (
    select a.id from annotations a join projects p on a.project_id = p.id where p.dev_id = auth.uid()
  ));
create policy "Devs can delete comments on own project annotations" on comments for delete
  using (annotation_id in (
    select a.id from annotations a join projects p on a.project_id = p.id where p.dev_id = auth.uid()
  ));

-- Messages: devs can manage messages on their projects
create policy "Devs can view messages on own projects" on messages for select
  using (project_id in (select id from projects where dev_id = auth.uid()));
create policy "Devs can create messages on own projects" on messages for insert
  with check (project_id in (select id from projects where dev_id = auth.uid()));
create policy "Devs can delete messages on own projects" on messages for delete
  using (project_id in (select id from projects where dev_id = auth.uid()));

-- Invoices: devs can manage invoices on their projects
create policy "Devs can view own invoices" on invoices for select using (dev_id = auth.uid());
create policy "Devs can create invoices" on invoices for insert with check (dev_id = auth.uid());
create policy "Devs can update own invoices" on invoices for update using (dev_id = auth.uid());
create policy "Devs can delete own invoices" on invoices for delete using (dev_id = auth.uid());

-- Enable Realtime for messages
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table annotations;
alter publication supabase_realtime add table comments;
