import { ReactNode, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// The props are adjusted to align with react-hook-form
interface GenericFormProps<TSchema extends z.ZodTypeAny> {
  schema: TSchema; // The schema is now zod type Type <TSchema>
  renderFormFields: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: UseFormReturn<z.TypeOf<TSchema>, any, z.TypeOf<TSchema>>
  ) => ReactNode;
  onSubmit: (data: z.infer<TSchema>) => void;
  defaultValues?: Partial<z.infer<TSchema>>;
  isEditMode: boolean;
  isLoading: boolean;
  className?: string;
}

export const GenericForm = <TSchema extends z.ZodTypeAny>({
  schema,
  renderFormFields,
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

  // Reset the form when the item to edit changes
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset({}); // Limpiar el formulario si no hay valores por defecto (modo creación)
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid items-start gap-6', className)}
      >
        {/* Renderizar los campos del formulario usando la función pasada por props */}
        {renderFormFields(form)}
        {/* {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            // We make a casting a Path<TSchema> to satisfy the type of 'name'
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
        ))} */}
        <Button type="submit" disabled={isLoading} loading={isLoading}>
          {isEditMode ? 'Update' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
