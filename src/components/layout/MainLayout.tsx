import type { ReactNode } from "react";
import Navbar from "./Navbar";
import ProfileBalanceCard from "../common/ProfileBalanceCard";

interface MainLayoutProps {
  children: ReactNode;
  activeMenu?: "topup" | "transaction" | "profile" | "home";
}

const MainLayout = ({ children, activeMenu }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar activeMenu={activeMenu} />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <ProfileBalanceCard />

        {children}
      </main>
    </div>
  );
};

export default MainLayout;
