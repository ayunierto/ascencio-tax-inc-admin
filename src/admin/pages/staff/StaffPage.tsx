import { Link } from "react-router";
import { EditIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { AdminHeader } from "@/admin/components/AdminHeader";
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
import { useAllStaff } from "./hooks/useAllStaff";
import { Loader } from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { useMutations } from "./hooks/useMutations";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export const StaffPage = () => {
  const { data: staff, isLoading, isError, error } = useAllStaff();
  const { deleteMutation } = useMutations();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        // Show a toast notification
        toast.success("Staff deleted");
      },
      onError: (error) => {
        toast.error(error.message || "An unexpected error occurred. ");
      },
    });
  };

  return (
    <div>
      <AdminHeader
        title="Staff"
        actions={
          <Button asChild>
            <Link to={"/admin/staff/new"}>
              <PlusCircleIcon />
            </Link>
          </Button>
        }
      />

      <div className="p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              {!staff || staff.length === 0 ? (
                <TableCaption>
                  No data found. <br />
                  <Link to={"/admin/staff/new"} className="text-blue-500">
                    Click here to add a new staff member.
                  </Link>
                </TableCaption>
              ) : null}
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff &&
                  staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.firstName}</TableCell>
                      <TableCell>{member.lastName}</TableCell>
                      <TableCell>
                        {member.isActive ? (
                          <Badge variant="outline" className="bg-green-500/50">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </TableCell>

                      <TableCell className="flex items-center justify-center gap-1">
                        <Button variant="ghost" asChild size={"sm"}>
                          <Link to={`/admin/staff/${member.id}`}>
                            <EditIcon size={16} />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size={"sm"}
                              disabled={deleteMutation.isPending}
                            >
                              <Trash2Icon size={16} color="red" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the staff member.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(member.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
