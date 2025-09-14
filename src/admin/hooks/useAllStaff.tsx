import { useQuery } from "@tanstack/react-query";
import { Staff } from "../interfaces/staff.interface";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";
import { getAllStaffAction } from "../pages/staff/actions/get-all-staff.action";

export const useStaff = () => {
  return useQuery<Staff[], AxiosError<ServerException>, Staff[]>({
    queryKey: ["staff"],
    queryFn: getAllStaffAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Do not refetch when window gains focus
  });
};
