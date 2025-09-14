import { api } from "@/api/api";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const getScheduleByIdAction = async (
  scheduleId: string
): Promise<ScheduleResponse> => {
  try {
    if (scheduleId === "new") {
      return {
        id: "new",
        weekday: 0,
        startTime: "",
        endTime: "",
        createdAt: "",
        updatedAt: "",
      };
    }
    const { data } = await api.get<ScheduleResponse>(
      `/schedules/${scheduleId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
