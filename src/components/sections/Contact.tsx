import {
  ArrowUpRight,
  Mail,
  Send,
  Link as LinkIcon,
} from "lucide-react";

import { site } from "../../data/site";
import { useContactForm } from "../../hooks/useContactForm";

const Contact = () => {
  const { status, handleSubmit } = useContactForm();
  const { contact } = site;
  const { form } = contact;

  // Gerçek bilgiler girilene kadar örnek bağlantıları gizle.
  const visibleLinks = contact.links.filter(
    (link) =>
      !link.value.includes("your@email.com") &&
      !link.value.includes("your-handle") &&
      link.href !== "https://www.linkedin.com/",
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-primary-light/50 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center lg:gap-20">
        {/* Intro and contact links */}
        <div className="flex flex-col items-start">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium text-muted shadow-soft">
            <span
              className="size-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            {contact.availability}
          </span>

          <h2 className="max-w-2xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-black sm:text-5xl md:text-6xl lg:text-7xl">
            {contact.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-lg md:leading-8">
            {contact.description}
          </p>

          <div className="mt-8 flex w-full max-w-xl flex-col gap-3">
            {visibleLinks.map((link) => {
                const Icon = link.label.toLowerCase() === "email"
  ? Mail
  : LinkIcon;

              const isExternal =
                link.href.startsWith("https://");

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-medium sm:px-5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white transition-colors group-hover:bg-primary">
                    <Icon
                      size={18}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {link.label}
                    </span>

                    <span className="mt-0.5 block truncate text-sm font-semibold text-ink sm:text-base">
                      {link.value}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-3xl border border-border bg-white p-5 shadow-soft sm:p-7 md:p-8">
          <div className="mb-7">
            <span className="mb-3 inline-flex size-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <Send size={18} aria-hidden="true" />
            </span>

            <h3 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              {form.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              {form.description}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {form.nameLabel}
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                required
                placeholder={form.namePlaceholder}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {form.emailLabel}
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                placeholder={form.emailPlaceholder}
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-ink outline-none transition placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {form.messageLabel}
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={4}
                maxLength={2000}
                required
                placeholder={form.messagePlaceholder}
                className="w-full resize-y rounded-xl border border-border bg-bg px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Honeypot: simple bot-spam check */}
            <div
              className="absolute -left-[9999px]"
              aria-hidden="true"
            >
              <label htmlFor="contact-botcheck">
                Leave this field empty
              </label>

              <input
                id="contact-botcheck"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending"
                ? form.submittingLabel
                : form.submitLabel}

              <ArrowUpRight
                size={16}
                aria-hidden="true"
              />
            </button>

            {status === "success" && (
              <p
                role="status"
                className="text-sm font-medium text-emerald-700"
              >
                {form.successMessage}
              </p>
            )}

            {status === "error" && (
              <p
                role="alert"
                className="text-sm font-medium text-red-600"
              >
                {form.errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-border/80 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{contact.footer.copyright}</p>

        <p>{contact.footer.builtWith}</p>

        <a
          href="#top"
          className="inline-flex items-center gap-1 font-medium text-ink transition hover:text-primary"
        >
          {contact.footer.backToTop}
          <ArrowUpRight
            size={13}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
};

export default Contact;