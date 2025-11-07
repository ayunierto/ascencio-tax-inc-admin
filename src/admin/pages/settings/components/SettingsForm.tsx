import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TimezoneCombobox } from '@/components/TimezoneCombobox';
import { SaveIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import {
  updateSettingsSchema,
  UpdateSettingsFormFields,
} from '../schemas/settings.schema';
import { SettingsResponse } from '../interfaces/settings.response';

interface SettingsFormProps {
  settings?: SettingsResponse;
  onSubmit: (data: UpdateSettingsFormFields) => void;
  isLoading?: boolean;
}

const localeOptions = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-CA', label: 'English (Canada)' },
  { value: 'es-ES', label: 'Español (España)' },
  { value: 'es-MX', label: 'Español (México)' },
  { value: 'es-AR', label: 'Español (Argentina)' },
  { value: 'fr-FR', label: 'Français (France)' },
  { value: 'pt-BR', label: 'Português (Brasil)' },
];

export const SettingsForm = ({
  settings,
  onSubmit,
  isLoading = false,
}: SettingsFormProps) => {
  const form = useForm<UpdateSettingsFormFields>({
    resolver: zodResolver(updateSettingsSchema),
    defaultValues: {
      timeZone: settings?.timeZone || '',
      locale: settings?.locale || 'en-CA',
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        timeZone: settings.timeZone,
        locale: settings.locale,
      });
    }
  }, [settings, form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="timeZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Time Zone</FormLabel>
                    <FormControl>
                      <TimezoneCombobox
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                    <FormLabel>Default Locale</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a locale..." />
                        </SelectTrigger>
                        <SelectContent>
                          {localeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} loading={isLoading}>
                {isLoading ? '' : <SaveIcon className="h-4 w-4" />}
                Save Settings
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
