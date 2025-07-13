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
import { useCurrenciesData, useCurrencyColumns } from './hooks';

// Schemas and interfaces
import { Currency } from './interfaces';
import { createCurrencySchema } from './schemas';

export const CurrenciesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currencyToEdit, setCurrencyToEdit] = useState<Currency | undefined>();

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrencyToEdit(undefined);
  };

  // ---Requests and mutations with React Query ---
  const { currencies, isFetchingCurrencies, apiServiceCurrencies } =
    useCurrenciesData();

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useMutations({
    queryKey: ['currencies'],
    service: apiServiceCurrencies,
    entityName: 'Currency',
    onClose: closeForm,
  });

  // --- Handler functions (The Origen) ---
  const handleOpenFormToEdit = (currency: Currency) => {
    setCurrencyToEdit(currency);
    setIsFormOpen(true);
  };

  const handleDeleteCurrency = async (currencyId: string) => {
    await deleteMutation.mutateAsync(currencyId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    if (currencyToEdit) {
      await updateMutation.mutateAsync({
        id: currencyToEdit.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const { columns } = useCurrencyColumns({
    onEdit: handleOpenFormToEdit,
    onDelete: handleDeleteCurrency,
    deletingItemId: deleteMutation.isPending ? deleteMutation.variables : null,
  });

  // --- LOADING STATES ---
  // Currency loading state and error handling
  if (isFetchingCurrencies)
    return <Loader showText text="Loading currencies..." />;
  if (!currencies) return <LoadingError name="currencies" />;
  if (currencies instanceof HttpError) {
    return <LoadingError name="currencies" message={currencies.message} />;
  }

  return (
    <div>
      <GenericCreateAndUpdate
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onClose={closeForm}
        entityName="currency"
        isEditMode={!!currencyToEdit}
      >
        <GenericForm
          schema={createCurrencySchema}
          onSubmit={handleSubmit}
          defaultValues={
            currencyToEdit || {
              name: '',
              symbol: '',
              coinSuffix: '',
            }
          }
          isEditMode={!!currencyToEdit}
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
                        placeholder="Canadian Dollar"
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
                name={'coinSuffix'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coin Suffix</FormLabel>
                    <FormControl>
                      <Input placeholder="CAD" type={'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input placeholder="$" type={'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        />
      </GenericCreateAndUpdate>

      <DataTable columns={columns} data={currencies || []} filter="name" />
    </div>
  );
};

export default CurrenciesPage;
