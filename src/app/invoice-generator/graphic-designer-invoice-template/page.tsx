// File: /app/invoice-generator/graphic-designer-invoice/page.jsx
import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Graphic Designer Invoice Template | Professional Design Billing",
  description:
    "Generate professional invoices for graphic design services. Include logos, branding, social media graphics, and project timelines.",
  openGraph: {
    title: "Free Graphic Designer Invoice Template",
    description:
      "The professional way for freelance designers to bill clients. Create and download graphic design invoices instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Graphic Designer Invoice Template",
    description: "Professional billing for freelance graphic designers.",
  },
};

export default function GraphicDesignerInvoicePage() {
  const DESIGNER_INVOICE_ID = "graphic-designer-invoice-2026";

  // 2. Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Graphic Designer Invoice Generator",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description": "Professional invoice generator for freelance graphic designers.",
      },
      {
        "@type": "HowTo",
        "name": "How to Create a Professional Graphic Design Invoice",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Identify the client name and company.",
          },
          {
            "@type": "HowToStep",
            "text": "List each design service with project details, hours, or quantity.",
          },
          {
            "@type": "HowToStep",
            "text": "Include your payment methods and any late fees.",
          },
        ],
      },
    ],
  };

  // 3. Default Invoice Data
  const defaultInvoice = {
    id: DESIGNER_INVOICE_ID,
    invoiceId: "GD-101",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),

    sender: {
      name: "Alex Martin",
      email: "alex@designstudio.com",
      company: "Martin Design Studio",
      address: "Casablanca, Morocco",
    },

    client: {
      name: "Creative Co.",
      email: "contact@creativeco.com",
      company: "Creative Co.",
      address: "London, UK",
    },

    items: [
      { description: "Logo Design - Brand Identity", quantity: 1, price: 250 },
      { description: "Business Card & Stationery Design", quantity: 1, price: 150 },
      { description: "Social Media Graphics Pack", quantity: 5, price: 30 },
      { description: "Banner & Advertisement Design", quantity: 2, price: 100 },
    ],

    payment: "Bank Transfer, PayPal, or Credit Card",
  };

  return (
    <main className="bg-gray-100">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Graphic Designer Invoice Template
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Professional invoices for freelance graphic designers. Include client names, project deliverables, and pricing. Download instantly as PDF.
        </p>
      </header>

      <section className="mb-20">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      {/* Niche-Specific SEO Content */}
      <section className="mt-20 mb-20 p-8 bg-gray-50 max-w-5xl mx-auto rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Billing Tips for Graphic Designers
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Itemize Services</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              List each design service separately (e.g., Logo, Branding Package, Social Media Graphics) to ensure transparency and avoid disputes.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Include Revisions</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Specify the number of included revisions and additional fees for extra edits. This helps manage client expectations.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Specify Payment Terms</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mention your preferred payment methods and due dates. Adding late fees can reduce delayed payments.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
