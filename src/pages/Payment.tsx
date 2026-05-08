import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import { formatRupiah } from "../utils/formatter";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const service = location.state;
  const profile = useSelector((state: any) => state.profile.data);
  const balance = useSelector((state: any) => state.balance.balance);
  const [showBalance, setShowBalance] = useState(false);
  const nominal = 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="border-b border-gray-200">
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
              className="hover:text-red-500 transition">
              Top Up
            </button>

            <button className="text-red-500 font-semibold">Transaction</button>

            <button
              onClick={() => navigate("/profile")}
              className="hover:text-red-500 transition">
              Akun
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-center">
          <div>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {profile?.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/src/assets/Website_Assets/Profile Photo.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <p className="mt-4 text-gray-600 text-lg">Selamat datang,</p>

            <h2 className="text-4xl font-bold leading-tight">
              {profile
                ? `${profile.first_name} ${profile.last_name}`
                : "Nama Kandidat"}
            </h2>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[#F42619] text-white px-8 py-7 min-h-[190px]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-16 top-0 w-80 h-80 border border-white rounded-full"></div>

              <div className="absolute -right-2 top-8 w-64 h-64 border border-white rounded-full"></div>

              <div className="absolute right-16 top-16 w-48 h-48 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <p className="text-sm">Saldo anda</p>

              <h1 className="text-5xl font-bold mt-4 tracking-wide">
                {showBalance ? formatRupiah(balance) : "Rp •••••••"}
              </h1>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="mt-8 flex items-center gap-2 text-sm font-medium">
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}

                {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="mt-16">
          <p className="text-gray-600 text-xl">Pembayaran</p>

          <div className="flex items-center gap-3 mt-4">
            <img src={service.icon} alt={service.name} className="w-10 h-10" />

            <h1 className="text-3xl font-bold whitespace-pre-line">
              {service.name}
            </h1>
          </div>

          <div className="mt-10">
            <input
              type="text"
              value={formatRupiah(nominal)}
              readOnly
              className="w-full border border-gray-300 rounded-md px-5 py-4 text-lg outline-none"
            />

            <button className="mt-5 w-full py-4 rounded-md bg-red-500 text-white font-semibold">
              Bayar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Payment;
