import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { ArrowLeft, SaveIcon } from "lucide-react";
import { DateTime, WeekdayNumbers } from "luxon";

import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Staff, staffSchema } from "./schemas/staff.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EmptyContent from "@/components/EmptyContent";
import { useMutations } from "./hooks/useMutations";
import { Switch } from "@/components/ui/switch";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useSchedules } from "../schedules/hooks/useSchedules";
import { useStaffMember } from "./hooks/useStaffMember";

export const StaffMemberPage = () => {
  const { id } = useParams();
  const {
    data: staffMember,
    isLoading,
    isError,
    error,
  } = useStaffMember(id || "new");
  const { mutation } = useMutations();
  const navigate = useNavigate();
  const form = useForm<Staff>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      id: undefined,
      firstName: "",
      lastName: "",
      isActive: true,
      schedules: [],
      services: [],
    },
  });

  const { data: schedules, isLoading: isLoadingSchedules } = useSchedules();

  // Update form values when schedule changes
  useEffect(() => {
    if (staffMember) {
      form.reset({
        id: staffMember.id,
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        isActive: staffMember.isActive,
        schedules: staffMember.schedules.map((schedule) => schedule.id),
      });
    }
  }, [staffMember, form]);

  const onSubmit = async (staffMemberLike: Partial<Staff>) => {
    await mutation.mutateAsync(staffMemberLike, {
      onSuccess(member, variables) {
        toast.success(
          `Staff ${variables.id === "new" ? "created" : "updated"} successfully`
        );
        form.reset({
          firstName: member.firstName,
          lastName: member.lastName,
          isActive: member.isActive,
          schedules: [],
          services: [],
        });
        navigate(`/admin/staff/${member.id}`);
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred. "
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
  if (!staffMember) return <Navigate to={"/admin/staff"} />;

  return (
    <div>
      <AdminHeader
        backButton={{
          icon: ArrowLeft,
          onClick: () => navigate("/admin/staff"),
        }}
        title={id === "new" ? "Add Staff" : "Edit Staff"}
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
              <CardHeader>{/* <CardTitle>Add Staff</CardTitle> */}</CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>

                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>

                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between border border-input h-9 rounded-md px-3">
                            <p className="text-sm">
                              {field.value ? "Active" : "Inactive"}
                            </p>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="schedules"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schedules</FormLabel>
                        <MultiSelect
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <FormControl>
                            <MultiSelectTrigger className="w-full">
                              <MultiSelectValue
                                placeholder={`${
                                  isLoadingSchedules
                                    ? "Loading..."
                                    : schedules && schedules.length > 0
                                    ? "Select schedules..."
                                    : "No schedules available"
                                }`}
                              />
                            </MultiSelectTrigger>
                          </FormControl>
                          <MultiSelectContent>
                            <MultiSelectGroup>
                              {schedules && schedules.length > 0 ? (
                                schedules.map(
                                  ({ id, dayOfWeek, startTime, endTime }) => (
                                    <MultiSelectItem key={id} value={id}>
                                      {`${DateTime.fromObject({
                                        weekday: dayOfWeek as WeekdayNumbers,
                                      }).toFormat("cccc")}: ${DateTime.fromISO(
                                        startTime
                                      ).toFormat(
                                        "hh:mm a"
                                      )} - ${DateTime.fromISO(endTime).toFormat(
                                        "hh:mm a"
                                      )}`}
                                    </MultiSelectItem>
                                  )
                                )
                              ) : (
                                <>
                                  <MultiSelectItem value="none">
                                    <Link
                                      to={"/admin/schedules/new"}
                                      className="text-blue-500"
                                    >
                                      Create a new schedule
                                    </Link>
                                  </MultiSelectItem>
                                </>
                              )}
                            </MultiSelectGroup>
                          </MultiSelectContent>
                        </MultiSelect>
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
