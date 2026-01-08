import LinkButton from "@/components/LinkButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoaza - Free Invoice Generator for Freelancers",
  description: "Generate professional invoices for freelancers in seconds with Invoaza. Simple, free, and ready to download as PDF.",
  alternates: {
    canonical: "https://invoaza.com", // Replace with your real domain
  },
  openGraph: {
    title: "Invoaza - Free Invoice Generator",
    description: "Generate professional invoices in seconds. Simple, free, and ready to download as PDF.",
    url: "https://invoaza.com",
    siteName: "Invoaza",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Invoaza Invoice Generator",
      },
    ],
  },
};

export default function LandingPage() {
  // Structured Data for Google Search Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Invoaza",
    "operatingSystem": "WEB",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "description": "A simple and free professional invoice generator for freelancers and small businesses.",
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      {/* Add JSON-LD to the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="max-w-3xl py-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Invoaza
        </h1>
        
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-xl mx-auto mb-8">
          Generate professional invoices for freelancers in seconds. Simple, free, and ready to download as PDF.
        </h2>

        {/* Client-rendered button */}
        <div className="mb-12">
          <LinkButton />
        </div>

        {/* Semantic Content for SEO Ranking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16 border-t border-gray-200 pt-12">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Fast & Simple</h3>
            <p className="text-gray-600 text-sm">Create professional billing documents without the complex accounting software.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">PDF Export</h3>
            <p className="text-gray-600 text-sm">Instantly download your invoices as high-quality PDFs ready for your clients.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">100% Free</h3>
            <p className="text-gray-600 text-sm">No hidden fees or subscriptions. Built specifically for independent freelancers.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
