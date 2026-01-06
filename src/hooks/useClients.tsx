import { useRepository } from './useRepository';
import { clientService } from '../services/locatDb/clientService';

export function useClients() {
    return useRepository(clientService);
}

