import { Checkbox } from '@/components/ui/checkbox';
import { Account } from '../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';
import { DataTableActions } from '@/components/DataTable/DataTableActions';

interface useAccountProps {
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => Promise<void>;
  deletingItemId: string | null;
}

export const useAccountColumns = ({
  onDelete,
  onEdit,
  deletingItemId,
}: useAccountProps) => {
  const columns: ColumnDef<Account>[] = [
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
      accessorKey: 'icon',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Icon" />
      ),
      cell: ({ row }) => {
        const icon = row.original.icon;
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-credit-card-icon lucide-credit-card"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
          // <div className="flex items-center">
          //   {icon ? (
          //     <img
          //       src={icon}
          //       alt={`${row.original.name} icon`}
          //       className="w-6 h-6 rounded-full"
          //     />
          //   ) : (
          //     <span className="text-gray-500">No Icon</span>
          //   )}
          // </div>
        );
      },
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
