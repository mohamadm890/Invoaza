import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from 'next';

// Page Metadata for SEO
export const metadata: Metadata = {
  title: 'Free UX/UI Freelancer Invoice Generator | Professional PDF Templates',
  description: 'Generate professional UX/UI freelance invoices in seconds. Include deliverables, revisions, and payment terms to get paid faster.',
  // Note: Keywords are ignored by Google in 2026, but fine to keep for smaller engines
};

export default function FreelanceInvoicePage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "UX/UI Freelancer Invoice Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "A free tool for designers to generate professional PDF invoices including UX research and UI design tasks."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this invoice tool free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can create unlimited PDF invoices for your design projects without signing up or paying any fees."
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize design tasks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. You can add custom items like UX Research, UI Design, Wireframing, and Design System components with specific rates."
            }
          }
        ]
      }
    ]
  };

  const FREELANCER_INVOICE_ID = "uxui-invoice-draft";

  const defaultInvoice = {
    id: FREELANCER_INVOICE_ID,
    invoiceId: "INV12",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
    sender: { 
      name: "Sarah Benali",
      email: "sarah.design@email.com",
      company: "Freelance UX Studio",
      address: "Casablanca, Morocco"
    },
    client: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      company: "StartupX",
      address: "New York, USA"
    },
    items: [
      { description: "UX Research - User flows & wireframes", quantity: 1, price: 300 },
      { description: "UI Design - 8 high-fidelity screens", quantity: 8, price: 50 },
      { description: "Design System - Colors, typography, components", quantity: 1, price: 200 },
      { description: "Revisions (2 rounds included)", quantity: 2, price: 0 },
    ],
    payment: "Pay via PayPal or Bank Transfer",
  };

  return (
    <main className="bg-gray-100">
      {/* 1. Inject the JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="py-8 md:py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-snug md:leading-tight">
          Free UX/UI Freelancer Invoice Generator
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mx-auto leading-relaxed">
          Create professional PDF invoices for your UX/UI design services in seconds. 
          Include deliverables, revisions, and payment terms to get paid faster.
        </p>
      </header>
      
      <section className="px-4">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      <section className="mt-8 border-t border-gray-50 pt-10 prose prose-slate max-w-none text-gray-500  md:px-20">
        <h2 className="text-xl font-semibold">How to bill as a UX/UI freelancer</h2>
        <p>
          Our <strong>freelance invoice generator</strong> helps designers clearly list tasks such as <strong>UX research</strong>, 
          <strong>UI screens</strong>, and <strong>design system components</strong>.
        </p>

        {/* FAQ Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Is this tool free?</h3>
            <p className="text-sm">Yes! You can create unlimited PDF invoices without signing up.</p>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">Can I customize invoice items?</h3>
            <p className="text-sm">Yes, add your own tasks, quantities, and rates to match each project.</p>
          </div>
        </div>

      </section>
    </main>
  );
} 
