import { ArrowUpRight, Copy, Mail, Check } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { site, socialLinks } from "../../data/site";

import Button from "../ui/Button";
import { useState } from "react";

const Contact = () => {
  const { contact } = site;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("kaandeveloperr07@gmail.com");

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
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
                <div className="flex items-center gap-2 font-semibold">
                  <Check size={13} strokeWidth={4} />
                  <span>Copied</span>
                </div>
              ) : (
                <div onClick={handleCopy} className="inline-flex cursor-pointer items-center gap-2 rounded-full py-3 bg-black text-white rounded-full px-4 py-2 text-xs font-semibold select-none">
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

      <div className="flex flex-col"></div>
    </section>
  );
};

export default Contact;
