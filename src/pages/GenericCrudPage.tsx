// src/pages/GenericCrudPage.tsx

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

import { Loader } from '@/components/Loader';
import { DataTable } from '@/components/DataTable/DataTable';
import { GenericCreateAndUpdate } from '@/components/GenericCreateAndUpdate'; // Componente genérico para Dialog/Drawer
import { GenericForm, FormFieldConfig } from '@/components/GenericForm';
import { useMutations } from '@/hooks/useMutations';
import { createApiService } from '@/services/apiService';

// Props para la página genérica
interface GenericCrudPageProps<T extends { id: string }, TCreate, TUpdate> {
  entityName: string;
  queryKey: string[];
  columns: ColumnDef<T>[];
  formFields: FormFieldConfig[];
  createSchema: z.ZodObject<any, any, any>;
  filterField: keyof T;
}

export const GenericCrudPage = <T extends { id: string }, TCreate, TUpdate>({
  entityName,
  queryKey,
  columns,
  formFields,
  createSchema,
  filterField,
}: GenericCrudPageProps<T, TCreate, TUpdate>) => {
  // Estado para el modal/drawer y la entidad a editar
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = useState<T | undefined>(undefined);

  // Instancia del servicio de API
  const apiService = createApiService<T, TCreate, TUpdate>(entityName);

  // Hook para obtener los datos
  const { data, isFetching, error } = useQuery<T[], Error>({
    queryKey,
    queryFn: apiService.getAll,
  });

  // Hooks para las mutaciones
  const { createMutation, updateMutation, deleteMutation } = useMutations<
    T,
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

  // Manejador del submit del formulario
  const handleSubmit = (formData: z.infer<typeof createSchema>) => {
    if (itemToEdit) {
      updateMutation.mutate({ id: itemToEdit.id, data: formData as TUpdate });
    } else {
      createMutation.mutate(formData as TCreate);
    }
  };

  // Lógica para abrir/cerrar el formulario
  const openFormToEdit = (item: T) => {
    setItemToEdit(item);
    setIsOpen(true);
  };

  // Renderizado
  if (isFetching) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

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
          defaultValues={itemToEdit as z.infer<typeof createSchema> | undefined}
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