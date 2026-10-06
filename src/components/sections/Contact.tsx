// src/components/sections/Contact.tsx
import { useContactForm } from "../../hooks/useContactForm";

import { site } from "../../data/site";

const inputClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-ink " +
  "placeholder:text-subtle focus:border-primary focus:outline-none";

const Contact = () => {
  const { status, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-col items-start justify-center gap-3">
            <h1  className="text-balance text-4xl font-black leading-[0.95] tracking-[-0.05em] md:text-6xl"></h1>
        </div>
    </section>
  );
};

export default Contact;