import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin, X } from "lucide-react";

export const BookingCard = () => {
  return (
    <Card className="w-full hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      <CardHeader>
        <CardTitle>
          Card TitleCard TitleCard TitleCard TitleCard Title
        </CardTitle>
        <CardDescription>2023-10-01 09:00 a.m.</CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={"sm"}
                variant={"outline"}
                className="absolute top-1 right-1 hover:bg-destructive/20 hover:text-destructive"
              >
                <X />
              </Button>
              {/* <Button variant="outline">Hover</Button> */}
            </TooltipTrigger>
            <TooltipContent className="bg-destructive">
              <p>Cancel Booking </p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <MapPin />
        <p> 123 Main St, Anytown, USA</p>
      </CardContent>
    </Card>
  );
};
