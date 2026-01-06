import InvoicesPage from "@/components/create/InvoiceCreate";
import { Metadata } from 'next';


// Dynamically import the form as client component with no SSR

export const metadata: Metadata = {
  title: 'Free Freelance Invoice Generator | Professional PDF Templates',
  description: 'Create and download professional freelance invoices in seconds. Track billable hours and get paid faster with invc.com.',
  keywords: ['freelance invoice', 'billable hours', 'consultant billing', 'freelance PDF invoice'],
};

export default function FreelanceInvoicePage() {

  const FREELANCER_INVOICE_ID = "freelancer-draft";

  const defaultInvoice = {
    id: FREELANCER_INVOICE_ID,
    invoiceId:"INV12",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(), // 14 days from now
    sender: { name: "Freelance Dev", email: "me@dev.com" },
    client: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com"
      }
      ,
    items: [
        { description: "Web development - 10 hours", quantity: 10, price: 50 },
        { description: "Design mockups", quantity: 5, price: 40 }    ],
    payment: "Pay via PayPal",
  };

  return <InvoicesPage invoice={defaultInvoice} />;
}
