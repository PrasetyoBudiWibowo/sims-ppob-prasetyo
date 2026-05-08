import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, LogOut } from "lucide-react";
import type { AppDispatch } from "../store";
import toast from "react-hot-toast";
import { logout } from "../features/auth/authSlice";
import { fetchProfile } from "../features/profile/profileSlice";
import { formatRupiah } from "../utils/formatter";
import { fetchBalance } from "../features/balance/balanceSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showBalance, setShowBalance] = useState(false);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const profile = useSelector((state: any) => state.profile.data);
  const profileLoading = useSelector((state: any) => state.profile.loading);
  const { balance, loading: balanceLoading } = useSelector(
    (state: any) => state.balance,
  );

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
      dispatch(fetchBalance());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout berhasil");
    navigate("/login");
  };

  const services = [
    {
      icon: "/src/assets/Website_Assets/PBB.png",
      name: "PBB",
    },
    {
      icon: "/src/assets/Website_Assets/Listrik.png",
      name: "Listrik",
    },
    {
      icon: "/src/assets/Website_Assets/Pulsa.png",
      name: "Pulsa",
    },
    {
      icon: "/src/assets/Website_Assets/PDAM.png",
      name: "PDAM",
    },
    {
      icon: "/src/assets/Website_Assets/PGN.png",
      name: "PGN",
    },
    {
      icon: "/src/assets/Website_Assets/Televisi.png",
      name: "TV\nLangganan",
    },
    {
      icon: "/src/assets/Website_Assets/Musik.png",
      name: "Musik",
    },
    {
      icon: "/src/assets/Website_Assets/Game.png",
      name: "Voucher\nGame",
    },
    {
      icon: "/src/assets/Website_Assets/Voucher Makanan.png",
      name: "Voucher\nMakanan",
    },
    {
      icon: "/src/assets/Website_Assets/Kurban.png",
      name: "Kurban",
    },
    {
      icon: "/src/assets/Website_Assets/Zakat.png",
      name: "Zakat",
    },
    {
      icon: "/src/assets/Website_Assets/Paket Data.png",
      name: "Paket\nData",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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

            <button
              onClick={() => navigate("/transaction")}
              className="hover:text-red-500 transition">
              Transaction
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="hover:text-red-500 transition">
              Akun
            </button>

            <button
              onClick={handleLogout}
              className="hover:text-red-500 transition">
              <LogOut size={18} />
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
              {profileLoading
                ? "Loading..."
                : profile
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
                {showBalance
                  ? balanceLoading
                    ? "Loading..."
                    : formatRupiah(balance)
                  : "Rp •••••••"}
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

        <section className="mt-14">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate("/payment", {
                    state: service,
                  })
                }
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={service.icon}
                    alt={service.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <p className="text-xs text-center text-gray-700 mt-2 whitespace-pre-line leading-tight">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="mt-16">
          <h3 className="font-semibold text-lg mb-5">Temukan promo menarik</h3>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="min-w-[270px] rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={`/src/assets/Website_Assets/Banner ${item}.png`}
                  alt={`Banner ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
