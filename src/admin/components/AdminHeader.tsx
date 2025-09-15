import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LucideProps } from "lucide-react";

interface HeaderProps {
  backButton?: { icon: React.ComponentType<LucideProps>; onClick: () => void };
  title: string;
  actions?: React.ReactNode | React.ReactNode[];
}

export const AdminHeader = ({ actions, title, backButton }: HeaderProps) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {backButton && (
          <Button
            variant={"ghost"}
            onClick={backButton.onClick}
            className="mr-1"
            size={"sm"}
          >
            <backButton.icon size={20} />
          </Button>
        )}
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {actions && actions}
        </div>
      </div>
    </header>
  );
};
