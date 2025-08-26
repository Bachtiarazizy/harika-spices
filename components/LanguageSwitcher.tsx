"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Import this from your middleware file
const supportedLocales = ["en", "id"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

interface LanguageSwitcherProps {
  currentLocale: SupportedLocale;
}

const localeConfig: Record<SupportedLocale, { name: string; flag: string }> = {
  id: {
    name: "Bahasa Indonesia",
    flag: "https://flagcdn.com/w20/id.png",
  },
  en: {
    name: "English",
    flag: "https://flagcdn.com/w20/gb.png",
  },
};

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const switchLanguage = (locale: string) => {
    if (locale === currentLocale) return;

    // Get path segments after locale
    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, "");

    // Navigate to new path with selected locale
    router.push(`/${locale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  const currentLocaleConfig = localeConfig[currentLocale];

  return (
    <div className="relative" onBlur={handleBlur}>
      {/* Current selected locale button */}
      <button
        onClick={toggleDropdown}
        className="group flex items-center gap-2 px-3 py-2 rounded-lg
            transition-all duration-300
            text-white "
      >
        <span className="relative w-5 h-5">
          <Image src={currentLocaleConfig?.flag} alt={`${currentLocaleConfig?.name} flag`} fill className="object-contain" />
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-lg shadow-xl py-2 z-50 border border-white/20">
          {supportedLocales.map((locale) => {
            const localeData = localeConfig[locale];
            const isActive = currentLocale === locale;

            return (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm
                  transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50
                  ${isActive ? "bg-gradient-to-r from-amber-100 to-orange-100 text-[#8B4513] font-medium" : "text-gray-700 hover:text-[#8B4513]"}`}
              >
                <span className="relative w-5 h-5">
                  <Image src={localeData?.flag} alt={`${localeData?.name} flag`} fill className="object-contain rounded-sm border border-gray-200" />
                </span>
                <span className="flex-1">{localeData?.name}</span>
                {isActive && <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
