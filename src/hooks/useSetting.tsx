import { SettingService } from '@/services/locatDb/settingService';
import { useSingleObject } from './useSingleObject';

export function useSetting() {
    return useSingleObject(SettingService);
}
