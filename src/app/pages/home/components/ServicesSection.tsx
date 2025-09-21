import { useServices } from "@/admin/pages/services/hooks/useServices";
import { ServiceCard } from "@/app/pages/home/components/ServiceCard";
import EmptyContent from "@/components/EmptyContent";
import { Loader } from "@/components/Loader";
import { Pagination } from "@/components/Pagination";
import { Info } from "lucide-react";
import { toast } from "sonner";

export const ServicesSection = () => {
  const { data: services, error, isError, isPending } = useServices();

  if (isPending) return <Loader />;

  if (isError) {
    toast.error(
      `${
        error.message === "Network Error"
          ? "Please check your internet connection."
          : error.message
      } - Failed to load services.`
    );
    return (
      <EmptyContent
        title="Error"
        description={
          error.message === "Network Error"
            ? "Please check your internet connection."
            : error.message
        }
      />
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto md:p-6">
        <div className="text-center py-2">
          <h2 className="text-3xl font-bold text-primary">Our services</h2>
        </div>

        {/* Services list */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 overflow-x-auto flex-nowrap px-2 sm:px-4 ">
          {!services || services.services.length === 0 ? (
            <EmptyContent
              title="No services available"
              icon={<Info size={48} />}
              description="No services available at the moment. Please check back later or contact support for more information."
            />
          ) : (
            services.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>

        <Pagination totalPages={services.pages} />
      </div>
    </section>
  );
};
