import { useLanguageStore } from "../store/language";
import { enSite } from "../data/enSite";
import { trSite } from "../data/trSite";

const sites = { en: enSite, tr: trSite } as const;

export const useSite = () => sites[useLanguageStore((state) => state.lang)];