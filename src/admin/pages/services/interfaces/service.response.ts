import { StaffResponse } from "../../staff/interfaces/staff.response";

export interface ServiceResponse {
  id: string;
  name: string;
  duration: number;
  description?: string;
  address: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  imageUrl?: string;
  staff: StaffResponse[];
  createdAt: string;
  updatedAt: string;
}
