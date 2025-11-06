import { Link } from 'react-router';
import {
  EditIcon,
  InfoIcon,
  PlusCircle,
  PlusCircleIcon,
  Trash2Icon,
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
import { useAppointments } from './hooks/useAppointments';
import { Loader } from '@/components/Loader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useMutations } from './hooks/useMutations';
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
import EmptyContent from '@/components/EmptyContent';
import { Pagination } from '@/components/Pagination';
import { DateTime } from 'luxon';

export const AdminAppointmentsPage = () => {
  const { data, isLoading, isError, error } = useAppointments();
  const { deleteMutation } = useMutations();

  if (isError)
    return (
      <EmptyContent
        icon={<InfoIcon size={48} className="text-primary" />}
        title="Error loading appointments"
        description={error.response?.data?.message || error.message}
      />
    );
  if (isLoading) return <Loader />;

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        toast.success('Appointment deleted');
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
        title="Appointments"
        actions={
          <Button asChild>
            <Link to={'/admin/appointments/new'}>
              <PlusCircleIcon />
            </Link>
          </Button>
        }
      />
      <div className="p-4 overflow-y-auto ">
        {!data ? (
          <EmptyContent
            icon={<InfoIcon size={48} className="text-primary" />}
            title="No appointments found"
            description="Please add a appointment."
            action={
              <Button asChild>
                <Link to="/admin/appointments/new">
                  <PlusCircle /> Add Appointment
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
                      <TableHead>Start</TableHead>
                      <TableHead>End</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          {DateTime.fromISO(appointment.start).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                          )}
                        </TableCell>
                        <TableCell>
                          {DateTime.fromISO(appointment.end).toLocaleString(
                            DateTime.DATETIME_MED_WITH_WEEKDAY
                          )}
                        </TableCell>
                        <TableCell>{appointment.service?.name}</TableCell>
                        <TableCell>{appointment.staff?.firstName}</TableCell>

                        <TableCell className="text-center">
                          <Button variant="ghost" asChild size={'sm'}>
                            <Link to={`/admin/appointments/${appointment.id}`}>
                              <EditIcon size={16} />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size={'icon'}
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
                                  permanently delete the appointment.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(appointment.id)}
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
                <Pagination totalPages={data.pages} />
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
