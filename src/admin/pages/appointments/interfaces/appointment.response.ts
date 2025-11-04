import { ServiceResponse } from '../../services/interfaces/service.response';
import { StaffResponse } from '../../staff/interfaces/staff.response';
import { UserResponse } from '../../users/interfaces/user.response';

export interface AppointmentResponse {
  id: string;
  start: string;
  end: string;
  status: string;
  comments?: string;
  calendarEventId: string;
  zoomMeetingId: string;
  zoomMeetingLink: string;
  source: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  staff?: StaffResponse;
  service?: ServiceResponse;
  user?: UserResponse;
}
