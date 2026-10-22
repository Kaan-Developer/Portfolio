import { Copy, Check } from "lucide-react";
import clsx from "clsx";

import { site, socialLinks } from "../../data/site";

import { useEffect, useState } from "react";

import Select from "../ui/Select";

import { getSupabase } from "../../lib/supabase";

const Contact = () => {
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
      setMessage(text.slice(0, 250));
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

    if (
      !name ||
      name.length > 50 ||
      !email ||
      email.length > 100 ||
      !messageText ||
      messageText.length > 250
    ) {
      setSubmitState("error");
      return;
    }

    setSubmitState("sending");
    try {
      const { error } = await getSupabase().functions.invoke("contact", {
        body: { name, email, subject, otherSubject, message: messageText },
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
      className="relative grid min-w-0 grid-cols-1 gap-8 px-0 py-10 sm:px-4 md:px-10 md:py-14 xl:grid-cols-2 xl:gap-12"
    >
      <div className="flex min-w-0 flex-col items-start self-start">
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
              <span role="status" lang={copyState === "copied" ? "tr" : undefined}>
                {copyState === "copied"
                  ? "Kopyalandı"
                  : copyState === "copying"
                    ? "Copying..."
                    : "Copy Email"}
              </span>
            </button>
          </div>
          {copyState === "error" && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              Could not copy. Select the email address above or open it in your email app.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-black bg-black text-white transition-colors duration-150 hover:border-ink hover:bg-ink active:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black motion-reduce:transition-none"
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full min-w-0 flex-col gap-5 self-start rounded-2xl border border-border bg-white p-5 sm:p-6 lg:p-8"
      >
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

        <div className="flex min-w-0 flex-col gap-2">
          <label
            htmlFor="contact-subject"
            className="text-balance font-semibold text-md"
          >
            {form.subjectLabel}
          </label>
          <Select
            id="contact-subject"
            name="subject"
            placeholder={form.subjectPlaceholder}
            options={form.subjectOptions}
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
                className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
              />
            </>
          )}
        </div>

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
                "font-semibold text-red-600": message.length >= 250,
                "text-subtle": message.length < 250,
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
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-6 text-muted">
            {form.privacyNote}{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Contact privacy notice
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <button
            type="submit"
            disabled={submitState === "sending"}
            className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-7 text-sm font-medium tracking-tight text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            {submitState === "sending" ? "Sending..." : "Send Message"}
          </button>

          {submitState !== "idle" && (
            <p
              role={submitState === "error" ? "alert" : "status"}
              className={`text-center text-sm ${submitState === "error" ? "text-red-600" : "text-subtle"}`}
            >
              {submitState === "success"
                ? "Message saved. Thank you."
                : submitState === "error"
                  ? "Message could not be sent. Check the fields and try again."
                  : "Sending your message..."}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Contact;
