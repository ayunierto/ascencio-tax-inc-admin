import { ServiceCard } from "@/app/pages/home/components/ServiceCard";
import { Loader } from "@/components/Loader";
import { useServices } from "@/hooks/useServices";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const ServicesSection = () => {
  const { data, error, isError, isPending } = useServices();

  if (isPending) return <Loader />;

  if (isError) return <div>{error.message}</div>;

  if (!data || data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto md:p-6  ">
        <Alert variant="default">
          <Info />
          <AlertTitle>No services available</AlertTitle>
          <AlertDescription>
            No services available at the moment. Please check back later or
            contact support for more information.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto md:p-6">
        <div className="text-center py-2">
          <h2 className="text-3xl font-bold text-primary">Our services</h2>
        </div>

        {/* Services list */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 overflow-x-auto flex-nowrap px-2 sm:px-4 ">
          {!data || data.length === 0 ? (
            <div className="text-center">No services available.</div>
          ) : (
            data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
