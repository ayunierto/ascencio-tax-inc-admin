import { Link } from "react-router";
import { Button } from "./components/ui/button";

export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-center">404</h1>
        <p className="text-center text-gray-600">Oops! Page not found</p>
        <Button variant={"outline"} asChild className="mt-6">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};
