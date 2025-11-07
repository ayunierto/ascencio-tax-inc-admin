import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DateTime } from 'luxon';
import { Clock, User, Briefcase, UserCheck, Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';

import { TodayAppointment } from '../interfaces/today-appointments.interface';

interface TodayAppointmentsTableProps {
  appointments: TodayAppointment[];
  isLoading?: boolean;
}

export const TodayAppointmentsTable = ({
  appointments,
  isLoading = false,
}: TodayAppointmentsTableProps) => {
  const navigate = useNavigate();

  const getStatusVariant = (status: TodayAppointment['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'confirmed':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: TodayAppointment['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const isAppointmentPast = (appointmentStart: string): boolean => {
    const now = DateTime.now();
    const appointmentTime = DateTime.fromISO(appointmentStart);
    return appointmentTime < now;
  };

  const formatTimeRange = (start: string, end: string): string => {
    const startTime = DateTime.fromISO(start);
    const endTime = DateTime.fromISO(end);
    return `${startTime.toFormat('h:mm a')} - ${endTime.toFormat('h:mm a')}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Appointments ({appointments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No appointments today</p>
            <p className="text-sm">Your schedule is free for today</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Time</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => {
                  const isPast = isAppointmentPast(appointment.start);
                  return (
                    <TableRow
                      key={appointment.id}
                      className={`${
                        isPast ? 'opacity-60 bg-muted/30' : ''
                      } hover:bg-muted/50 transition-colors`}
                    >
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className={isPast ? 'line-through' : ''}>
                            {formatTimeRange(
                              appointment.start,
                              appointment.end
                            )}
                          </span>
                          {isPast && (
                            <span className="text-xs text-muted-foreground">
                              Past
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {appointment.user.firstName}{' '}
                              {appointment.user.lastName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {appointment.user.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.service.name}</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {appointment.staff.firstName}{' '}
                            {appointment.staff.lastName}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge variant={getStatusVariant(appointment.status)}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/appointments/${appointment.id}`)
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              navigate(`/admin/appointments/${appointment.id}`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
