import { api } from '@/api/api';
import { SettingsResponse } from '../interfaces/settings.response';
import { UpdateSettingsFormFields } from '../schemas/settings.schema';

export const updateSettings = async (
  settings: UpdateSettingsFormFields
): Promise<SettingsResponse> => {
  const { data } = await api.patch<SettingsResponse>('/settings', settings);
  return data;
};
