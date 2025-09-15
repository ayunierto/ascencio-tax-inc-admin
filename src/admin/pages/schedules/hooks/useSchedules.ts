import { useQuery } from "@tanstack/react-query";
import { getSchedulesAction } from "../actions/get-schedules.action";
import { ScheduleResponse } from "../interfaces/schedules.response";
import { AxiosError } from "axios";
import { ServerException } from "@/interfaces/server-exception.response";

export const useSchedules = () => {
  const query = useQuery<
    ScheduleResponse[],
    AxiosError<ServerException>,
    ScheduleResponse[]
  >({
    queryKey: ["schedules"],
    queryFn: () => getSchedulesAction(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    ...query,
  };
};
