import { z } from "zod";
const TaxSchema = z.object({
  type: z.enum(["Percentage", "Fixed"]), // only these two options
  value: z.string(),                     // numeric value
});
export const InvoiceSchema = z.object({
  invoiceId: z.string(),
  date: z.string().optional(),
  dueDate: z.string().optional(),
  currency: z.string().optional(),

  sender: z.object({
    name: z.string(),
    email: z.email("Please enter a valid email address"),
    address: z.string().optional(),
    currency: z.string().optional(),
  }),

  client: z.object({
    name: z.string(),
    email: z.email("Please enter a valid email address"),
    address: z.string().optional(),
    phone: z.string().optional(),
  }),

  items: z.array(
    z.object({
      description: z
    .string()
    .min(1, "Please enter a description for this item"), // friendly & actionable
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1"),             // clear & polite
  price: z
    .coerce.number()
    .min(0, "Price cannot be negative"),    
    })
  ).default([]),
  payment: z.string().optional(),            
  tax: TaxSchema.optional(),
  status: z.string().optional(),            
});

export const DraftInvoiceSchema = InvoiceSchema.partial();

