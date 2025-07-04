import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Currency,
  CreateCurrencyResponse,
  DeleteCurrencyResponse,
  UpdateCurrencyResponse,
} from '../interfaces';
import { CreateCurrencyInputs, UpdateCurrencyInputs } from '../schemas';
import { createCurrency, deleteCurrency, updateCurrency } from '../actions';
import { toast } from 'sonner';
import { HttpError } from '@/adapters/http/http-client.interface';

type MutationsProps = {
  closeForm: () => void;
};

export const useCreateCurrency = ({ closeForm }: MutationsProps) => {
  const queryClient = useQueryClient();
  return useMutation<CreateCurrencyResponse, Error, CreateCurrencyInputs>({
    mutationFn: createCurrency,
    onSuccess: async (response) => {
      if (response instanceof HttpError) {
        toast.error(response.message);
        return;
      }

      const createdCurrency = response;

      queryClient.setQueryData<Currency[]>(['currencies'], (oldData) => {
        if (!oldData) return [createdCurrency];

        return [...oldData, createdCurrency];
      });

      closeForm();
      toast.success(`${createdCurrency.name} has been created.`);
    },
    onError: (error) => {
      closeForm();
      toast.error(error.message || 'An unknown error occurred during create.');
    },
  });
};

export const useUpdateCurrency = ({ closeForm }: MutationsProps) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateCurrencyResponse, HttpError, UpdateCurrencyInputs>({
    mutationFn: updateCurrency,
    onSuccess(data, variables) {
      if (data instanceof HttpError) {
        toast.error(data.message);
        return;
      }

      const updatedCurrency = data;
      const id = variables;

      queryClient.setQueryData<Currency[]>(['currencies'], (oldData) => {
        if (!oldData) return [];

        return oldData.map((currency) =>
          currency.id === updatedCurrency.id
            ? { ...currency, ...updatedCurrency }
            : currency
        );
      });

      queryClient.removeQueries({ queryKey: ['currencies', id] });
      closeForm();
      toast.success(`${data.name} has been updated.`);
    },
    onError: (error) => {
      closeForm();
      toast.error(error.message || 'An unknown error occurred during update.');
    },
  });
};

export const useDeleteCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCurrencyResponse, HttpError, string>({
    mutationFn: deleteCurrency,
    onSuccess(data, variables) {
      if ('error' in data) {
        toast.error(data.message);
        return;
      }

      const id = variables;

      queryClient.setQueryData<Currency[]>(['currencies'], (oldData) => {
        return oldData?.filter((currency) => currency.id !== id);
      });

      queryClient.removeQueries({ queryKey: ['currencies', id] });

      toast.success(`${data.name} has been deleted.`);
    },
    onError: (error) => {
      toast.error(
        error.message || 'An unknown error occurred during deletion.'
      );
    },
  });
};
