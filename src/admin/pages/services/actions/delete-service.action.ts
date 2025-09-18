import { api } from "@/api/api";
import { ServiceResponse } from "../interfaces/service.response";

export const deleteServiceAction = async (
  id: string
): Promise<ServiceResponse> => {
  try {
    const { data } = await api.delete<ServiceResponse>(`/services/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
