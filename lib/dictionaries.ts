import "server-only";
import type { Locale } from "@/middleware";

// We enumerate all dictionaries here for better typings
const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  id: () => import("@/dictionaries/id.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
