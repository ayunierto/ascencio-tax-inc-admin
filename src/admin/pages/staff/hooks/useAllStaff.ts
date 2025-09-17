import { useQuery } from "@tanstack/react-query";
import { getStaffAction } from "../actions/get-staff.action";
import { StaffResponse } from "../interfaces/staff.response";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";

export const useAllStaff = () => {
  return useQuery<
    StaffResponse[],
    AxiosError<ServerException>,
    StaffResponse[]
  >({
    queryKey: ["staff"],
    queryFn: () => getStaffAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
