import { useMemo } from "react";
import { InvoiceCalculator } from "../domain/InvoiceCalculator";

// Define types
interface Tax {
  type: "none" | "Percentage" | "Fixed";
  value: number;
}

interface Item {
  description: string;
  quantity: number;
  price: number;
}

interface UseInvoiceCalculatorReturn {
  subtotal: number;
  taxAmount: number;
  taxDisplay: string;
  total: number;
}

// Make tax optional
export function useInvoiceCalculator(
  items: Item[] = [],
  tax?: Tax // optional now
): UseInvoiceCalculatorReturn {


  return useMemo(() => {

    console.log("useMemo", items);
    // If tax is missing, use default "none" with value 0
    const safeTax: Tax = tax ?? { type: "none", value: 0 };
    const calc = new InvoiceCalculator({ items, tax: safeTax });

    const subtotal = calc.subtotal();
    console.log("subtotal from useMemo", subtotal);
    const taxAmount = safeTax.type !== "none" ? calc.taxAmount(subtotal) : 0;
    const taxDisplay = safeTax.type === "none" ? "" : calc.taxDisplay()();
    const total = subtotal + taxAmount;
    console.log("useMemo", total);

    return { subtotal, taxAmount, taxDisplay, total };
  }, [ JSON.stringify(items), tax?.type, tax?.value]); // optional chaining safe
}
