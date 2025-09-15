import { AdminHeader } from "@/admin/components/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import { Link } from "react-router";
import { useSchedules } from "./hooks/useSchedules";
import { Loader } from "@/components/Loader";
import { DateTime, WeekdayNumbers } from "luxon";
import { Card, CardContent } from "@/components/ui/card";
import { useMutations } from "./hooks/useDeleteMutations";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const SchedulesPage = () => {
  const { data: schedules, isLoading, isError, error } = useSchedules();
  const { deleteMutation } = useMutations();

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id, {
      onSuccess: () => {
        // Show a toast notification
        toast.success("Schedule deleted");
      },
      onError: (error) => {
        toast.error(error.message || "An unexpected error occurred. ");
      },
    });
  };

  return (
    <div>
      <AdminHeader
        title="Schedules"
        actions={
          <Button asChild>
            <Link to={"/admin/schedules/new"}>
              <PlusCircleIcon />
            </Link>
          </Button>
        }
      />

      <div className="p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              {!schedules || schedules.length === 0 ? (
                <TableCaption>
                  No schedules found. <br />
                  <Link to={"/admin/schedules/new"} className="text-blue-500">
                    Click here to add a new schedule.
                  </Link>
                </TableCaption>
              ) : null}
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Weekday</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules &&
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>
                        {DateTime.fromObject({
                          weekday: schedule.weekday as WeekdayNumbers,
                        }).toFormat("cccc")}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(schedule.startTime).toFormat(
                          "hh:mm a"
                        )}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(schedule.endTime).toFormat("hh:mm a")}
                      </TableCell>
                      <TableCell className="flex items-center justify-center gap-1">
                        <Button variant="ghost" asChild size={"sm"}>
                          <Link to={`/admin/schedules/${schedule.id}`}>
                            <EditIcon size={16} />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size={"sm"}
                              disabled={deleteMutation.isPending}
                            >
                              <TrashIcon size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the schedule.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(schedule.id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
