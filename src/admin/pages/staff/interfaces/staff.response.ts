import { ScheduleResponse } from '../../schedules/interfaces/schedules.response';
import { ServiceResponse } from '../../services/interfaces/service.response';

export interface StaffResponse {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  services: ServiceResponse[];
  schedules: ScheduleResponse[];
}
