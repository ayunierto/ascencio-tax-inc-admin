import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getUserByIdAction } from "../actions/get-user-by-id.action";
import { UserResponse } from "../interfaces/user.response";
import { ServerException } from "@/interfaces/server-exception.response";

export const useUser = (id: string) => {
  return useQuery<UserResponse, AxiosError<ServerException>, UserResponse>({
    queryKey: ["user", id],
    queryFn: () => getUserByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
