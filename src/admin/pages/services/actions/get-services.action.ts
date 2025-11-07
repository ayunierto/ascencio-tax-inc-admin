import { ServicesResponse } from '@/admin/pages/services/interfaces/services.response';
import { api } from '@/api/api';

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getServicesAction = async (
  options: Options
): Promise<ServicesResponse> => {
  const { limit, offset } = options;
  const { data } = await api.get<ServicesResponse>('/services', {
    params: {
      limit,
      offset,
    },
  });

  return data;
};
