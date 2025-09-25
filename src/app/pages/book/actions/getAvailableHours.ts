import { api } from "@/api/api";

export const getAvailableHoursAction = async (
  staffId: string, // 84097f13-8d57-46a8-ac1d-1f713f3fd2ea
  date: string // 2024-06-25 (YYYY-MM-DD)
  // serviceId: string // 5f4dcb3e-1d2a-4e6b-8f3c-2a4e5f6b7c8d
) => {
  try {
    const response = await api.get<string[]>(`/appointments/availability`, {
      params: {
        staffId,
        date,
        // serviceId
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
