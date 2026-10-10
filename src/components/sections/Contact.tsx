import { ArrowUpRight, Copy, Mail, Check, Lock } from "lucide-react";

import { site, socialLinks } from "../../data/site";

import { useState } from "react";

import Select from "../ui/Select";

import { supabase } from "../../lib/supabase";

const Contact = () => {
  const { contact } = site;
  const { form } = contact;

  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);

    // Kullanıcı metni siliyorsa her zaman izin ver
    if (text.length < message.length) {
      setMessage(text);
      return;
    }

    // Kelime sayısı 250'den azsa izin ver
    if (words.length < 250) {
      setMessage(text);
      return;
    }

    // Tam 250 kelimedeyken: son kelimenin sonuna yeni bir boşluk (yeni kelime başlangıcı) eklenemez
    if (words.length === 250) {
      // Eğer metin zaten 250 kelimeyse ve kullanıcı en sona yeni boşluk eklemeye çalışıyorsa engelle
      if (text.endsWith(" ") || text.endsWith("\n")) {
        // En sondaki boşluğu ekletme
        setMessage(text.trimEnd());
        return;
      }
      setMessage(text);
      return;
    }

    // 250'den fazla kelime yapıştırıldıysa: tam 250 kelimede kes
    const first250Words = words.slice(0, 250).join(" ");
    setMessage(first250Words);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("kaandeveloperr07@gmail.com");

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
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

    if (!name || !email || !subject || !messageText || (subject === "other" && !otherSubject)) {
      setSubmitState("error");
      return;
    }

    setSubmitState("sending");
    try {
      const { error } = await supabase.functions.invoke("contact", {
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative
       overflow-hidden
       px-6 py-20 md:px-10 md:py-28"
    >
      <div className="flex flex-col justify-center">
        <h1 className="mt-3 max-w-xl text-balance text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl">
          {contact.title}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">
          {contact.description}
        </p>

        {/* Contact Info Boxes */}
        <div className="mt-8 flex flex-col gap-4 max-w-xl">
          {/* Email Box */}
          <div className="group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft">
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                  <Mail size={22} strokeWidth={1.9} />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                    Direct Contact
                  </span>
                  <p className="text-sm font-medium text-ink">Email Address</p>
                </div>
              </div>

              {copied ? (
                <div className="inline-flex cursor-pointer items-center gap-2 rounded-full py-3 bg-black text-white rounded-full px-4 py-2 text-xs font-semibold select-none">
                  <Check size={13} strokeWidth={2.2} />
                  <span>Copied</span>
                </div>
              ) : (
                <div
                  onClick={handleCopy}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full py-3 bg-black text-white rounded-full px-4 py-2 text-xs font-semibold select-none"
                >
                  <Copy size={13} strokeWidth={2.2} />
                  <span>Copy Email</span>
                </div>
              )}
            </div>
          </div>
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium hover:border-black/30"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-subtle">
                      {item.name}
                    </span>
                    <p className="truncate text-base font-bold tracking-tight text-ink">
                      {item.username}
                    </p>
                  </div>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-bg text-ink transition-all duration-200 group-hover:border-black group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col rounded-xl bg-white gap-4 shadow-soft border border-border p-10 h-full w-full"
      >
        <h2 className="text-balance text-2xl font-bold tracking-tight lg:text-4xl">
          {contact.hi}
        </h2>
        <div className="flex flex-col gap-2">
          <span className="text-balance font-semibold text-md">
            {form.nameLabel}
          </span>
          <input
            type="text"
            name="name"
            required
            maxLength={100}
            placeholder={form.namePlaceholder}
            className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-balance font-semibold text-md">
            {form.emailLabel}
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            placeholder={form.emailPlaceholder}
            className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-balance font-semibold text-md">
            {form.subjectLabel}
          </span>
          <Select
            name="subject"
            placeholder={form.subjectPlaceholder}
            options={form.subjectOptions}
            onChange={setSelectedSubject}
          />
          {selectedSubject === "other" && (
            <input
              type="text"
              name="otherSubject"
              required
              maxLength={120}
              placeholder="Please specify"
              className="w-full h-12 rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 min-h-0">
          <span className="text-balance font-semibold text-md">
            {form.messageLabel}
          </span>
          <textarea
            name="message"
            value={message}
            required
            maxLength={5000}
            onChange={handleMessageChange}
            placeholder={contact.form.messagePlaceholder}
            className="w-full min-h-44 flex-1 resize-none rounded-md border border-border bg-white p-4 text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary-light"
          ></textarea>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={submitState === "sending"}
            className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-7 text-sm font-medium tracking-tight text-white transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-ink active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            {submitState === "sending" ? "Sending..." : "Send"}
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
          {/* Privacy note under the send button */}
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-subtle">
            <Lock
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className="shrink-0"
            />
            {form.privacyNote}
          </p>
        </div>
      </form>
    </section>
  );
};

export default Contact;
