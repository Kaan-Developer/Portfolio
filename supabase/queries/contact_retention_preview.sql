-- Read-only counts; no message content is returned or deleted.
select count(*) as total_messages,
       count(*) filter (
         where created_at < now() - interval '90 days'
       ) as expired_messages,
       count(*) filter (
         where created_at is null
       ) as messages_without_date
from public.contact_messages;
