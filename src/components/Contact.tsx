import { useState, useEffect, type ChangeEvent } from "react";

import { Send, Copy, ShieldCheck, Check, MapPin, Clock } from "lucide-react";
import SocialMedias from "./SocialMedias";

declare global {
  interface Window {
    onTurnstileSuccess: (token: string) => void;
  }
}

const MY_EMAIL: string = "khamitler@gmail.com"

interface State {
  name: string;
  email: string;
  subject: string;
  otherSubject: string;
  message: string;
  loading: boolean;
}

const INITIAL_STATE: State = {
  name: "",
  email: "",
  subject: "",
  otherSubject: "",
  message: "",
  loading: false,
}

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
  }, []);


  const handleFieldChange =
    (field: keyof Omit<State, "loading">) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ): void => {
      setState((previous) => ({
        ...previous,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (state.loading) return;

    setState((previous) => ({
      ...previous,
      loading: true,
    }));
    setErrorMsg("");
    setSuccessMsg(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name.trim(),
          email: state.email.trim(),
          subject:
            state.subject === "other"
              ? state.otherSubject.trim()
              : state.subject,
          message: state.message.trim(),
          turnstileToken: turnstileToken,
          honeypot: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Message could not be sent.");
      }

      console.log("Message sent:", data);

      setState(INITIAL_STATE);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setErrorMsg(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setState((previous) => ({
        ...previous,
        loading: false,
      }));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MY_EMAIL);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Email copy failed:", err);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <span className="text-text-muted text-md">GET IN TOUCH</span>
        <h4 className="text-text-primary text-5xl font-bold pb-2">
          Let's Build Something Together
        </h4>
        <p className="text-text-secondary text-md">
          I&apos;m currently available for freelance and full-time
          opportunities.
          <br />
          If you have a project, idea or just want to say hi, feel free to reach
          out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-surface border border-border rounded-panel-lg shadow-panel p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-text-secondary text-ui-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name..."
                value={state.name}
                onChange={handleFieldChange("name")}
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-text-secondary text-ui-sm font-medium">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={state.email}
                onChange={handleFieldChange("email")}
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-text-secondary text-ui-sm font-medium">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={state.subject}
                onChange={handleFieldChange("subject")}
                required
                className="cursor-pointer bg-background border border-border rounded-lg px-4 py-3 text-text-muted text-ui-lg outline-none focus:border-accent transition-colors duration-200 appearance-none"
              >
                <option value="" disabled hidden>
                  What is this about?
                </option>
                <option value="freelance">Freelance Project</option>
                <option value="job">Job Opportunity</option>
                <option value="collaboration">
                  Collaboration / Open Source
                </option>
                <option value="feedback">Feedback on my Work</option>
                <option value="question">General Question</option>
                <option value="other">Other</option>
              </select>

              {state.subject === "other" && (
                <input
                  type="text"
                  name="otherSubject"
                  value={state.otherSubject}
                  onChange={handleFieldChange("otherSubject")}
                  placeholder="Please specify..."
                  required
                  className="mt-2 bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-text-secondary text-ui-sm font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={state.message}
                onChange={handleFieldChange("message")}
                required
                maxLength={600}
                rows={5}
                placeholder="Tell me about your project, idea or how I can help..."
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200 resize-none"
              />
              <span className="text-text-muted text-ui-sm text-right">
                {state.message.length}/600
              </span>
            </div>

            <div style={{display: 'none'}}>
              <input type="text" name="honeypot" value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1}
              autoComplete="off" />
            </div>

            <div className="cf-turnstile" data-sitekey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY} data-callback="onTurnstileSuccess" data-theme="dark"></div>

            

            {errorMsg && (
              <div role="alert" className="text-status-error text-sm font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div role="alert" className="text-status-available text-sm font-medium">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={state.loading}
                className="w-[55%] shrink-0 inline-flex h-12 items-center justify-center gap-3.5 rounded-button bg-accent px-6 text-sm font-medium text-primary shadow-button transition-all duration-200 ease-smooth hover:bg-accent-hover hover:shadow-accent active:bg-accent-active active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                <span>{state.loading ? "Sending..." : "Send Message"}</span>
              </button>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-[35%] shrink-0 inline-flex h-12 items-center justify-center gap-2 rounded-button border border-border bg-surface-elevated px-6 text-sm font-medium text-text-primary transition-colors duration-200 hover:bg-surface-hover cursor-pointer"
              >
                {copied ? (
                  <div className="flex items-center gap-2 text-status-available">
                    <Check size={16} />
                    <span>Copied!</span>
                  </div>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-start mt-2 gap-3 text-text-secondary">
              <ShieldCheck size={18} />
              <span className="text-text-muted text-xs">Usually respond within 1-2 business days.</span>
            </div>
          </form>
        </div>

        <div className="bg-surface border border-border rounded-panel-lg shadow-panel p-8 md:p-10 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-text-muted text-xs font-semibold tracking-wider uppercase">
                DIRECT CHANNELS
              </span>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-text-secondary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-available opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-available" />
                </span>
                <span>Open for opportunities</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-text-primary mt-4">
              Connect & Follow
            </h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              Prefer quick messaging or following my work? Feel free to reach out directly through any of these platforms.
            </p>

            <div className="mt-6 space-y-3">
              <SocialMedias />
            </div>
          </div>

          <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-border bg-surface-elevated/70 p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <MapPin size={14} className="text-accent" />
                <span>Location</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">Türkiye</span>
              <span className="text-xs text-text-muted">Remote Worldwide (GMT+3)</span>
            </div>

            <div className="rounded-xl border border-border bg-surface-elevated/70 p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <Clock size={14} className="text-status-available" />
                <span>Response Time</span>
              </div>
              <span className="text-sm font-semibold text-text-primary">&lt; 24 Hours</span>
              <span className="text-xs text-text-muted">Fast & direct replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
