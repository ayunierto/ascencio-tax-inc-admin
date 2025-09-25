import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getServicesAction } from "../actions/get-services.action";
import { ServicesResponse } from "../interfaces/services.response";
import { ServerException } from "@/interfaces/server-exception.response";

export const useServices = (limitData: number = 9) => {
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || limitData;
  const page = searchParams.get("page") || 1;

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery<
    ServicesResponse,
    AxiosError<ServerException>,
    ServicesResponse
  >({
    queryKey: ["services", { offset, limit }],
    queryFn: () =>
      getServicesAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
