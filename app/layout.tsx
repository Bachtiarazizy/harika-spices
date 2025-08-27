import type { Metadata } from "next";
import { Calistoga, Raleway } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const calistoga = Calistoga({
  subsets: ["latin"],
  variable: "--font-calistoga",
  weight: ["400"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Harika Spices - Premium Indonesian Spice Exporter | Bulk Spices Supplier",
    template: "%s | Harika Spices",
  },
  description: "Harika Spices is a premium Indonesian spice exporter and supplier specializing in bulk export of high-quality cloves, vanilla, turmeric, ginger, and other authentic Indonesian spices. Sustainable sourcing, quality assured.",
  keywords: [
    "Indonesian spices Exporter",
    "bulk spice exporter",
    "premium cloves Supplier",
    "vanilla beans",
    "turmeric powder",
    "spice supplier",
    "sustainable spices",
    "export quality spices",
    "ginger",
    "authentic spices",
    "spice trade",
    "organic spices",
    "spice sourcing",
    "spice export",
  ],
  authors: [{ name: "Harika Spices" }],
  creator: "Harika Spices",
  publisher: "Harika Spices",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://harikaspices.com/",
    languages: {
      "en-US": "https://harikaspices.com/en/",
      "id-ID": "https://harikaspices.com/id/",
    },
  },
  verification: {
    google: "VW3odjsyFg9cGTm7F8Xg4TyXxR1g5r4_3QOjhqWAjEA",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-site-verification-code",
  },
  category: "Food Export",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
  },
  metadataBase: new URL("https://harikaspices.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harikaspices.com/",
    siteName: "Harika Spices",
    title: "Harika Spices - Premium Indonesian Spice Exporter",
    description: "Premium Indonesian spice exporter specializing in bulk export of high-quality cloves, vanilla, turmeric, and other authentic spices.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Harika Spices - Premium Indonesian Spice Exporter and Supplier",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "Harika Spices Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@harikaspices",
    creator: "@harikaspices",
    title: "Harika Spices - Premium Indonesian Spice Exporter | Bulk Spices Supplier",
    description: "Premium Indonesian spice exporter and supplier specializing in bulk export of high-quality cloves, vanilla, turmeric, and other authentic spices.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/shortcut-icon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-640x1136.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-750x1334.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-1242x2208.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-1125x2436.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-828x1792.png",
      },
      {
        rel: "apple-touch-startup-image",
        url: "/apple-touch-startup-image-1242x2688.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Harika Spices",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Harika Spices",
    "msapplication-TileColor": "#8B4513",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#8B4513",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${calistoga.variable} ${raleway.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WDNX2JB8');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google Analytics (GA4) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-DRPMZYW64K" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DRPMZYW64K');
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* Preload Critical Resources */}
        <link rel="preload" as="image" href="/assets/hero-spices-collage.webp" />
        <link rel="preload" as="image" href="/assets/indonesian-spice-farm.webp" />
        <link rel="preload" as="image" href="/assets/product-cloves.webp" />
        <link rel="preload" as="image" href="/assets/product-vanilla.webp" />
        <link rel="preload" as="image" href="/assets/product-turmeric.webp" />
        <link rel="preload" as="image" href="/assets/product-black-pepper.webp" />

        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Preconnect for Critical Third-party Origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* Analytics - Load Asynchronously */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="TM2h5aRMZqricDlEx6n83Q" async />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />

        {/* Business Information */}
        <meta name="contact" content="info@harikaspices.com" />
        <meta name="reply-to" content="info@harikaspices.com" />
        <meta name="owner" content="Harika Spices" />
        <meta name="url" content="https://harikaspices.com" />
        <meta name="identifier-URL" content="https://harikaspices.com" />
        <meta name="directory" content="submission" />
        <meta name="category" content="Food Export, Spices, Indonesian Products" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />

        {/* Cache Control */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
        <meta httpEquiv="Expires" content="31536000" />
      </head>

      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WDNX2JB8" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Structured Data for SEO */}
        <StructuredData />

        {/* Skip to Content for Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />

        {/* Performance Optimization Script */}
        <Script
          id="performance-optimization"
          dangerouslySetInnerHTML={{
            __html: `
              // Move icons to head for better performance
              document.querySelectorAll('body link[rel="icon"], body link[rel="apple-touch-icon"]').forEach(el => document.head.appendChild(el));
              
              // Lazy load non-critical images
              if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      img.classList.remove('lazy');
                      imageObserver.unobserve(img);
                    }
                  });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
