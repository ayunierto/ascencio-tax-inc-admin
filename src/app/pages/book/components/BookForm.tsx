import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookFormValues, bookSchema } from "../schemas/book-schema";
import { Calendar } from "@/components/ui/calendar";
import { ServiceResponse } from "@/admin/pages/services/interfaces/service.response";
import { Button } from "@/components/ui/button";
import { getAvailableHoursAction } from "../actions/getAvailableHours";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import EmptyContent from "@/components/EmptyContent";
import { ServerException } from "@/interfaces/server-exception.response";
import { AxiosError } from "axios";

interface BookFormProps {
  services: ServiceResponse[];
  service: ServiceResponse;
  isPending: boolean;

  // Function to handle form submission
  onSubmit: (data: BookFormValues) => void;
}

export const BookForm = ({
  onSubmit,
  services,
  service,
  isPending,
}: BookFormProps) => {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      serviceId: service.id,
      staffId: "",
      date: "",
      time: "",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      comments: "",
    },
  });

  const staffId = form.watch("staffId");
  const date = form.watch("date");
  const serviceId = form.watch("serviceId");

  const {
    data: availability,
    isLoading: availabilityLoading,
    isError: availabilityIsError,
    error: availabilityError,
  } = useQuery<string[], AxiosError<ServerException>>({
    queryKey: ["availableSlots", staffId, date, serviceId],
    queryFn: () => getAvailableHoursAction(staffId, date /*, serviceId*/),
    enabled: !!staffId && !!date && !!serviceId,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log(availability);

  if (availabilityLoading) return <div>Loading available hours...</div>;
  if (availabilityIsError) {
    return (
      <EmptyContent
        title="Error loading available hours"
        description={
          availabilityError.response?.data?.message ||
          availabilityError.message ||
          "Please try again later."
        }
      />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-4 sm:order-2">
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="staffId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff Member</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a staff member" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {service.staff.map((staff) => (
                      <SelectItem key={staff.id} value={staff.id}>
                        {staff.firstName} {staff.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the staff member you want to book an appointment with.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:order-1">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    // defaultMonth={date}
                    // selected={field.value}
                    onSelect={(date) => {
                      const formattedDate = DateTime.fromJSDate(
                        date!
                      ).toISODate();
                      field.onChange(formattedDate || "");
                    }}
                    captionLayout={"dropdown"}
                    className="rounded-lg border shadow-sm w-full"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Botones de Horas Disponibles */}
        {/* <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-10">
                      <p>Cargando disponibilidad...</p>
                    </div>
                  ) : isError ? (
                    <p>Error al cargar las horas disponibles.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {availability?.availableHours?.length ? (
                        availability.availableHours.map((hour) => (
                          <Button
                            type="button"
                            key={hour}
                            onClick={() => field.onChange(hour)}
                            variant={
                              field.value === hour ? "default" : "outline"
                            }
                            className={cn(
                              "w-full",
                              field.value === hour && "bg-blue-500 text-white"
                            )}
                          >
                            {hour}
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm col-span-3 text-center">
                          No hay horas disponibles para este día.
                        </p>
                      )}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

        {/* <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a comment here if needed ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="sm:col-span-2 sm:order-3">
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            loading={isPending}
          >
            Book Now
          </Button>
        </div>
      </form>
    </Form>
  );
};
