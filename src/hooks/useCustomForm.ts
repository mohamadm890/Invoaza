import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema, DraftInvoiceSchema } from "@/schemas/invoiceSchema";
import { z } from "zod";

type InvoiceFormValues = z.infer<typeof InvoiceSchema>;

type UseCustomFormProps = {
  defaultValues?: Partial<InvoiceFormValues>;
  mode?: "draft" | "final";
};

export function useCustomForm({
  defaultValues = {
    sender: {
      name: "",
      email: "",
      address: "",
      currency: "",
    },
    client: {
      name: "",
      email: "",
    },
    items: [],
    payment: "",
  },
  mode = "draft",
}: UseCustomFormProps = {}) {
  const schema = mode === "final" ? InvoiceSchema : DraftInvoiceSchema;

  const form = useForm<InvoiceFormValues>({
    defaultValues,
    resolver: zodResolver(schema as any),
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  return {
    ...form,          // ✅ full UseFormReturn
    fields,
    append,
    remove,
  };
}
