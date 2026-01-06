import { useRepository } from './useRepository';
import { itemService } from '../services/locatDb/itemService';

export function useItems() {
    return useRepository(itemService);
}
