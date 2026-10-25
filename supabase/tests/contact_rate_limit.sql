begin;
set local lock_timeout = '5s';
set local statement_timeout = '15s';
set local role service_role;

do $$
declare
  v_result record;
  v_index integer;
  v_attempt integer;
  v_prefix text := 'rate-test-' || gen_random_uuid()::text;
  v_email text;
  v_bucket timestamptz;
begin
  if current_database() <> 'portfolio_test' then
    raise exception 'Run this test only in the disposable portfolio_test database';
  end if;

  for v_attempt in 1..3 loop
    begin
      v_bucket := to_timestamp(
        floor(extract(epoch from clock_timestamp()) / 600) * 600
      );

      delete from public.contact_rate_limits
      where key = 'global' and window_start = v_bucket;

      for v_index in 1..4 loop
        v_email := v_prefix || '@example.invalid';
        if v_index = 1 then
          v_email := upper(v_email);
        elsif v_index = 2 then
          v_email := '  ' || v_email || '  ';
        end if;

        select * into v_result from public.consume_contact_request(v_email);

        if clock_timestamp() >= v_bucket + interval '10 minutes' then
          raise exception using errcode = '40001', message = 'Rate limit window changed';
        end if;
        if v_result.allowed is distinct from (v_index <= 3) then
          raise exception 'Email limit failed on request %', v_index;
        end if;
        if v_result.retry_after is null or v_result.retry_after not between 1 and 600 then
          raise exception 'Invalid Retry-After';
        end if;
      end loop;

      delete from public.contact_rate_limits
      where key = 'global' and window_start = v_bucket;

      for v_index in 1..31 loop
        select * into v_result
        from public.consume_contact_request(
          v_prefix || '-' || v_index || '@example.invalid'
        );

        if clock_timestamp() >= v_bucket + interval '10 minutes' then
          raise exception using errcode = '40001', message = 'Rate limit window changed';
        end if;
        if v_result.allowed is distinct from (v_index <= 30) then
          raise exception 'Global limit failed on request %', v_index;
        end if;
        if v_result.retry_after is null or v_result.retry_after not between 1 and 600 then
          raise exception 'Invalid Retry-After';
        end if;
      end loop;

      exit;
    exception when serialization_failure then
      if v_attempt = 3 then
        raise;
      end if;
    end;
  end loop;

  insert into public.contact_messages (name, email, subject, message)
  values ('Rate limit test', v_prefix || '@example.invalid', 'Test', 'Test');

  if has_table_privilege('anon', 'public.contact_messages', 'INSERT')
     or has_table_privilege('authenticated', 'public.contact_messages', 'INSERT')
     or has_function_privilege(
       'anon', 'public.consume_contact_request(text)', 'EXECUTE'
     )
     or has_function_privilege(
       'authenticated', 'public.consume_contact_request(text)', 'EXECUTE'
     ) then
    raise exception 'Browser roles can bypass the rate limit';
  end if;
end;
$$;

rollback;
