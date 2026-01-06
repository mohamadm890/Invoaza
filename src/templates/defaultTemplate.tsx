
// models/Invoice.ts
export default interface Invoice {
  id: string;              // Unique invoice ID
  date: string;            // Invoice date
  dueDate?: string; 
  currency?: string;        

  // Optional due date
  sender: {
      name: string;
      email: string;
      address?: string;
      phone?: string;
      country?: string;
      city?: string;

  };
  client: {
      name: string;
      address: string;
      email?: string;
      phone?: string;
  };
  items: {
      description: string;
      quantity: number;
      price: number;
  }[];
  total: number;
  tax?: number;
  payment?: string;
  }





export const defaultTemplate = (invoiceData: any ) => {




  const items = Array.isArray(invoiceData.items) ? invoiceData.items : [];

  const currency = invoiceData.currency || "USD"; // default to USD

  const safeSender = {
    name: invoiceData.sender?.name?.trim() || "",
    email: invoiceData.sender?.email?.trim() || "",
    country: invoiceData.sender?.country?.trim() || "",
    city: invoiceData.sender?.city?.trim() || "",
  };

  const clientName = invoiceData.client?.name || "";
  const clientEmail = invoiceData.client?.email || "";
  const clientPhone = invoiceData.client?.phone || "";
  const clientAddress = invoiceData.client?.address || "";

  const subtotal = items.reduce(
    (sum: any, item: any) =>
      sum +
      Number(item?.quantity || 0) *
        Number(item?.unitPrice || item?.price || 0),
    0
  );

  const taxRate = Number(invoiceData.tax?.value ?? 0);



  const invoiceId = invoiceData.invoiceId ?? "INV-0000";
  const invoiceDate = invoiceData.date
    ? new Date(invoiceData.date).toLocaleDateString()
    : new Date().toLocaleDateString();
  const dueDate = invoiceData.dueDate ?? "YYYY/MM/DD";

  const paymentData =
    invoiceData.payment?.trim() || "Add your payment instructions here…";

  // Function to format currency dynamically
  const formatCurrency = (amount: any) =>
    new Intl.NumberFormat(undefined, { // undefined lets the browser pick locale
      style: "currency",
      currency,
    }).format(amount);

    const currenyChecker = invoiceData.currency;
    const tax = invoiceData.tax;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Invoice #${invoiceId}</title>
    <style>
      @page { size: A4; margin: 20mm; }
      body { font-family: Arial, sans-serif; margin:0; padding:0; color:#333; background:#fff; }
      .invoice-container { width:210mm; min-height:297mm; padding:20mm; margin:0 auto; box-sizing:border-box; display:flex; flex-direction:column; }
      header { margin-bottom:30px; }
      header h1 { margin:0; font-size:28px; color:#2c3e50; }
      .info-container { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:28px; gap:20px; }
      .info-box { width:48%; font-size:14px; line-height:1.5; }
      .info-invoice { display:flex; flex-direction:column; gap:4px; }
      main { width:100%; font-size:14px; flex:1; margin-bottom:20px; border-collapse:collapse; }
      main table { width:100%; border-collapse:collapse; }
      main th, main td { border:1px solid #ddd; padding:10px; text-align:left; }
      main th { background-color:#2c3e50; color:#fff; }
      main tfoot td { font-weight:bold; background-color:#f1f1f1; }
      .footer { display:flex; justify-content:space-between; align-items:center; padding:16px; border-top:1px solid #e0e0e0; flex-wrap:wrap; gap:12px; width:100%; }
      .footer > div { display:flex; flex-direction:column; width:48%; flex-shrink:0; }
      .footer-header { font-size:14px; font-weight:bold; text-transform:uppercase; padding-bottom:4px; }
      .payment { word-wrap:break-word; width:100%; margin:0; }
      p { margin:0; padding:0; }
      .info-invoice p::first-letter { text-transform:uppercase; }
      @media print { .invoice-container { box-shadow:none; } }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <header>
        <h1 class="logo">INVOICE</h1>
      </header>

      <section class="info-container">
        <div class="info-box">
          <strong>BILL TO</strong><br/>
          ${clientName}<br/>
          ${clientEmail}<br/>
          ${clientPhone}<br/>
          ${clientAddress}<br/>
        </div>

        <div class="info-invoice">
          <p>Invoice: ${invoiceId}</p>
          <p>Date: ${invoiceDate}</p>
          <p>Due date: ${dueDate}</p>
        </div>
      </section>

      <main>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${
              items.length > 0
                ? items
                    .map(
                      (i: any) => `
                      <tr>
                        <td>${i.description || "—"}</td>
                        <td>${i.quantity || 0}</td>
                        <td>${formatCurrency(Number(i.unitPrice || i.price || 0))}</td>
                        <td>${formatCurrency(
                          Number(i.quantity || 0) *
                            Number(i.unitPrice || i.price || 0)
                        )}</td>
                      </tr>`
                    )
                    .join("")
                : `<tr><td colspan="4" style="text-align:center; color:#888;">No items added</td></tr>`
            }
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Subtotal</td>
              <td>${formatCurrency(subtotal)}</td>
            </tr>
            <tr>
              ${invoiceData.taxDisplay ? `
  <tr>
    <td colspan="3">Tax</td>
    <td>${invoiceData.taxDisplay}</td>
  </tr>` : ''}
            </tr>
            <tr>
              <td colspan="3"><strong>Total</strong></td>
              <td><strong>${formatCurrency(invoiceData.total)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </main>

      <div class="footer">
        <div>
          <p class="footer-header">Payment Instructions</p>
          <p class="payment">${paymentData.replace(/\n/g, "<br/>")}</p>
        </div>

        <div>
          <p class="footer-header">${safeSender.name}</p>
          <p>${safeSender.email}</p>
          <p>${safeSender.country}</p>
          <p>${safeSender.city}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};
