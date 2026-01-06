'use client';

import { useMemo } from "react";
import IframeResizer from "@iframe-resizer/react";
import { useInvoiceCalculator } from "@/hooks/useInvoiceCalculator";
import { defaultTemplate } from "@/templates/defaultTemplate";

interface InvoicePreviewProps {
  data: any; // live form data from react-hook-form
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const { subtotal, taxAmount, taxDisplay, total } = useInvoiceCalculator(data.items, data.tax);

  // Inject calculated totals into the template
  const htmlContent = useMemo(() => {
    return defaultTemplate({
      ...data,
      subtotal,
      taxAmount,
      taxDisplay,
      total,
    });
  }, [data, subtotal, taxAmount, total]);

  return (
    <div style={{ width: "210mm", height: "297mm", borderRadius: "12px" }}>
      <IframeResizer
        checkOrigin={false}
        style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px" }}
        srcDoc={htmlContent}
        direction="vertical"
        scrolling={false}
        license=""
      />
    </div>
  );
}
