import { z } from "zod";

export const businessSettingsSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"), // required, not empty
  email: z.email("Invalid email").optional(),           // optional, must be valid if provided
  address: z.string().optional(),                                 // optional
  currency: z.string().min(1, "Currency is required"),           // required, not empty
});

// TypeScript type
export type BusinessSettings = z.infer<typeof businessSettingsSchema>;
