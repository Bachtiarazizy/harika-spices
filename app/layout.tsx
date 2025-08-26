import type { Metadata } from "next";
import { Calistoga, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-calistoga",
  weight: ["400"], // Calistoga cuma ada 1 weight
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mindjourneyme | A journal of Growing through it",
  description: "Explore the latest articles on business, beauty, technology, and more. Stay updated with insights and trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${calistoga.variable} ${raleway.variable} antialiased`}>
        <Navbar />
        {/* <PageTransition> */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
