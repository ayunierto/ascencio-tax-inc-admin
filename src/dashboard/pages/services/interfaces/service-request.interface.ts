export interface ServiceRequest {
  name: string;
  address: string;
  isAvailableOnline: boolean;
  duration: number;
  description?: string;
  isActive: boolean;
  image: File;
  staff: string[];
  price: number;
}
