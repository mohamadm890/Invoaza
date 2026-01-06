// Item.ts
import { z } from "zod";

// This is the Zod schema version of your Item interface
export const ItemSchema = z.object({
  description: z.string(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
});

// If you want, you can still keep the TypeScript type
export type Item = z.infer<typeof ItemSchema>;
