import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  CreateCurrencyInputs,
  createCurrencySchema,
  UpdateCurrencyInputs,
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
  useCreateCurrency,
  useUpdateCurrency,
} from '../hooks/useCurrencyMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CurrencyFormProps {
  className?: string;
  closeForm: () => void;
  currencyToEdit?: UpdateCurrencyInputs;
  onClose: () => void;
}

export const CurrencyForm = ({
  className,
  closeForm,
  currencyToEdit,
  onClose,
}: CurrencyFormProps) => {
  const isEditMode = !!currencyToEdit;

  const form = useForm<CreateCurrencyInputs>({
    resolver: zodResolver(createCurrencySchema),
    defaultValues: { name: '', coinSuffix: '', symbol: '' },
  });

  useEffect(() => {
    if (isEditMode) {
      form.reset({
        name: currencyToEdit.name,
        coinSuffix: currencyToEdit.coinSuffix,
        symbol: currencyToEdit.symbol,
      });
    } else {
      form.reset({ name: '', coinSuffix: '', symbol: '' });
    }
  }, [currencyToEdit, form, isEditMode]);

  const { mutateAsync: createCurrency, isPending: isCreating } =
    useCreateCurrency({ closeForm });

  const { mutate: updateCurrency, isPending: isUpdating } = useUpdateCurrency({
    closeForm,
  });

  const handleUpdateAndCreateCurrency = async (data: CreateCurrencyInputs) => {
    if (isEditMode) {
      updateCurrency(
        { id: currencyToEdit.id, ...data },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
      return;
    }
    await createCurrency(data);
    onClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateAndCreateCurrency)}
        className={cn('grid items-start gap-6', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Canadian Dollar" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coinSuffix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coin suffix</FormLabel>
              <FormControl>
                <Input placeholder="CAD" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="$" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isCreating || isUpdating}
          loading={isCreating || isUpdating}
        >
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
