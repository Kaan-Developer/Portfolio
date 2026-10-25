import { ArrowUpRight, Copy, Check, Send } from "lucide-react";
import clsx from "clsx";
import Reveal from "../ui/Reveal";

import { socialLinks } from "../../data/socialLinks";
import { useSite } from "../../hooks/useSite";

import { useEffect, useState } from "react";

import Select from "../ui/Select";

import { getSupabase } from "../../lib/supabase";

const Contact = () => {
  const site = useSite();
  const { contact } = site;
  const { form } = contact;

  const [copyState, setCopyState] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 1000) {
      setMessage(text);
    } else {
      setMessage(text.slice(0, 1000));
    }
  };

  useEffect(() => {
    if (copyState !== "copied") return;

    const timeout = setTimeout(() => setCopyState("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [copyState]);

  const handleCopy = async () => {
    setCopyState("copying");

    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const otherSubject = String(formData.get("otherSubject") ?? "").trim();
    const messageText = String(formData.get("message") ?? "").trim();

    const website = String(formData.get("website") ?? "");

    if (
      !name ||
      name.length > 50 ||
      !email ||
      email.length > 100 ||
      !messageText ||
      messageText.length > 1000
    ) {
      setSubmitState("error");
      return;
    }

    setSubmitState("sending");
    try {
      const { error } = await getSupabase().functions.invoke("contact", {
        body: { name, email, subject, otherSubject, message: messageText, website },
      });

      if (error) {
        console.error("Contact form submission failed:", error);
        setSubmitState("error");
        return;
      }

      formElement.reset();
      setMessage("");
      setSelectedSubject("");
      setSubmitState("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitState("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative grid min-w-0 grid-cols-1 gap-8 px-0 py-10 mt-6 sm:px-4 md:px-10 md:py-14 xl:grid-cols-2 xl:gap-12"
    >
      <Reveal className="min-w-0">
                  <h2 className="max-w-lg text-balance text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
          {contact.title}
        </h2>
                  <p className="mt-5 max-w-md text-base leading-7 text-muted md:text-lg md:leading-8">
          {contact.description}
        </p>

        <div className="mt-8 w-full max-w-md border-t border-border pt-6">
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                          <p className="text-sm text-muted">Email:</p>
                          <a
              href={`mailto:${contact.email}`}
              className="min-w-0 select-text break-all text-base font-medium text-ink underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:text-lg"
            >
              {contact.email}
            </a>
              <button
              type="button"
              onClick={handleCopy}
              disabled={copyState === "copying"}
              aria-busy={copyState === "copying"}
              className="inline-flex min-h-11 shrink-0 select-none items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-white transition-colors bg-black text-white hover:bg-ink"
            >
              {copyState === "copied" ? (
                <Check size={16} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
              )}
              <span
                role="status"
                lang={copyState === "copied" ? "tr" : undefined}
              >
                {copyState === "copied"
                  ? site.buttons.succesCopy
                  : copyState === "copying"
                    ? site.buttons.copyLoading
                    : site.buttons.copyEmailBtn}
              </span>
            </button>
          </div>
          {copyState === "error" && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              Could not copy. Select the email address above or open it in your
              email app.
            </p>
          )}
          <div className="mt-6 w-full divide-y divide-border border-y border-border">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                  <a
                  key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name}: ${item.username}`}
                    title={item.name}
                    className="group flex min-h-16 w-full items-center gap-3 py-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-black">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col items-start">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="max-w-full break-all text-xs underline underline-offset-2">
                        {item.username}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-muted group-hover:text-black"
                      aria-hidden="true"
                    />
                  </a>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal className="min-w-0" delay={0.08}>
        <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full min-w-0 flex-col gap-5 self-start rounded-2xl border border-border bg-white p-5 sm:p-6 lg:p-8"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <div className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="contact-name"
                className="text-balance font-semibold text-md"
              >
                {form.nameLabel}
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={50}
                placeholder={form.namePlaceholder}
                className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
              />
            </div>


            <div className="flex min-w-0 flex-col gap-2">
              <label
                htmlFor="contact-email"
                className="text-balance font-semibold text-md"
              >
                {form.emailLabel}
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                required
                maxLength={100}
                placeholder={form.emailPlaceholder}
                className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
              />
            </div>
        </div>


          <fieldset className="min-w-0">
            <legend className="text-balance font-semibold text-md mb-2">
              {form.subjectLabel}
              <span className="ml-1.5 font-normal text-muted">
                {form.subjectOptionalLabel}
              </span>
            </legend>
            <Select
              id="contact-subject"
              name="subject"
              options={form.subjectOptions}
              value={selectedSubject}
              onChange={setSelectedSubject}
            />
            {selectedSubject === "other" && (
              <>
                <label htmlFor="contact-other-subject" className="sr-only">
                  Other subject
                </label>
                <input
                  type="text"
                  id="contact-other-subject"
                  name="otherSubject"
                  required
                  maxLength={100}
                  placeholder="Please specify"
                  className="mt-3 w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
                />
              </>
            )}
          </fieldset>

          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="contact-message"
                className="text-balance font-semibold text-md"
              >
                {form.messageLabel}
              </label>
              <span
                className={clsx("text-xs", {
                  "font-semibold text-red-600": message.length >= 1000,
                  "text-subtle": message.length < 1000,
                })}
              >
                {message.length} / 1000 characters
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              required
              maxLength={1000}
              onChange={handleMessageChange}
              placeholder={contact.form.messagePlaceholder}
              rows={5}
              className="w-full min-h-40 resize-y rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
            ></textarea>
          </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          <div className="w-full">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm leading-6 text-muted">{form.privacyNote} </p>
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sm text-ink underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {form.privacyTitle}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="w-full">
            <button
              type="submit"
              disabled={submitState === "sending"}
              className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-7 text-sm font-medium tracking-tight text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100"
            >
              {submitState === "sending"
                ? form.submittingLabel
                : form.submitLabel}
              <Send
                size={16}
                strokeWidth={1.75}
                className="shrink-0"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </form>
      </Reveal>
    </section>
  );
};

export default Contact;
