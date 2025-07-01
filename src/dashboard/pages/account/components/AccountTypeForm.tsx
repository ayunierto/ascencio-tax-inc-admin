import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  CreateAccountTypeInputs,
  createAccountTypeSchema,
  UpdateAccountTypeInputs,
} from '../schemas';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  useCreateAccountType,
  useUpdateAccountType,
} from '../hooks/useAccountTypeMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useEffect } from 'react';

interface AccountTypeFormProps {
  className?: string;
  closeForm: () => void;
  accountTypeToEdit?: UpdateAccountTypeInputs;
  onClose: () => void;
}

export const AccountTypeForm = ({
  className,
  closeForm,
  accountTypeToEdit,
  onClose,
}: AccountTypeFormProps) => {
  const isEditMode = !!accountTypeToEdit;

  const form = useForm<CreateAccountTypeInputs>({
    resolver: zodResolver(createAccountTypeSchema),
    defaultValues: { name: '', description: '' },
  });

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        name: accountTypeToEdit.name,
        description: accountTypeToEdit.description,
      });
    } else {
      form.reset({ name: '', description: '' });
    }
  }, [accountTypeToEdit, form, isEditMode]);

  const { mutateAsync: createAccountType, isPending: isDeleting } =
    useCreateAccountType({ closeForm });

  const { mutate: updateAccountType, isPending: isUpdating } =
    useUpdateAccountType({ closeForm });

  const handleUpdateAndCreateAccountType = async (
    data: CreateAccountTypeInputs
  ) => {
    if (isEditMode) {
      updateAccountType(
        { id: accountTypeToEdit.id, ...data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
      return;
    }
    await createAccountType(data);
    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateAndCreateAccountType)}
        className={cn('grid items-start gap-6', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription />
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
                  placeholder="Description here."
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isDeleting || isUpdating}
          loading={isDeleting || isUpdating}
        >
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
