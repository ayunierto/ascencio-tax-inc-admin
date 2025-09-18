import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { ArrowLeft, SaveIcon } from "lucide-react";

import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Service, serviceSchema } from "./schemas/service.schema";
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
import { useService } from "./hooks/useService";
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
import { useAllStaff } from "../staff/hooks/useAllStaff";
import { Textarea } from "@/components/ui/textarea";

export const ServicePage = () => {
  const { id } = useParams();
  const { data: service, isLoading, isError, error } = useService(id || "new");
  const { mutation } = useMutations();
  const navigate = useNavigate();
  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      id: undefined,
      address: "",
      isActive: true,
      description: "",
      duration: 0,
      isAvailableOnline: false,
      name: "",
      price: 0,
      staff: [],
    },
  });

  const { data: staff, isLoading: isLoadingStaff } = useAllStaff();

  // Update form values when schedule changes
  useEffect(() => {
    if (service) {
      form.reset({
        id: service.id,
        isActive: service.isActive,
        name: service.name,
        duration: service.duration,
        price: service.price,
        description: service.description || "",
        address: service.address,
        isAvailableOnline: service.isAvailableOnline,
        staff: service.staff.map((s) => s.id),
      });
    }
  }, [service, form]);

  const onSubmit = async (serviceLike: Partial<Service>) => {
    console.log({ serviceLike });
    await mutation.mutateAsync(serviceLike, {
      onSuccess(service, variables) {
        toast.success(
          `Service ${
            variables.id === "new" ? "created" : "updated"
          } successfully`
        );
        // form.reset({
        //   isActive: service.isActive,
        //   name: service.name,
        //   duration: service.duration,
        //   price: service.price,
        //   description: service.description || "",
        //   address: service.address,
        //   isAvailableOnline: service.isAvailableOnline,
        //   staff: service.staff.map((s) => s.id),
        //   id: service.id,
        // });
        navigate(`/admin/services/${service.id}`);
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
  if (!service) return <Navigate to={"/admin/services"} />;

  return (
    <div>
      <AdminHeader
        backButton={{
          icon: ArrowLeft,
          onClick: () => navigate("/admin/services"),
        }}
        title={id === "new" ? "Add Service" : "Edit Service"}
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
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>

                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Service duration"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Service price"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="isAvailableOnline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Online Availability</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between border border-input h-9 rounded-md px-3">
                            <p className="text-sm">
                              {field.value ? "Available" : "Not available"}
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
                    name="staff"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staff</FormLabel>
                        <MultiSelect
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <FormControl>
                            <MultiSelectTrigger className="w-full">
                              <MultiSelectValue
                                placeholder={`${
                                  isLoadingStaff
                                    ? "Loading..."
                                    : staff && staff.length > 0
                                    ? "Select staff..."
                                    : "No staff available"
                                }`}
                              />
                            </MultiSelectTrigger>
                          </FormControl>
                          <MultiSelectContent>
                            <MultiSelectGroup>
                              {staff && staff.length > 0 ? (
                                staff.map(({ id, firstName, lastName }) => (
                                  <MultiSelectItem key={id} value={id}>
                                    {firstName} {lastName}
                                  </MultiSelectItem>
                                ))
                              ) : (
                                <>
                                  <MultiSelectItem value="none">
                                    <Link
                                      to={"/admin/staff/new"}
                                      className="text-blue-500"
                                    >
                                      Create a new staff
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
