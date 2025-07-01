import { Loader } from '@/components/Loader';
import { DataTable } from '@/components/DataTable/DataTable';
import { useAccountTypes } from './hooks/useAccountTypes';
import { useAccountTypeData, useAccountTypeForm } from './hooks';
import { CreateAndUpdateAccountType } from './components';

export const AccountTypesPage = () => {
  const { openFormToEdit, accountTypeToEdit, isOpen, closeForm, setIsOpen } =
    useAccountTypeForm();

  const { columns } = useAccountTypes({ openFormToEdit });
  const { data: accountTypes, isFetching } = useAccountTypeData();

  if (isFetching) {
    return <Loader />;
  }

  if (!accountTypes || 'error' in accountTypes) {
    return (
      <div className="w-screen h-screen items-center justify-center flex-grow">
        Error loading account types:{' '}
        {accountTypes?.message || 'An unexpected error occurred.'}
      </div>
    );
  }

  return (
    <div>
      <CreateAndUpdateAccountType
        open={isOpen}
        accountTypeToEdit={accountTypeToEdit}
        setOpen={setIsOpen}
        onClose={closeForm}
      />

      <DataTable columns={columns} data={accountTypes} filter="name" />
    </div>
  );
};

export default AccountTypesPage;
