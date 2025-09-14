import { Outlet } from "react-router";
import { Header } from "../components/Header";

export const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="p-2 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};
