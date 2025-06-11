import { Staff } from '../../staff/interfaces/staff.interface';
import { User } from '../../users/interfaces';
import { Image } from './image.interface';

export interface ServiceResponse {
  id: string;
  name: string;
  duration: number;
  price: string;
  address: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  images: Image[];
  staff: Staff[];
  user: User;
  description?: string;
}
