import { Button } from '@/components/ui/button';
import { Currency } from '../interfaces';
import { UpdateCurrencyInputs } from '../schemas';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useDeleteCurrency } from '../hooks';

interface CurrencyActionsProps {
  currency: Currency;
  openFormToEdit: (data: UpdateCurrencyInputs) => void;
}

export const CurrencyActions = ({
  currency,
  openFormToEdit,
}: CurrencyActionsProps) => {
  const { mutateAsync: deleteCurrency, isPending: isDeleting } =
    useDeleteCurrency();

  const handleDeleteCurrency = async (id: string) => {
    await deleteCurrency(id);
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openFormToEdit(currency)}>
            <Edit /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to delete{' '}
            <span className="font-bold underline">{currency.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            onClick={() => handleDeleteCurrency(currency.id)}
            loading={isDeleting}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyActions;
