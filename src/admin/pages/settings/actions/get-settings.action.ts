import { api } from '@/api/api';
import { SettingsResponse } from '../interfaces/settings.response';

export const getSettings = async (): Promise<SettingsResponse> => {
  const { data } = await api.get<SettingsResponse>('/settings');
  return data;
};
