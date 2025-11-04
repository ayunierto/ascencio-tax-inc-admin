import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getAppointmentById } from '../actions/get-appointment-by-id.action';
import { AppointmentResponse } from '../interfaces/appointment.response';
import { ServerException } from '@/interfaces/server-exception.response';

export const useAppointment = (id: string) => {
  return useQuery<
    AppointmentResponse,
    AxiosError<ServerException>,
    AppointmentResponse
  >({
    queryKey: ['appointment', id],
    queryFn: () => getAppointmentById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
};
