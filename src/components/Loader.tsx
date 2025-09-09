import { Loader2 } from "lucide-react";

interface LoaderProps extends React.ComponentProps<"div"> {
  className?: string;
  showText?: boolean;
  text?: string;
  fullScreen?: boolean;
}
export const Loader = ({
  className,
  showText,
  text = "Loading...",
  fullScreen,
}: LoaderProps) => {
  return (
    <div
      className={`flex ${
        fullScreen ? "h-screen w-screen" : " w-full"
      } items-center justify-center flex-grow ${className}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      {showText && (
        <span className="ml-2 text-gray-600 dark:text-gray-400">{text}</span>
      )}
    </div>
  );
};
