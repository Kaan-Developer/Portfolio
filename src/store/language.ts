import { create } from "zustand";

export type Lang = "en" | "tr";

const getInitialLang = (): Lang => {
    try {
        const saved = localStorage.getItem("lang");
        if (saved === "en" || saved === "tr") return saved;
    } catch {

    }
    return navigator.language.startsWith("tr") ? "tr" : "en";
};

const initial = getInitialLang();
document.documentElement.lang = initial;

export const useLanguageStore = create<{
    lang: Lang;
    setLang: (lang: Lang) => void;
}>((set) => ({
    lang: initial,
    setLang: (lang) => {
        try {
            localStorage.setItem("lang", lang);
        } catch {

        }
        document.documentElement.lang = lang;
        set({ lang });
    }
}));