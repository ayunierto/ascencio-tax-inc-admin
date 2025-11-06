import { Loader2 } from 'lucide-react';

interface LoaderProps extends React.ComponentProps<'div'> {
  className?: string;
  /** @deprecated Use 'text' prop instead. If text is provided, it will be shown. */
  showText?: boolean;
  text?: string;
  fullScreen?: boolean;
}
export const Loader = ({ className, text, fullScreen }: LoaderProps) => {
  return (
    <div
      className={`flex ${
        fullScreen ? 'h-screen w-screen' : ' w-full'
      } items-center justify-center flex-grow ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      {text && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">{text}</span>
      )}
    </div>
  );
};
