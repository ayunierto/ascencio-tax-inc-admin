import { useQuery } from "@tanstack/react-query";
import { getScheduleByIdAction } from "../actions/get-schedule-by-id.action";

export const useSchedule = (id: string) => {
  const query = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleByIdAction(id),
  });

  return {
    ...query,
  };
};
