import { Jumbotron } from "./Jumbotron";
import { Navbar } from "./NavBar";

export const Header = () => {
  return (
    <div className="bg-blue-950">
      <Navbar />
      <Jumbotron />
    </div>
  );
};
