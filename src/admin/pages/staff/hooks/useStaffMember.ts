import { useQuery } from "@tanstack/react-query";
import { getStaffByIdAction } from "../actions/get-staff-by-id.action";
import { StaffResponse } from "../interfaces/staff.response";
import { ServerException } from "@/interfaces/server-exception.response";
import { AxiosError } from "axios";

export const useStaffMember = (id: string) => {
  return useQuery<
    StaffResponse,
    AxiosError<ServerException>,
    StaffResponse,
    string[]
  >({
    queryKey: ["staff", id],
    queryFn: () => getStaffByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
