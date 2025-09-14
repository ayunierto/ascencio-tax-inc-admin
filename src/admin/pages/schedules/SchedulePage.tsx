import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useParams } from "react-router";
import { useSchedule } from "./hooks/useSchedule";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export const SchedulePage = () => {
  const { id } = useParams();
  const {
    data: schedule,
    isLoading,
    isError,
    error,
  } = useSchedule(id || "new");
  console.log({ schedule });

  const form = useForm<Schedule>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      id: id || "new",
      startTime: "",
      endTime: "",
      weekday: schedule?.weekday.toString() || undefined,
    },
  });

  const onSubmit = (data: Schedule) => {
    console.log(data);
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <EmptyContent title="Cannot " description={error.message} />;
  }

  return (
    <div>
      <AdminHeader
        title="Schedules"
        // actions={
        //   <Button onClick={form.handleSubmit(onSubmit)}>
        //     <SaveIcon /> {id === "new" ? "Save" : "Update"}
        //   </Button>
        // }
      />

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 space-y-4">
                  <FormField
                    control={form.control}
                    name="weekday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weekday</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose the day of the week" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Sunday</SelectItem>
                            <SelectItem value="2">Monday</SelectItem>
                            <SelectItem value="3">Tuesday</SelectItem>
                            <SelectItem value="4">Wednesday </SelectItem>
                            <SelectItem value="5">Thursday </SelectItem>
                            <SelectItem value="6">Friday </SelectItem>
                            <SelectItem value="7">Saturday</SelectItem>
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
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">
                    <SaveIcon />
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
