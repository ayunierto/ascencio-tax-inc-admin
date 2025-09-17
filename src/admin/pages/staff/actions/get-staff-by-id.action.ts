import { api } from "@/api/api";
import { StaffResponse } from "../interfaces/staff.response";

export const getStaffByIdAction = async (
  id: string
): Promise<StaffResponse> => {
  try {
    if (id === "new") {
      return {
        id: "new",
        firstName: "",
        lastName: "",
        isActive: true,
        schedules: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    const { data } = await api.get<StaffResponse>(`/staff/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
