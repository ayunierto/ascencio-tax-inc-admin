import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { AccountTypeForm } from './AccountTypeForm';
import { UpdateAccountTypeInputs } from '../schemas';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  accountTypeToEdit?: UpdateAccountTypeInputs;
}

export const CreateAndUpdateAccountType = ({
  open,
  setOpen,
  onClose,
  accountTypeToEdit,
}: Props) => {
  const isMobile = useIsMobile();

  const closeForm = () => setOpen(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
    setOpen(open);
  };

  if (isMobile)
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="outline">Add</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>
              {!accountTypeToEdit ? 'Add account type' : 'Edit account type'}
            </DrawerTitle>
            <DrawerDescription>
              Create an account type here. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          <AccountTypeForm
            onClose={onClose}
            className="px-4"
            closeForm={closeForm}
            accountTypeToEdit={accountTypeToEdit}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className="flex">
        <Button variant="outline" className="ml-auto">
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {!accountTypeToEdit ? 'Add account type' : 'Edit account type'}
          </DialogTitle>
          <DialogDescription>
            Create an account type here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <AccountTypeForm
          onClose={onClose}
          closeForm={closeForm}
          accountTypeToEdit={accountTypeToEdit}
        />
      </DialogContent>
    </Dialog>
  );
};
