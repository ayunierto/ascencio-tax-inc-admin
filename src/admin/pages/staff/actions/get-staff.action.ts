import { api } from "@/api/api";
import { StaffResponse } from "../interfaces/staff.response";

export const getStaffAction = async () => {
  try {
    const { data } = await api.get<StaffResponse[]>("/staff");
    return data;
  } catch (error) {
    throw error;
  }
};
