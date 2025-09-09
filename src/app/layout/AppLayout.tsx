import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <Outlet />
    </div>
  );
};
