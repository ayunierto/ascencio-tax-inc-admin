import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import EmptyContent from "@/components/EmptyContent";
import { useService } from "@/admin/pages/services/hooks/useService";
import { Loader } from "@/components/Loader";
import { useServices } from "@/admin/pages/services/hooks/useServices";
import { BookForm } from "./components/BookForm";
import { BookFormValues } from "./schemas/book-schema";

export const BookPage = () => {
  const { id } = useParams();

  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesIsError,
    error: servicesError,
  } = useServices(100);
  const {
    data: service,
    isLoading: serviceLoading,
    isError: serviceIsError,
    error: serviceError,
  } = useService(id || "");

  function onSubmit(data: BookFormValues) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // Check if the services are loading or have an error
  if (servicesLoading) return <Loader showText text="Loading services..." />;
  if (servicesIsError) {
    return (
      <EmptyContent
        title="Error loading services"
        description={
          servicesError.response?.data?.message ||
          servicesError.message ||
          "Please try again later."
        }
        icon={<InfoIcon />}
        action={
          <Button variant="outline" asChild>
            <Link to="/">Go Back</Link>
          </Button>
        }
      />
    );
  }
  if (!services || services.services.length === 0) {
    return (
      <EmptyContent
        title="No services found"
        description="Please contact support for more information."
        icon={<InfoIcon />}
        action={
          <Button variant="outline" asChild>
            <Link to="/">Go Back</Link>
          </Button>
        }
      />
    );
  }

  // Check if the service is loading or has an error
  if (serviceLoading) return <Loader />;
  if (serviceIsError) {
    return (
      <EmptyContent
        title="Error loading service"
        description={
          serviceError.response?.data?.message ||
          serviceError.message ||
          "Please try again later."
        }
        icon={<InfoIcon />}
        action={
          <Button variant="outline" asChild>
            <Link to="/">Go Back</Link>
          </Button>
        }
      />
    );
  }
  if (!service) {
    return (
      <EmptyContent
        title="No service found"
        description="Please contact support for more information."
        icon={<InfoIcon />}
        action={
          <Button variant="outline" asChild>
            <Link to="/">Go Back</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="p-4 ">
      <BookForm
        onSubmit={onSubmit}
        services={services.services}
        service={service}
        isPending={false}
      />
    </div>
  );
};
