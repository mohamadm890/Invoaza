import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Invoice Generator | Create Professional PDF Invoices",
  description: "Create and download professional invoices in seconds. No registration required. Perfect for freelancers and small businesses.",
};


  export default function Page() {
    const emptyInvoice = {
  id: "",                
  invoiceId: "",          
  date: "",               
  dueDate: "",            
  sender: {
    name: "",
    email: "",
    address: "",
    currency: "",
  },
  client: {
    name: "",
    email: "",
    address: "",
  },
  items: [],
  payment: "",            
};

    return (
      <main>
        {/* 1. The Interactive Tool (Your code) */}
        <InvoicesPage invoice={emptyInvoice} />
  
        {/* 2. The SEO Content Section (Invisible to users if you want, but visible to Google) */}
        <section className="max-w-4xl mx-auto p-8 prose">
          <h2>How to use this Invoice Generator</h2>
          <p>Fill in your business details, add your client's information, and list your line items...</p>
          
          <h2>Why use a professional invoice?</h2>
          <p>Professional invoices ensure you get paid faster and maintain a credible brand image...</p>
          
          {/* Add FAQs here for "People Also Ask" rankings */}
        </section>
      </main>
    );
  }
