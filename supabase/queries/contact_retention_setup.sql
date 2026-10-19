-- Run as postgres in the Supabase SQL Editor. The first scheduled run also
-- deletes existing messages older than 90 days. Email copies are unaffected.
begin;

create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'contact-messages-retention-90d',
  '0 3 * * *',
  $cleanup$
    delete from public.contact_messages
    where created_at < now() - interval '90 days';
  $cleanup$
);

commit;

select jobid, jobname, schedule, active,
       current_setting('cron.timezone', true) as scheduler_timezone
from cron.job
where jobname = 'contact-messages-retention-90d';
