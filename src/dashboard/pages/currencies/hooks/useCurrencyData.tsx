import { useQuery } from '@tanstack/react-query';
import { GetCurrenciesResponse } from '../interfaces';
import { getCurrencies } from '../actions';
import { HttpError } from '@/adapters/http/http-client.interface';

export const useCurrencyData = () => {
  return useQuery<GetCurrenciesResponse, HttpError>({
    queryKey: ['currencies'],
    queryFn: async () => {
      return await getCurrencies();
    },
    staleTime: 1000 * 60 * 5,
  });
};
