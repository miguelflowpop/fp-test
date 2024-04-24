create extension if not exists "http" with schema "extensions";


revoke delete on table "public"."employees" from "anon";

revoke insert on table "public"."employees" from "anon";

revoke references on table "public"."employees" from "anon";

revoke select on table "public"."employees" from "anon";

revoke trigger on table "public"."employees" from "anon";

revoke truncate on table "public"."employees" from "anon";

revoke update on table "public"."employees" from "anon";

revoke delete on table "public"."employees" from "authenticated";

revoke insert on table "public"."employees" from "authenticated";

revoke references on table "public"."employees" from "authenticated";

revoke select on table "public"."employees" from "authenticated";

revoke trigger on table "public"."employees" from "authenticated";

revoke truncate on table "public"."employees" from "authenticated";

revoke update on table "public"."employees" from "authenticated";

revoke delete on table "public"."employees" from "service_role";

revoke insert on table "public"."employees" from "service_role";

revoke references on table "public"."employees" from "service_role";

revoke select on table "public"."employees" from "service_role";

revoke trigger on table "public"."employees" from "service_role";

revoke truncate on table "public"."employees" from "service_role";

revoke update on table "public"."employees" from "service_role";

alter table "public"."employees" drop constraint "employees_pkey";

drop index if exists "public"."employees_pkey";

drop table "public"."employees";

create table "public"."business" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "name" character varying not null
);


alter table "public"."business" enable row level security;

create table "public"."folder" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "name" character varying not null,
    "space_id" bigint not null
);


alter table "public"."folder" enable row level security;

create table "public"."list" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "name" character varying not null,
    "folder_id" bigint not null,
    "flow_id" text,
    "flow_start_screen_name" text
);


alter table "public"."list" enable row level security;

create table "public"."report_invocation" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "flow_token" uuid not null default gen_random_uuid(),
    "list_id" bigint,
    "user" uuid not null default auth.uid(),
    "wamid" text,
    "sent_timestamp" timestamp with time zone,
    "delivered_timestamp" timestamp with time zone,
    "response_timestamp" timestamp with time zone,
    "response_json" json
);


alter table "public"."report_invocation" enable row level security;

create table "public"."space" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "deleted_at" timestamp with time zone,
    "name" character varying not null,
    "business_id" bigint not null
);


alter table "public"."space" enable row level security;

CREATE UNIQUE INDEX business_id_key ON public.business USING btree (id);

CREATE UNIQUE INDEX business_name_key ON public.business USING btree (name);

CREATE UNIQUE INDEX business_pkey ON public.business USING btree (id);

CREATE UNIQUE INDEX folder_id_key ON public.folder USING btree (id);

CREATE UNIQUE INDEX folder_pkey ON public.folder USING btree (id);

CREATE UNIQUE INDEX list_id_key ON public.list USING btree (id);

CREATE UNIQUE INDEX list_pkey ON public.list USING btree (id);

CREATE UNIQUE INDEX report_invocation_flow_token_key ON public.report_invocation USING btree (flow_token);

CREATE UNIQUE INDEX report_invocation_pkey ON public.report_invocation USING btree (id);

CREATE UNIQUE INDEX space_id_key ON public.space USING btree (id);

CREATE UNIQUE INDEX space_pkey ON public.space USING btree (id);

alter table "public"."business" add constraint "business_pkey" PRIMARY KEY using index "business_pkey";

alter table "public"."folder" add constraint "folder_pkey" PRIMARY KEY using index "folder_pkey";

alter table "public"."list" add constraint "list_pkey" PRIMARY KEY using index "list_pkey";

alter table "public"."report_invocation" add constraint "report_invocation_pkey" PRIMARY KEY using index "report_invocation_pkey";

alter table "public"."space" add constraint "space_pkey" PRIMARY KEY using index "space_pkey";

alter table "public"."business" add constraint "business_id_key" UNIQUE using index "business_id_key";

alter table "public"."business" add constraint "business_name_check" CHECK ((length((name)::text) <= 255)) not valid;

alter table "public"."business" validate constraint "business_name_check";

alter table "public"."business" add constraint "business_name_key" UNIQUE using index "business_name_key";

alter table "public"."folder" add constraint "folder_id_key" UNIQUE using index "folder_id_key";

alter table "public"."folder" add constraint "public_folder_space_id_fkey" FOREIGN KEY (space_id) REFERENCES space(id) not valid;

alter table "public"."folder" validate constraint "public_folder_space_id_fkey";

alter table "public"."list" add constraint "list_id_key" UNIQUE using index "list_id_key";

alter table "public"."list" add constraint "public_list_folder_id_fkey" FOREIGN KEY (folder_id) REFERENCES folder(id) not valid;

alter table "public"."list" validate constraint "public_list_folder_id_fkey";

alter table "public"."report_invocation" add constraint "public_report_invocation_list_fkey" FOREIGN KEY (list_id) REFERENCES list(id) not valid;

alter table "public"."report_invocation" validate constraint "public_report_invocation_list_fkey";

alter table "public"."report_invocation" add constraint "report_invocation_flow_token_key" UNIQUE using index "report_invocation_flow_token_key";

alter table "public"."space" add constraint "public_space_business_id_fkey" FOREIGN KEY (business_id) REFERENCES business(id) not valid;

alter table "public"."space" validate constraint "public_space_business_id_fkey";

