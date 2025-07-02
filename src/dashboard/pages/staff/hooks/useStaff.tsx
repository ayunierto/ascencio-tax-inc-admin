import { Checkbox } from '@/components/ui/checkbox';
import { Staff } from '../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';

export const useStaff = () => {
  const columns: ColumnDef<Staff>[] = [
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
        <DataTableColumnHeader column={column} title="Suffix" />
      ),
    },
    {
      accessorKey: 'symbol',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Symbol" />
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
          <CurrencyActions
            currency={row.original}
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
