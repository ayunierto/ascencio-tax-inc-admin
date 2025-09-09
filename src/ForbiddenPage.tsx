import { Lock } from "lucide-react";
import { Button } from "./components/ui/button";
import { Link } from "react-router";

export const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Lock className="mx-auto mb-4 h-16 w-16 text-gray-400" />
      <h1 className="text-3xl font-bold mb-2 text-center">403 Forbidden</h1>
      <p className="text-center text-gray-600">
        You do not have permission to access this page.
      </p>
      <Button variant={"outline"} asChild className="mt-6">
        <Link to="/">Go to Home</Link>
      </Button>
    </div>
  );
};
