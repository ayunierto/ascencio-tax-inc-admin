import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  AlertCircleIcon,
  Check,
  CircleX,
  Eye,
  EyeOff,
  Video,
  VideoOff,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createServiceAction } from '../actions';
import { ServiceResponse } from '../interfaces/service-response.interface';
import { ServiceRequest } from '../interfaces/service-request.interface';
import { Exception } from '@/interfaces';
import { getStaffAction } from '../../staff/actions';
import { Loader } from '@/components/Loader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  duration: z.string({
    required_error: 'Please select the duration.',
  }),
  staff: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You must select at least one staff member.',
  }),
  address: z
    .string()
    .min(2, { message: 'Address must be least 2 characters.' }),
  isAvailableOnline: z.boolean(),
  isActive: z.boolean(),
  price: z.string(),
  image: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, 'Select an image, please.')
    .refine((files) => files?.length === 1, 'Maximum 1 image allowed')
    .refine(
      (files) => (files ? files[0]?.size <= 2 * 1024 * 1024 : false),
      'The image must be less than 5MB'
    )
    .refine(
      (files) => (files ? files[0]?.type.startsWith('image/') : false),
      'Only image files are allowed'
    ),
  description: z.string().optional(),
});

interface ServiceFormProps {
  toggleDialog?: () => void;
  toggleDrawer?: () => void;
}

export const ServiceForm = ({
  toggleDialog,
  toggleDrawer,
}: ServiceFormProps) => {
  const isMobile = useIsMobile();
  const [staffMembers, setStaffMembers] = useState<
    { id: string; label: string }[]
  >([]);
  const serviceForm = useForm<z.infer<typeof ServiceFormSchema>>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      name: '',
      isAvailableOnline: false,
      isActive: true,
      price: '0',
      staff: [],
    },
  });

  const staffQuery = useQuery({
    queryKey: ['staff'],
    queryFn: getStaffAction,
  });

  useEffect(() => {
    if (staffQuery.data && !('error' in staffQuery.data)) {
      setStaffMembers(
        staffQuery.data.map((member) => ({
          id: member.id,
          label: `${member.name} ${member.lastName}`,
        }))
      );
    }
  }, [staffQuery.data]);

  const queryClient = useQueryClient();

  const serviceMutation = useMutation({
    mutationFn: async (
      newService: ServiceRequest
    ): Promise<ServiceResponse | Exception> => {
      const response = await createServiceAction(newService);
      return response;
    },
    onSuccess: async (values) => {
      if ('id' in values) {
        await queryClient.invalidateQueries({ queryKey: ['services'] });
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof ServiceFormSchema>) => {
    const response = await serviceMutation.mutateAsync({
      ...data,
      duration: Number(data.duration),
      image: data.image[0],
      price: Number(data.price),
      staff: data.staff,
    });

    if ('id' in response) {
      toast('Service created successfully', {
        icon: <Check size={20} />,
      });
    }

    toast('The service could not be created', {
      icon: <CircleX size={20} />,
    });

    if (isMobile) {
      if (toggleDrawer) {
        toggleDrawer();
      }
    }
    if (toggleDialog) {
      toggleDialog();
    }
  };

  if (staffQuery.isPending) {
    return <Loader />;
  }

  if (staffQuery.isError || 'error' in staffQuery.data || !staffQuery.data) {
    return (
      <Alert variant='destructive'>
        <AlertCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          <p>Unable to load staff members</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...serviceForm}>
      <form onSubmit={serviceForm.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={serviceForm.control}
          name='image'
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <FormItem>
              <FormLabel htmlFor='image'>Image</FormLabel>
              <FormControl>
                <Input
                  accept='.jpg,.jpeg,.png'
                  id='image'
                  type='file'
                  onChange={(e) => {
                    onChange(e.target.files);
                  }}
                  onBlur={onBlur}
                  name={name}
                  ref={ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='staff'
          render={() => (
            <FormItem>
              <div className=''>
                <FormLabel className='text-base'>Staff</FormLabel>
                <FormDescription>
                  Select the staff member for this service.
                </FormDescription>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                {staffMembers.length > 0 ? (
                  staffMembers.map((item) => (
                    <FormField
                      key={item.id}
                      control={serviceForm.control}
                      name='staff'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-center gap-2'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='text-sm font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))
                ) : (
                  <Link
                    className='text-blue-500 hover:underline'
                    to={'/dashboard/staff'}
                  >
                    Add new staff member.
                  </Link>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Select a duration'
                      className='flex-1/2 w-full'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='30'>30 min</SelectItem>
                  <SelectItem value='45'>45 min</SelectItem>
                  <SelectItem value='60'>60 min</SelectItem>
                  <SelectItem value='90'>90 min</SelectItem>
                  <SelectItem value='120'>120 min</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='isAvailableOnline'
          render={({ field }) => (
            <FormItem
              className={`flex flex-row items-center justify-between rounded-lg border px-3 h-9 shadow-sm`}
            >
              <div className='space-y-0.5'>
                <FormLabel>
                  {field.value ? <Video /> : <VideoOff />} Available Online
                </FormLabel>
                <FormDescription />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='isActive'
          render={({ field }) => (
            <FormItem
              className={`flex flex-row items-center justify-between rounded-lg border px-3 h-9 shadow-sm`}
            >
              <div className='space-y-0.5'>
                <FormLabel>
                  {field.value ? <Eye /> : <EyeOff />} Active
                </FormLabel>
                <FormDescription />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder='Address' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={serviceForm.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Some description here.'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          loading={serviceMutation.isPending}
          disabled={serviceMutation.isPending}
          type='submit'
          className='w-full cursor-pointer'
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
