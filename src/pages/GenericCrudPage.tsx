import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { Loader } from '@/components/Loader';
import { DataTable } from '@/components/DataTable/DataTable';
import { GenericCreateAndUpdate } from '@/components/GenericCreateAndUpdate';
import {
  GenericForm,
  FormFieldConfig,
} from '@/dashboard/components/GenericForm';
import { useMutations } from '@/hooks/useMutations';
import { createApiService } from '@/services/apiService';
import { HttpError } from '@/adapters/http/http-client.interface';
import { LoadingError } from '@/dashboard/components';

interface GenericCrudPageProps<
  TEntity extends { id: string },
  TCreate,
  TUpdate
> {
  entityName: string;
  queryKey: string[];
  columns: ColumnDef<TEntity>[];
  formFields: FormFieldConfig[];
  createSchema: z.ZodTypeAny;
  filterField: keyof TEntity;
}

export const GenericCrudPage = <
  TEntity extends { id: string },
  TCreate,
  TUpdate
>({
  entityName,
  queryKey,
  columns,
  formFields,
  createSchema,
  filterField,
}: GenericCrudPageProps<TEntity, TCreate, TUpdate>) => {
  // State for the modal/drawer and the entity to edit
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<TEntity | undefined>(undefined);

  // API service instance
  const apiService = createApiService<TEntity, TCreate, TUpdate>(entityName);

  // Hook to get the data
  const { data, isFetching, error } = useQuery<HttpError | TEntity[], Error>({
    queryKey,
    queryFn: apiService.getAll,
  });

  // Hooks for the mutations
  const { createMutation, updateMutation } = useMutations<
    TEntity,
    TCreate,
    TUpdate
  >({
    queryKey,
    service: apiService,
    entityName,
    onClose: () => {
      setIsOpen(false);
      setItemToEdit(undefined);
    },
  });

  // Submit handle of the form
  const handleSubmit = (formData: TCreate | TUpdate) => {
    if (itemToEdit) {
      updateMutation.mutate({ id: itemToEdit.id, data: formData as TUpdate });
    } else {
      createMutation.mutate(formData as TCreate);
    }
  };

  // Logic to open/close the form
  // const openFormToEdit = (item: TEntity) => {
  //   setItemToEdit(item);
  //   setIsOpen(true);
  // };

  // Rendered
  if (isFetching) return <Loader />;
  if (!data) return <LoadingError name={entityName} />;
  if (data instanceof HttpError)
    return <LoadingError name={entityName} message={data.message} />;
  if (error) return <LoadingError name={entityName} message={error.message} />;

  // Necesitas adaptar las columnas para que usen las funciones genéricas de editar/eliminar
  // Esto puede requerir pasar `openFormToEdit` y `deleteMutation.mutate` al hook que genera las columnas.

  return (
    <div>
      <GenericCreateAndUpdate
        open={isOpen}
        setOpen={setIsOpen}
        onClose={() => setItemToEdit(undefined)}
        entityName={entityName}
        isEditMode={!!itemToEdit}
      >
        <GenericForm
          schema={createSchema}
          fields={formFields}
          onSubmit={handleSubmit}
          defaultValues={itemToEdit}
          isEditMode={!!itemToEdit}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      </GenericCreateAndUpdate>

      <DataTable
        columns={columns}
        data={data || []}
        filter={String(filterField)}
      />
    </div>
  );
};
