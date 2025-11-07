import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getDashboardMetrics } from '../actions/get-dashboard-metrics.action';
import { DashboardMetrics } from '../interfaces/dashboard-metrics.interface';
import { ServerException } from '@/interfaces/server-exception.response';

export const useDashboardMetrics = () => {
  return useQuery<
    DashboardMetrics,
    AxiosError<ServerException>,
    DashboardMetrics
  >({
    queryKey: ['dashboard-metrics'],
    queryFn: getDashboardMetrics,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
