"use client";

export default function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://harikaspices.com/#organization",
    name: "Harika Spices",
    alternateName: ["PT Harika Spices Indonesia", "Harika Spice Exporter"],
    description: "Harika Spices is a premium Indonesian spices exporter and supplier, providing export‑quality spices sourced ethically from Indonesia. Trusted global supply.",
    url: "https://harikaspices.com",
    logo: {
      "@type": "ImageObject",
      url: "https://harikaspices.com/logo.png",
      width: 300,
      height: 100,
    },
    image: ["https://harikaspices.com/og-image.jpg", "https://harikaspices.com/company-photo.jpg"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+62-123-456-7890",
        contactType: "sales",
        email: "info@harikaspices.com",
        availableLanguage: ["English", "Indonesian"],
        areaServed: "Worldwide",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+92-542-179-3489",
        contactType: "customer service",
        email: "info@harikaspices.com",
        availableLanguage: ["English", "Indonesian"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Semarang, Central Java, Indonesia",
      addressLocality: "Semarang",
      addressRegion: "Semarang",
      postalCode: "12345",
      addressCountry: {
        "@type": "Country",
        name: "Indonesia",
        alternateName: "ID",
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.985974135689225,
      longitude: 110.40850154854502,
    },
    sameAs: ["https://www.facebook.com/harikaspices", "https://www.instagram.com/harikaspices", "https://www.linkedin.com/company/harikaspices", "https://twitter.com/harikaspices", "https://www.youtube.com/c/harikaspices"],
    foundingDate: "2025-01-15",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 12,
      maxValue: 20,
    },
    industry: "Food Export",
    naics: "311942",
    isicV4: "1079",
    keywords:
      "Indonesian spices supplier, premium Indonesian spices, Bulk spices Indonesia, contact Indonesian spices exporter,Indonesian spices supplier inquiry,Indonesian spices exporter company,spices export from Indonesia, bulk Indonesian spices supplier, spices supplier Indonesia, Indonesian spice products, sustainable spice sourcing Indonesia, Export quality spices Indonesiar, export quality Indonesian spices",
    slogan: "Premium Indonesian Spices for Global Markets",
    award: ["ISO 22000 Food Safety Management", "HACCP Certified", "Organic Certification"],
    memberOf: {
      "@type": "Organization",
      name: "Indonesian Spice Exporters Association",
    },
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://harikaspices.com/#website",
    name: "Harika Spices",
    alternateName: "Harika Spices Official Website",
    url: "https://harikaspices.com",
    description: "Harika Spices is a premium Indonesian spices exporter and supplier, providing export‑quality spices sourced ethically from Indonesia. Trusted global supply.",
    publisher: {
      "@id": "https://harikaspices.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://harikaspices.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-US", "id-ID"],
    copyrightYear: 2024,
    copyrightHolder: {
      "@id": "https://harikaspices.com/#organization",
    },
  };

  // Products Schema
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Indonesian Spices Collection",
    description: "Premium Indonesian spices for bulk export",
    numberOfItems: 4,
    itemListElement: [
      {
        "@type": "Product",
        "@id": "https://harikaspices.com/products/cloves-indonesia",
        name: "Premium Indonesian Cloves",
        alternateName: ["Cengkeh Premium", "Maluku Cloves"],
        description: "Aromatic Indonesian cloves from Maluku, hand-harvested and steam-distilled. Rich in eugenol with superior quality for culinary and medicinal use.",
        category: "Spices",
        brand: {
          "@type": "Brand",
          name: "Harika Spices",
        },
        manufacturer: {
          "@id": "https://harikaspices.com/#organization",
        },
        image: ["https://harikaspices.com/assets/product-cloves.webp", "https://harikaspices.com/assets/cloves-detail.jpg"],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2025-12-31",
          seller: {
            "@id": "https://harikaspices.com/#organization",
          },
          itemCondition: "https://schema.org/NewCondition",
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              currency: "USD",
              value: "0",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              businessDays: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              },
              cutoffTime: "15:00",
              handlingTime: {
                "@type": "QuantitativeValue",
                minValue: 2,
                maxValue: 5,
                unitCode: "DAY",
              },
              transitTime: {
                "@type": "QuantitativeValue",
                minValue: 7,
                maxValue: 21,
                unitCode: "DAY",
              },
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.8,
          reviewCount: 127,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Origin",
            value: "Maluku, Indonesia",
          },
          {
            "@type": "PropertyValue",
            name: "Moisture Content",
            value: "12-14%",
          },
          {
            "@type": "PropertyValue",
            name: "Eugenol Content",
            value: "85-87%",
          },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://harikaspices.com/products/vanilla-indonesia",
        name: "Indonesian Vanilla Beans",
        alternateName: ["Vanilla Planifolia", "Java Vanilla"],
        description: "Rich vanilla beans from Java, carefully cured and graded. Premium quality with intense aroma and flavor profile perfect for culinary applications.",
        category: "Spices",
        brand: {
          "@type": "Brand",
          name: "Harika Spices",
        },
        manufacturer: {
          "@id": "https://harikaspices.com/#organization",
        },
        image: ["https://harikaspices.com/assets/product-vanilla.webp", "https://harikaspices.com/assets/vanilla-detail.jpg"],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2024-12-31",
          seller: {
            "@id": "https://harikaspices.com/#organization",
          },
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.9,
          reviewCount: 89,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Origin",
            value: "Java, Indonesia",
          },
          {
            "@type": "PropertyValue",
            name: "Vanillin Content",
            value: "1.8-2.2%",
          },
          {
            "@type": "PropertyValue",
            name: "Length",
            value: "15-20 cm",
          },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://harikaspices.com/products/turmeric-indonesia",
        name: "Organic Turmeric Powder",
        alternateName: ["Kunyit Organik", "Curcuma Longa"],
        description: "Vibrant organic turmeric powder with high curcumin content. Sourced from certified organic farms in Java with superior color and medicinal properties.",
        category: "Spices",
        brand: {
          "@type": "Brand",
          name: "Harika Spices",
        },
        manufacturer: {
          "@id": "https://harikaspices.com/#organization",
        },
        image: ["https://harikaspices.com/assets/product-turmeric.webp", "https://harikaspices.com/assets/turmeric-detail.jpg"],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2024-12-31",
          seller: {
            "@id": "https://harikaspices.com/#organization",
          },
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.7,
          reviewCount: 156,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Origin",
            value: "Java, Indonesia",
          },
          {
            "@type": "PropertyValue",
            name: "Curcumin Content",
            value: "3-5%",
          },
          {
            "@type": "PropertyValue",
            name: "Certification",
            value: "USDA Organic",
          },
        ],
      },
      {
        "@type": "Product",
        "@id": "https://harikaspices.com/products/black-pepper-indonesia",
        name: "Premium Black Peppercorns",
        alternateName: ["Lada Hitam Premium", "Piper Nigrum"],
        description: "Premium black peppercorns with bold flavor and aroma. Hand-picked from the finest pepper gardens in Lampung with superior piperine content.",
        category: "Spices",
        brand: {
          "@type": "Brand",
          name: "Harika Spices",
        },
        manufacturer: {
          "@id": "https://harikaspices.com/#organization",
        },
        image: ["https://harikaspices.com/assets/product-black-pepper.webp", "https://harikaspices.com/assets/pepper-detail.jpg"],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2024-12-31",
          seller: {
            "@id": "https://harikaspices.com/#organization",
          },
          itemCondition: "https://schema.org/NewCondition",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 4.6,
          reviewCount: 203,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Origin",
            value: "Lampung, Indonesia",
          },
          {
            "@type": "PropertyValue",
            name: "Piperine Content",
            value: "5-7%",
          },
          {
            "@type": "PropertyValue",
            name: "Size",
            value: "500-550 g/l",
          },
        ],
      },
    ],
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://harikaspices.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://harikaspices.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "About Us",
        item: "https://harikaspices.com/about",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://harikaspices.com/contact",
      },
    ],
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What types of spices does Harika Spices export?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harika Spices specializes in exporting premium Indonesian spices including cloves, vanilla beans, turmeric powder, black peppercorns, ginger, nutmeg, and other authentic Indonesian spices. All our products are sourced directly from certified farms across Indonesia.",
        },
      },
      {
        "@type": "Question",
        name: "What is the minimum order quantity for bulk purchases?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our minimum order quantity varies by product, typically starting from 1 metric ton for most spices. We offer flexible packaging options and can accommodate both small and large-scale orders. Please contact our sales team for specific MOQ requirements.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide quality certifications?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our products come with comprehensive quality certifications including ISO 22000, HACCP, and organic certifications where applicable. We also provide certificates of analysis, phytosanitary certificates, and other export documentation as required.",
        },
      },
      {
        "@type": "Question",
        name: "What countries do you export to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Harika Spices exports to over 30 countries worldwide including the United States, European Union, Middle East, Asia-Pacific, and other regions. We have established logistics networks to ensure timely and safe delivery globally.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productsSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
