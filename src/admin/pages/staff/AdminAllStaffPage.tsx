import { AdminHeader } from "@/admin/components/AdminHeader";
import { useStaff } from "@/admin/hooks/useAllStaff";
import EmptyContent from "@/components/EmptyContent";
import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BadgeCheckIcon,
  CircleOffIcon,
  Edit,
  PlusCircleIcon,
  Trash2,
} from "lucide-react";
import { Link } from "react-router";

export const AdminAllStaffsPage = () => {
  const { data: staff, isLoading, isError, error } = useStaff();

  if (isLoading) return <Loader showText text="Loading staff..." />;
  if (isError)
    return (
      <EmptyContent
        title="Error"
        icon={<CircleOffIcon size={48} />}
        description={
          error.response?.data.message || error.message || "Unknown error."
        }
      />
    );
  if (!staff) return <EmptyContent title="No staff found." />;

  return (
    <>
      <AdminHeader
        title="Staff"
        actions={
          <Button asChild size="sm">
            <Link to="/admin/staff/new">
              <PlusCircleIcon /> Add Staff
            </Link>
          </Button>
        }
      />
      <div className="p-6">
        <Table className="border rounded-lg overflow-hidden">
          {!staff ||
            (staff.length === 0 && (
              <TableCaption>No staff available</TableCaption>
            ))}
          <TableHeader className="bg-accent">
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.firstName}</TableCell>
                <TableCell>{staff.lastName}</TableCell>
                <TableCell>
                  {staff.isActive ? (
                    <Badge className="" variant={"secondary"}>
                      <BadgeCheckIcon />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant={"destructive"}>Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="flex flex-row items-center justify-center">
                  <Button size="sm" variant="ghost">
                    <Link to={`/admin/staff/${staff.id}`}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
