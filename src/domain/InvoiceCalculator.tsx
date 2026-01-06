// Define a type for individual invoice items
export type LineItem = {
  description: string;
  quantity: number;
  price: number;
};

// Define a type for tax
interface Tax {
  type: "none" | "Percentage" | "Fixed";
  value: number;
}

// InvoiceCalculator class
export class InvoiceCalculator {
  items: LineItem[];
  tax: Tax;

  constructor({ items = [], tax = { type: "none", value: 0 } }: { items?: LineItem[]; tax?: Tax }) {
    this.items = items;
    this.tax = tax;
  }

  // Calculate subtotal
  subtotal(): number {
    return this.items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }

  // Calculate tax amount based on subtotal
  taxAmount(subtotal: number): number {
    const taxValue = Number(this.tax.value) || 0;

    switch (this.tax.type) {
      case "Percentage":
        return (subtotal * taxValue) / 100;
      case "Fixed":
        return taxValue;
      default:
        return 0;
    }
  }

  // Display tax nicely
  taxDisplay(currency = "$"): () => string {
    return () => {
      const value = Number(this.tax.value) || 0;

      switch (this.tax.type) {
        case "Percentage":
          return `${value}%`;
        case "Fixed":
          return `${currency}${value}`;
        default:
          return "";
      }
    };
  }

  // Calculate total (subtotal + tax)
  total(): number {
    const subtotal = this.subtotal();
    const tax = this.taxAmount(subtotal);
    return subtotal + tax;
  }
}
