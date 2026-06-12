insert into public.services (name, slug, description, default_price_cents, active) values
('AC Repair', 'ac-repair', 'Air conditioning diagnostics, repairs, tune-ups, and urgent cooling issues.', 3500, true),
('Plumbing', 'plumbing', 'Leak repair, drain issues, fixture installation, and urgent plumbing calls.', 3000, true),
('Emergency Electrician', 'emergency-electrician', 'Electrical hazards, outages, panel issues, and urgent repairs.', 4000, true),
('Roofing', 'roofing', 'Roof repairs, storm damage inspections, replacements, and leak investigation.', 5000, true),
('Garage Door Repair', 'garage-door-repair', 'Broken springs, stuck doors, opener issues, and garage door service.', 2500, true),
('Pest Control', 'pest-control', 'Residential pest treatment, inspections, and prevention services.', 2000, true),
('Landscaping', 'landscaping', 'Yard cleanup, recurring lawn service, installs, and outdoor maintenance.', 2000, true),
('House Cleaning', 'house-cleaning', 'One-time, move-out, deep cleaning, and recurring home cleaning requests.', 1500, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  default_price_cents = excluded.default_price_cents,
  active = excluded.active;

insert into public.leads (service_id, name, phone, email, city, zip_code, description, contact_preference, consent_to_share, status, price_cents, lead_score, urgency, source_page, duplicate_key, expires_at)
select s.id, 'Jordan Homeowner', '214-555-0199', 'jordan@example.com', 'Dallas', '75201',
  'The AC stopped working today and the house is getting hot. Looking for a licensed pro who can come out soon.',
  'both', true, 'new', s.default_price_cents, 95, 'high', '/seed', 'seed-ac-dallas', now() + interval '7 days'
from public.services s where s.slug = 'ac-repair'
on conflict do nothing;
