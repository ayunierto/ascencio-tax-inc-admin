import { useState } from 'react';

// Generic imports
import { HttpError } from '@/adapters/http/http-client.interface';
import { useMutations } from '@/hooks/useMutations';
import { GenericForm, LoadingError } from '@/dashboard/components';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader } from '@/components/Loader';
import { GenericCreateAndUpdate } from '@/components/GenericCreateAndUpdate';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Hooks
import { useAccountTypeData, useAccountTypesColumns } from './hooks';

// Schemas and interfaces
import { AccountType } from './interfaces';
import { createAccountTypeSchema } from './schemas';
import { Textarea } from '@/components/ui/textarea';

export const AccountTypesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [accountTypeToEdit, setAccountTypeToEdit] = useState<
    AccountType | undefined
  >();

  const closeForm = () => {
    setIsFormOpen(false);
    setAccountTypeToEdit(undefined);
  };

  // ---Requests and mutations with React Query ---
  const { accountTypes, apiServiceAccountTypes, isFetchingAccountTypes } =
    useAccountTypeData();

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useMutations({
    queryKey: ['account-types'],
    service: apiServiceAccountTypes,
    entityName: 'AccountType',
    onClose: closeForm,
  });

  // --- Handler functions (The Origen) ---
  const handleOpenFormToEdit = (accountType: AccountType) => {
    setAccountTypeToEdit(accountType);
    setIsFormOpen(true);
  };

  const handleDeleteAccountType = async (accountTypeId: string) => {
    await deleteMutation.mutateAsync(accountTypeId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    if (accountTypeToEdit) {
      await updateMutation.mutateAsync({
        id: accountTypeToEdit.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const { columns } = useAccountTypesColumns({
    onEdit: handleOpenFormToEdit,
    onDelete: handleDeleteAccountType,
    deletingItemId: deleteMutation.isPending ? deleteMutation.variables : null,
  });

  // --- LOADING STATES ---
  // AccountType loading state and error handling
  if (isFetchingAccountTypes)
    return <Loader showText text="Loading account types..." />;
  if (!accountTypes) return <LoadingError name="account types" />;
  if (accountTypes instanceof HttpError) {
    return <LoadingError name="account types" message={accountTypes.message} />;
  }

  return (
    <div>
      <GenericCreateAndUpdate
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onClose={closeForm}
        entityName="account type"
        isEditMode={!!accountTypeToEdit}
      >
        <GenericForm
          schema={createAccountTypeSchema}
          onSubmit={handleSubmit}
          defaultValues={
            accountTypeToEdit || {
              name: '',
              description: '',
            }
          }
          isEditMode={!!accountTypeToEdit}
          isLoading={createMutation.isPending || updateMutation.isPending}
          renderFormFields={(form) => (
            <>
              <FormField
                control={form.control}
                name={'name'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Credit Card"
                        type={'text'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the account type"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        />
      </GenericCreateAndUpdate>

      <DataTable columns={columns} data={accountTypes || []} filter="name" />
    </div>
  );
};
export default AccountTypesPage;
