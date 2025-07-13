import { useQuery } from '@tanstack/react-query';
import { createApiService } from '@/services/apiService';
import { HttpError } from '@/adapters/http/http-client.interface';
import { AccountType } from '../interfaces';
import { CreateAccountTypeRequest, UpdateAccountTypeRequest } from '../schemas';

export const useAccountTypeData = () => {
  const apiServiceAccountTypes = createApiService<
    AccountType,
    CreateAccountTypeRequest,
    UpdateAccountTypeRequest
  >('account-types');
  const { data: accountTypes, isFetching: isFetchingAccountTypes } = useQuery<
    HttpError | AccountType[],
    Error
  >({
    queryKey: ['account-types'],
    queryFn: () => apiServiceAccountTypes.getAll(),
  });

  return {
    accountTypes,
    isFetchingAccountTypes,
    apiServiceAccountTypes,
  };
};
