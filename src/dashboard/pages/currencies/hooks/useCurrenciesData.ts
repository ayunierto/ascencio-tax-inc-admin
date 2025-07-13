import { HttpError } from '@/adapters/http/http-client.interface';
import { Currency } from '../interfaces';
import { CreateCurrencyRequest, UpdateCurrencyRequest } from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { createApiService } from '@/services/apiService';

export const useCurrenciesData = () => {
  const apiServiceCurrencies = createApiService<
    Currency,
    CreateCurrencyRequest,
    UpdateCurrencyRequest
  >('currencies');
  const { data: currencies, isFetching: isFetchingCurrencies } = useQuery<
    HttpError | Currency[],
    Error
  >({
    queryKey: ['currencies'],
    queryFn: () => apiServiceCurrencies.getAll(),
  });
  return {
    currencies,
    isFetchingCurrencies,
    apiServiceCurrencies,
  };
};
