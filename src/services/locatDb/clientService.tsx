import { clientDB } from '../../db/clientDB';
import { createService } from './baseService';
import { clientSchema } from '../../schemas/clientSchema';



export const clientService = createService(clientDB, clientSchema);
