import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getSettings } from '../actions/get-settings.action';
import { SettingsResponse } from '../interfaces/settings.response';
import { ServerException } from '@/interfaces/server-exception.response';

export const useSettings = () => {
  return useQuery<
    SettingsResponse,
    AxiosError<ServerException>,
    SettingsResponse
  >({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
