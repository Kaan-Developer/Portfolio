# Contact privacy implementation status

This is an implementation record, not a compliance certification. The Turkish
`/privacy` page now covers controller identity, collection, purposes and specific
processing grounds, actual recipients, retention, rights, and applications. It
still identifies the unfinished international-transfer and retention work;
expanding the text does not complete those operational requirements.

## Confirmed facts

- The site owner is Kaan Hamitler. The contact address is
  kaandeveloperr07@gmail.com.
- The form submits name, email, subject, and message to the Supabase `contact`
  function. Accepted messages are inserted into `public.contact_messages`.
- The owner's dashboard screenshot shows the primary database in West EU
  (Ireland), `eu-west-1`.
- The owner confirms that Resend email notifications are active. The function
  sends the submitted details to the owner's Gmail mailbox.
- On 20 October 2026, the owner confirmed that no KVKK international-transfer
  safeguard agreement has been arranged with Supabase, Resend, or Google. No
  alternative applicable Article 9 mechanism has been verified. Do not describe
  provider GDPR terms as an executed Turkish KVKK standard contract.
- The response target is 24 hours. This is a target, not a guaranteed deadline.
- A second dashboard screenshot confirms that `contact_messages.created_at` is
  `timestamp with time zone`. There is no reply/closure timestamp in that result.
- The owner explicitly selected 90 days from message submission, rather than
  from the reply date. SQL for the database cleanup is prepared; deployment and
  actual scheduled execution have not been verified. Email copies require a
  separate deletion process.
- The latest SQL Editor screenshot displays the schedule query and "Click Run
  to execute your query", with no execution result. It does not establish that
  the job exists, is active, or has run successfully.

## Processing grounds described in the notice

- General correspondence and necessary email-based abuse prevention: Article
  5(2)(f), limited by the necessity and fundamental-rights conditions. The
  controller still needs to document the actual legitimate-interest assessment;
  adding this paragraph is not evidence that the assessment has been completed.
- Enquiries directly necessary to establish or perform a contract to which the
  sender is a party: Article 5(2)(c). This is conditional and does not classify
  every enquiry or job opportunity as contractual processing.
- Handling data-subject applications under Article 13: Article 5(2)(ç), legal
  obligation. The notice describes email applications from an address already
  notified and registered, with the applicable formal requirements linked.

These processing grounds do not establish an Article 9 international-transfer
mechanism. The page does not treat reading the notice or submitting the form as
consent. No consent checkbox or new transfer behavior was introduced.

## Database retention setup

1. Run `supabase/queries/contact_retention_preview.sql` in the SQL Editor to see
   counts of expired records and records with no date. It does not reveal message
   content or change records. Records with a missing timestamp need separate
   review; the cleanup does not invent their age or delete them.
2. Run `supabase/queries/contact_retention_setup.sql` as `postgres`. This enables
   `pg_cron` and creates or updates the named job
   `contact-messages-retention-90d`. Its first scheduled execution will also
   permanently delete existing records older than 90 days.
3. The schedule is `0 3 * * *`: daily at 03:00 in the Cron scheduler timezone.
   With Supabase's documented GMT default, this is 06:00 in Türkiye. The setup
   returns the configured timezone when the installed extension exposes it.
   A message is deleted on the first successful daily run after it becomes
   older than 90 days, rather than at the exact expiry instant.
4. Verify the returned job has `active = true`, then inspect its actual run:

   ```sql
   select r.status, r.return_message, r.start_time, r.end_time
   from cron.job_run_details r
   join cron.job j on j.jobid = r.jobid
   where j.jobname = 'contact-messages-retention-90d'
   order by r.runid desc
   limit 1;
   ```

   An empty result before the first scheduled run does not prove failure or
   success. After a successful run, rerun the preview query to verify that no
   expired records remain. Do not mark the public notice as operational before
   the live execution is verified.
5. To stop this job without changing other schedules:

   ```sql
   select cron.unschedule('contact-messages-retention-90d');
   ```

   Stopping the job does not restore deleted records. This database job does not
   remove email copies, provider logs, or backups.

## Before finalizing the notice

1. Validate and document the processing grounds above against actual practice,
   including necessity, proportionality, and the legitimate-interest balance.
   Do not substitute a generic mandatory consent checkbox for this assessment.
2. Verify the applicable Article 9 mechanism for the actual international
   transfers to Supabase, Resend, the mailbox provider, and any relevant hosting
   or logging providers. An EU database region or EU contractual clauses do not
   by themselves establish compliance with Turkish transfer requirements.
3. Verify the prepared retention job in the live project using the procedure
   above. `supabase/queries/contact_retention_preflight.sql` remains available
   for read-only schema inspection if the table changes.
4. Apply a matching deletion process to Gmail messages, replies, Resend records,
   rate-limit records, relevant logs, and backups, accounting for provider
   retention and any applicable legal preservation duties. The message cleanup
   only touches `public.contact_messages`; it does not cover email-based
   rate-limit storage. Verify what each deletion actually removes before
   promising a deadline.
5. Confirm the data-subject request process, provider access controls, and actual
   hosting/logging practices. Replace the page's provisional status with the
   completed, reviewed notice only when these facts and arrangements are ready.

## Sources reviewed on 19–20 October 2026

- [KVKK disclosure requirements](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-)
- [Disclosure procedure and required notice content](https://www.kvkk.gov.tr/Icerik/4132/aydinlatma-yukumlulugunun-yerine-getirilmesinde-uyulacak-usul-ve-esaslar-hakkinda-teblig)
- [Article 5 processing grounds](https://www.kvkk.gov.tr/Icerik/2050/Kisisel-Veriler)
- [Data-subject rights](https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari)
- [Application procedure](https://www.kvkk.gov.tr/Icerik/2062/Basvuru-Hakki)
- [Current international-transfer requirements](https://www.kvkk.gov.tr/Icerik/2053/Yurtdisina-Aktarim)
- [KVKK distinction between disclosure and consent, decision 2026/347](https://www.kvkk.gov.tr/Icerik/8710/veri-sorumlulari-tarafindan-acik-riza-ve-aydinlatma-metinlerinin-ayri-ayri-duzenlenmesi-gerektigi-hakkinda-kisisel-verileri-koruma-kurulunun-18-02-2026-tarihli-ve-2026-347-sayili-ilke-kararina-iliskin-kamuoyu-duyurusu)
- [KVKK international transfer guide](https://www.kvkk.gov.tr/Icerik/8143/Kisisel-Verilerin-Yurt-Disina-Aktarilmasi-Rehberi)
- [KVKK deletion guidance](https://www.kvkk.gov.tr/Icerik/2038/kisisel-verilerin-silinmesi-yok-edilmesi-veya-anonim-hale-getirilmesi)
- [Supabase data residency and transfers](https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq)
- [Resend privacy policy](https://resend.com/legal/privacy-policy)
- [Supabase Cron installation](https://supabase.com/docs/guides/cron/install)
- [Supabase Cron scheduling and history](https://supabase.com/docs/guides/cron/quickstart)
