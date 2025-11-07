import { api } from '@/api/api';
import { DashboardMetrics } from '../interfaces/dashboard-metrics.interface';

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const { data } = await api.get<DashboardMetrics>('/dashboard/metrics');
  return data;
};
