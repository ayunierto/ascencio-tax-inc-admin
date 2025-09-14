import { Navigate, useParams } from "react-router";
import { useService } from "./hooks/useService";
import { Alert } from "@/components/ui/alert";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { AdminHeader } from "@/admin/components/AdminHeader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStaff } from "@/admin/hooks/useAllStaff";
import {
  CreateServiceRequest,
  createServiceSchema,
} from "./schemas/create-service.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createServiceAction } from "./actions/create-service.action";

export const AdminServicePage = () => {
  const { id } = useParams();
  const { data: service, isLoading, isError, error } = useService(id || "");
  const { data: staff } = useStaff();
  const queryClient = useQueryClient();

  const form = useForm<CreateServiceRequest>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      duration: 30,
      price: 0,
      description: "",
      address: "",
      isAvailableOnline: false,
      isActive: true,
      image: "",
      staff: [],
    },
  });

  const mutation = useMutation({
    mutationFn: createServiceAction,
    onSuccess: () => {
      console.log("Service created successfully");
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["services"],
      });
    },
    onError: (error) => {
      console.error("Error creating service:", error);
    },
  });

  const onSubmit = (data: CreateServiceRequest) => {
    console.log(data);
    // return;
    mutation.mutate(data);
  };

  if (isLoading) {
    return <Loader showText text="Loading service..." />;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        {error.response?.data.message || error.message || "Unknown error"}
      </Alert>
    );
  }

  if (!service) {
    toast.error("Service not found");
    return <Navigate to="/admin/services" />;
  }

  return (
    <>
      <AdminHeader title="New" />
      <div className="p-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl">
                Create Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Service name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Service description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image URL */}
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Switches */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isAvailableOnline"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between border border-input h-9 rounded-md px-3">
                          <FormLabel>Available Online</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between border border-input h-9 rounded-md px-3">
                          <FormLabel>Active</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="staff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <MultiSelect
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <FormControl>
                            <MultiSelectTrigger className="w-full">
                              <MultiSelectValue
                                placeholder={
                                  staff?.length === 0
                                    ? "No staff available."
                                    : "Select staff"
                                }
                              />
                            </MultiSelectTrigger>
                          </FormControl>
                          <MultiSelectContent>
                            <MultiSelectGroup>
                              {staff &&
                                staff.map(({ id, firstName, lastName }) => (
                                  <MultiSelectItem value={id} key={id}>
                                    {firstName} {lastName}
                                  </MultiSelectItem>
                                ))}
                            </MultiSelectGroup>
                          </MultiSelectContent>
                        </MultiSelect>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Creating..." : "Create Service"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
