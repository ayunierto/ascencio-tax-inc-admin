import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { capitalizeFirstWord } from '@/utils';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  entityName: string;
  isEditMode: boolean;
  children: ReactNode;
}

export const GenericCreateAndUpdate = ({
  open,
  setOpen,
  onClose,
  entityName,
  isEditMode,
  children,
}: Props) => {
  const isMobile = useIsMobile();

  // Function to handle the change of state of the modal/drawer
  const handleOpenChange = (openState: boolean) => {
    if (!openState) {
      onClose(); // Call Onclose when it closes
    }
    setOpen(openState);
  };

  // Capitalizes the entity's name to show it in the UI
  const capitalizedEntity = capitalizeFirstWord(entityName);
  const title = isEditMode ? `Edit ${entityName}` : `Add ${entityName}`;
  const description = isEditMode
    ? `Update a ${entityName} here. Click save when you're done.`
    : `Create a new ${entityName} here. Click save when you're done.`;

  // Render a draw on mobile devices
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="outline">Add {capitalizedEntity}</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{children}</div> {/* Render the form */}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Render a dialog on desktop devices
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Add {capitalizedEntity}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children} {/* Render the form */}
      </DialogContent>
    </Dialog>
  );
};
