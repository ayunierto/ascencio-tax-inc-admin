import { useEffect } from 'react';
import { useForm, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FormFieldConfig {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

// Se ajustan las props para alinearse con react-hook-form
interface GenericFormProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema; // El schema ahora es de tipo ZodType<TSchema>
  fields: FormFieldConfig[];
  onSubmit: (data: z.infer<TSchema>) => void; // Usamos SubmitHandler<TSchema> para el submit
  defaultValues?: Partial<z.infer<TSchema>>;
  isEditMode: boolean;
  isLoading: boolean;
  className?: string;
}

// Se restringe TSchema para que sea compatible con FieldValues de react-hook-form
export const GenericForm = <TSchema extends z.ZodTypeAny>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  isEditMode,
  isLoading,
  className,
}: GenericFormProps<TSchema>) => {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<TSchema>,
  });

  // Resetea el formulario cuando el item a editar cambia
  useEffect(() => {
    form.reset(defaultValues as z.infer<TSchema>);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-6', className)}
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            // Hacemos un casting a Path<TSchema> para satisfacer el tipado de 'name'
            name={field.name as Path<z.infer<TSchema>>}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={field.placeholder}
                    type={field.type || 'text'}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
