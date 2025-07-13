import { useState } from 'react';

// Generic imports
import { HttpError } from '@/adapters/http/http-client.interface';
import { useMutations } from '@/hooks/useMutations';
import { GenericForm, LoadingError } from '@/dashboard/components';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader } from '@/components/Loader';
import { GenericCreateAndUpdate } from '@/components/GenericCreateAndUpdate';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

// Hooks
import { useStaffColumns, useStaffData } from './hooks';

// Schemas and interfaces
import { Staff } from './interfaces';
import { createStaffSchema } from './schemas';
import { useServicesData } from '../services/hooks';
import { useSchedulesData } from '../schedules/hooks';

export const StaffPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [staffToEdit, setStaffToEdit] = useState<Staff | undefined>();

  const closeForm = () => {
    setIsFormOpen(false);
    setStaffToEdit(undefined);
  };

  // ---Requests and mutations with React Query ---
  const { staff, apiServiceStaff, isFetchingStaff } = useStaffData();

  const { services, isFetchingServices } = useServicesData();

  const { schedules, isFetchingSchedules } = useSchedulesData();

  // Mutations
  const { createMutation, updateMutation, deleteMutation } = useMutations({
    queryKey: ['staff'],
    service: apiServiceStaff,
    entityName: 'Staff',
    onClose: closeForm,
  });

  // --- Handler functions (The Origen) ---
  const handleOpenFormToEdit = (staff: Staff) => {
    setStaffToEdit(staff);
    setIsFormOpen(true);
  };

  const handleDeleteStaff = async (staffId: string) => {
    await deleteMutation.mutateAsync(staffId);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    if (staffToEdit) {
      await updateMutation.mutateAsync({ id: staffToEdit.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
  };

  const { columns } = useStaffColumns({
    onEdit: handleOpenFormToEdit,
    onDelete: handleDeleteStaff,
    deletingItemId: deleteMutation.isPending ? deleteMutation.variables : null,
  });

  // --- LOADING STATES ---
  // Staff loading state and error handling
  if (isFetchingStaff) return <Loader showText text="Loading staff..." />;
  if (!staff) return <LoadingError name="staff" />;
  if (staff instanceof HttpError) {
    return <LoadingError name="staff" message={staff.message} />;
  }

  // Services loading state and error handling
  if (isFetchingServices) return <Loader text="Loading services..." showText />;
  if (!services) {
    return <LoadingError name="services" />;
  }
  if (services instanceof HttpError) {
    return <LoadingError name="services" message={services.message} />;
  }

  // Schedules loading state and error handling
  if (isFetchingSchedules)
    return <Loader text="Loading schedules..." showText />;
  if (!schedules) {
    return <LoadingError name="schedules" />;
  }
  if (schedules instanceof HttpError) {
    return <LoadingError name="schedules" message={schedules.message} />;
  }

  return (
    <div>
      <GenericCreateAndUpdate
        open={isFormOpen}
        setOpen={setIsFormOpen}
        onClose={closeForm}
        entityName="staff"
        isEditMode={!!staffToEdit}
      >
        <GenericForm
          schema={createStaffSchema}
          onSubmit={handleSubmit}
          defaultValues={
            staffToEdit || {
              firstName: '',
              isActive: true,
              lastName: '',
              schedules: [],
              services: [],
            }
          }
          isEditMode={!!staffToEdit}
          isLoading={createMutation.isPending || updateMutation.isPending}
          renderFormFields={(form) => (
            <>
              <FormField
                control={form.control}
                name={'firstName'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" type={'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={'lastName'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" type={'text'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Active</FormLabel>
                      <FormDescription />
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Services</FormLabel>
                      <FormDescription>
                        {services.length === 0
                          ? 'There are no created services'
                          : 'Select the services for the staff member.'}
                      </FormDescription>
                    </div>
                    {services.map((service) => (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          service.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== service.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {service.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedules"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Schedule</FormLabel>
                      <FormDescription>
                        {schedules.length === 0
                          ? 'There are no created schedules'
                          : 'Select the schedules for the staff.'}
                      </FormDescription>
                    </div>
                    {schedules.map((schedule) => (
                      <FormField
                        key={schedule.id}
                        control={form.control}
                        name="schedules"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={schedule.id}
                              className="flex flex-row items-center gap-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(schedule.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          schedule.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== schedule.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {`${schedule.weekday} ${schedule.startTime} ${schedule.endTime} `}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        />
      </GenericCreateAndUpdate>

      <DataTable columns={columns} data={staff || []} filter="firstName" />
    </div>
  );
};

export default StaffPage;
