import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Private Tutor Invoice Template | Professional Lesson Billing",
  description: "Create professional invoices for tutoring sessions. Pre-filled for math, languages, and test prep. Include lesson logs and cancellation policies.",
  openGraph: {
    title: "Free Private Tutor Invoice Template",
    description: "The professional way for educators to bill parents. Create and download tutoring invoices instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Private Tutor Invoice Template",
    description: "Professional billing for independent educators.",
  },
};

export default function TutorInvoicePage() {
  const TUTOR_INVOICE_ID = "tutor-invoice-2026";

  // 2. Structured Data (JSON-LD) for 10/10 SEO Score
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Tutor Invoice Generator",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description": "Professional invoice generator for private tutors and academic coaches.",
      },
      {
        "@type": "HowTo",
        "name": "How to Create a Professional Tutoring Invoice",
        "step": [
          {
            "@type": "HowToStep",
            "text": "Identify the student name and session subject.",
          },
          {
            "@type": "HowToStep",
            "text": "List individual session dates and durations.",
          },
          {
            "@type": "HowToStep",
            "text": "Include your cancellation policy and payment methods.",
          },
        ],
      },
    ],
  };

  const defaultInvoice = {
    id: TUTOR_INVOICE_ID,
    invoiceId: "TTR-092",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString(),

    sender: {
      name: "Professor Yassine",
      email: "yassine.tutor@email.com",
      company: "Elite Academic Coaching",
      address: "Casablanca, Morocco",
    },

    client: {
      name: "The Smith Family",
      email: "parent@email.com",
      company: "Student: Leo Smith",
      address: "New York, USA",
    },

    items: [
      { description: "Advanced Mathematics - Oct 4th Session (1.5h)", quantity: 1, price: 75 },
      { description: "Advanced Mathematics - Oct 11th Session (1.5h)", quantity: 1, price: 75 },
      { description: "SAT Prep Materials & Practice Tests", quantity: 1, price: 45 },
      { description: "Late Cancellation Fee (Session Oct 18th)", quantity: 1, price: 30 },
    ],

    payment: "Bank Transfer or Student Portal",
  };

  return (
        <main className="bg-gray-100">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="py-12 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Private Tutor Invoice Template
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          The professional way for educators to bill parents. Include student names, 
          lesson dates, and academic materials in seconds.
        </p>
      </header>

      <section className=" ">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      {/* Niche-Specific SEO Content Section */}
      <section className="mt-20 mb-20 p-8 bg-gray-50 max-w-5xl mx-auto rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
          Professional Billing Tips for Tutors
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Include Student Name</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Parents often manage multiple tutors for different children. Clearly listing the 
              student's name makes their bookkeeping (and yours) much easier.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Itemize Session Dates</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Detailed line items prevent billing disputes. Instead of "Math Tutoring," use 
              "Calculus Session - Jan 15th" to provide full transparency.
            </p>
          </article>
          <article>
            <h3 className="font-bold text-blue-700 mb-2">Enforce Policies</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Use the notes section to state your 24-hour cancellation policy. Including 
              it on the invoice reminds parents of your professional boundaries.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
