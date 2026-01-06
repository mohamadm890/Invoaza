import { z } from "zod";


export const itemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.coerce.number().min(0, "Unit price cannot be negative"), 
});