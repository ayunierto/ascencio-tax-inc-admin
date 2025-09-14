import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/interfaces/service.interface";

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <>
      <Card className="p-2 sm:p-4 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 overflow-hidden relative">
        <CardHeader className="flex flex-row items-center gap-2 justify-between px-0 sm:gap-4">
          <img
            src="https://static.wixstatic.com/media/21276e9bb2a04809a76f2a7bfe161219.jpg/v1/fill/w_239,h_154,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/21276e9bb2a04809a76f2a7bfe161219.jpg"
            alt="Service Image"
            className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md "
          />

          <div className="flex flex-col gap-2 w-full">
            <CardTitle>{service.name}</CardTitle>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-green-500 text-white">
                <Video />
              </Badge>
              <CardDescription className="truncate w-40">
                {service.duration}
              </CardDescription>
            </div>
          </div>

          <Button
            variant="default"
            size={"sm"}
            className="sm:absolute sm:bottom-4 sm:right-4"
          >
            BOOK
          </Button>
        </CardHeader>
        {/* <CardContent className="hidden sm:block">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className="hidden">
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
      {/* <div className="hover:scale-[1.01] transition-all duration-300 hover:shadow-lg group border rounded-2xl overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Button
            variant="default"
            size={"sm"}
            className="group sm:hidden group-hover:block absolute bottom-2 right-2 z-10"
          >
            BOOK NOW
          </Button>
          <img
            src={
              "https://static.wixstatic.com/media/21276e9bb2a04809a76f2a7bfe161219.jpg/v1/fill/w_239,h_154,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/21276e9bb2a04809a76f2a7bfe161219.jpg"
            }
            alt={"image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col p-4 gap-3">
          <div>
            <div className="text-lg font-semibold text-primary">
              In-person Tax Filing (Walk-in)
            </div>
          </div>

          <div className="flex gap-2 flex-row items-center justify-between">
            <span className="text-sm text-muted-foreground">Duration: 1h</span>
            <div>
              <Badge variant="outline" className="bg-green-500 text-white">
                <Video />
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
