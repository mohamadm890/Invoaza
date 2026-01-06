import { InvoiceCalculator } from "./InvoiceCalculator";

interface Tax {
  type: "none" | "Percentage" | "Fixed";
  value: number;
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface InvoiceCalculation {
  subtotal: number;
  taxAmount: number;
  taxDisplay: string;
  total: number;
}

export function calculateInvoice(items: Item[] = [], tax?: Tax): InvoiceCalculation {
  const safeTax: Tax = tax ?? { type: "none", value: 0 };
  const calc = new InvoiceCalculator({ items, tax: safeTax });

  const subtotal = calc.subtotal();
  const taxAmount = safeTax.type !== "none" ? calc.taxAmount(subtotal) : 0;
  const taxDisplay = safeTax.type === "none" ? "" : calc.taxDisplay()();
  const total = subtotal + taxAmount;

  return { subtotal, taxAmount, taxDisplay, total };
}
