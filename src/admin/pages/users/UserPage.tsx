import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ImageIcon, SaveIcon } from "lucide-react";

import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

import { User, userSchema } from "./schemas/user.schema";
import { useUser } from "./hooks/useUser";
import { Role } from "./interfaces/role.enum";

export const UserPage = () => {
  const { id } = useParams();
  const { data: user, isLoading, isError, error } = useUser(id || "new");
  const { mutation } = useMutations();
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState<File | null>(null);
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: "new",
      countryCode: "",
      email: "",
      firstName: "",
      isActive: true,
      isEmailVerified: false,
      lastName: "",
      locale: "",
      password: undefined,
      phoneNumber: "",
      roles: [],
    },
  });

  const roles: Role[] = [Role.SuperUser, Role.Admin, Role.Staff, Role.User];

  // Update form values when schedule changes
  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isActive: user.isActive,
        countryCode: user.countryCode || "",
        isEmailVerified: user.isEmailVerified,
        locale: user.locale || "",
        phoneNumber: user.phoneNumber || "",
        roles: user.roles,
        password: undefined,
      });
    }
  }, [user, form]);

  const onSubmit = async (userLike: Partial<User>) => {
    await mutation.mutateAsync(userLike, {
      onSuccess(user, variables) {
        toast.success(
          `User ${variables.id === "new" ? "created" : "updated"} successfully`
        );
        setNewImage(null);
        navigate(`/admin/users/${user.id}`);
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "An unexpected error occurred."
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
  if (!user) return <Navigate to={"/admin/users"} />;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("imageFile", file);
    setNewImage(file || null);
  };

  return (
    <div>
      <AdminHeader
        backButton={{
          icon: ArrowLeft,
          onClick: () => navigate("/admin/users"),
        }}
        title={id === "new" ? "Add User" : "Edit User"}
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

      <div className="p-2 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardContent className="flex flex-col gap-4 border-b pb-4 md:flex-row ">
                <div className="flex items-center gap-4 mx-auto">
                  <img
                    src={user.imageUrl || "/logo.png"}
                    alt="User Image"
                    className="w-20 h-20 object-cover rounded-md "
                  />
                  {newImage && (
                    <div className="flex gap-4">
                      <ArrowRight className="self-center" />
                      <img
                        src={URL.createObjectURL(newImage)}
                        alt="User Image"
                        className="w-20 h-20 object-cover rounded-md "
                      />
                    </div>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel className="border border-dashed w-40 h-20 rounded-md flex flex-row items-center justify-center">
                        <ImageIcon /> Select image
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                          className="hidden"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>

                        <FormControl>
                          <Input placeholder="User first name" {...field} />
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
                          <Input placeholder="User last name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>

                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="******"
                            {...field}
                            required={id === "new"}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Code</FormLabel>

                        <FormControl>
                          <Input placeholder="+1" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>

                        <FormControl>
                          <Input placeholder="123 4567 890" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="locale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Locale</FormLabel>

                        <FormControl>
                          <Input placeholder="en-CA" {...field} />
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
                    name="roles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roles</FormLabel>
                        <MultiSelect
                          onValuesChange={field.onChange}
                          values={field.value}
                        >
                          <FormControl>
                            <MultiSelectTrigger className="w-full">
                              <MultiSelectValue
                                placeholder={`Select roles...`}
                              />
                            </MultiSelectTrigger>
                          </FormControl>
                          <MultiSelectContent>
                            <MultiSelectGroup>
                              {roles.map((role) => (
                                <MultiSelectItem key={role} value={role}>
                                  {role}
                                </MultiSelectItem>
                              ))}
                            </MultiSelectGroup>
                          </MultiSelectContent>
                        </MultiSelect>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isEmailVerified"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Verified</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between border border-input h-9 rounded-md px-3">
                            <p className="text-sm">
                              {field.value ? "Verified" : "Not Verified"}
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
