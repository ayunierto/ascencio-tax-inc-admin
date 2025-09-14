import { Staff } from "@/admin/interfaces/staff.interface";
import { api } from "@/api/api";

export const getStaffByIdAction = async (id: String): Promise<Staff> => {
  try {
    if (!id) throw new Error("Staff ID is required");
    if (typeof id !== "string") throw new Error("Staff ID must be a string");
    if (id === "new") {
      return {
        id: "new",
        firstName: "",
        lastName: "",
        isActive: true,
        createdAt: "",
        updatedAt: "",
      };
    }
    const { data } = await api.get<Staff>(`/staff/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
