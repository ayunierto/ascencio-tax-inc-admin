import { createApiService } from '@/services/apiService';
import { Staff } from '../interfaces';
import { CreateStaffRequest, UpdateStaffRequest } from '../schemas';
import { HttpError } from '@/adapters/http/http-client.interface';
import { useQuery } from '@tanstack/react-query';

export const useStaffData = () => {
  const apiServiceStaff = createApiService<
    Staff,
    CreateStaffRequest,
    UpdateStaffRequest
  >('staff');
  const { data: staff, isFetching: isFetchingStaff } = useQuery<
    HttpError | Staff[],
    Error
  >({
    queryKey: ['staff'],
    queryFn: () => apiServiceStaff.getAll(),
  });

  return {
    staff,
    isFetchingStaff,
    apiServiceStaff,
  };
};
