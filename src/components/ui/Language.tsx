import { useLanguageStore } from "../../store/language";

const Language = () => {
  const { lang, setLang } = useLanguageStore();

  return (
    <div className="flex items-center gap-3">
      <div
        role="group"
        aria-label="Language"
        className="flex items-center rounded-md border border-border bg-white p-1 text-sm font-semibold"
      >
        {(["tr", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={`rounded-md px-3 py-1.5 transition-colors duration-200 ${
              lang === code
                ? "bg-black text-white"
                : "text-muted hover:text-black"
            }`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Language;