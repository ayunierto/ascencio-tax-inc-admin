import { useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, Navigate, useNavigate, useParams } from 'react-router';
import { ArrowLeft, SaveIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { AdminHeader } from '@/admin/components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import EmptyContent from '@/components/EmptyContent';
import { useMutations } from './hooks/useMutations';
import { useStaff } from '../staff/hooks/useStaff';
import { Textarea } from '@/components/ui/textarea';

import {
  AppointmentFormFields,
  appointmentSchema,
} from './schemas/appointment.schema';
import { useAppointment } from './hooks/useAppointment';
import { useServices } from '../services/hooks/useServices';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { TimezoneCombobox } from '@/components/TimezoneCombobox';

export const AdminAppointmentPage = () => {
  const { id } = useParams();
  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useAppointment(id || 'new');
  const { mutation } = useMutations();
  const navigate = useNavigate();
  const form = useForm<AppointmentFormFields>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      id: undefined,
      comments: '',
      start: '',
      end: '',
      serviceId: '',
      staffId: '',
      timeZone: '',
    },
  });

  const { data: staff, isLoading: isLoadingStaff } = useStaff();
  const { data: services, isLoading: isLoadingServices } = useServices(99);

  // Update form values when appointment changes
  useEffect(() => {
    if (appointment) {
      form.reset({
        id: appointment.id,
        start: appointment.start,
        end: appointment.end,
        serviceId: appointment?.service?.id,
        staffId: appointment?.staff?.id,
        comments: appointment.comments || '',
      });
    }
  }, [appointment, form]);

  const onSubmit = async (appointmentLike: Partial<AppointmentFormFields>) => {
    await mutation.mutateAsync(appointmentLike, {
      onSuccess(appointment, variables) {
        toast.success(
          `Appointment ${
            variables.id === 'new' ? 'created' : 'updated'
          } successfully`
        );
        navigate(`/admin/appointments/${appointment.id}`);
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

  // Handle states
  if (isError) {
    return (
      <EmptyContent
        title="An unexpected error occurred"
        description={error.message}
      />
    );
  }
  if (isLoading) return <Loader />;
  if (!appointment) return <Navigate to={'/admin/appointments'} />;

  return (
    <div>
      <AdminHeader
        backButton={{
          icon: ArrowLeft,
          onClick: () => navigate('/admin/appointments'),
        }}
        title={id === 'new' ? 'Add Appointment' : 'Edit Appointment'}
        actions={
          <Button
            onClick={form.handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '' : <SaveIcon />}
          </Button>
        }
      />

      <div className="p-2 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="serviceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={`${
                                  isLoadingServices
                                    ? 'Loading...'
                                    : services && services.services.length > 0
                                    ? 'Select services...'
                                    : 'No services available'
                                }`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {services && services.services.length > 0 ? (
                                  services.services.map(({ id, name }) => (
                                    <SelectItem key={id} value={id}>
                                      {name}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <>
                                    <SelectItem value="none">
                                      <Link
                                        to={'/admin/services/new'}
                                        className="text-blue-500"
                                      >
                                        Create a new services member
                                      </Link>
                                    </SelectItem>
                                  </>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="staffId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue
                                placeholder={`${
                                  isLoadingStaff
                                    ? 'Loading...'
                                    : staff && staff.length > 0
                                    ? 'Select staff...'
                                    : 'No staff available'
                                }`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {staff && staff.length > 0 ? (
                                  staff.map(({ id, firstName, lastName }) => (
                                    <SelectItem key={id} value={id}>
                                      {firstName} {lastName}
                                    </SelectItem>
                                  ))
                                ) : (
                                  <>
                                    <SelectItem value="none">
                                      <Link
                                        to={'/admin/staff/new'}
                                        className="text-blue-500"
                                      >
                                        Create a new staff member
                                      </Link>
                                    </SelectItem>
                                  </>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="start"
                    render={() => (
                      <FormItem>
                        <FormLabel>Start date and time</FormLabel>
                        <FormControl>
                          <DateTimePicker />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={() => (
                      <FormItem>
                        <FormLabel>TimeZone</FormLabel>
                        <FormControl>
                          <TimezoneCombobox />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Comments</FormLabel>

                        <FormControl>
                          <Textarea
                            placeholder="Appointment description..."
                            value={value}
                            onChange={onChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardFooter className="justify-end">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  loading={mutation.isPending}
                >
                  <SaveIcon /> {id === 'new' ? 'Save' : 'Update'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};
