import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { updateSettings } from '../actions/update-settings.action';
import { SettingsResponse } from '../interfaces/settings.response';
import { UpdateSettingsFormFields } from '../schemas/settings.schema';
import { ServerException } from '@/interfaces/server-exception.response';

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SettingsResponse,
    AxiosError<ServerException>,
    UpdateSettingsFormFields
  >({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
};
