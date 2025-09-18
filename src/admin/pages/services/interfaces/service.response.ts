import { StaffResponse } from "../../staff/interfaces/staff.response";

export interface ServiceResponse {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  address: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  image?: string;
  staff: StaffResponse[];
  createdAt: string;
  updatedAt: string;
}
