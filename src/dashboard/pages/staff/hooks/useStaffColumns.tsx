import { Checkbox } from '@/components/ui/checkbox';
import { Staff } from '../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumHeader';
import { DataTableActions } from '@/components/DataTable/DataTableActions';
import { Badge } from '@/components/ui/badge';

interface useStaffProps {
  onEdit: (staff: Staff) => void;
  onDelete: (staffId: string) => void;
  deletingItemId: string | null;
}

export const useStaffColumns = ({
  onDelete,
  onEdit,
  deletingItemId,
}: useStaffProps) => {
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
      accessorKey: 'firstName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="First name" />
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last name" />
      ),
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="State" />
      ),
      cell: ({ row }) => {
        return (
          <div>
            {row.original.isActive ? (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                Active
              </Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DataTableActions
            entityName={`${row.original.firstName}`}
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
