import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../data/site";

const PrivacyPage = () => (
  <main className="min-h-screen bg-bg px-6 py-8 text-ink md:px-10 md:py-12">
    <article className="mx-auto max-w-2xl">
      <Link
        to="/#contact"
        aria-label="Back to contact"
        className="inline-flex fixed top-8 left-6 z-50 size-12 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black md:left-10"
      >
        <ArrowLeft size={24} strokeWidth={1.75} aria-hidden="true" />
      </Link>

      <header className="mt-20 border-b border-border pb-8">
        <p className="text-sm font-medium text-muted">{site.name}</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          How your message is handled
        </h1>
        <p className="mt-5 leading-7 text-muted">
          This page describes the current contact-data flow. The complete KVKK
          notice, legal grounds for processing, and international-transfer
          arrangements are still being finalized.
        </p>
      </header>

      <div className="sp6ace-y-8 py-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:leading-7 [&_p]:text-muted [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary">
        <section aria-labelledby="privacy-controller">
          <h2 id="privacy-controller">Who handles your message</h2>
          <p>
            I am {site.name}, the owner of this portfolio and the person
            responsible for the contact form. For questions about your data,
            contact{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </section>

        <section aria-labelledby="privacy-data">
          <h2 id="privacy-data">What the form collects and why</h2>
          <p>
            The form collects your name, email address, subject, and message
            electronically when you submit it. I use these details to read and
            respond to your enquiry. Your email address is also used to limit
            repeated submissions and protect the form from abuse.
          </p>
          <p>
            Please leave out passwords, payment details, identity documents, and
            sensitive personal information that is unnecessary for your enquiry.
          </p>
        </section>

        <section aria-labelledby="privacy-providers">
          <h2 id="privacy-providers">Where your message goes</h2>
          <p>
            Messages are saved in Supabase. The primary database is hosted in
            Ireland, in the eu-west-1 region. Form details are also included in an
            email notification sent through Resend to my Gmail mailbox.
          </p>
          <p>
            Selecting an Irish database region does not mean every provider
            operation is confined to Ireland. See{" "}
            <a href="https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq">
              Supabase&apos;s data-location information
            </a>{" "}
            and the{" "}
            <a href="https://resend.com/legal/privacy-policy">
              Resend privacy policy
            </a>{" "}
            for their processing practices.
          </p>
        </section>

        <section aria-labelledby="privacy-retention">
          <h2 id="privacy-retention">Retention and deletion</h2>
          <p>
            My selected retention period for contact messages is 90 days from
            submission. Automated database deletion has not yet been verified as
            active. Email copies, provider logs, and backups are not covered by
            the database cleanup and require separate retention arrangements.
          </p>
          <p>
            To ask about an existing message or request deletion, email{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </section>

        <section aria-labelledby="privacy-rights">
          <h2 id="privacy-rights">Your rights</h2>
          <p>
            Article 11 of the Turkish Personal Data Protection Law (KVKK) provides
            rights concerning your personal data, including information about
            processing, correction, and deletion when the legal conditions are
            met. You can contact me at the email address above about exercising
            these rights. See the{" "}
            <a href="https://www.kvkk.gov.tr/Icerik/2036/Ilgili-Kisinin-Haklari">
              KVKK information on data-subject rights
            </a>.
          </p>
        </section>
      </div>
    </article>
  </main>
);

export default PrivacyPage;
