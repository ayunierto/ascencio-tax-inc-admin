import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

import { getUsersAction } from "../actions/get-users.action";
import { UsersResponse } from "../interfaces/users.response";
import { ServerException } from "@/interfaces/server-exception.response";

export const useUsers = () => {
  const [searchParams] = useSearchParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery<UsersResponse, AxiosError<ServerException>, UsersResponse>({
    queryKey: ["users", { offset, limit }],
    queryFn: () =>
      getUsersAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
