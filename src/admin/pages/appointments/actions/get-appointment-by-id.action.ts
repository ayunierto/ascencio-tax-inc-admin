import { api } from '@/api/api';
import { AppointmentResponse } from '../interfaces/appointment.response';

export const getAppointmentById = async (
  id: string
): Promise<AppointmentResponse> => {
  if (id === 'new') {
    return {
      id: 'new',
      calendarEventId: '',
      zoomMeetingId: '',
      zoomMeetingLink: '',
      start: '',
      end: '',
      status: '',
      source: '',
      createdAt: '',
      updatedAt: '',
    };
  }
  const { data } = await api.get<AppointmentResponse>(`/appointments/${id}`);
  return data;
};
