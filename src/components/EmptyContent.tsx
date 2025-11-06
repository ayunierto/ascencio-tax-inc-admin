import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyContentProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyContent({
  icon,
  title,
  description,
  action,
  className,
}: EmptyContentProps) {
  return (
    <Card className={`text-center shadow-sm border border-dashed ${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
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
