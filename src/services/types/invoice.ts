import { z } from "zod";
import { ItemSchema } from './Item';

export const invoiceSchema = z.object({
    id: z.string(),
    invoiceId: z.string(),
    items: z.array(ItemSchema).min(1),
    total: z.number().min(0),
    date: z.date(),
    dueDate: z.date().optional(),
    clientId: z.string(),
    status: z.enum(['paid', 'unpaid', 'overdue']).default('unpaid'),
});
