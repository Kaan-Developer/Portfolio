import { useEffect, useRef } from "react";
import { X as CloseIcon } from "lucide-react";
import { useToggleStore } from "../store/followStore";

import SocialMedias from "./SocialMedias";

const FollowModal = () => {
  const toggleFollowModal = useToggleStore((state) => state.toggle);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleFollowModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleFollowModal]);

  return (
    <div
      className="fixed inset-0 z-modal grid place-items-center overflow-y-auto bg-background-deep/75 px-4 py-6 backdrop-blur-sm animate-fade-in sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          toggleFollowModal();
        }
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="follow-modal-title"
        aria-describedby="follow-modal-description"
        className="relative w-full max-w-md overflow-hidden rounded-panel-lg border border-border-strong bg-surface-elevated p-5 text-text-primary shadow-panel-lg animate-scale-in sm:p-7"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={toggleFollowModal}
          aria-label="Close follow dialog"
          className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 sm:right-5 sm:top-5"
        >
          <CloseIcon size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>

        <div className="px-8 text-center">
          <h2
            id="follow-modal-title"
            className="text-xl font-semibold tracking-[-0.03em] text-text-primary sm:text-2xl"
          >
            Stay Updated
          </h2>
          <p
            id="follow-modal-description"
            className="mt-1.5 text-sm leading-6 text-text-muted"
          >
            Choose where you'd like to connect.
          </p>
        </div>

        <div className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
          <SocialMedias />
        </div>
      </div>
    </div>
  );
};

export default FollowModal;
