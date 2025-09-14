import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyContentProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyContent({
  icon,
  title,
  description,
  action,
}: EmptyContentProps) {
  return (
    <Card className="text-center shadow-sm border border-dashed max-w-xl mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="text-muted-foreground">{icon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {action && action}
      </CardContent>
    </Card>
  );
}
