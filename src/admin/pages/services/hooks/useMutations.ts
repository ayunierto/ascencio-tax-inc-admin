import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ServiceResponse } from '../interfaces/service.response';
import { deleteServiceAction } from '../actions/delete-service.action';
import { Service } from '../schemas/service.schema';
import { ServerException } from '@/interfaces/server-exception.response';
import { createUpdateServiceAction } from '../actions/create-update-service.action';
import { ServicesResponse } from '../interfaces/services.response';

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ServiceResponse,
    AxiosError<ServerException>,
    Partial<Service>
  >({
    mutationFn: createUpdateServiceAction,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.setQueryData(['service', response.id], response);

      queryClient.setQueryData(
        ['services'],
        (oldList: ServicesResponse): ServicesResponse => {
          if (!oldList) return { services: [response], count: 1, pages: 1 };

          if (!oldList.services.find((service) => service.id === response.id)) {
            return {
              ...oldList,
              services: [...oldList.services, response],
            };
          }

          return {
            ...oldList,
            services: oldList.services.map((s) =>
              s.id === response.id ? response : s
            ),
          };
        }
      );
    },
  });

  const deleteMutation = useMutation<
    ServiceResponse,
    AxiosError<ServerException>,
    string,
    unknown
  >({
    mutationFn: deleteServiceAction,
    onSuccess: (_data, id) => {
      queryClient.setQueryData(
        ['services'],
        (oldList: ServicesResponse): ServicesResponse => {
          if (!oldList) return { services: [], count: 0, pages: 0 };
          return {
            ...oldList,
            services: oldList.services.filter((service) => service.id !== id),
          };
        }
      );

      queryClient.removeQueries({ queryKey: ['service', id] });
    },
  });

  return { mutation, deleteMutation };
};
