import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string(), 
  name: z.string().min(1, "Name is required"), 
  email: z.email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  invoiceCount: z.number().nonnegative().default(0),
  createdAt: z.string().optional(),
  tags: z.array(z.string()).optional(), // single tag
});
