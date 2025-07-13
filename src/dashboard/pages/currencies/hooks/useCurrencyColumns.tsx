import { Checkbox } from '@/components/ui/checkbox';
import { Currency } from '../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';
import { DataTableActions } from '@/components/DataTable/DataTableActions';

interface useCurrencyProps {
  onEdit: (currency: Currency) => void;
  onDelete: (currencyId: string) => Promise<void>;
  deletingItemId: string | null;
}

export const useCurrencyColumns = ({
  onDelete,
  onEdit,
  deletingItemId,
}: useCurrencyProps) => {
  const columns: ColumnDef<Currency>[] = [
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
      accessorKey: 'coinSuffix',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coin Suffix" />
      ),
    },
    {
      accessorKey: 'symbol',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Symbol" />
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
