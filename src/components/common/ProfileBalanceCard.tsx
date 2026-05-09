import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import { formatRupiah } from "../../utils/formatter";

const ProfileBalanceCard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const profile = useSelector((state: any) => state.profile.data);
  const profileLoading = useSelector((state: any) => state.profile.loading);
  const { balance, loading } = useSelector((state: any) => state.balance);

  return (
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
              ? loading
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
  );
};

export default ProfileBalanceCard;
