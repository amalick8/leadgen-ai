create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique not null,
  email text unique not null,
  full_name text,
  phone text,
  role text not null check (role in ('business', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references public.profiles(id) on delete cascade,
  business_name text not null,
  owner_name text,
  email text not null,
  phone text not null,
  website text,
  description text,
  license_number text,
  insured boolean default false,
  notification_preference text default 'both' check (notification_preference in ('email', 'phone', 'both')),
  monthly_lead_budget_cents integer,
  accepts_emergency_leads boolean default true,
  service_area_cities text[] default '{}',
  service_area_zips text[] default '{}',
  onboarding_completed boolean default false,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  default_price_cents integer not null default 2500,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.business_services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id) on delete cascade,
  service_id uuid references public.services(id) on delete cascade,
  created_at timestamptz default now(),
  unique(business_id, service_id)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id),
  name text not null,
  phone text,
  email text,
  city text not null,
  zip_code text not null,
  description text not null,
  contact_preference text check (contact_preference in ('phone', 'email', 'both')),
  consent_to_share boolean not null default false,
  status text check (status in ('new', 'purchased', 'expired', 'deleted')) default 'new',
  price_cents integer not null,
  lead_score integer,
  urgency text check (urgency in ('low', 'medium', 'high', 'emergency')),
  source_page text,
  duplicate_key text,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.businesses(id),
  lead_id uuid references public.leads(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  amount_cents integer not null,
  currency text default 'usd',
  status text check (status in ('pending', 'succeeded', 'failed', 'canceled', 'refunded')) default 'pending',
  raw_event jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.lead_purchases (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  business_id uuid references public.businesses(id),
  payment_id uuid references public.payments(id),
  status text check (status in ('active', 'refunded', 'disputed')) default 'active',
  purchased_at timestamptz default now(),
  created_at timestamptz default now(),
  unique(lead_id),
  unique(lead_id, business_id)
);

create table public.business_lead_statuses (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  business_id uuid references public.businesses(id),
  status text check (status in ('new', 'contacted', 'quoted', 'won', 'lost')) default 'new',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(lead_id, business_id)
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  event_type text,
  processed_at timestamptz default now(),
  payload jsonb,
  unique(provider, event_id)
);

create table public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id),
  business_id uuid references public.businesses(id),
  actor_profile_id uuid references public.profiles(id),
  event_type text not null,
  message text,
  metadata jsonb,
  created_at timestamptz default now()
);

create index leads_status_idx on public.leads(status);
create index leads_service_id_idx on public.leads(service_id);
create index leads_city_idx on public.leads(city);
create index leads_zip_code_idx on public.leads(zip_code);
create index leads_created_at_idx on public.leads(created_at);
create index leads_expires_at_idx on public.leads(expires_at);
create index leads_duplicate_key_idx on public.leads(duplicate_key);
create index businesses_owner_profile_id_idx on public.businesses(owner_profile_id);
create index businesses_active_idx on public.businesses(active);
create index payments_status_idx on public.payments(status);
create index payments_stripe_checkout_session_id_idx on public.payments(stripe_checkout_session_id);
create index lead_purchases_lead_id_idx on public.lead_purchases(lead_id);
create index lead_purchases_business_id_idx on public.lead_purchases(business_id);
create index business_services_business_id_idx on public.business_services(business_id);
create index business_services_service_id_idx on public.business_services(service_id);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger businesses_updated_at before update on public.businesses for each row execute function public.set_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger payments_updated_at before update on public.payments for each row execute function public.set_updated_at();
create trigger business_lead_statuses_updated_at before update on public.business_lead_statuses for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.services enable row level security;
alter table public.business_services enable row level security;
alter table public.leads enable row level security;
alter table public.payments enable row level security;
alter table public.lead_purchases enable row level security;
alter table public.business_lead_statuses enable row level security;
alter table public.webhook_events enable row level security;
alter table public.lead_events enable row level security;

create policy "Public can read active services" on public.services for select using (active = true);
create policy "Public can submit leads" on public.leads for insert with check (consent_to_share = true);

create policy "Users read own profile" on public.profiles for select using (auth.uid() = auth_user_id);
create policy "Businesses read own business" on public.businesses for select using (
  owner_profile_id in (select id from public.profiles where auth_user_id = auth.uid())
);
create policy "Businesses update own business" on public.businesses for update using (
  owner_profile_id in (select id from public.profiles where auth_user_id = auth.uid())
);

create policy "Admins read profiles" on public.profiles for all using (
  exists (select 1 from public.profiles p where p.auth_user_id = auth.uid() and p.role = 'admin')
);
create policy "Admins manage businesses" on public.businesses for all using (
  exists (select 1 from public.profiles p where p.auth_user_id = auth.uid() and p.role = 'admin')
);
create policy "Admins manage services" on public.services for all using (
  exists (select 1 from public.profiles p where p.auth_user_id = auth.uid() and p.role = 'admin')
);
create policy "Admins manage leads" on public.leads for all using (
  exists (select 1 from public.profiles p where p.auth_user_id = auth.uid() and p.role = 'admin')
);
