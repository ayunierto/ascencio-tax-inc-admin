import { Service } from "./service.interface";

export interface ServicesResponse {
  count: number;
  pages: number;
  services: Service[];
}
