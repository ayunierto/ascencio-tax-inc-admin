import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ServiceResponse } from "@/admin/pages/services/interfaces/service.response";

interface ServiceCardProps {
  service: ServiceResponse;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="p-2 sm:p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 overflow-hidden relative border-0 bg-transparent shadow-none sm:border sm:bg-card">
      <CardHeader className="flex flex-row items-center gap-2 justify-between px-0 sm:gap-4">
        <img
          src="https://placehold.co/400x400"
          alt="Service Image"
          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md "
        />

        <div className="flex flex-col gap-2 w-full">
          <CardTitle>{service.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={`${
                service.isAvailableOnline ? "bg-green-500" : "bg-destructive"
              } text-white`}
            >
              <Video />
            </Badge>
            <CardDescription>{service.duration} min</CardDescription>
          </div>
        </div>

        <Button
          variant="default"
          size={"sm"}
          className="sm:absolute sm:bottom-4 sm:right-4"
          asChild
        >
          BOOK
        </Button>
      </CardHeader>
    </Card>
  );
};
