"use client";

import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Import this from your middleware file
const supportedLocales = ["en", "id"];

interface LanguageSwitcherProps {
  currentLocale: string;
}

const localeNames: Record<string, string> = {
  id: "Bahasa",
  en: "English",
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

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="group flex items-center gap-2 
            border-2 
            px-4 py-2 rounded-full transition duration-300
            border-[white] text-white hover:text-[#8B4513] hover:bg-[white]"
      >
        <span>{localeNames[currentLocale] || currentLocale}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          {supportedLocales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`block w-full text-left px-4 py-2 text-sm
                ${currentLocale === locale ? "bg-[#F5E6D3] text-[#8B4513]" : "text-gray-700 hover:bg-gray-100"}
                transition duration-300`}
            >
              {localeNames[locale] || locale}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
