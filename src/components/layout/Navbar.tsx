import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

interface NavbarProps {
  activeMenu?: "topup" | "transaction" | "profile" | "home";
}

const Navbar = ({ activeMenu }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            S
          </div>
          <h1 className="font-bold text-lg">SIMS PPOB</h1>
        </Link>

        <div className="flex items-center gap-10 text-sm font-medium">
          <button
            onClick={() => navigate("/top-up")}
            className={`transition ${
              activeMenu === "topup"
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}>
            Top Up
          </button>

          <button
            onClick={() => navigate("/transaction")}
            className={`transition ${
              activeMenu === "transaction"
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}>
            Transaction
          </button>

          <button
            onClick={() => navigate("/profile")}
            className={`transition ${
              activeMenu === "profile"
                ? "text-red-500 font-semibold"
                : "hover:text-red-500"
            }`}>
            Akun
          </button>

          <button className="hover:text-red-500 transition">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
