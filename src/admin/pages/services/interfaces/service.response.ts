import { StaffResponse } from '../../staff/interfaces/staff.response';

export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  durationMinutes: number;
  isAvailableOnline: boolean;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  staff: StaffResponse[];
}
