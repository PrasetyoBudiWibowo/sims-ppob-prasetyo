import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { fetchProfile } from "../features/profile/profileSlice";
import { LogOut, Eye } from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const profile = useSelector((state: any) => state.profile.data);
  const profileLoading = useSelector((state: any) => state.profile.loading);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, dispatch]);

  // Redirect jika belum login
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
    { icon: "/src/assets/Website_Assets/PBB.png", name: "PBB" },
    { icon: "/src/assets/Website_Assets/Listrik.png", name: "Listrik" },
    { icon: "/src/assets/Website_Assets/Pulsa.png", name: "Pulsa" },
    { icon: "/src/assets/Website_Assets/PDAM.png", name: "PDAM" },
    { icon: "/src/assets/Website_Assets/PGN.png", name: "PGN" },
    {
      icon: "/src/assets/Website_Assets/TV Langganan.png",
      name: "TV Langganan",
    },
    { icon: "/src/assets/Website_Assets/Musik.png", name: "Musik" },
    {
      icon: "/src/assets/Website_Assets/Voucher Game.png",
      name: "Voucher Game",
    },
    {
      icon: "/src/assets/Website_Assets/Voucher Makanan.png",
      name: "Voucher Makanan",
    },
    { icon: "/src/assets/Website_Assets/Kurban.png", name: "Kurban" },
    { icon: "/src/assets/Website_Assets/Zakat.png", name: "Zakat" },
    { icon: "/src/assets/Website_Assets/Paket Data.png", name: "Paket Data" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
            <h1 className="font-bold text-2xl">SIMS PPOB</h1>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => navigate("/top-up")}
              className="hover:text-red-500">
              Top Up
            </button>
            <button
              onClick={() => navigate("/transaction")}
              className="hover:text-red-500">
              Transaction
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="hover:text-red-500">
              Akun
            </button>
            <button onClick={handleLogout}>
              <LogOut size={24} className="text-gray-700 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Profile + Saldo */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-5xl shadow overflow-hidden">
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
            <div>
              <p className="text-gray-600 text-sm">Selamat datang,</p>
              <p className="font-semibold text-2xl">
                {profileLoading
                  ? "Loading..."
                  : profile
                    ? `${profile.first_name} ${profile.last_name}`
                    : "Nama Kandidat"}
              </p>
            </div>
          </div>

          {/* Saldo Card */}
          <div className="flex-1">
            <div className="bg-red-500 text-white rounded-3xl p-6 relative overflow-hidden h-full min-h-[140px]">
              <p className="text-sm opacity-90">Saldo anda</p>
              <p className="text-4xl font-bold mt-3">Rp ••••••••</p>

              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-sm font-medium cursor-pointer hover:underline">
                Lihat Saldo
                <Eye size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-14">
          <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="w-12 h-12 object-contain"
                />
                <p className="text-xs text-center text-gray-700 mt-3 font-medium">
                  {service.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Promo */}
        <div className="mt-14">
          <h3 className="font-semibold text-lg mb-6">Temukan promo menarik</h3>
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="min-w-[280px] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl transition">
                <img
                  src={`/src/assets/Website_Assets/Banner ${i}.png`}
                  alt={`Banner ${i}`}
                  className="w-full h-44 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
