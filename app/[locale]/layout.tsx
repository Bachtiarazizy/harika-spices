import { ReactNode } from "react";
import "../globals.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale, supportedLocales } from "@/middleware";
import { getDictionary } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import LenisProvider from "@/lib/lennis-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "Harika Spices - Premium Indonesian Spices",
      template: "%s | Harika Spices",
    },
    description: "Harika Spices transforms premium Indonesian spices into global culinary experiences, connecting farmers to international kitchens.",
  };
}

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) {
  // Validate that the locale exists
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Get dictionary data for the locale
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <LenisProvider>
          <Header currentLocale={locale} dictionary={dictionary} />
          <main>{children}</main>
          <Footer dictionary={dictionary} />
        </LenisProvider>
      </body>
    </html>
  );
}
