import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getServiceByIdAction } from '../actions/get-service-by-id.action';
import { ServiceResponse } from '../interfaces/service.response';
import { ServerException } from '@/interfaces/server-exception.response';

export const useService = (id: string) => {
  return useQuery<
    ServiceResponse,
    AxiosError<ServerException>,
    ServiceResponse
  >({
    queryKey: ['service', id],
    queryFn: () => getServiceByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
