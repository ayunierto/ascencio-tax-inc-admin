import { Link } from "react-router";
import EmptyContent from "@/components/EmptyContent";
import { Loader } from "@/components/Loader";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useServices } from "@/hooks/useServices";
import {
  BadgeCheckIcon,
  Edit,
  InfoIcon,
  PlusCircle,
  Video,
  VideoOff,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AdminHeader } from "@/admin/components/AdminHeader";

export const AdminServicesPage = () => {
  const { data, isLoading, isError, error } = useServices();

  if (isLoading) {
    return <Loader showText text="Loading services..." />;
  }

  if (isError) {
    return (
      <Alert variant={"destructive"}>
        {error.response?.data.message || error.message || "Unknown error"}
      </Alert>
    );
  }

  if (!data) {
    return (
      <EmptyContent
        title="No services found"
        description="Please add a service."
      />
    );
  }

  return (
    <>
      <AdminHeader
        title="Services"
        actions={
          <Button asChild>
            <Link to="/admin/services/new">
              <PlusCircle /> Add Service
            </Link>
          </Button>
        }
      />

      <div className="p-4">
        {data.services.length === 0 ? (
          <EmptyContent
            icon={<InfoIcon size={48} />}
            title="No services found"
            description="Please add a service."
          />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Online</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <img
                        src="https://placehold.co/100x100"
                        alt="service"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/admin/services/${service.id}`}>
                        {service.name}
                      </Link>
                    </TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell className="">
                      {service.isAvailableOnline ? (
                        <Video size={16} />
                      ) : (
                        <VideoOff size={16} />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {service.isActive ? (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500 text-white x dark:bg-blue-600"
                        >
                          <BadgeCheckIcon />
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-gray-500 dark:text-gray-400"
                        >
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/admin/services/${service.id}`}
                        className="flex justify-center"
                      >
                        <Edit size={16} className=" hover:text-primary" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default AdminServicesPage;
