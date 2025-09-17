import { useEffect } from "react";
import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, SaveIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

import { useSchedule } from "./hooks/useSchedule";
import { Loader } from "@/components/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schedule, scheduleSchema } from "./schemas/schedule.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmptyContent from "@/components/EmptyContent";
import { useMutations } from "./hooks/useMutations";

const weekdays = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 7, label: "Sunday" },
];

export const SchedulePage = () => {
  const { id } = useParams();
  const {
    data: schedule,
    isLoading,
    isError,
    error,
  } = useSchedule(id || "new");
  const { mutation } = useMutations();
  const navigate = useNavigate();
  const form = useForm<Schedule>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      id: undefined,
      startTime: undefined,
      endTime: undefined,
      weekday: undefined,
    },
  });

  // Update form values when schedule changes
  useEffect(() => {
    if (schedule) {
      form.reset({
        id: schedule.id,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        weekday: schedule.weekday === 0 ? undefined : schedule.weekday,
      });
    }
  }, [schedule, form]);

  const onSubmit = async (scheduleLike: Partial<Schedule>) => {
    await mutation.mutateAsync(scheduleLike, {
      onSuccess(schedule, variables) {
        toast.success(
          `Schedule ${
            variables.id === "new" ? "created" : "updated"
          } successfully`
        );
        form.reset(schedule);
        navigate(`/admin/schedules/${schedule.id}`);
      },
      onError: (error) => {
        toast.error(error.message || "An unexpected error occurred. ");
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
  if (!schedule) return <Navigate to={"/admin/schedules"} />;

  return (
    <div>
      <AdminHeader
        backButton={{
          icon: ArrowLeft,
          onClick: () => navigate("/admin/schedules"),
        }}
        title={id === "new" ? "Add Schedule" : "Edit Schedule"}
        actions={
          <Button
            onClick={form.handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "" : <SaveIcon />}
          </Button>
        }
      />

      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <Card>
              <CardHeader>
                {/* <CardTitle>Add Schedule</CardTitle> */}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="weekday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekday</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(+value)}
                          defaultValue={
                            schedule.weekday === 0
                              ? undefined
                              : schedule.weekday?.toString()
                          }
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose the day of the week" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {weekdays.map((day) => (
                              <SelectItem
                                key={day.value}
                                value={day.value.toString()}
                              >
                                {day.label}
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
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">Start Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="px-1">End Time</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none w-full"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
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
                  <SaveIcon /> {id === "new" ? "Save" : "Update"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};
