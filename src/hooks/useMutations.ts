import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ExceptionResponse } from '@/interfaces';

// Props para el hook de mutaciones
interface UseMutationsProps<T, TCreate, TUpdate> {
  queryKey: string[];
  service: {
    create: (data: TCreate) => Promise<T | ExceptionResponse>;
    update: (id: string, data: TUpdate) => Promise<T | ExceptionResponse>;
    remove: (id: string) => Promise<T | ExceptionResponse>;
  };
  entityName: string;
  onClose: () => void;
}

// Tipos para las variables de las mutaciones
type UpdateVariables<TUpdate> = { id: string; data: TUpdate };

export const useMutations = <T extends { id: string; name?: string }, TCreate, TUpdate>({
  queryKey,
  service,
  entityName,
  onClose,
}: UseMutationsProps<T, TCreate, TUpdate>) => {
  const queryClient = useQueryClient();

  const handleSuccess = (action: 'created' | 'updated' | 'deleted', data: T | ExceptionResponse) => {
    if ('error' in data) {
      toast.error(data.message);
      return;
    }
    toast.success(`${data.name || entityName} has been ${action}.`);
    queryClient.invalidateQueries({ queryKey });
    onClose();
  };

  const handleError = (error: Error, action: string) => {
    toast.error(error.message || `An unknown error occurred during ${action}.`);
    onClose();
  };

  const createMutation = useMutation<T | ExceptionResponse, Error, TCreate>({
    mutationFn: service.create,
    onSuccess: (data) => handleSuccess('created', data),
    onError: (error) => handleError(error, 'creation'),
  });

  const updateMutation = useMutation<T | ExceptionResponse, Error, UpdateVariables<TUpdate>>({
    mutationFn: ({ id, data }) => service.update(id, data),
    onSuccess: (data) => handleSuccess('updated', data),
    onError: (error) => handleError(error, 'update'),
  });

  const deleteMutation = useMutation<T | ExceptionResponse, Error, string>({
    mutationFn: service.remove,
    onSuccess: (data) => handleSuccess('deleted', data),
    onError: (error) => handleError(error, 'deletion'),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};