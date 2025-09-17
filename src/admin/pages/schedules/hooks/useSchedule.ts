import { useQuery } from "@tanstack/react-query";
import { getScheduleByIdAction } from "../actions/get-schedule-by-id.action";

export const useSchedule = (id: string) => {
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleByIdAction(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
