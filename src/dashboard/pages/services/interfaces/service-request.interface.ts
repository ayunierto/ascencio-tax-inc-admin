export interface CreateServiceRequest {
  name: string;
  duration: number;
  price: number;
  description?: string;
  address: string;
  isAvailableOnline: boolean;
  isActive: boolean;
  image?: string | File;
  staff: string[];
}
