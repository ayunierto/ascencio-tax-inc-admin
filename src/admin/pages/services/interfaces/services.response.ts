import { ServiceResponse } from '@/admin/pages/services/interfaces/service.response';

export interface ServicesResponse {
  count: number;
  pages: number;
  services: ServiceResponse[];
}
