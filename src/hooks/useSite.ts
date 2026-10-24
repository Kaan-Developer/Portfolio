import { useLanguageStore } from "../store/language";
import { enSite } from "../data/enSite";
import { trSite } from "../data/trSite";

export const useSite = () =>
    useLanguageStore((state) => state.lang) === "tr" ? trSite : enSite;