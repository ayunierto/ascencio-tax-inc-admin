import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ServiceResponse } from "../interfaces/service.response";
import { deleteServiceAction } from "../actions/delete-service.action";
import { Service } from "../schemas/service.schema";
import { ServerException } from "@/interfaces/server-exception.response";
import { createUpdateServiceAction } from "../actions/create-update-service.action";
import { ServicesResponse } from "../interfaces/services.response";

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ServiceResponse,
    AxiosError<ServerException>,
    Partial<Service>
  >({
    mutationFn: createUpdateServiceAction,
    onSuccess: (updatedService) => {
      queryClient.setQueryData(["service", updatedService.id], updatedService);

      queryClient.setQueryData(["services"], (oldList: ServicesResponse) => {
        if (!oldList) return { services: [updatedService] };

        if (
          !oldList.services.find((service) => service.id === updatedService.id)
        ) {
          return {
            ...oldList,
            services: [...oldList.services, updatedService],
          };
        }

        return {
          ...oldList,
          services: oldList.services.map((s) =>
            s.id === updatedService.id ? updatedService : s
          ),
        };
      });
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
      queryClient.setQueryData(["services"], (oldList: ServiceResponse[]) => {
        if (!oldList) return [];
        return oldList.filter((s) => s.id !== id);
      });

      queryClient.removeQueries({ queryKey: ["service", id] });
    },
  });

  return { mutation, deleteMutation };
};
