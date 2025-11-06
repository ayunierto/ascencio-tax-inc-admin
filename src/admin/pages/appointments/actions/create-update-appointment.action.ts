import { api } from '@/api/api';
import { AppointmentFormFields } from '../schemas/appointment.schema';
import { AppointmentResponse } from '../interfaces/appointment.response';

export const createUpdateAppointment = async (
  appointmentLike: Partial<AppointmentFormFields>
): Promise<AppointmentResponse> => {
  const { id, ...rest } = appointmentLike;

  const isCreating = id === 'new';

  const { data } = await api<AppointmentResponse>({
    url: isCreating ? '/appointments' : `/appointments/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: { ...rest },
  });

  return data;
};
