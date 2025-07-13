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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Hooks
import { useAccountColumns, useAccountsData } from './hooks';

// Schemas and interfaces
import { Account } from './interfaces';
import { createAccountSchema } from './schemas';
import { useCurrenciesData } from '../currencies/hooks';
import { useAccountTypeData } from '../account-types/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router';

export const AccountsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<Account | undefined>();

  const closeForm = () => {
    setIsFormOpen(false);
    setAccountToEdit(undefined);
  };

  // --- Requests ---
  const { accounts, isFetchingAccounts, apiServiceAccounts } =
    useAccountsData();
  const { currencies, isFetchingCurrencies } = useCurrenciesData();
  const { accountTypes, isFetchingAccountTypes } = useAccountTypeData();

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useMutations({
    queryKey: ['accounts'],
    service: apiServiceAccounts,
    entityName: 'Account',
    onClose: closeForm,
  });

  // --- Handler functions (The Origen) ---
  const handleOpenFormToEdit = (account: Account) => {
    setAccountToEdit(account);
    setIsFormOpen(true);
  };

  const handleDeleteAccount = async (accountId: string) => {
    await deleteMutation.mutateAsync(accountId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    if (accountToEdit) {
      await updateMutation.mutateAsync({
        id: accountToEdit.id,
        data: formData,
      });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const { columns } = useAccountColumns({
    onEdit: handleOpenFormToEdit,
    onDelete: handleDeleteAccount,
    deletingItemId: deleteMutation.isPending ? deleteMutation.variables : null,
  });

  // --- LOADING STATES ---
  // Account loading state and error handling
  if (isFetchingAccounts) return <Loader showText text="Loading accounts..." />;
  if (!accounts) return <LoadingError name="accounts" />;
  if (accounts instanceof HttpError) {
    return <LoadingError name="accounts" message={accounts.message} />;
  }

  // Currencies loading state and error handling
  if (isFetchingCurrencies)
    return <Loader showText text="Loading currencies..." />;
  if (!currencies) return <LoadingError name="currencies" />;
  if (currencies instanceof HttpError) {
    return <LoadingError name="currencies" message={currencies.message} />;
  }

  // Account types loading state and error handling
  if (isFetchingAccountTypes)
    return <Loader showText text="Loading account types..." />;
  if (!accountTypes) return <LoadingError name="accountTypes" />;
  if (accountTypes instanceof HttpError) {
    return <LoadingError name="accountTypes" message={accountTypes.message} />;
  }

  return (
    <div>
      <GenericCreateAndUpdate
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onClose={closeForm}
        entityName="account"
        isEditMode={!!accountToEdit}
      >
        <GenericForm
          schema={createAccountSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            name: accountToEdit?.name || '',
            icon: accountToEdit?.icon || '',
            currencyId: accountToEdit?.currency.id || '',
            accountTypeId: accountToEdit?.accountType.id || '',
            description: accountToEdit?.description || '',
          }}
          isEditMode={!!accountToEdit}
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
                      <Input placeholder="Cash" type={'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={'icon'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="lucide-react icon name"
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
                name="currencyId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem
                            key={currency.id}
                            value={currency.id}
                            defaultChecked={field.value === currency.id}
                          >
                            {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Manage currencies in{' '}
                      <Link
                        to={'/dashboard/currencies'}
                        className="text-blue-500 hover:underline"
                      >
                        currency settings
                      </Link>
                      .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountTypeId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Account Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accountTypes.map((accountType) => (
                          <SelectItem
                            key={accountType.id}
                            value={accountType.id}
                          >
                            {accountType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Manage account types in{' '}
                      <Link
                        to={'/dashboard/account-types'}
                        className="text-blue-500 hover:underline"
                      >
                        account type settings
                      </Link>
                      .
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        />
      </GenericCreateAndUpdate>

      <DataTable columns={columns} data={accounts || []} filter="name" />
    </div>
  );
};

export default AccountsPage;
