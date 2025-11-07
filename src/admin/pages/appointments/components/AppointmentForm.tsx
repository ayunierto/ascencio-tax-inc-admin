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

import { DateTime } from 'luxon';
import { AvailableSlot } from '../interfaces/available-slot.interface';
import { AxiosError } from 'axios';
import { ServerException } from '@/interfaces/server-exception.response';
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
  // Presentational-only props from container
  staff: StaffResponse[];
  date: Date;
  onDateChange: (date: Date) => void;
  slots: AvailableSlot[];
  isSlotsLoading: boolean;
  isSlotsError: boolean;
  slotsError?: AxiosError<ServerException> | null;
  selectedSlot?: AvailableSlot;
  onSlotSelect: (slot: AvailableSlot) => void;
  scheduledStartUTC?: string;
}

export const AppointmentForm = ({
  onSubmit,
  form,
  appointment,
  isLoading,
  services,
  staff,
  date,
  onDateChange,
  slots,
  isSlotsLoading,
  isSlotsError,
  slotsError,
  selectedSlot,
  onSlotSelect,
}: AppointmentFormProps) => {
  // Watch only what's used in UI here
  const timeZone = form.watch('timeZone');
  // React Query is managed by the container; this component is presentational only.

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
                        onSelect={onDateChange}
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
                {isSlotsLoading ? (
                  <Loader
                    className="col-span-full"
                    text="Loading available slots..."
                  />
                ) : isSlotsError ? (
                  // If there's an error, show the error message
                  <EmptyContent
                    className="col-span-full"
                    title="No available slots"
                    description={
                      slotsError?.code === '404'
                        ? slotsError?.response?.data?.message ||
                          slotsError?.message ||
                          'Failed to load available slots'
                        : 'Please select service, staff, date, and time zone to see available slots.'
                    }
                  />
                ) : slots && slots.length > 0 ? (
                  slots.map((slot) => {
                    return (
                      <Button
                        type="button"
                        key={slot.startTimeUTC}
                        variant={
                          selectedSlot?.startTimeUTC === slot.startTimeUTC
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => onSlotSelect(slot)}
                      >
                        {DateTime.fromISO(slot.startTimeUTC)
                          .setZone(timeZone)
                          .toFormat('h:mm a')}
                      </Button>
                    );
                  })
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
