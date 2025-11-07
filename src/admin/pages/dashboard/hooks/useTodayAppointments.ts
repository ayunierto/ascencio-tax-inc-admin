import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getTodayAppointments } from '../actions/get-today-appointments.action';
import { TodayAppointmentsResponse } from '../interfaces/today-appointments.interface';
import { ServerException } from '@/interfaces/server-exception.response';

export const useTodayAppointments = () => {
  return useQuery<
    TodayAppointmentsResponse,
    AxiosError<ServerException>,
    TodayAppointmentsResponse
  >({
    queryKey: ['today-appointments'],
    queryFn: getTodayAppointments,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 60 * 5, // Auto refresh every 5 minutes
    retry: 1,
  });
};
