import { Staff } from "@/admin/interfaces/staff.interface";
import { api } from "@/api/api";
import { CreateStaffRequest } from "../schemas/create-staff.schema";

export const createStaffAction = async (inputs: CreateStaffRequest) => {
  const { data } = await api.post<Staff>("/staff", inputs);

  return data;
};
