import { AdminHeader } from "@/admin/components/AdminHeader";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { SelectTheme } from "@/components/SelectTheme";

export const SettingsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader title="Settings" />

      <div className="p-4 overflow-y-auto">
        <Card>
          <CardContent>
            <div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dark-mode">Theme</Label>
                </div>
                <SelectTheme />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
