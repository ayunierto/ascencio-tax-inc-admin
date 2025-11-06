import { Link } from 'react-router';
import {
  EditIcon,
  InfoIcon,
  PlusCircle,
  PlusCircleIcon,
  Trash2Icon,
  VideoIcon,
  VideoOff,
} from 'lucide-react';
import { toast } from 'sonner';

import { AdminHeader } from '@/admin/components/AdminHeader';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useServices } from './hooks/useServices';
import { Loader } from '@/components/Loader';
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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import EmptyContent from '@/components/EmptyContent';
import { Pagination } from '@/components/Pagination';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useMutations } from './hooks/useMutations';

export const ServicesPage = () => {
  const { data: services, isLoading, isError, error } = useServices();
  const { deleteMutation } = useMutations();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success('Service deleted');
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'An unexpected error occurred.'
        );
      },
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader
        title="Services"
        actions={
          <Button asChild>
            <Link to={'/admin/services/new'}>
              <PlusCircleIcon />
            </Link>
          </Button>
        }
      />
      <div className="p-4 overflow-y-auto ">
        {!services || services.services.length === 0 ? (
          <EmptyContent
            icon={<InfoIcon size={48} className="text-primary" />}
            title="No services found"
            description="Please add a service."
            action={
              <Button asChild>
                <Link to="/admin/services/new">
                  <PlusCircle /> Add Service
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
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Online</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services &&
                      services.services.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>
                            <img
                              src={
                                service.imageUrl || 'https://placehold.co/150'
                              }
                              alt="service image"
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{service.durationMinutes}</TableCell>
                          <TableCell>
                            {service.isAvailableOnline ? (
                              <Badge
                                variant="outline"
                                className="bg-green-500/50"
                              >
                                <VideoIcon size={16} className="mr-1" />
                                Online
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <VideoOff size={16} className="mr-1" />
                                Offline
                              </Badge>
                            )}
                          </TableCell>

                          <TableCell>
                            {service.isActive ? (
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
                            <Button variant="ghost" asChild size={'sm'}>
                              <Link to={`/admin/services/${service.id}`}>
                                <EditIcon size={16} />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size={'sm'}
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
                                    permanently delete the service.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => onDelete(service.id)}
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
                <Pagination totalPages={services.pages} />
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
