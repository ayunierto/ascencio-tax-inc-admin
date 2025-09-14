import { useQuery } from "@tanstack/react-query";
import { GetServiceByIdAction } from "../../services/actions/get-service-by-id.action";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";
import { Service } from "@/interfaces/service.interface";

export const useService = (id: string) => {
  const query = useQuery<Service, AxiosError<ServerException>, Service>({
    queryKey: ["service", id],
    queryFn: () => GetServiceByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  // Todo: Add mutation for updating/creating service

  return {
    ...query,
  };
};
