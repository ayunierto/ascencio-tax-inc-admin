import { useQuery } from '@tanstack/react-query';
import { GetCurrenciesResponse } from '../interfaces';
import { ExceptionResponse } from '@/interfaces';
import { getCurrencies } from '../actions';

export const useCurrencyData = () => {
  return useQuery<GetCurrenciesResponse, ExceptionResponse>({
    queryKey: ['currencies'],
    queryFn: async () => {
      return await getCurrencies();
    },
    staleTime: 1000 * 60 * 5,
  });
};
