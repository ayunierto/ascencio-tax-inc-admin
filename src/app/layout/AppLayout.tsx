import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { AnimatedPage } from "@/components/AnimatedPage";

export const AppLayout = () => {
  return (
    <AnimatedPage>
      <div className="flex flex-col">
        <Header />
        <main className="p-2 md:p-6">
          <Outlet />
        </main>
      </div>
    </AnimatedPage>
  );
};
