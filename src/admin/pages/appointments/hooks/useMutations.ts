import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AppointmentResponse } from '../interfaces/appointment.response';
import { deleteAppointment } from '../actions/delete-appointment.action';
import { AppointmentFormFields } from '../schemas/appointment.schema';
import { ServerException } from '@/interfaces/server-exception.response';
import { createUpdateAppointment } from '../actions/create-update-appointment.action';
import { AppointmentsResponse } from '../interfaces/appointments.response';

export const useMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    AppointmentResponse,
    AxiosError<ServerException>,
    Partial<AppointmentFormFields>
  >({
    mutationFn: createUpdateAppointment,
    onSuccess: (response) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.setQueryData(['appointment', response.id], response);

      queryClient.setQueryData(
        ['appointments'],
        (oldList: AppointmentsResponse): AppointmentsResponse => {
          if (!oldList) return { appointments: [response], count: 1, pages: 1 };

          if (
            !oldList.appointments.find(
              (appointment) => appointment.id === response.id
            )
          ) {
            return {
              ...oldList,
              appointments: [...oldList.appointments, response],
            };
          }

          return {
            ...oldList,
            appointments: oldList.appointments.map((s) =>
              s.id === response.id ? response : s
            ),
          };
        }
      );
    },
  });

  const deleteMutation = useMutation<
    AppointmentResponse,
    AxiosError<ServerException>,
    string,
    unknown
  >({
    mutationFn: deleteAppointment,
    onSuccess: (_data, id) => {
      // queryClient.setQueryData(
      //   ['appointments'],
      //   (oldList: AppointmentsResponse): AppointmentsResponse => {
      //     if (!oldList) return { appointments: [], count: 0, pages: 0 };
      //     return {
      //       ...oldList,
      //       appointments: oldList.appointments.filter(
      //         (appointment) => appointment.id !== id
      //       ),
      //     };
      //   }
      // );
      queryClient.invalidateQueries({ queryKey: ['appointments'] });

      queryClient.removeQueries({ queryKey: ['appointment', id] });
    },
  });

  return { mutation, deleteMutation };
};
