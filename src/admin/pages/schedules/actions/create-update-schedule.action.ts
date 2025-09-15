import { api } from "@/api/api";
import { Schedule } from "../schemas/schedule.schema";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const createUpdateScheduleAction = async (
  ScheduleLike: Partial<Schedule>
): Promise<ScheduleResponse> => {
  const { id, ...rest } = ScheduleLike;

  const isCreating = id === "new";

  const { data } = await api<ScheduleResponse>({
    url: isCreating ? "/schedules" : `/schedules/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });

  return data;
};
