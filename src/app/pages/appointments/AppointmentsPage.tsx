import { BookingCard } from "@/app/components/BookingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AppointmentsPage = () => {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Manage your bookings</h2>

      <div>
        <Tabs defaultValue="upcoming" className="mt-4">
          <TabsList className="">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent
            value="upcoming"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
          </TabsContent>

          <TabsContent value="past">No past bookings found.</TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
