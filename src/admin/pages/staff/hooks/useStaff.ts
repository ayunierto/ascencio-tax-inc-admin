import { useQuery } from "@tanstack/react-query";
import { getStaffByIdAction } from "../actions/get-staff-by-id.action";
import { Staff } from "@/admin/interfaces/staff.interface";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";

export const useStaff = (id: string) => {
  const query = useQuery<Staff, AxiosError<ServerException>>({
    queryKey: ["staff", id],
    queryFn: () => getStaffByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  // TODO: Mutation

  return {
    ...query,
  };
};
