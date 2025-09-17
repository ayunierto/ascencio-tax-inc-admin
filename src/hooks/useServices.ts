import { getServicesAction } from "@/app/actions/get-services.action";
import { ServicesResponse } from "@/interfaces/services.response";
import { ServerException } from "@/interfaces/server-exception.response";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useServices = () => {
  return useQuery<ServicesResponse, AxiosError<ServerException>>({
    queryKey: ["services"],
    queryFn: getServicesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Do not refetch when window gains focus
  });
};
