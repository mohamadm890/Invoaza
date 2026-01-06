import { useRepository } from './useRepository';
import { invoiceService } from '../services/locatDb/invoiceService';

export function useInvoice() {
    return useRepository(invoiceService);
}
