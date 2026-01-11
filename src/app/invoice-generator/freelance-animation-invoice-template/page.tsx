import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Freelance Animation Invoice Template | Motion Graphics Billing",
  description: "Custom invoice for 2D/3D animators and motion designers. Bill for storyboarding, character rigging, and final render delivery.",
  openGraph: {
    title: "Animator & Motion Designer Invoice Template",
    description: "Professional way to bill for animation projects and motion graphics.",
    type: "website",
  },
};

export default function AnimationInvoicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication", // Animation tools often search for 'Apps'
    "name": "Animation Billing Tool",
    "applicationCategory": "BusinessApplication",
  };

  const defaultInvoice = {
    id: "animation-invoice-2026",
    invoiceId: "ANIM-2026-X",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
    sender: { name: "Pixel Motion", email: "hello@pixelmotion.io", company: "Pixel Motion Studio" },
    client: { name: "Game Ventures", company: "GV Inc", address: "Austin, TX" },
    items: [
      { description: "2D Character Animation (60 Seconds)", quantity: 1, price: 2400 },
      { description: "Storyboard & Styleframe Development", quantity: 1, price: 800 },
      { description: "Custom Rigging (Bipedal)", quantity: 2, price: 300 },
      { description: "Server Rendering Time (High-Res Export)", quantity: 1, price: 150 },
    ],
    payment: "Stripe, PayPal",
  };

  return (
    <main className="bg-indigo-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-900 uppercase">Animation Invoice Template</h1>
        <p className="mt-4 text-lg text-indigo-700 max-w-2xl mx-auto font-medium">From keyframes to delivery—professional billing for motion artists.</p>
      </header>
      <section className="pb-20"><InvoicesPage invoice={defaultInvoice} /></section>
      
      <section className="mb-20 p-8 bg-indigo-900 text-white max-w-5xl mx-auto rounded-3xl shadow-xl">
        <h2 className="text-2xl font-bold mb-8 text-indigo-200">Animation Industry Billing Tips</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <article>
            <h3 className="text-lg font-semibold mb-2">The 'Per Second' Model</h3>
            <p className="text-indigo-100 text-sm">Many animators bill per second of finished animation. Use the 'Quantity' field for seconds to make this clear to clients.</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold mb-2">Asset Ownership</h3>
            <p className="text-indigo-100 text-sm">State clearly if the client receives the final render only or the source files (After Effects/Maya projects).</p>
          </article>
          <article>
            <h3 className="text-lg font-semibold mb-2">Render Fees</h3>
            <p className="text-indigo-100 text-sm">Don't absorb the cost of cloud rendering. Include high-res export fees as a separate line item.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
