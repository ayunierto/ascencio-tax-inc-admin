import { api } from "@/api/api";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const getScheduleByIdAction = async (
  id: string
): Promise<ScheduleResponse> => {
  try {
    if (id === "new") {
      return {
        id: "new",
        weekday: 0,
        startTime: "",
        endTime: "",
        createdAt: "",
        updatedAt: "",
      };
    }
    const { data } = await api.get<ScheduleResponse>(`/schedules/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
