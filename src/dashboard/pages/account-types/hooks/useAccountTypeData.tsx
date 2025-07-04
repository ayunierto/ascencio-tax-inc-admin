import { useQuery } from '@tanstack/react-query';
import { GetAccountTypesResponse } from '../interfaces';
import { getAccountTypes } from '../actions';
import { HttpError } from '@/adapters/http/http-client.interface';

export const useAccountTypeData = () => {
  return useQuery<GetAccountTypesResponse, HttpError>({
    queryKey: ['account-types'],
    queryFn: async () => {
      return await getAccountTypes();
    },
    staleTime: 1000 * 60 * 5,
  });
};
