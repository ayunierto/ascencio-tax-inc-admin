import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  CreateStaffRequest,
  createStaffSchema,
} from "./schemas/create-staff.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleOff, Info, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useMutation } from "@tanstack/react-query";
import { createStaffAction } from "./actions/create-staff.action";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { useStaff } from "./hooks/useStaff";
import { Loader } from "@/components/Loader";
import EmptyContent from "@/components/EmptyContent";

export const AdminStaffPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isError, error, isLoading } = useStaff(id || "");
  console.log({ data });

  // TODO: Add Schedules

  const form = useForm<CreateStaffRequest>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      isActive: data?.isActive || true,
      schedules: [],
      services: [],
    },
  });

  const mutate = useMutation({
    mutationFn: createStaffAction,
    onSuccess(data) {
      toast.success("Staff member added.", {
        description: `${data.firstName} added to staff`,
      });

      navigate("/admin/staff");
    },
    onError(error) {
      toast.error("Failed to add staff member", {
        description: error.message,
      });
    },
  });

  const handleCreateStaff = (data: CreateStaffRequest) => {
    mutate.mutateAsync(data);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <EmptyContent
        title="Error"
        icon={<CircleOff size={48} />}
        description={
          error.response?.data.message || error.message || "Unknown error."
        }
      />
    );
  if (!data)
    return (
      <EmptyContent
        title="No staff found"
        icon={<Info size={48} />}
        description="+ Add"
      />
    );

  return (
    <>
      <AdminHeader
        // TODO: Change by the name if is editing.
        title="New"
      />
      <div className="p-6 ">
        <Card>
          <CardHeader>
            <CardTitle>Add Staff </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleCreateStaff)}
                className="flex flex-col gap-4 w-full"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} placeholder="John" />
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
                          <Input
                            type="text"
                            {...field}
                            placeholder="Doe"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Status</FormLabel>

                      <div className="flex flex-row items-center justify-between rounded-md border h-9 shadow-xs px-3 bg-transparent dark:bg-input/30">
                        <span className="text-sm text-foreground">
                          {field.value ? "Active" : "Inactive"}
                        </span>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
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
                            <MultiSelectValue placeholder="Select schedules..." />
                          </MultiSelectTrigger>
                        </FormControl>
                        <MultiSelectContent>
                          <MultiSelectGroup>
                            <MultiSelectItem value="next.js">
                              Monday - 08:00 to 17:00
                            </MultiSelectItem>
                          </MultiSelectGroup>
                        </MultiSelectContent>
                      </MultiSelect>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit">
                    <Save /> {id === "new" ? "Save" : "Update"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
