import Availeble from "./Available"

import ContactBtn from "./ContactBtn";

const Footer = () => {

    const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };


  return (
  <footer className="relative px-2 w-full">

    <div className="mx-auto grid w-full max-w-[75rem] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-12">
      <div>
        <span className="block text-3xl font-semibold tracking-[-0.035em] text-text-primary sm:text-[2rem]">
          <strong className="text-accent font-medium">Let&apos;s</strong> connect.
        </span>
        <p className="mt-2 text-base text-text-secondary sm:text-lg">
          Frontend projects, ideas or a quick hello.
        </p>
      </div>

      <div className="w-full sm:w-auto sm:justify-self-end [&_button]:h-12 [&_button]:rounded-sm [&_button]:border [&_button]:border-border-hover [&_button]:bg-transparent [&_button]:px-8 [&_button]:shadow-none">
        <ContactBtn name="Contact Me" />
      </div>
    </div>

    <div className="mx-auto grid w-full max-w-[75rem] grid-cols-1 gap-5 px-4 py-6 text-text-secondary sm:grid-cols-3 sm:items-center sm:py-7">
      <span className="text-base">© 2026 Kaan Hamitler</span>

      <button onClick={scrollToTop} aria-label="Sayfanın en üstüne dön." className="flex items-center gap-3 text-base sm:justify-self-center cursor-pointer" type="button">
        <span aria-hidden="true" className="text-2xl text-accent leading-none">
          ↑
        </span>
        <span>Back to top</span>
      </button>

      <div className="sm:justify-self-end">
        <Availeble />
      </div>
    </div>

  </footer>
  )
};

export default Footer;
