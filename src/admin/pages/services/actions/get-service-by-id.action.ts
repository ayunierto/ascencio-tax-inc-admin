import { api } from "@/api/api";
import { Service } from "@/interfaces/service.interface";

export const GetServiceByIdAction = async (id: string): Promise<Service> => {
  if (!id) throw new Error("Service ID is required");

  if (id === "new") {
    return {
      id: "new",
      name: "",
      description: "",
      duration: 0,
      price: 0,
      isActive: true,
      isAvailableOnline: false,
      image: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      address: "",
    };
  }

  const { data } = await api.get<Service>(`/services/${id}`);
  return data;
};
