import { createApiService } from '@/services/apiService';
import { Account } from '../interfaces';
import { CreateAccountRequest, UpdateAccountRequest } from '../schemas';
import { useQuery } from '@tanstack/react-query';
import { HttpError } from '@/adapters/http/http-client.interface';

export const useAccountsData = () => {
  const apiServiceAccounts = createApiService<
    Account,
    CreateAccountRequest,
    UpdateAccountRequest
  >('accounts');
  const { data: accounts, isFetching } = useQuery<HttpError | Account[], Error>(
    {
      queryKey: ['accounts'],
      queryFn: () => apiServiceAccounts.getAll(),
    }
  );

  return {
    accounts,
    isFetchingAccounts: isFetching,
    apiServiceAccounts,
  };
};
