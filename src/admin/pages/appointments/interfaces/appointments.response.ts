import { AppointmentResponse } from './appointment.response';

export interface AppointmentsResponse {
  count: number;
  pages: number;
  appointments: AppointmentResponse[];
}
