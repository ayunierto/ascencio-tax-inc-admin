import { createApiService } from '@/services/apiService';
import { Schedule } from '../interfaces';
import { CreateScheduleRequest, UpdateScheduleRequest } from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { HttpError } from '@/adapters/http/http-client.interface';

export const useSchedulesData = () => {
  const apiServiceSchedules = createApiService<
    Schedule,
    CreateScheduleRequest,
    UpdateScheduleRequest
  >('schedule');
  const { data: schedules, isFetching: isFetchingSchedules } = useQuery<
    HttpError | Schedule[],
    Error
  >({
    queryKey: ['schedules'],
    queryFn: () => apiServiceSchedules.getAll(),
  });
  return {
    schedules,
    isFetchingSchedules,
    apiServiceSchedules,
  };
};
