import { api } from "@/api/api";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const deleteScheduleAction = async (
  scheduleId: string
): Promise<ScheduleResponse> => {
  try {
    const { data } = await api.delete<ScheduleResponse>(
      `/schedules/${scheduleId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
