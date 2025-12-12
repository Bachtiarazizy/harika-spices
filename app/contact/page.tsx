import ContactPageClient from "@/components/shared/contact-client";
import React from "react";

export const metadata = {
  title: "Contact Us | Spice Export Inquiries & B2B Orders",
  description: "Reach out to Harika Spices for export inquiries, wholesale orders, and custom spice solutions. We supply premium Indonesian spices to global partners.",
  keywords: "contact Indonesian spices exporter, spices export inquiry, spice supplier contact Indonesia, bulk spices supplier, Indonesian spice distributor",
  openGraph: {
    title: "Contact Us | Spice Export Inquiries & B2B Orders",
    description: "Reach out to Harika Spices for export inquiries, wholesale orders, and custom spice solutions. We supply premium Indonesian spices to global partners.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Spice Export Inquiries & B2B Orders",
    description: "Reach out to Harika Spices for export inquiries, wholesale orders, and custom spice solutions. We supply premium Indonesian spices to global partners.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
