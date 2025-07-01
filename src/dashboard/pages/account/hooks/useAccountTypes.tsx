import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { AccountType } from '../interfaces';

import { UpdateAccountTypeInputs } from '../schemas';
import { AccountTypeActions } from '../components';

interface useAccountTypesProps {
  openFormToEdit: (data: UpdateAccountTypeInputs) => void;
}

export const useAccountTypes = ({ openFormToEdit }: useAccountTypesProps) => {
  const columns: ColumnDef<AccountType>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      cell: ({ row }) => {
        const dateValue = row.getValue('createdAt');
        // Validate if the date is valid before formatting it
        return dateValue
          ? new Date(dateValue as string | Date).toLocaleDateString()
          : 'N/A';
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Updated At" />
      ),
      cell: ({ row }) => {
        const dateValue = row.getValue('updatedAt');
        // Validate if the date is valid before formatting it
        return dateValue
          ? new Date(dateValue as string | Date).toLocaleDateString()
          : 'N/A';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <AccountTypeActions
            accountType={row.original}
            openFormToEdit={openFormToEdit}
          />
        );
      },
    },
  ];

  return {
    columns,
  };
};
