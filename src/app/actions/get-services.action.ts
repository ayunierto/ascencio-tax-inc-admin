import { api } from "@/api/api";
import { ServicesResponse } from "@/interfaces/get-all-services.response";

export const getServicesAction = async (): Promise<ServicesResponse> => {
  try {
    const { data } = await api.get<ServicesResponse>("/services");
    return data;
  } catch (error) {
    throw error;
  }
};
