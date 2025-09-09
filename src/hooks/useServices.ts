import { getServicesAction } from "@/app/actions/get-services.action";
import { Service } from "@/interfaces/service.response";
import { useQuery } from "@tanstack/react-query";

export const useServices = () => {
  return useQuery<Service[], Error, Service[]>({
    queryKey: ["services"],
    queryFn: getServicesAction,
  });
};
