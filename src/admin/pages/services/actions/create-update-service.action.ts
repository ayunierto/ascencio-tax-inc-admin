import { api } from "@/api/api";
import { Service } from "../schemas/service.schema";
import { ServiceResponse } from "../interfaces/service.response";

export const createUpdateServiceAction = async (
  serviceLike: Partial<Service>
): Promise<ServiceResponse> => {
  const { id, ...rest } = serviceLike;

  const isCreating = id === "new";

  const { data } = await api<ServiceResponse>({
    url: isCreating ? "/services" : `/services/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: rest,
  });

  return data;
};
