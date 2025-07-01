import { useState } from 'react';
import { UpdateCurrencyInputs } from '../schemas';

export const useCurrencyForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currencyToEdit, setCurrencyToEdit] = useState<UpdateCurrencyInputs>();

  const openFormToEdit = (currency: UpdateCurrencyInputs) => {
    setCurrencyToEdit(currency);
    setIsOpen(true);
  };

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setCurrencyToEdit(undefined);
    setIsOpen(false);
  };

  return {
    isOpen,
    openFormToEdit,
    openForm,
    closeForm,
    currencyToEdit,
    setIsOpen,
  };
};
