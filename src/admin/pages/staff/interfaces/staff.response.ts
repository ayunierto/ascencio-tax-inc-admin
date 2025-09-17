import { ScheduleResponse } from "../../schedules/interfaces/schedules.response";

export interface StaffResponse {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  schedules: ScheduleResponse[];
  // TODO: Uncomment when services are implemented
  // services: ServiceResponse[];
  createdAt: string;
  updatedAt: string;
}
