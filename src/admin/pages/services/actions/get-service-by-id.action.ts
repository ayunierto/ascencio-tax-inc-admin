import { api } from "@/api/api";
import { ServiceResponse } from "../interfaces/service.response";

export const getServiceByIdAction = async (
  id: string
): Promise<ServiceResponse> => {
  try {
    if (id === "new") {
      return {
        id: "new",
        name: "",
        duration: 0,
        address: "",
        isAvailableOnline: false,
        isActive: true,
        createdAt: "",
        updatedAt: "",
        description: "",
        staff: [],
        imageUrl: undefined,
      };
    }
    const { data } = await api.get<ServiceResponse>(`/services/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
