import { AdminHeader } from "@/admin/components/AdminHeader";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { ToggleTheme } from "@/components/ToggleTheme";

export const SettingsPage = () => {
  return (
    <div>
      <AdminHeader title="Settings" />

      <div className="p-4">
        <Card>
          <CardContent>
            <div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="dark-mode">Theme</Label>
                </div>
                <ToggleTheme />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
