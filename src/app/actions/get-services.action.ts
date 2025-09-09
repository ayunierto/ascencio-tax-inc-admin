import { api } from "@/api/api";
import { Service } from "@/interfaces/service.response";

export const getServicesAction = async (): Promise<Service[]> => {
  const { data } = await api.get<Service[]>("/services");
  return data;
};
