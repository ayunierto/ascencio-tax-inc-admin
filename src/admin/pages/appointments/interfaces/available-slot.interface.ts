import { StaffResponse } from '../../staff/interfaces/staff.response';

export interface AvailableSlot {
  /** Start time of the slot in ISO 8601 (UTC) format. Example: '2025-10-20T14:30:00.000Z' */
  startTimeUTC: string;
  /** End time of the slot in ISO 8601 (UTC) format. Example: '2025-10-20T15:00:00.000Z' */
  endTimeUTC: string;
  /** Staff members available for this slot. */
  availableStaff: StaffResponse[];
}
