import { createService } from './baseService';
import { DraftInvoiceSchema } from '../../schemas/invoiceSchema';
import { invoicesDB } from '../../db/invoiceDB';



export const invoiceService = createService(invoicesDB, DraftInvoiceSchema);