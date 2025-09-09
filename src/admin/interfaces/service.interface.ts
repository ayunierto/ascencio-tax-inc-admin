import { Staff } from "./staff.interface";
import { User } from "./user.interface";

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: string;
  description?: string;
  address: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  images: Image[];
  staff: Staff[];
  user: User;
}

export interface Image {
  id: number;
  url: string;
}
