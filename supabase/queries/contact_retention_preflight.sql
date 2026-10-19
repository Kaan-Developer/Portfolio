-- Read-only schema inspection; this query does not return contact messages.
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name = 'contact_messages'
order by ordinal_position;
