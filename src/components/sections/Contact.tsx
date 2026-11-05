import { ArrowRight } from "lucide-react";
import { CircleCheck, CircleAlert } from "lucide-react";
import clsx from "clsx";
import Zarf from "../../assets/images/Zarf.png";

import { useSite } from "../../hooks/useSite";

import { useEffect, useState } from "react";

import Select from "../ui/Select";

import { getSupabase } from "../../lib/supabase";

const Contact = () => {
  const site = useSite();
  const { contact } = site;
  const { form } = contact;

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

  useEffect(() => {
    if (submitState !== "success" && submitState !== "error") return;
    const duration = submitState === "success" ? 5000 : 8000;

    const timer = window.setTimeout(() => {
      setSubmitState("idle");
    }, duration);

    return () => window.clearTimeout(timer);
  }, [submitState]);

  return (
    <>
      <section id="contact" className="mt-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-black md:text-6xl lg:text-7xl">
            {site.contact.title}
          </h2>
          <div className="text-muted text-center mt-2">
            <p>{site.contact.description}</p>
            <p>{site.contact.responseTime}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 py-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:py-14">
          <form
            onSubmit={handleSubmit}
            className="w-full min-w-0 gap-8 lg:pt-0"
          >
            <div className="flex min-w-0 flex-col gap-5">
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
                    <span className="sr-only">
                      {" "}
                      {site.accessibility.opensInNewTab}
                    </span>
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={submitState === "sending"}
                  className="group inline-flex h-12 w-full lg:max-w-50 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-7 text-sm font-medium tracking-tight text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98] disabled:cursor-wait disabled:opacity-60 motion-reduce:transition-none motion-reduce:active:scale-100"
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

              {submitState === "error" && (
                <div
                  role="alert"
                  className="flex items-center pointer-events-auto w-full max-w-lg gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
                >
                  <div className="bg-muted/10 rounded-md p-2">
                    <CircleAlert
                      size={25}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <p className="font-semibold">{form.errorTitle}</p>
                    <p className="mt-1 text-sm">{form.errorMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </form>

          <div className="hidden self-center lg:block">
            <img src={Zarf} alt="" className="block h-auto w-full rounded-md" />
          </div>
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-4 bottom-10 right-10 z-[60] flex justify-end">
        {submitState === "success" && (
          <div
            role="status"
            className="flex items-center pointer-events-auto w-full max-w-lg gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"
          >
            <div className="bg-muted/10 rounded-md p-2">
              <CircleCheck size={25} className="shrink-0" aria-hidden="true" />
            </div>

            <div>
              <p className="font-semibold">{form.successTitle}</p>
              <p className="mt-1 text-sm">{form.successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
