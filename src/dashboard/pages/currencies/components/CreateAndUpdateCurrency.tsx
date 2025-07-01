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
import { CurrencyForm } from './CurrencyForm';
import { UpdateCurrencyInputs } from '../schemas';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  currencyToEdit?: UpdateCurrencyInputs;
}

export const CreateAndUpdateCurrency = ({
  open,
  setOpen,
  onClose,
  currencyToEdit,
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
              {!currencyToEdit ? 'Add currency' : 'Edit currency'}
            </DrawerTitle>
            <DrawerDescription>
              {!currencyToEdit ? 'Create' : 'Update'} an currency here. Click
              save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          <CurrencyForm
            onClose={onClose}
            className="px-4"
            closeForm={closeForm}
            currencyToEdit={currencyToEdit}
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
            {!currencyToEdit ? 'Add currency' : 'Edit currency'}
          </DialogTitle>
          <DialogDescription>
            {!currencyToEdit ? 'Create' : 'Update'} an currency here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <CurrencyForm
          onClose={onClose}
          closeForm={closeForm}
          currencyToEdit={currencyToEdit}
        />
      </DialogContent>
    </Dialog>
  );
};
