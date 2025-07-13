import { Checkbox } from '@/components/ui/checkbox';
import { AccountType } from '../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';
import { DataTableActions } from '@/components/DataTable/DataTableActions';

interface useAccountTypesProps {
  onEdit: (accountType: AccountType) => void;
  onDelete: (accountTypeId: string) => Promise<void>;
  deletingItemId: string | null;
}

export const useAccountTypesColumns = ({
  onDelete,
  onEdit,
  deletingItemId,
}: useAccountTypesProps) => {
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
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DataTableActions
            entityName={`${row.original.name}`}
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original.id)}
            isDeleting={deletingItemId === row.original.id}
          />
        );
      },
    },
  ];

  return {
    columns,
  };
};
