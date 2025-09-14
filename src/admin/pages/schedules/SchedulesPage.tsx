import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { Link } from "react-router";

export const SchedulesPage = () => {
  return (
    <div>
      <AdminHeader
        title="Schedules"
        actions={
          <Button asChild>
            <Link to={"/admin/schedules/new"}>
              <PlusCircleIcon /> Add
            </Link>
          </Button>
        }
      />
    </div>
  );
};
