import { createSingleObjectService } from './createSingleObjectService';
import { businessSettingsSchema } from '../../schemas/settings';
import { settingsDB } from '../../db/settingsDB';



export const SettingService = createSingleObjectService(settingsDB, businessSettingsSchema);
