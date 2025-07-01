import { useQuery } from '@tanstack/react-query';
import { GetAccountTypesResponse } from '../interfaces';
import { ExceptionResponse } from '@/interfaces';
import { getAccountTypes } from '../actions';

export const useAccountTypeData = () => {
  return useQuery<GetAccountTypesResponse, ExceptionResponse>({
    queryKey: ['account-types'],
    queryFn: async () => {
      return await getAccountTypes();
    },
    staleTime: 1000 * 60 * 5,
  });
};
