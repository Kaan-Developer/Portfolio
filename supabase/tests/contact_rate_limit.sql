begin;
set local lock_timeout = '5s';
set local statement_timeout = '15s';
set local role service_role;

do $$
declare
  v_result record;
  v_index integer;
  v_prefix text := 'rate-test-' || gen_random_uuid()::text;
  v_bucket timestamptz := to_timestamp(
    floor(extract(epoch from clock_timestamp()) / 600) * 600
  );
begin
  -- Fixture changes are rolled back, including the shared counter.
  delete from public.contact_rate_limits
  where key = 'global' and window_start = v_bucket;

  for v_index in 1..4 loop
    select * into v_result
    from public.consume_contact_request(v_prefix || '@example.invalid');

    if v_result.allowed is distinct from (v_index <= 3) then
      raise exception 'Email limit failed on request %', v_index;
    end if;
    if v_result.retry_after not between 1 and 600 then
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

    if v_result.allowed is distinct from (v_index <= 30) then
      raise exception 'Global limit failed on request %', v_index;
    end if;
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
