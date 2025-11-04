import { AppointmentsResponse } from '../interfaces/appointments.response';
import { api } from '@/api/api';

interface Options {
  limit?: number | string;
  offset?: number | string;
}

export const getAppointments = async (
  options: Options
): Promise<AppointmentsResponse> => {
  const { limit, offset } = options;
  const { data } = await api.get<AppointmentsResponse>('/appointments', {
    params: {
      limit,
      offset,
    },
  });

  return data;
};
