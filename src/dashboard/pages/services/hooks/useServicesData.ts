import { createApiService } from '@/services/apiService';
import { Service } from '../interfaces';
import { CreateServiceRequest, UpdateServiceRequest } from '../schemas';
import { HttpError } from '@/adapters/http/http-client.interface';
import { useQuery } from '@tanstack/react-query';

export const useServicesData = () => {
  const apiServiceServices = createApiService<
    Service,
    CreateServiceRequest,
    UpdateServiceRequest
  >('services');
  const { data: services, isFetching: isFetchingServices } = useQuery<
    HttpError | Service[],
    Error
  >({
    queryKey: ['services'],
    queryFn: () => apiServiceServices.getAll(),
  });
  return {
    services,
    isFetchingServices,
    apiServiceServices,
  };
};
