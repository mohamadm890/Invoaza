import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useCustomForm } from "@/hooks/useCustomForm";
import { useInvoice } from "@/hooks/useInvoice";

export function useInvoiceEditor(invoice: any) {
  const { updateItem } = useInvoice();
  const form = useCustomForm(invoice);

  const previewData = form.watch(); 
  const isFirstRender = useRef(true);

  useEffect(() => {
    form.reset(invoice); 
  }, [invoice, form.reset]);

  const saveInvoice = useDebouncedCallback(() => {
    updateItem(previewData);
  }, 1000);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (form.formState.isDirty) { 
      saveInvoice();
    }
  }, [form.formState.isDirty, saveInvoice]);

  return {
    ...form,        
    previewData,    
  };
}
