import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

// 1. Metadata: Focus on 'Content Writing', 'Copywriting', and 'SEO'
export const metadata: Metadata = {
  title: "Freelance Copywriter Invoice Template | Content Writing Billing",
  description:
    "Professional invoice template for copywriters, content strategists, and ghostwriters. Bill by word count, project, or monthly retainer.",
  openGraph: {
    title: "Copywriter & Content Creator Invoice Template",
    description: "The best way for freelance writers to bill clients for articles, ad copy, and SEO content.",
    type: "website",
    url: "https://www.invoaza.com/invoice-generator/copywriter-invoice-template",
  },
};

export default function CopywriterInvoicePage() {
  const COPY_INVOICE_ID = "copywriter-invoice-2026";

  // 2. Structured Data: Optimized for Writing Services
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Copywriting Invoicing",
        "serviceType": "Freelance Writing",
        "description": "Invoice generator for SEO articles, sales copy, and social media content.",
      },
      {
        "@type": "HowTo",
        "name": "How to Invoice for Copywriting",
        "step": [
          { "@type": "HowToStep", "text": "Specify the word count or project scope (e.g., 1,500-word blog post)." },
          { "@type": "HowToStep", "text": "Include the number of revision rounds included in the price." },
          { "@type": "HowToStep", "text": "Clearly state if the price includes SEO keyword research." },
        ],
      },
    ],
  };

  // 3. Copywriter-Specific Default Data
  const defaultInvoice = {
    id: COPY_INVOICE_ID,
    invoiceId: "WRITE-2026-12",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(),

    sender: {
      name: "Casey Ink",
      email: "casey@copyflow.io",
      company: "CopyFlow Strategy",
      address: "London, UK",
    },

    client: {
      name: "Jordan Smith",
      email: "jordan@startup.com",
      company: "TechScale AI",
      address: "San Francisco, CA",
    },

    items: [
      { description: "SEO Blog Post (Long-form: 2,000 words)", quantity: 1, price: 500 },
      { description: "Email Marketing Sequence (5 Emails)", quantity: 1, price: 750 },
      { description: "Website Copywriting (Landing Page Refresh)", quantity: 1, price: 1200 },
      { description: "Additional Revision Round", quantity: 1, price: 75 },
    ],

    payment: "Stripe, Wise, or International Wire Transfer",
  };

  return (
    <main className="bg-emerald-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="py-16 px-4 text-center bg-white border-b border-emerald-100">
        <h1 className="text-4xl font-bold text-emerald-900 tracking-tight">
          Copywriter Invoice Template
        </h1>
        <p className="mt-4 text-lg text-emerald-700 max-w-2xl mx-auto">
          Professional billing for wordsmiths. Itemize by project, word count, or hourly rates and protect your intellectual property.
        </p>
      </header>

      <section className="py-12">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      {/* Copywriter-Specific SEO Content */}
      <section className="mb-20 p-10 bg-white max-w-5xl mx-auto rounded-2xl shadow-sm border border-emerald-100">
        <h2 className="text-2xl font-bold text-emerald-800 border-b border-emerald-50 pb-4 mb-8">
          Copywriting Billing Best Practices
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <article>
            <h3 className="font-bold text-emerald-600 mb-3 uppercase text-xs tracking-widest">Ownership & Rights</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              State clearly that the copyright transfers to the client only *after* full payment is received. This is your strongest legal leverage.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-emerald-600 mb-3 uppercase text-xs tracking-widest">Scope Creep</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Define what a "revision" means. Does it include a total rewrite, or just polish? Limit it to 2 rounds to protect your margins.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-emerald-600 mb-3 uppercase text-xs tracking-widest">Retainer Models</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For recurring work (like 4 blogs/month), invoice upfront at the start of the month to ensure consistent cash flow for your studio.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
