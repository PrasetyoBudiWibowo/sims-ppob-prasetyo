import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import {
  formatRupiah,
  parseRupiah,
  formatInputRupiah,
} from "../utils/formatter";
import {
  topUpStart,
  topUpSuccess,
  topUpFailure,
} from "../features/topup/topupSlice";
import { topUpBalance } from "../features/topup/topupService";

const TopUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile.data);
  const balance = useSelector((state: any) => state.balance.balance);
  const [nominal, setNominal] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const quickAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

  const handleQuickSelect = (amount: number) => {
    setNominal(amount.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const num = parseInt(nominal);

    if (!num || num < 10000) {
      toast.error("Minimal top up Rp10.000");
      return;
    }

    if (num > 1000000) {
      toast.error("Maksimal top up Rp1.000.000");
      return;
    }

    try {
      setLoading(true);

      dispatch(topUpStart());

      const result = await topUpBalance({
        top_up_amount: num,
      });

      if (result.status === 0) {
        dispatch(topUpSuccess());

        toast.success(`Top up ${formatRupiah(num)} berhasil`);

        setNominal("");
      } else {
        dispatch(topUpFailure(result.message));

        toast.error(result.message);
      }
    } catch {
      dispatch(topUpFailure("Top up gagal"));

      toast.error("Top up gagal");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !nominal || parseInt(nominal) < 10000;

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
              className="text-red-500 font-semibold transition">
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
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-10 items-center">
          <div>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {profile?.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  👤
                </div>
              )}
            </div>

            <p className="mt-4 text-gray-600 text-lg">Selamat datang,</p>

            <h2 className="text-4xl font-bold leading-tight">
              {profile
                ? `${profile.first_name} ${profile.last_name}`
                : "Nama Kandidat"}
            </h2>
          </div>

          <div className="relative w-full overflow-hidden rounded-2xl bg-red-500 text-white px-8 py-7 min-h-[200px]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-16 top-0 w-80 h-80 border border-white rounded-full"></div>

              <div className="absolute -right-2 top-8 w-64 h-64 border border-white rounded-full"></div>

              <div className="absolute right-16 top-16 w-48 h-48 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <p className="text-sm">Saldo anda</p>

              <h1 className="text-5xl font-bold mt-3">
                {showBalance ? formatRupiah(balance || 0) : "Rp •••••••"}
              </h1>

              <button
                onClick={() => setShowBalance(!showBalance)}
                className="mt-8 flex items-center gap-2 text-sm font-medium">
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}

                <Eye size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Top Up */}
        <section className="mt-14">
          <p className="text-gray-600 text-xl">Silahkan masukan</p>

          <h1 className="text-4xl font-bold mt-1">Nominal Top Up</h1>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
              <div>
                <input
                  type="text"
                  value={nominal ? `Rp ${formatInputRupiah(nominal)}` : ""}
                  onChange={(e) => {
                    const rawValue = parseRupiah(
                      e.target.value.replace("Rp ", ""),
                    );

                    setNominal(rawValue);
                  }}
                  placeholder="masukan nominal Top Up"
                  className="w-full border border-gray-300 rounded-md px-5 py-4 text-lg outline-none focus:border-red-500"
                  inputMode="numeric"
                />

                <button
                  type="submit"
                  disabled={isDisabled || loading}
                  className="mt-5 w-full py-4 rounded-md bg-gray-300 text-white font-semibold disabled:cursor-not-allowed enabled:bg-red-500 transition">
                  {loading ? "Memproses..." : "Top Up"}
                </button>
              </div>

              {/* Quick Amount */}
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleQuickSelect(amount)}
                    className={`border rounded-md py-4 text-sm font-medium transition ${
                      parseInt(nominal) === amount
                        ? "bg-red-500 text-white border-red-500"
                        : "border-gray-300 hover:border-red-400"
                    }`}>
                    {formatRupiah(amount)}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default TopUp;
