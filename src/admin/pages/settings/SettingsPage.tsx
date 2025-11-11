import { AdminHeader } from '@/admin/components/AdminHeader';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { SelectTheme } from '@/components/SelectTheme';
import { Loader } from '@/components/Loader';
import EmptyContent from '@/components/EmptyContent';
import { toast } from 'sonner';

import { useSettings } from './hooks/useSettings';
import { useUpdateSettings } from './hooks/useUpdateSettings';
import { SettingsForm } from './components/SettingsForm';
import { UpdateSettingsFormFields } from './schemas/settings.schema';

export const SettingsPage = () => {
  const { data: settings, isLoading, isError, error } = useSettings();

  const updateMutation = useUpdateSettings();

  const handleSubmit = async (data: UpdateSettingsFormFields) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success('Settings updated successfully');
    } catch {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="flex flex-col h-screen">
        <AdminHeader title="Settings" />
        <div className="p-4">
          <EmptyContent
            title="Failed to load settings"
            description={error?.message || 'An unexpected error occurred'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader title="Settings" />

      <div className="p-4 overflow-y-auto space-y-6">
        {/* Application Settings */}
        <SettingsForm
          settings={settings}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />

        {/* Theme Settings */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="theme-selector">Theme</Label>
                <span className="text-xs text-muted-foreground">
                  Choose your preferred color theme
                </span>
              </div>
              <SelectTheme />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
