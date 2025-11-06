import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ArrowLeft, SaveIcon } from 'lucide-react';

import { AdminHeader } from '@/admin/components/AdminHeader';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';

import EmptyContent from '@/components/EmptyContent';
import { useMutations } from './hooks/useMutations';
import {
  AppointmentFormFields,
  appointmentSchema,
} from './schemas/appointment.schema';
import { useAppointment } from './hooks/useAppointment';
import { AppointmentForm } from './components/AppointmentForm';
import { useServices } from '../services/hooks/useServices';

export const AdminAppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: appointment,
    isLoading,
    isError,
    error,
  } = useAppointment(id || 'new');
  const { data: services, isError: isErrorServices } = useServices(99);
  const { mutation } = useMutations();

  const form = useForm<AppointmentFormFields>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      id: id || 'new',
      comments: '',
      start: '',
      end: '',
      serviceId: '',
      staffId: '',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  const onSubmit = async (appointmentLike: Partial<AppointmentFormFields>) => {
    await mutation.mutateAsync(appointmentLike, {
      onSuccess(_data, variables) {
        toast.success(
          `Appointment ${
            variables.id === 'new' ? 'created' : 'updated'
          } successfully`
        );
        navigate(`/admin/appointments`);
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
  if (isErrorServices) {
    return (
      <EmptyContent
        title="An unexpected error occurred"
        description="Failed to load services."
      />
    );
  }
  if (!services) return <Navigate to={'/admin/appointments'} />;
  if (services.services.length === 0) {
    return (
      <EmptyContent
        title="No services available"
        description="Please create a service before creating an appointment."
        action={
          <Button onClick={() => navigate('/admin/services/new')}>
            Create Service
          </Button>
        }
      />
    );
  }

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
        <AppointmentForm
          onSubmit={onSubmit}
          appointment={appointment}
          form={form}
          isLoading={mutation.isPending}
          services={services?.services}
        />
      </div>
    </div>
  );
};
