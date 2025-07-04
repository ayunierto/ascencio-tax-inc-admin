type LoadingErrorProps = {
  name: string;
  message?: string;
};

export const LoadingError = ({
  name,
  message = 'An unexpected error occurred. Please try again later.',
}: LoadingErrorProps) => {
  return (
    <div className="w-screen h-screen items-center justify-center flex-grow">
      Error loading {name}: {message}
    </div>
  );
};
