import { AdminHeader } from '@/admin/components/AdminHeader';
import { Loader } from '@/components/Loader';
import EmptyContent from '@/components/EmptyContent';
import {
  Calendar,
  Users,
  UserCheck,
  ClipboardList,
  Clock,
  CheckCircle,
  Briefcase,
  DollarSign,
} from 'lucide-react';

import { useDashboardMetrics } from './hooks/useDashboardMetrics';
import { useTodayAppointments } from './hooks/useTodayAppointments';
import { MetricCard } from './components/MetricCard';
import { TodayAppointmentsTable } from './components/TodayAppointmentsTable';

export const DashboardPage = () => {
  const { data: metrics, isLoading, isError, error } = useDashboardMetrics();

  const {
    data: todayAppointments,
    isLoading: isLoadingToday,
    isError: isErrorToday,
    error: errorToday,
  } = useTodayAppointments();

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div>
        <AdminHeader title="Dashboard" />
        <div className="p-2 sm:p-6">
          <EmptyContent
            title="Failed to load dashboard metrics"
            description={error?.message || 'An unexpected error occurred'}
          />
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div>
        <AdminHeader title="Dashboard" />
        <div className="p-2 sm:p-6">
          <EmptyContent
            title="No data available"
            description="Dashboard metrics could not be loaded"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Dashboard" />
      <div className="p-2 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers.toLocaleString()}
            description="registered users"
            icon={Users}
          />

          <MetricCard
            title="Upcoming Appointments"
            value={metrics.upcomingAppointments}
            description="next 7 days"
            icon={Clock}
          />

          <MetricCard
            title="Today's Appointments"
            value={metrics.todayAppointments}
            description="scheduled today"
            icon={Calendar}
          />

          <MetricCard
            title="Total Appointments"
            value={metrics.totalAppointments.toLocaleString()}
            description="all time"
            icon={ClipboardList}
          />

          <MetricCard
            title="Completed Appointments"
            value={metrics.completedAppointments.toLocaleString()}
            description="successfully finished"
            icon={CheckCircle}
          />

          <MetricCard
            title="Active Services"
            value={metrics.totalServices}
            description="available services"
            icon={Briefcase}
          />

          <MetricCard
            title="Active Staff"
            value={metrics.activeStaff}
            description="team members"
            icon={UserCheck}
          />

          {metrics.monthlyRevenue && (
            <MetricCard
              title="Monthly Revenue"
              value={`$${metrics.monthlyRevenue.toLocaleString()}`}
              description="current month"
              icon={DollarSign}
              trend="up"
              trendValue="12%"
            />
          )}
        </div>

        {/* Today's Appointments Section */}
        <div className="mt-8">
          <TodayAppointmentsTable
            appointments={todayAppointments?.appointments || []}
            isLoading={isLoadingToday}
          />

          {isErrorToday && (
            <div className="mt-4">
              <EmptyContent
                title="Failed to load today's appointments"
                description={
                  errorToday?.message || 'An unexpected error occurred'
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
