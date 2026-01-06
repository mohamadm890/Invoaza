import { createService } from './baseService';
import { itemSchema } from '../../schemas/itemSchema';
import { invoicesDB } from '../../db/itemDB';



export const itemService = createService(invoicesDB, itemSchema);