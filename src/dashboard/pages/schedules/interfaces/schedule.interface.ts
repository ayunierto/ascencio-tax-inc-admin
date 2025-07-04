import { Staff } from '../../staff/interfaces';

export interface Schedule {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  staff: Staff;
}
