import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TimezoneCombobox } from '@/components/TimezoneCombobox';
import { AppointmentFormFields } from '../schemas/appointment.schema';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CalendarIcon, SaveIcon } from 'lucide-react';
import { AppointmentResponse } from '../interfaces/appointment.response';
import EmptyContent from '@/components/EmptyContent';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { useQuery } from '@tanstack/react-query';
import { AvailableSlot } from '../interfaces/available-slot.interface';
import { AxiosError } from 'axios';
import { ServerException } from '@/interfaces/server-exception.response';
import { getAvailabilityAction } from '../actions/get-availability.action';
import { Loader } from '@/components/Loader';
import { StaffResponse } from '../../staff/interfaces/staff.response';
import { Textarea } from '@/components/ui/textarea';
import { ServiceResponse } from '../../services/interfaces/service.response';

interface AppointmentFormProps {
  appointment: AppointmentResponse;
  onSubmit: (data: Partial<AppointmentFormFields>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<AppointmentFormFields, any, AppointmentFormFields>;
  isLoading: boolean;
  services: ServiceResponse[];
}

export const AppointmentForm = ({
  onSubmit,
  form,
  appointment,
  isLoading,
  services,
}: AppointmentFormProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [staff, setStaff] = useState<StaffResponse[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot>();

  console.log({ appointment });

  const serviceId = form.watch('serviceId');
  const staffId = form.watch('staffId');
  const timeZone = form.watch('timeZone');

  // Set staff when services change
  useEffect(() => {
    if (!services || !serviceId) return;
    setStaff(services.find((service) => service.id === serviceId)?.staff || []);
  }, [services, serviceId]);

  const {
    isPending: isPendingAvailability,
    isRefetching: isRefetchingAvailability,
    isError: isErrorAvailability,
    error: availabilityError,
    refetch,
    data: availabilityData,
  } = useQuery<AvailableSlot[], AxiosError<ServerException>>({
    queryKey: ['availability'],
    queryFn: async () => {
      return await getAvailabilityAction({
        serviceId,
        staffId,
        date: DateTime.fromJSDate(date).toISODate() || '',
        timeZone,
      });
    },
    enabled: serviceId !== '' && staffId !== '' && timeZone !== '' && !!date,
    retry: false,
    initialData: [
      {
        availableStaff: [appointment.staff!],
        startTimeUTC: appointment.start,
        endTimeUTC: appointment.end,
      },
    ],
  });

  useEffect(() => {
    if (!serviceId || !staffId || !date || !timeZone) return; // If no service or date is selected, do not fetch availability
    // form.resetField("time"); // Reset time when service or date changes
    // Refetch availability when serviceId, staffId, or date changes
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId, staffId, date, timeZone]);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    form.setValue('start', slot.startTimeUTC);
    form.setValue('end', slot.endTimeUTC);
  };

  useEffect(() => {
    if (appointment && appointment.id !== 'new') {
      form.reset({
        id: appointment.id,
        comments: appointment.comments || '',
        start: appointment.start || '',
        end: appointment.end || '',
        serviceId: appointment.service?.id || '',
        staffId: appointment.staff?.id || '',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      setSelectedSlot({
        startTimeUTC: appointment.start || '',
        endTimeUTC: appointment.end || '',
        availableStaff: [appointment.staff!],
      });
    }
  }, [appointment, form, services, availabilityData]);

  console.log({ selectedSlot });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 ">
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Services</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={appointment.service?.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select services..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {services.map(({ id, name }) => (
                              <SelectItem key={id} value={id}>
                                {name}
                              </SelectItem>
                            ))}
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
                        disabled={staff.length === 0}
                        defaultValue={appointment.staff?.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`${
                              staff.length > 0
                                ? 'Select staff...'
                                : 'Select service first'
                            }`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {staff.length > 0 &&
                              staff.map(({ id, firstName, lastName }) => (
                                <SelectItem key={id} value={id}>
                                  {firstName} {lastName}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {date ? (
                          DateTime.fromJSDate(date).toFormat('dd LLLL yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        required
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>

              <FormField
                control={form.control}
                name="timeZone"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <FormLabel>TimeZone</FormLabel>
                    <FormControl>
                      <TimezoneCombobox value={value} onChange={onChange} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                {/* Loader */}
                {isRefetchingAvailability || isPendingAvailability ? (
                  <Loader
                    className="col-span-full"
                    text="Loading available slots..."
                  />
                ) : isErrorAvailability ? (
                  // If there's an error, show the error message
                  <EmptyContent
                    className="col-span-full"
                    title="No available slots"
                    description={
                      availabilityError.code === '404'
                        ? availabilityError?.response?.data?.message ||
                          availabilityError?.message ||
                          'Failed to load available slots'
                        : 'Please select service, staff, date, and time zone to see available slots.'
                    }
                  />
                ) : availabilityData && availabilityData.length > 0 ? (
                  availabilityData.map((slot) => (
                    <Button
                      type="button"
                      key={slot.startTimeUTC}
                      variant={
                        selectedSlot?.startTimeUTC === slot.startTimeUTC
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {DateTime.fromISO(slot.startTimeUTC)
                        .setZone(timeZone)
                        .toFormat('h:mm a')}
                    </Button>
                  ))
                ) : (
                  <EmptyContent
                    title="No available slots"
                    description="Please select or change service, staff, date, and time zone to see available slots."
                    className="col-span-full w-full"
                  />
                )}

                {form.formState.errors.start && (
                  <p className="col-span-full text-sm text-red-600">
                    {form.formState.errors.start.message}
                  </p>
                )}

                {form.formState.errors.end && (
                  <p className="col-span-full text-sm text-red-600">
                    {form.formState.errors.end.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="comments"
                render={({ field: { onChange, value } }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Comments</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Comments..."
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
            <Button type="submit" disabled={isLoading} loading={isLoading}>
              <SaveIcon /> {appointment.id === 'new' ? 'Save' : 'Update'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
