import { useState } from 'react';
import { UpdateAccountTypeInputs } from '../schemas';

export const useAccountTypeForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accountTypeToEdit, setAccountTypeToEdit] =
    useState<UpdateAccountTypeInputs>();

  const openFormToEdit = (accountType: UpdateAccountTypeInputs) => {
    setAccountTypeToEdit(accountType);
    setIsOpen(true);
  };

  const openForm = () => {
    setIsOpen(true);
  };

  const closeForm = () => {
    setAccountTypeToEdit(undefined);
    setIsOpen(false);
  };

  return {
    isOpen,
    openFormToEdit,
    openForm,
    closeForm,
    accountTypeToEdit,
    setIsOpen,
  };
};
