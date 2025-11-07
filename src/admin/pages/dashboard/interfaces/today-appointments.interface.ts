export interface TodayAppointment {
  id: string;
  start: string;
  end: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  comments?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
  };
  staff: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface TodayAppointmentsResponse {
  appointments: TodayAppointment[];
  total: number;
}
