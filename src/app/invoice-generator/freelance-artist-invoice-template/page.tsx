import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

// 1. Metadata optimized for Artist-specific keywords
export const metadata: Metadata = {
  title: "Freelance Artist Invoice Template | Custom Art & Commission Billing",
  description:
    "Professional invoice template for freelance artists and illustrators. Manage art commissions, licensing fees, and project deposits with ease.",
  openGraph: {
    title: "Freelance Artist Invoice Template",
    description:
      "The best way for illustrators and fine artists to bill clients. Professional, clear, and ready for commissions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Commission Invoice Template",
    description: "Professional billing for freelance illustrators and artists.",
  },
};

export default function FreelanceArtistInvoicePage() {
  const ARTIST_INVOICE_ID = "freelance-artist-invoice-2026";

  // 2. Structured Data (JSON-LD) updated for Artists
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Freelance Artist Invoice Generator",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description": "Invoice generator for custom art commissions and digital illustrations.",
      },
      {
        "@type": "HowTo",
        "name": "How to Invoice for Art Commissions",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Detail the scope of work (e.g., Full-body character, background).",
          },
          {
            "@type": "HowToStep",
            "text": "Include a separate line item for Commercial Usage or Licensing.",
          },
          {
            "@type": "HowToStep",
            "text": "Specify the deposit paid and the remaining balance due upon delivery.",
          },
        ],
      },
    ],
  };

  // 3. Artist-Specific Default Invoice Data
  const defaultInvoice = {
    id: ARTIST_INVOICE_ID,
    invoiceId: "ART-2026-05",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),

    sender: {
      name: "Jordan Art",
      email: "jordan@artstudio.com",
      company: "Jordan Creative Illustrations",
      address: "Marrakesh, Morocco",
    },

    client: {
      name: "Sam Rivers",
      email: "sam@indiegame.com",
      company: "Indie Game Studio",
      address: "Austin, TX",
    },

    items: [
      { description: "Custom Character Illustration (Full Color)", quantity: 1, price: 350 },
      { description: "Background Environment Concept Art", quantity: 1, price: 500 },
      { description: "Commercial Rights License (Unlimited Digital Use)", quantity: 1, price: 200 },
      { description: "Additional Revision (Round 3)", quantity: 1, price: 45 },
    ],

    payment: "PayPal, Stripe, or Direct Bank Transfer",
  };

  return (
    <main className="bg-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Freelance Artist Invoice Template
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Built for illustrators, painters, and concept artists. Handle commissions, licensing, and revisions professionally. Download your PDF instantly.
        </p>
      </header>

      <section className="mb-20">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      {/* Artist-Specific SEO Content */}
      <section className="mt-20 mb-20 p-8 bg-gray-50 max-w-5xl mx-auto rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Artist Billing Best Practices
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <article>
            <h3 className="font-bold text-purple-700 mb-2">Define Usage Rights</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Always state if the artwork is for personal use or if the client is purchasing commercial rights. This protects your copyright.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-purple-700 mb-2">Milestone Payments</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For large commissions, invoice for a 50% non-refundable deposit upfront to secure the project on your calendar.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-purple-700 mb-2">Kill Fees</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Include a 'Kill Fee' clause in your terms to ensure you are paid for the time spent if a project is cancelled mid-way.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
