import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountType,
  CreateAccountTypeResponse,
  DeleteAccountTypeResponse,
  UpdateAccountTypeResponse,
} from '../interfaces';
import { CreateAccountTypeInputs, UpdateAccountTypeInputs } from '../schemas';
import {
  createAccountType,
  deleteAccountType,
  updateAccountType,
} from '../actions';
import { toast } from 'sonner';
import { ExceptionResponse } from '@/interfaces';

type Props = {
  closeForm: () => void;
};

export const useCreateAccountType = ({ closeForm }: Props) => {
  const queryClient = useQueryClient();
  return useMutation<CreateAccountTypeResponse, Error, CreateAccountTypeInputs>(
    {
      mutationFn: async (data) => {
        return await createAccountType(data);
      },
      onSuccess: async (response) => {
        if ('error' in response) {
          toast.error(response.message);
          return;
        }

        const createdAccountType = response;

        queryClient.setQueryData<AccountType[]>(
          ['account-types'],
          (oldData) => {
            if (!oldData) return [createdAccountType];

            return [...oldData, createdAccountType];
          }
        );

        closeForm();
        toast.success(`${createdAccountType.name} has been created.`);
      },
      onError: (error) => {
        closeForm();
        toast.error(error.message);
      },
    }
  );
};

export const useUpdateAccountType = ({ closeForm }: Props) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateAccountTypeResponse,
    ExceptionResponse,
    UpdateAccountTypeInputs
  >({
    mutationFn: updateAccountType,
    onSuccess(data, variables) {
      if ('error' in data) {
        toast.error(data.message);
        return;
      }

      const updatedAccountType = data;

      queryClient.setQueryData<AccountType[]>(['account-types'], (oldData) => {
        if (!oldData) return [];

        return oldData.map((accountType) =>
          accountType.id === updatedAccountType.id
            ? { ...accountType, ...updatedAccountType }
            : accountType
        );
      });

      queryClient.removeQueries({ queryKey: ['account-types', variables] });
      closeForm();
      toast.success(`${data.name} has been updated.`);
    },
    onError: (error) => {
      closeForm();
      toast.error(error.message || 'An unknown error occurred during update.');
    },
  });
};

export const useDeleteAccountType = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteAccountTypeResponse, ExceptionResponse, string>({
    mutationFn: deleteAccountType,
    onSuccess(data, variables) {
      if ('error' in data) {
        toast.error(data.message);
        return;
      }

      const idToDelete = variables;

      queryClient.setQueryData<AccountType[]>(['account-types'], (oldData) => {
        return oldData?.filter((accountType) => accountType.id !== idToDelete);
      });

      queryClient.removeQueries({ queryKey: ['account-types', variables] });

      toast.success(`${data.name} has been deleted.`);
    },
    onError: (error) => {
      toast.error(
        error.message || 'An unknown error occurred during deletion.'
      );
    },
  });
};
