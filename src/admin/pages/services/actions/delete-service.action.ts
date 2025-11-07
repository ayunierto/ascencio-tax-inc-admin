import { api } from '@/api/api';
import { ServiceResponse } from '../interfaces/service.response';

export const deleteServiceAction = async (
  id: string
): Promise<ServiceResponse> => {
  const { data } = await api.delete<ServiceResponse>(`/services/${id}`);
  return data;
};
