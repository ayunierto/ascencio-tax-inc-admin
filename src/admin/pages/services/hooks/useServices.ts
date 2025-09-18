import { useQuery } from "@tanstack/react-query";
import { getServicesAction } from "../actions/get-services.action";
import { ServicesResponse } from "../interfaces/services.response";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";

export const useServices = () => {
  return useQuery<
    ServicesResponse,
    AxiosError<ServerException>,
    ServicesResponse
  >({
    queryKey: ["services"],
    queryFn: () => getServicesAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
