import { api } from "@/api/api";
import { StaffResponse } from "../interfaces/staff.response";

export const deleteStaffMemberAction = async (
  id: string
): Promise<StaffResponse> => {
  try {
    const { data } = await api.delete<StaffResponse>(`/staff/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
