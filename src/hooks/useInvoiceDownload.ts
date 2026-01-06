import { calculateInvoice } from "@/domain/calculateInvoiceFunction"
import { useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { z } from "zod";
import { InvoiceSchema, DraftInvoiceSchema } from "@/schemas/invoiceSchema";

// Extract TypeScript type from Zod schema
type InvoiceFormData = z.infer<typeof InvoiceSchema>; // or DraftInvoiceSchema

export function useInvoiceDownload(watch: UseFormWatch<InvoiceFormData>) {
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleDownload = async () => {
    try {
      setLoading(true);

      const formData = watch(); // TypeScript now knows the structure

      const taxForCalc = formData.tax
      ? { type: formData.tax.type, value: Number(formData.tax.value) }
      : undefined;

      const { subtotal, taxAmount, taxDisplay, total } =
        calculateInvoice(formData.items, taxForCalc);

      const htmlData = {
        ...formData,
        subtotal,
        taxAmount,
        taxDisplay,
        total,
      };

      const response = await fetch(`${API_BASE_URL}/api/pdf/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(htmlData),
      });

      const result = await response.json();

      if (!result.success) {
        console.error("PDF generation failed");
        return;
      }

      const fileName = result.downloadUrl;
      const fileUrl = `${API_BASE_URL}/api/pdf/download/${fileName}`;

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDownload, loading };
}
