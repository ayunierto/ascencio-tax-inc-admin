import { api } from "@/api/api";
import { Staff } from "../schemas/staff.schema";
import { StaffResponse } from "../interfaces/staff.response";

export const createUpdateStaffMemberAction = async (
  staffLike: Partial<Staff>
): Promise<StaffResponse> => {
  const { id, ...rest } = staffLike;

  const isCreating = id === "new";

  const { data } = await api<StaffResponse>({
    url: isCreating ? "/staff" : `/staff/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });

  return data;
};
