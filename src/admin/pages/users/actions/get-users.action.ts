import { api } from '@/api/api';
import { UsersResponse } from '../interfaces/users.response';

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getUsersAction = async (
  options: Options
): Promise<UsersResponse> => {
  const { limit, offset } = options;
  const { data } = await api.get<UsersResponse>('/users', {
    params: {
      limit,
      offset,
    },
  });

  return data;
};
