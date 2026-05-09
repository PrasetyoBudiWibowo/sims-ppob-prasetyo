import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
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
  const [nominal, setNominal] = useState("");
  const [loading, setLoading] = useState(false);

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
        navigate("/");
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
    <MainLayout activeMenu="topup">
      <section className="mt-14">
        <p className="text-gray-600 text-xl">Silahkan masukan</p>

        <h1 className="text-4xl font-bold mt-1">Nominal Top Up</h1>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
            {/* Input */}
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
    </MainLayout>
  );
};

export default TopUp;
