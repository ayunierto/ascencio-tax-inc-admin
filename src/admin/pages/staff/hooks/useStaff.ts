import { useQuery } from "@tanstack/react-query";
import { getStaffByIdAction } from "../actions/get-staff-by-id.action";

export const useStaff = (id: string) => {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: () => getStaffByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
