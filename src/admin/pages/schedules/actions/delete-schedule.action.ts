import { api } from "@/api/api";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const deleteScheduleAction = async (
  id: string
): Promise<ScheduleResponse> => {
  try {
    const { data } = await api.delete<ScheduleResponse>(`/schedules/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
