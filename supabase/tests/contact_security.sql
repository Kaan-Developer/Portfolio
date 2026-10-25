begin;
set local lock_timeout = '5s';
set local statement_timeout = '15s';

do $$
declare
  v_role text;
  v_table text;
  v_privilege text;
begin
  if current_database() <> 'portfolio_test' then
    raise exception 'Run this test only in the disposable portfolio_test database';
  end if;

  foreach v_table in array array['contact_messages', 'contact_rate_limits'] loop
    if not exists (
      select 1 from pg_class
      where oid = ('public.' || v_table)::regclass and relrowsecurity
    ) then
      raise exception 'RLS is disabled on %', v_table;
    end if;

    foreach v_role in array array['anon', 'authenticated'] loop
      foreach v_privilege in array array[
        'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'REFERENCES', 'TRIGGER', 'MAINTAIN'
      ] loop
        if has_table_privilege(v_role, 'public.' || v_table, v_privilege) then
          raise exception '% has unexpected % on %', v_role, v_privilege, v_table;
        end if;
      end loop;
    end loop;
  end loop;

  foreach v_role in array array['anon', 'authenticated'] loop
    if has_function_privilege(v_role, 'public.consume_contact_request(text)', 'EXECUTE')
       or has_function_privilege(v_role, 'public.rls_auto_enable()', 'EXECUTE')
       or has_schema_privilege(v_role, 'public', 'CREATE') then
      raise exception '% can bypass the contact backend', v_role;
    end if;
  end loop;

  if not has_function_privilege('service_role', 'public.consume_contact_request(text)', 'EXECUTE')
     or not has_table_privilege('service_role', 'public.contact_messages', 'INSERT') then
    raise exception 'The contact backend has lost required privileges';
  end if;

  if exists (select 1 from pg_policies where schemaname = 'public')
     or to_regclass('public.messages') is not null then
    raise exception 'Unexpected browser policy or legacy messages table';
  end if;
end;
$$;

create table public.contact_security_fixture (id bigint generated always as identity);
create function public.contact_security_fixture() returns integer
language sql as 'select 1';

do $$
declare
  v_role text;
begin
  foreach v_role in array array['anon', 'authenticated'] loop
    if has_table_privilege(v_role, 'public.contact_security_fixture', 'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER,MAINTAIN')
       or has_sequence_privilege(v_role, 'public.contact_security_fixture_id_seq', 'USAGE,SELECT,UPDATE')
       or has_function_privilege(v_role, 'public.contact_security_fixture()', 'EXECUTE') then
      raise exception 'New objects expose default privileges to %', v_role;
    end if;
  end loop;

  if not (select relrowsecurity from pg_class where oid = 'public.contact_security_fixture'::regclass) then
    raise exception 'New public tables do not automatically enable RLS';
  end if;
end;
$$;

do $$
declare
  v_command text;
begin
  select command into strict v_command from cron.job
  where jobname = 'contact-messages-retention-90d'
    and schedule = '0 3 * * *' and active;

  if regexp_replace(v_command, '\s+', '', 'g') <>
     'deletefrompublic.contact_messageswherecreated_at<now()-interval''90days'';' then
    raise exception 'Unexpected retention command';
  end if;

  insert into public.contact_messages (name, email, subject, message, created_at)
  values
    ('Retention test', 'retention-old@example.invalid', 'project', 'test', now() - interval '91 days'),
    ('Retention test', 'retention-recent@example.invalid', 'project', 'test', now() - interval '89 days');

  execute v_command;

  if exists (select 1 from public.contact_messages where email = 'retention-old@example.invalid')
     or not exists (select 1 from public.contact_messages where email = 'retention-recent@example.invalid') then
    raise exception 'Retention must remove only messages older than 90 days';
  end if;
end;
$$;

rollback;
