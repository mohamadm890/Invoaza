import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

// Page Metadata for SEO
export const metadata: Metadata = {
  title: "Free Video Editor Invoice Generator | Professional PDF Templates",
  description:
    "Create professional video editing invoices in seconds. Bill for editing, color grading, motion graphics, revisions, and delivery formats.",
};

export default function VideoEditorInvoicePage() {
  // --- JSON-LD STRUCTURED DATA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Video Editor Invoice Generator",
        "operatingSystem": "Web",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description":
          "A free invoice generator for video editors to create professional PDF invoices including editing, color grading, motion graphics, and revisions."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this video editor invoice generator free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. You can generate unlimited video editing invoices and export them as PDFs without any cost or signup."
            }
          },
          {
            "@type": "Question",
            "name": "Can I charge separately for revisions and motion graphics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. You can list revisions, motion graphics, color grading, and delivery formats as separate line items."
            }
          }
        ]
      }
    ]
  };

  const FREELANCER_INVOICE_ID = "video-editor-invoice-draft";

  const defaultInvoice = {
    id: FREELANCER_INVOICE_ID,
    invoiceId: "VE-014",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(
      new Date().setDate(new Date().getDate() + 14)
    ).toLocaleDateString(),

    sender: {
      name: "Omar El Mansouri",
      email: "omar.video@email.com",
      company: "Freelance Video Editing",
      address: "Casablanca, Morocco"
    },

    client: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      company: "StartupX Media",
      address: "New York, USA"
    },

    items: [
      {
        description: "Video Editing – 10 min YouTube video",
        quantity: 1,
        price: 150
      },
      {
        description: "Color Correction & Grading",
        quantity: 1,
        price: 60
      },
      {
        description: "Audio Cleanup & Background Music",
        quantity: 1,
        price: 40
      },
      {
        description: "Motion Graphics (Intro + lower thirds)",
        quantity: 1,
        price: 70
      },
      {
        description: "Revisions (2 rounds included)",
        quantity: 2,
        price: 0
      }
    ],

    payment: "Pay via PayPal or Bank Transfer"
  };

  return (
    <main className="bg-gray-100">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="py-8 md:py-12 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Free Video Editor Invoice Generator
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Create professional PDF invoices for video editing services.
          Bill for editing, color grading, motion graphics, and revisions —
          and get paid faster.
        </p>
      </header>

      {/* Invoice App */}
      <section className="px-4">
        <InvoicesPage invoice={defaultInvoice} />
      </section>

      {/* SEO Content */}
      <section className="mt-20 border-t border-gray-50 pt-10 prose prose-slate max-w-none text-gray-500 px-4 md:px-20">
        <h2 className="text-xl font-semibold">
          How to invoice clients as a video editor
        </h2>
        <p>
          Video editors often deal with long render times, multiple revisions,
          and different delivery formats. This <strong>video editor invoice generator</strong>
          helps you clearly list editing work, motion graphics, audio cleanup,
          and revision limits to avoid scope creep.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">
              Can I limit revisions?
            </h3>
            <p className="text-sm">
              Yes. Clearly include how many revision rounds are included and
              charge extra for additional changes.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider">
              Can I specify delivery formats?
            </h3>
            <p className="text-sm">
              Absolutely. Mention formats like MP4, ProRes, or H.265 so clients
              know exactly what they’re paying for.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
