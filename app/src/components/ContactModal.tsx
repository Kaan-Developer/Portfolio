import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, X as CloseIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { useToggleStore } from "../store/contactStore";

interface ContactItem {
  icon: IconType;
  title: string;
  p: string;
  connectIcon: LucideIcon;
  href?: string;
}

const contactCardClassName =
  "group flex min-h-[72px] w-full items-center gap-4 rounded-xl border border-border-strong bg-surface/45 px-4 py-3.5 transition-all duration-200 hover:border-accent/70 hover:bg-accent/5 hover:shadow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

const contacts: ContactItem[] = [
  {
    icon: FaGithub,
    title: "GitHub",
    p: "Explore my repositories",
    connectIcon: ExternalLink,
    href: "https://github.com/Kaan-Developer",
  },
  {
    icon: FaTelegram,
    title: "Telegram",
    p: "Send me a message",
    connectIcon: ExternalLink,
  },
  {
    icon: FaXTwitter,
    title: "X",
    p: "Follow my updates",
    connectIcon: ExternalLink,
  },
];

const ContactModal = () => {
  const toggleContactModal = useToggleStore((state) => state.toggle);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleContactModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleContactModal]);

  return (
    <div
      className="fixed inset-0 z-modal grid place-items-center overflow-y-auto bg-background-deep/75 px-4 py-6 backdrop-blur-sm animate-fade-in sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          toggleContactModal();
        }
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby="contact-modal-description"
        className="relative w-full max-w-md overflow-hidden rounded-panel-lg border border-border-strong bg-surface-elevated p-5 text-text-primary shadow-panel-lg animate-scale-in sm:p-7"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={toggleContactModal}
          aria-label="Close contact dialog"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:right-5 sm:top-5"
        >
          <CloseIcon size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>

        <div className="px-8 text-center">
          <h2
            id="contact-modal-title"
            className="text-xl font-semibold tracking-[-0.03em] text-text-primary sm:text-2xl"
          >
            Connect with me
          </h2>
          <p
            id="contact-modal-description"
            className="mt-1.5 text-sm leading-6 text-text-muted"
          >
            Choose where you'd like to connect.
          </p>
        </div>

        <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const ConnectIcon = contact.connectIcon;
            const content = (
              <>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background-deep text-text-primary transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-text-primary">
                    {contact.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{contact.p}</p>
                </div>

                <ConnectIcon
                  className="h-[18px] w-[18px] shrink-0 text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
              </>
            );

            if (contact.href) {
              return (
                <a
                  key={contact.title}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${contact.title} in a new tab`}
                  className={contactCardClassName}
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={contact.title}
                className={contactCardClassName}
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
