import { Service } from "@/interfaces/service.interface";
import { CreateServiceRequest } from "../schemas/create-service.schema";
import { api } from "@/api/api";

export const createServiceAction = async (
  service: CreateServiceRequest
): Promise<Service> => {
  try {
    const { data } = await api.post<Service>("/services", service);
    return data;
  } catch (error) {
    throw error;
  }
};
