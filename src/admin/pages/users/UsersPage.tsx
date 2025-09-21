import { Link } from "react-router";
import {
  EditIcon,
  InfoIcon,
  PlusCircle,
  PlusCircleIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "./hooks/useUsers";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import EmptyContent from "@/components/EmptyContent";
import { Pagination } from "@/components/Pagination";

export const UsersPage = () => {
  const { data: users, isLoading, isError, error } = useUsers();
  const { deleteMutation } = useMutations();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success("User deleted");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred."
        );
      },
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Users"
        actions={
          <Button asChild>
            <Link to={"/admin/users/new"}>
              <PlusCircleIcon />
            </Link>
          </Button>
        }
      />
      <div className="p-4 overflow-y-auto ">
        {!users || users.users.length === 0 ? (
          <EmptyContent
            icon={<InfoIcon size={48} className="text-primary" />}
            title="No users found"
            description="Please add a user."
            action={
              <Button asChild>
                <Link to="/admin/users/new">
                  <PlusCircle /> Add User
                </Link>
              </Button>
            }
          />
        ) : (
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users &&
                      users.users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phoneNumber}</TableCell>
                          <TableCell>
                            {user.isActive ? (
                              <Badge
                                variant="outline"
                                className="bg-green-500/50"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="destructive">Inactive</Badge>
                            )}
                          </TableCell>

                          <TableCell className="text-center">
                            <Button variant="ghost" asChild size={"sm"}>
                              <Link to={`/admin/users/${user.id}`}>
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
                                    permanently delete the user.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => onDelete(user.id)}
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

              <CardFooter className="flex justify-center gap-2">
                <Pagination totalPages={users.pages} />
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
