import { api } from '@/api/api';
import { AppointmentResponse } from '../interfaces/appointment.response';

export const deleteAppointment = async (
  id: string
): Promise<AppointmentResponse> => {
  const { data } = await api.delete<AppointmentResponse>(`/appointments/${id}`);
  return data;
};
