import { useState } from "react";

import { Send, Copy, ShieldCheck, Check } from "lucide-react";

const MY_EMAIL: string = "khamitler@gmail.com"

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [otherSubject, setOtherSubject] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(MY_EMAIL);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kopyalama başarısızİ:", err)
    }
  }

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
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-ui-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name..."
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-ui-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-ui-sm font-medium">
                Subject
              </label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}
               className="cursor-pointer bg-background border border-border
                rounded-lg px-4 py-3 text-text-muted text-ui-lg outline-none 
              focus:border-accent transition-colors duration-200 appearance-none">
                <option value="" disabled selected hidden>
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

              {subject === "other" && (
                <input type="text"
                value={otherSubject}
                onChange={(e) => setOtherSubject(e.target.value)}
                placeholder="Please specify..."
                className="mt-2 bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200" />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="text-text-secondary text-ui-sm font-medium"
              >
                Message
              </label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                id="message"
                maxLength={600}
                rows={5}
                placeholder="Tell me about your project, idea or how I can help..."
                className="bg-background border border-border rounded-lg px-4 py-3 text-text-primary text-ui-lg placeholder:text-text-muted outline-none focus:border-accent transition-colors duration-200 resize-none"
              />
              <span className="text-text-muted text-ui-sm text-right">
                {message.length}/600
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                className="w-[55%] shrink-0 inline-flex h-12 items-center
                 justify-center gap-3.5 rounded-button bg-accent px-6 text-sm
                  font-medium text-primary shadow-button transition-all duration-200
                   ease-smooth hover:bg-accent-hover hover:shadow-accent active:bg-accent-active
                    active:scale-[0.98] cursor-pointer"
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>

              <button
              onClick={handleCopyEmail}
                type="button"
                className="w-[35%] shrink-0 inline-flex h-12 items-center
                 justify-center gap-2 rounded-button border border-border bg-surface-elevated
                  px-6 text-sm font-medium text-text-primary transition-colors duration-200
                   hover:bg-surface-hover cursor-pointer"
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
          </form>
        </div>

        <div className="grid-cols-1"></div>
      </div>
    </div>
  );
};

export default Contact;
