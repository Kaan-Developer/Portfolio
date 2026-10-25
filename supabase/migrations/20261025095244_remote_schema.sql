SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."consume_contact_request"("p_email" "text") RETURNS TABLE("allowed" boolean, "retry_after" integer)
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
declare
  v_now timestamptz := clock_timestamp();
  v_email text := lower(trim(p_email));
  v_bucket timestamptz;
  v_consumed integer;
  v_wait_seconds integer;
begin
  if v_email is null
     or length(v_email) = 0
     or length(p_email) > 100 then
    raise exception 'Invalid rate limit key';
  end if;

  v_bucket := to_timestamp(
    floor(extract(epoch from v_now) / 600) * 600
  );

  v_wait_seconds := greatest(
    1,
    ceil(
      extract(
        epoch from (
          v_bucket + interval '10 minutes' - v_now
        )
      )
    )::integer
  );

  insert into public.contact_rate_limits as limits (
    key,
    window_start,
    request_count
  )
  values (
    'global',
    v_bucket,
    1
  )
  on conflict (key, window_start)
  do update
    set request_count = limits.request_count + 1
    where limits.request_count < 30
  returning request_count into v_consumed;

  if v_consumed is null then
    return query select false, v_wait_seconds;
    return;
  end if;

  v_consumed := null;

  insert into public.contact_rate_limits as limits (
    key,
    window_start,
    request_count
  )
  values (
    'email:' || v_email,
    v_bucket,
    1
  )
  on conflict (key, window_start)
  do update
    set request_count = limits.request_count + 1
    where limits.request_count < 3
  returning request_count into v_consumed;

  return query
    select v_consumed is not null, v_wait_seconds;
end;
$$;

ALTER FUNCTION "public"."consume_contact_request"("p_email" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."rls_auto_enable"() RETURNS "event_trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
  tbl name;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        SELECT c.relname INTO tbl FROM pg_catalog.pg_class c WHERE c.oid = cmd.objid;
        EXECUTE format('alter table if exists %I.%I enable row level security', cmd.schema_name, tbl);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;

ALTER FUNCTION "public"."rls_auto_enable"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."contact_messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "message" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "contact_messages_email_check" CHECK ((("char_length"("email") >= 3) AND ("char_length"("email") <= 254))),
    CONSTRAINT "contact_messages_message_check" CHECK ((("char_length"(TRIM(BOTH FROM "message")) >= 1) AND ("char_length"(TRIM(BOTH FROM "message")) <= 5000))),
    CONSTRAINT "contact_messages_name_check" CHECK ((("char_length"(TRIM(BOTH FROM "name")) >= 1) AND ("char_length"(TRIM(BOTH FROM "name")) <= 100))),
    CONSTRAINT "contact_messages_subject_check" CHECK ((("char_length"(TRIM(BOTH FROM "subject")) >= 1) AND ("char_length"(TRIM(BOTH FROM "subject")) <= 120)))
);

ALTER TABLE "public"."contact_messages" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."contact_rate_limits" (
    "key" "text" NOT NULL,
    "window_start" timestamp with time zone NOT NULL,
    "request_count" integer NOT NULL,
    CONSTRAINT "contact_rate_limits_request_count_check" CHECK (("request_count" > 0))
);

ALTER TABLE "public"."contact_rate_limits" OWNER TO "postgres";

ALTER TABLE ONLY "public"."contact_messages"
    ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."contact_rate_limits"
    ADD CONSTRAINT "contact_rate_limits_pkey" PRIMARY KEY ("key", "window_start");

ALTER TABLE "public"."contact_messages" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."contact_rate_limits" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

REVOKE ALL ON FUNCTION "public"."consume_contact_request"("p_email" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."consume_contact_request"("p_email" "text") TO "service_role";

REVOKE ALL ON FUNCTION "public"."rls_auto_enable"() FROM PUBLIC;

GRANT INSERT,REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLE "public"."contact_messages" TO "service_role";

GRANT ALL ON TABLE "public"."contact_rate_limits" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT REFERENCES,TRIGGER,TRUNCATE,MAINTAIN ON TABLES TO "service_role";

drop extension if exists "pg_net";

revoke references on table "public"."contact_messages" from "anon";

revoke trigger on table "public"."contact_messages" from "anon";

revoke truncate on table "public"."contact_messages" from "anon";

revoke references on table "public"."contact_messages" from "authenticated";

revoke trigger on table "public"."contact_messages" from "authenticated";

revoke truncate on table "public"."contact_messages" from "authenticated";

revoke references on table "public"."contact_rate_limits" from "anon";

revoke trigger on table "public"."contact_rate_limits" from "anon";

revoke truncate on table "public"."contact_rate_limits" from "anon";

revoke references on table "public"."contact_rate_limits" from "authenticated";

revoke trigger on table "public"."contact_rate_limits" from "authenticated";

revoke truncate on table "public"."contact_rate_limits" from "authenticated";
