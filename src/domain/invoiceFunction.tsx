// src/utils/invoiceCalculations.ts

export function calculateSubtotal(items: any[]) {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }
  
  export function calculateTax(
    subtotal: number,
    tax: { type: string; value: number | string }
  ) {
    const taxValue = Number(tax.value) || 0;
    switch (tax.type) {
      case "Percentage":
        return (subtotal * taxValue) / 100;
      case "Fixed":
        return taxValue;
      default:
        return 0;
    }
  }
  
  export function calculateTotal(items: any[], tax: { type: string; value: number | string }) {
    const subtotal = calculateSubtotal(items);
    const taxAmount = calculateTax(subtotal, tax);
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }

  // src/utils/formatTax.ts
export function formatTax(
    taxInput: { type: "Percentage" | "Fixed"; value: number | string },
    currency: string = "USD"
  ): string {
    const value = Number(taxInput.value) || 0;
  
    if (taxInput.type === "Percentage") {
      return `${value}%`;
    }
  
    // Flat tax formatted as currency
    if (taxInput.type === "Fixed") {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  
    return "$0.00";
  }
  