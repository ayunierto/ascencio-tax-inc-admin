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

// Props para el componente genérico de creación y actualización
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  entityName: string;
  isEditMode: boolean;
  children: ReactNode; // El formulario genérico se pasará como hijo
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

  // Función para manejar el cambio de estado del modal/drawer
  const handleOpenChange = (openState: boolean) => {
    if (!openState) {
      onClose(); // Llama a onClose cuando se cierra
    }
    setOpen(openState);
  };

  // Capitaliza el nombre de la entidad para mostrarlo en la UI
  const capitalizedEntity =
    entityName.charAt(0).toUpperCase() + entityName.slice(1);
  const title = isEditMode ? `Edit ${entityName}` : `Add ${entityName}`;
  const description = isEditMode
    ? `Update a ${entityName} here. Click save when you're done.`
    : `Create a new ${entityName} here. Click save when you're done.`;

  // Renderiza un Drawer en dispositivos móviles
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
          <div className="px-4">{children}</div> {/* Renderiza el formulario */}
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Renderiza un Dialog en dispositivos de escritorio
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
        {children} {/* Renderiza el formulario */}
      </DialogContent>
    </Dialog>
  );
};
