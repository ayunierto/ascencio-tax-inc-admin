import { api } from '@/api/api';
import { AvailableSlot } from '../interfaces/available-slot.interface';

interface AvailabilityRequest {
  serviceId: string;
  date: string;
  staffId?: string;
  timeZone: string; // IANA, ej. "America/Lima", "America/Toronto", etc.
}

export const getAvailabilityAction = async (
  data: AvailabilityRequest
): Promise<AvailableSlot[]> => {
  return (await api.post<AvailableSlot[]>('/availability', data)).data;
};
