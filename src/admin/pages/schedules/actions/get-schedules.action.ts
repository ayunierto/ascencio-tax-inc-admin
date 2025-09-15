import { api } from "@/api/api";
import { ScheduleResponse } from "../interfaces/schedules.response";

export const getSchedulesAction = async () => {
  try {
    const { data } = await api.get<ScheduleResponse[]>("/schedules");
    return data;
  } catch (error) {
    throw error;
  }
};
