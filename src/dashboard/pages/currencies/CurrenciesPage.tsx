import { Loader } from '@/components/Loader';
import { DataTable } from '@/components/DataTable/DataTable';
import { useCurrencies } from './hooks/useCurrency';
import { useCurrencyData, useCurrencyForm } from './hooks';
import { CreateAndUpdateCurrency } from './components';
import { LoadingError } from '@/dashboard/components';
import { HttpError } from '@/adapters/http/http-client.interface';

export const CurrenciesPage = () => {
  const { openFormToEdit, currencyToEdit, isOpen, closeForm, setIsOpen } =
    useCurrencyForm();

  const { columns } = useCurrencies({ openFormToEdit });
  const { data: currencies, isFetching } = useCurrencyData();

  if (isFetching) {
    return <Loader />;
  }

  if (!currencies) {
    return <LoadingError name="currencies" />;
  }

  if (currencies instanceof HttpError) {
    return <LoadingError name="currencies" message={currencies.message} />;
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
