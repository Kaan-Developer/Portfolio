revoke all on public.contact_messages, public.contact_rate_limits
  from public, anon, authenticated;

revoke execute on function public.consume_contact_request(text), public.rls_auto_enable()
  from public, anon, authenticated;

revoke create on schema public from public, anon, authenticated;

alter default privileges for role postgres in schema public
  revoke all on tables from public, anon, authenticated;

alter default privileges for role postgres in schema public
  revoke all on sequences from public, anon, authenticated;

-- Per-schema defaults cannot remove PostgreSQL's global PUBLIC EXECUTE grant.
alter default privileges for role postgres
  revoke execute on functions from public, anon, authenticated;

alter default privileges for role postgres in schema public
  revoke execute on functions from public, anon, authenticated;

do $$
begin
  if not exists (select 1 from pg_event_trigger where evtname = 'ensure_rls') then
    execute $ddl$
      create event trigger ensure_rls on ddl_command_end
      when tag in ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      execute function public.rls_auto_enable()
    $ddl$;
  end if;

  if not exists (
    select 1 from cron.job where jobname = 'contact-messages-retention-90d'
  ) then
    perform cron.schedule(
      'contact-messages-retention-90d',
      '0 3 * * *',
      $cleanup$
        delete from public.contact_messages
        where created_at < now() - interval '90 days';
      $cleanup$
    );
  end if;
end;
$$;
