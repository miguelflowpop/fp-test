
create table
employees (
id bigint primary key generated always as identity,
name text,
email text,
created_at timestamptz default now()
);

alter table
if exists public.employees add department text default 'Hooli';
