import { api } from '@/api/api';
import { TodayAppointmentsResponse } from '../interfaces/today-appointments.interface';

export const getTodayAppointments =
  async (): Promise<TodayAppointmentsResponse> => {
    const { data } = await api.get<TodayAppointmentsResponse>(
      '/dashboard/today-appointments'
    );
    return data;
  };
