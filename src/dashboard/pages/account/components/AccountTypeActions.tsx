import { Button } from '@/components/ui/button';
import { AccountType } from '../interfaces';
import { UpdateAccountTypeInputs } from '../schemas';
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
import { useDeleteAccountType } from '../hooks';

interface AccountTypeActionsProps {
  accountType: AccountType;
  openFormToEdit: (data: UpdateAccountTypeInputs) => void;
}

export const AccountTypeActions = ({
  accountType,
  openFormToEdit,
}: AccountTypeActionsProps) => {
  const { mutateAsync: deleteAccountType, isPending: isDeleting } =
    useDeleteAccountType();

  const handleDeleteAccountType = async (id: string) => {
    await deleteAccountType(id);
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
          <DropdownMenuItem
            onClick={() =>
              openFormToEdit({
                id: accountType.id,
                name: accountType.name,
                description: accountType.description,
              })
            }
          >
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
            This action cannot be undone. Are you sure you want to delete
            <span className="font-bold underline"> {accountType.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={'destructive'}
            onClick={() => handleDeleteAccountType(accountType.id)}
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

export default AccountTypeActions;
