import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AppointmentForm } from './AppointmentForm';
import {
  AppointmentFormFields,
  appointmentSchema,
} from '../schemas/appointment.schema';
import { AppointmentResponse } from '../interfaces/appointment.response';
import { ServiceResponse } from '../../services/interfaces/service.response';
import { StaffResponse } from '../../staff/interfaces/staff.response';
import { AvailableSlot } from '../interfaces/available-slot.interface';
import { ServerException } from '@/interfaces/server-exception.response';
import { getAvailabilityAction } from '../actions/get-availability.action';

interface AppointmentFormContainerProps {
  appointment: AppointmentResponse;
  services: ServiceResponse[];
  isLoading: boolean;
  onSubmit: (data: Partial<AppointmentFormFields>) => void;
  // Optional: allows header button to trigger form submit
  headerSubmitRef?: React.MutableRefObject<(() => void) | null>;
}

export const AppointmentFormContainer = ({
  appointment,
  services,
  isLoading,
  onSubmit,
  headerSubmitRef,
}: AppointmentFormContainerProps) => {
  const form = useForm<AppointmentFormFields>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      id: appointment?.id || 'new',
      comments: appointment?.comments || '',
      start: appointment?.start || '',
      end: appointment?.end || '',
      serviceId: appointment?.service?.id || '',
      staffId: appointment?.staff?.id || '',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });

  // Expose submit to header if requested
  useEffect(() => {
    if (!headerSubmitRef) return;
    headerSubmitRef.current = () => {
      form.handleSubmit(onSubmit)();
    };
  }, [form, onSubmit, headerSubmitRef]);

  // Local UI state managed by container
  const [date, setDate] = useState<Date>(
    appointment?.start
      ? DateTime.fromISO(appointment.start).toJSDate()
      : new Date()
  );
  const [staff, setStaff] = useState<StaffResponse[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot>();

  // RHF watchers
  const serviceId = form.watch('serviceId');
  const staffId = form.watch('staffId');
  const timeZone = form.watch('timeZone');

  // Ensure timeZone is initialized if empty
  useEffect(() => {
    const tz = form.getValues('timeZone');
    if (!tz) {
      form.setValue('timeZone', DateTime.now().zoneName);
    }
  }, [form]);

  // Populate staff when service changes; include appointment's staff if missing
  useEffect(() => {
    if (!services || !serviceId) return;
    const serviceStaff =
      services.find((service) => service.id === serviceId)?.staff || [];
    if (appointment && appointment.id !== 'new' && appointment.staff) {
      const exists = serviceStaff.some((s) => s.id === appointment.staff!.id);
      setStaff(exists ? serviceStaff : [...serviceStaff, appointment.staff]);
    } else {
      setStaff(serviceStaff);
    }
  }, [services, serviceId, appointment]);

  // Ensure staff is available immediately in edit mode even before watch kicks in
  useEffect(() => {
    if (!services) return;
    if (!appointment || appointment.id === 'new') return;
    const srvId = appointment.service?.id;
    if (!srvId) return;
    const baseStaff = services.find((s) => s.id === srvId)?.staff || [];
    const merged = appointment.staff
      ? baseStaff.some((s) => s.id === appointment.staff!.id)
        ? baseStaff
        : [...baseStaff, appointment.staff]
      : baseStaff;
    setStaff(merged);
  }, [services, appointment]);

  // Availability query
  const {
    isPending: isPendingAvailability,
    isRefetching: isRefetchingAvailability,
    isError: isErrorAvailability,
    error: availabilityError,
    data: availabilityData,
  } = useQuery<AvailableSlot[], AxiosError<ServerException>>({
    queryKey: [
      'availability',
      serviceId,
      staffId,
      DateTime.fromJSDate(date).toISODate() || '',
      timeZone,
    ],
    queryFn: async () => {
      return await getAvailabilityAction({
        serviceId,
        staffId,
        date: DateTime.fromJSDate(date).toISODate() || '',
        timeZone,
      });
    },
    enabled: serviceId !== '' && staffId !== '' && timeZone !== '' && !!date,
    placeholderData: (prev) => prev,
    retry: false,
    // Avoid seeding with scheduled slot to prevent stale slot on different dates
    initialData: [],
  });

  // Merge availability with scheduled slot in edit mode
  const { slots, scheduledStartUTC } = useMemo(() => {
    const map = new Map<string, AvailableSlot>();
    (availabilityData ?? []).forEach((s) => map.set(s.startTimeUTC, s));

    const scheduledSlot: AvailableSlot | undefined =
      appointment &&
      appointment.id !== 'new' &&
      appointment.start &&
      appointment.end
        ? {
            startTimeUTC: appointment.start,
            endTimeUTC: appointment.end,
            availableStaff: appointment.staff ? [appointment.staff] : [],
          }
        : undefined;

    // Only include the scheduled slot if it belongs to the currently selected date
    let schedStart: string | undefined;
    if (scheduledSlot) {
      const selectedDateISO = DateTime.fromJSDate(date)
        .setZone(timeZone || DateTime.local().zoneName)
        .toISODate();
      const apptDateISO = DateTime.fromISO(scheduledSlot.startTimeUTC)
        .setZone(timeZone || DateTime.local().zoneName)
        .toISODate();
      if (selectedDateISO && apptDateISO && selectedDateISO === apptDateISO) {
        map.set(scheduledSlot.startTimeUTC, scheduledSlot);
        schedStart = scheduledSlot.startTimeUTC;
      }
    }

    const arr = Array.from(map.values()).sort((a, b) => {
      const aIsSched = schedStart && a.startTimeUTC === schedStart;
      const bIsSched = schedStart && b.startTimeUTC === schedStart;
      if (aIsSched && !bIsSched) return -1;
      if (!aIsSched && bIsSched) return 1;
      return a.startTimeUTC.localeCompare(b.startTimeUTC);
    });

    return { slots: arr, scheduledStartUTC: schedStart };
  }, [availabilityData, appointment, date, timeZone]);

  // Handlers
  const handleDateChange = (d: Date) => {
    setDate(d);
    setSelectedSlot(undefined);
    form.setValue('start', '');
    form.setValue('end', '');
  };

  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    form.setValue('start', slot.startTimeUTC);
    form.setValue('end', slot.endTimeUTC);
  };

  // Reset form and UI state on appointment change (edit mode)
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

      const scheduledSlot = {
        startTimeUTC: appointment.start || '',
        endTimeUTC: appointment.end || '',
        availableStaff: appointment.staff ? [appointment.staff] : [],
      };

      setSelectedSlot(scheduledSlot);

      if (appointment.start) {
        setDate(DateTime.fromISO(appointment.start).toJSDate());
      }
    }
    // Only when identity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment?.id]);

  return (
    <AppointmentForm
      onSubmit={onSubmit}
      appointment={appointment}
      form={form}
      isLoading={isLoading}
      services={services}
      staff={staff}
      date={date}
      onDateChange={handleDateChange}
      slots={slots}
      scheduledStartUTC={scheduledStartUTC}
      isSlotsLoading={isRefetchingAvailability || isPendingAvailability}
      isSlotsError={isErrorAvailability}
      slotsError={availabilityError}
      selectedSlot={selectedSlot}
      onSlotSelect={handleSlotSelect}
    />
  );
};
