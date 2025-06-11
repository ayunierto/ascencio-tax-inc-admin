import { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ServiceForm } from '../../services/components/ServiceForm';
import { useIsMobile } from '@/hooks/use-mobile';

export const CreateAndUpdateService = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div className="flex justify-end">
      {!isMobile ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">New Service</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] md:max-w-2xl max-h-3/4 overflow-y-scroll custom-scrollbar">
            <DialogHeader>
              <DialogTitle>New Service</DialogTitle>
              <DialogDescription>
                This action creates a service
              </DialogDescription>
            </DialogHeader>
            <ServiceForm />
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">New Service</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>New Service</DrawerTitle>
              <DrawerDescription>
                This action creates a service
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 overflow-y-scroll">
              <ServiceForm />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
