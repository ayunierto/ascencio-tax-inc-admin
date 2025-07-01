import { Loader as LoadingIcon } from 'lucide-react';
import { JSX } from 'react';

interface LoaderProps extends React.ComponentProps<'div'> {
  className?: string;
  showText?: boolean;
  text?: string;
  fullScreen?: boolean;
}

export const Loader = ({
  className = '',
  showText = false,
  text = 'Loading...',
  fullScreen = false,
}: LoaderProps): JSX.Element => {
  return (
    <div
      className={`flex items-center justify-center flex-grow
        ${fullScreen ? 'h-screen w-screen' : 'w-full'}
        ${className}`}
    >
      <LoadingIcon className="h-8 w-8 animate-spin text-blue-600" />
      {showText && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">{text}</span>
      )}
    </div>
  );
};
