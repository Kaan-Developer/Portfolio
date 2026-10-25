# Contact backend

The browser calls the `contact` Edge Function with a publishable key. Only
`service_role` can consume the rate-limit RPC and insert messages. Browser roles
have no table privileges or function execution rights; neither table needs a
browser policy.

`migrations/20261025095244_remote_schema.sql` is the CLI snapshot of the live
schema. `20261025095819_harden_contact_defaults.sql` closes browser access to the
existing contact tables/functions and public-schema creation, then removes
browser privileges from future `postgres`-owned public tables and sequences. Removing implicit
PUBLIC function execution requires a global default privilege change, so future
`postgres`-owned functions in every schema need explicit execution grants.
Existing service-role grants are preserved.

The second migration also restores the RLS event trigger and the daily 90-day
retention job on fresh installations. Existing triggers and scheduled jobs are
left intact. Message deletion is deliberately separate from migrations.

## SQL regression tests

These tests require Docker and run only in a disposable database named
`portfolio_test`. They create fixtures and roll back their changes. The database
name guard prevents running them against the linked project's `postgres`
database. Do not use production for these tests: the rate-limit fixture locks
and resets its shared global counter inside the test transaction.

Run in PowerShell from the repository root:

```powershell
$container = 'portfolio-db-tests'
$boot = 'initdb -D /tmp/portfolio-db -U postgres --auth=trust >/dev/null && exec postgres -D /tmp/portfolio-db -c listen_addresses= -c unix_socket_directories=/tmp -c wal_level=logical -c shared_preload_libraries=pg_cron -c cron.database_name=portfolio_test -c cron.launch_active_jobs=off'
docker run --detach --name $container --network none --user postgres --entrypoint sh public.ecr.aws/supabase/postgres:17.11.0.003 -c $boot
```

Wait until `docker exec $container pg_isready -h /tmp -U postgres -q` succeeds,
then run:

```powershell
docker exec $container createdb -h /tmp -U postgres portfolio_test
$bootstrap = 'create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls; create role supabase_admin nologin superuser; create schema extensions; create schema vault; create publication supabase_realtime;'
docker exec $container psql -h /tmp -U postgres -d portfolio_test -v ON_ERROR_STOP=1 -c $bootstrap
Get-ChildItem supabase/migrations/*.sql | Sort-Object Name | ForEach-Object {
  Get-Content $_.FullName -Raw | docker exec -i $container psql -h /tmp -U postgres -d portfolio_test -v ON_ERROR_STOP=1 --single-transaction
  if ($LASTEXITCODE -ne 0) { throw "Migration failed: $($_.Name)" }
}
foreach ($test in @('contact_security.sql', 'contact_rate_limit.sql')) {
  Get-Content "supabase/tests/$test" -Raw | docker exec -i $container psql -h /tmp -U postgres -d portfolio_test -v ON_ERROR_STOP=1
  if ($LASTEXITCODE -ne 0) { throw "SQL test failed: $test" }
}
docker rm --force --volumes $container
```

The container has no network access or published port. Trust authentication is
limited to this disposable instance; scheduled jobs do not execute automatically.
The tests cover current and future privileges, automatic RLS, retention, email
normalization, the 3-per-email and 30-global limits, and non-null retry delays.
A window rollover rolls back and retries the entire limiter fixture, at most
three times; a remaining failure is reported.

## Live smoke test

`node --test` does not discover the live smoke script. To run it intentionally,
provide the public URL and publishable key only in the current process, then run
`node supabase/tests/contact-smoke.mjs`. It makes real requests, creates up to
three messages, and may send three emails. Remove only those test messages after
checking the results. Never put the service-role key or database password into
the script or repository.

Auth signup is disabled on the live project. Data API exposed schemas are
`public,graphql_public`; these project settings are managed separately from SQL.
