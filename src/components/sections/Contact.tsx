import { ArrowUpRight, ArrowRight, Copy, Check } from "lucide-react";
import clsx from "clsx";
import Reveal from "../ui/Reveal";
import Contactİmage from "../../assets/images/Contactİmage.png";

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
        body: {
          name,
          email,
          subject,
          otherSubject,
          message: messageText,
          website,
        },
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
      className="mt-6 w-full rounded-2xl border border-border bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          className="relative w-full min-w-0 gap-8 px-5 py-6 sm:px-6 lg:px-8 lg:py-14"
        >
          <div className="flex min-w-0 flex-col gap-5">

            <h2 className="mb-3 font-display text-3xl md:text-4xl font-semibold tracking-tight text-black">
              {contact.title}
            </h2>

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
                  placeholder={form.namePlaceholder}
                  required
                  maxLength={50}
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
                  placeholder={form.emailPlaceholder}
                  required
                  maxLength={100}
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
                    {form.otherSubjectLabel}
                  </label>
                  <input
                    type="text"
                    id="contact-other-subject"
                    name="otherSubject"
                    placeholder={form.otherSubjectPlaceholder}
                    required
                    maxLength={100}
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
                  {message.length} / 1000 {form.characters}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                placeholder={form.messagePlaceholder}
                required
                maxLength={1000}
                onChange={handleMessageChange}
                rows={5}
                className="w-full min-h-40 resize-y rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <p className="text-sm leading-6 text-muted">
                  {form.privacyNote}{" "}
                </p>
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm text-ink underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  {form.privacyTitle}
                  <span className="sr-only"> {site.accessibility.opensInNewTab}</span>
                </a>
              </div>

              <button
                type="submit"
                disabled={submitState === "sending"}
                className="group inline-flex h-12 w-full lg:max-w-50 cursor-pointer items-center justify-center gap-2 rounded-md bg-black px-7 text-sm font-medium tracking-tight text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100"
              >
                {submitState === "sending"
                  ? form.submittingLabel
                  : form.submitLabel}
                <ArrowRight
                  size={16}
                  strokeWidth={1.75}
                  className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
                  </form>

          <div className="relative w-full h-full">
            <img src={Contactİmage} alt="" className="object-contain rounded-b-2xl md:rounded-r-2xl" />
          </div>
      </div>
    </section>
  );
};

export default Contact;
