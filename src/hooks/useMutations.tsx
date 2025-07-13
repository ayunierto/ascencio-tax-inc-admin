import { HttpError } from '@/adapters/http/http-client.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseMutationsProps<TEntity, TCreate, TUpdate> {
  queryKey: string[];
  service: {
    create: (data: TCreate) => Promise<TEntity | HttpError>;
    update: (id: string, data: TUpdate) => Promise<TEntity | HttpError>;
    remove: (id: string) => Promise<TEntity | HttpError>;
  };
  entityName: string;
  onClose: () => void;
}

// Types for mutations variables
type UpdateVariables<TUpdate> = { id: string; data: TUpdate };

export const useMutations = <
  TEntity extends { id: string; name?: string },
  TCreate,
  TUpdate
>({
  queryKey,
  service,
  entityName,
  onClose,
}: UseMutationsProps<TEntity, TCreate, TUpdate>) => {
  const queryClient = useQueryClient();

  const handleSuccess = (
    action: 'created' | 'updated' | 'deleted',
    data: TEntity | HttpError,
    variables?: TCreate | UpdateVariables<TUpdate> | string
  ) => {
    if (data instanceof HttpError) {
      toast.error(data.message);
      return;
    }
    toast.success(`${data.name || entityName} has been ${action}.`);

    // queryClient.invalidateQueries({ queryKey });
    // Update the query data optimistically
    queryClient.setQueryData<TEntity[]>(queryKey, (oldData) => {
      if (!oldData) return [data];
      if (action === 'created') {
        return [...oldData, data];
      }
      if (action === 'updated') {
        return oldData.map((item) => (item.id === data.id ? data : item));
      }
      if (action === 'deleted') {
        if (typeof variables === 'string') {
          // If variables is a string, it is the id of the item to delete
          return oldData.filter((item) => item.id !== variables);
        }
      }
      return oldData;
    });
    onClose();
  };

  const handleError = (error: Error, action: string) => {
    toast.error(error.message || `An unknown error occurred during ${action}.`);
    onClose();
  };

  const createMutation = useMutation<TEntity | HttpError, Error, TCreate>({
    mutationFn: service.create,
    onSuccess: (data, variables) => handleSuccess('created', data, variables),
    onError: (error) => handleError(error, 'creation'),
  });

  const updateMutation = useMutation<
    TEntity | HttpError,
    Error,
    UpdateVariables<TUpdate>
  >({
    mutationFn: ({ id, data }) => service.update(id, data),
    onSuccess: (data, variables) => handleSuccess('updated', data, variables),
    onError: (error) => handleError(error, 'update'),
  });

  const deleteMutation = useMutation<TEntity | HttpError, Error, string>({
    mutationFn: service.remove,
    onSuccess: (data, variables) => handleSuccess('deleted', data, variables),
    onError: (error) => handleError(error, 'deletion'),
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
