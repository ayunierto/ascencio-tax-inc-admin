import { Staff } from "@/admin/interfaces/staff.interface";
import { api } from "@/api/api";

export const getAllStaffAction = async () => {
  try {
    const { data } = await api.get<Staff[]>("/staff");
    return data;
  } catch (error) {
    throw error;
  }
};
