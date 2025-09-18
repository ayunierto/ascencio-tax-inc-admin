import { api } from "@/api/api";
import { ServicesResponse } from "../interfaces/services.response";

export const getServicesAction = async () => {
  try {
    const { data } = await api.get<ServicesResponse>("/services");
    return data;
  } catch (error) {
    throw error;
  }
};
