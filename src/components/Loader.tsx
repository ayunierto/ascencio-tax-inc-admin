import { Loader as Loading } from 'lucide-react';

interface LoaderProps extends React.ComponentProps<'div'> {
  className?: string;
  showText?: boolean;
  text?: string;
}
export const Loader = ({ className, showText, text }: LoaderProps) => {
  return (
    <div
      className={`flex h-screen w-screen items-center justify-center ${className}`}
    >
      <Loading className="h-8 w-8 animate-spin text-blue-600" />
      {showText && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          {text || 'Loading...'}
        </span>
      )}
    </div>
  );
};
