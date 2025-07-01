import { Loader } from '@/components/Loader';
import { DataTable } from '@/components/DataTable/DataTable';
import { useCurrencies } from './hooks/useCurrency';
import { useCurrencyData, useCurrencyForm } from './hooks';
import { CreateAndUpdateCurrency } from './components';

export const CurrenciesPage = () => {
  const { openFormToEdit, currencyToEdit, isOpen, closeForm, setIsOpen } =
    useCurrencyForm();

  const { columns } = useCurrencies({ openFormToEdit });
  const { data: currencies, isFetching } = useCurrencyData();

  if (isFetching) {
    return <Loader />;
  }

  if (!currencies || 'error' in currencies) {
    return (
      <div className="w-screen h-screen items-center justify-center flex-grow">
        Error loading account types:{' '}
        {currencies?.message || 'An unexpected error occurred.'}
      </div>
    );
  }

  return (
    <div>
      <CreateAndUpdateCurrency
        open={isOpen}
        currencyToEdit={currencyToEdit}
        setOpen={setIsOpen}
        onClose={closeForm}
      />

      <DataTable columns={columns} data={currencies} filter="name" />
    </div>
  );
};

export default CurrenciesPage;
