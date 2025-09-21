import { api } from "@/api/api";
import { UserResponse } from "../interfaces/user.response";

export const deleteUserAction = async (id: string): Promise<UserResponse> => {
  try {
    const { data } = await api.delete<UserResponse>(`/users/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