alter table "public"."space" add constraint "space_id_key" UNIQUE using index "space_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.hello()
 RETURNS text
 LANGUAGE sql
AS $function$
select 'hello world';
$function$
;

grant delete on table "public"."business" to "anon";

grant insert on table "public"."business" to "anon";

grant references on table "public"."business" to "anon";

grant select on table "public"."business" to "anon";

grant trigger on table "public"."business" to "anon";

grant truncate on table "public"."business" to "anon";

grant update on table "public"."business" to "anon";

grant delete on table "public"."business" to "authenticated";

grant insert on table "public"."business" to "authenticated";

grant references on table "public"."business" to "authenticated";

grant select on table "public"."business" to "authenticated";

grant trigger on table "public"."business" to "authenticated";

grant truncate on table "public"."business" to "authenticated";

grant update on table "public"."business" to "authenticated";

grant delete on table "public"."business" to "service_role";

grant insert on table "public"."business" to "service_role";

grant references on table "public"."business" to "service_role";

grant select on table "public"."business" to "service_role";

grant trigger on table "public"."business" to "service_role";

grant truncate on table "public"."business" to "service_role";

grant update on table "public"."business" to "service_role";

grant delete on table "public"."folder" to "anon";

grant insert on table "public"."folder" to "anon";

grant references on table "public"."folder" to "anon";

grant select on table "public"."folder" to "anon";

grant trigger on table "public"."folder" to "anon";

grant truncate on table "public"."folder" to "anon";

grant update on table "public"."folder" to "anon";

grant delete on table "public"."folder" to "authenticated";

grant insert on table "public"."folder" to "authenticated";

grant references on table "public"."folder" to "authenticated";

grant select on table "public"."folder" to "authenticated";

grant trigger on table "public"."folder" to "authenticated";

grant truncate on table "public"."folder" to "authenticated";

grant update on table "public"."folder" to "authenticated";

grant delete on table "public"."folder" to "service_role";

grant insert on table "public"."folder" to "service_role";

grant references on table "public"."folder" to "service_role";

grant select on table "public"."folder" to "service_role";

grant trigger on table "public"."folder" to "service_role";

grant truncate on table "public"."folder" to "service_role";

grant update on table "public"."folder" to "service_role";

grant delete on table "public"."list" to "anon";

grant insert on table "public"."list" to "anon";

grant references on table "public"."list" to "anon";

grant select on table "public"."list" to "anon";

grant trigger on table "public"."list" to "anon";

grant truncate on table "public"."list" to "anon";

grant update on table "public"."list" to "anon";

grant delete on table "public"."list" to "authenticated";

grant insert on table "public"."list" to "authenticated";

grant references on table "public"."list" to "authenticated";

grant select on table "public"."list" to "authenticated";

grant trigger on table "public"."list" to "authenticated";

grant truncate on table "public"."list" to "authenticated";

grant update on table "public"."list" to "authenticated";

grant delete on table "public"."list" to "service_role";

grant insert on table "public"."list" to "service_role";

grant references on table "public"."list" to "service_role";

grant select on table "public"."list" to "service_role";

grant trigger on table "public"."list" to "service_role";

grant truncate on table "public"."list" to "service_role";

grant update on table "public"."list" to "service_role";

grant delete on table "public"."report_invocation" to "anon";

grant insert on table "public"."report_invocation" to "anon";

grant references on table "public"."report_invocation" to "anon";

grant select on table "public"."report_invocation" to "anon";

grant trigger on table "public"."report_invocation" to "anon";

grant truncate on table "public"."report_invocation" to "anon";

grant update on table "public"."report_invocation" to "anon";

grant delete on table "public"."report_invocation" to "authenticated";

grant insert on table "public"."report_invocation" to "authenticated";

grant references on table "public"."report_invocation" to "authenticated";

grant select on table "public"."report_invocation" to "authenticated";

grant trigger on table "public"."report_invocation" to "authenticated";

grant truncate on table "public"."report_invocation" to "authenticated";

grant update on table "public"."report_invocation" to "authenticated";

grant delete on table "public"."report_invocation" to "service_role";

grant insert on table "public"."report_invocation" to "service_role";

grant references on table "public"."report_invocation" to "service_role";

grant select on table "public"."report_invocation" to "service_role";

grant trigger on table "public"."report_invocation" to "service_role";

grant truncate on table "public"."report_invocation" to "service_role";

grant update on table "public"."report_invocation" to "service_role";

grant delete on table "public"."space" to "anon";

grant insert on table "public"."space" to "anon";

grant references on table "public"."space" to "anon";

grant select on table "public"."space" to "anon";

grant trigger on table "public"."space" to "anon";

grant truncate on table "public"."space" to "anon";

grant update on table "public"."space" to "anon";

grant delete on table "public"."space" to "authenticated";

grant insert on table "public"."space" to "authenticated";

grant references on table "public"."space" to "authenticated";

grant select on table "public"."space" to "authenticated";

grant trigger on table "public"."space" to "authenticated";

grant truncate on table "public"."space" to "authenticated";

grant update on table "public"."space" to "authenticated";

grant delete on table "public"."space" to "service_role";

grant insert on table "public"."space" to "service_role";

grant references on table "public"."space" to "service_role";

grant select on table "public"."space" to "service_role";

grant trigger on table "public"."space" to "service_role";

grant truncate on table "public"."space" to "service_role";

grant update on table "public"."space" to "service_role";


