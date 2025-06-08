import { User } from '@/core/auth/interfaces';
import { Service } from '@/core/services/interfaces';
import { Staff } from '@/core/staff/interfaces';

export interface Appointment {
  startDateAndTime: string;
  endDateAndTime: string;
  comments: string;
  calendarEventId: string;
  zoomMeetingId: number;
  zoomMeetingLink: string;
  service: Service;
  user: User;
  staff: Staff;
  updatedAt: null;
  id: string;
  state: string;
  createdAt: string;
}

export interface Image {
  id: number;
  url: string;
}
