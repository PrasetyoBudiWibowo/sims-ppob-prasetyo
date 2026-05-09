import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import toast from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import { formatRupiah } from "../utils/formatter";
import { transactionPayment } from "../features/transaction/transactionSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const service = location.state;
  const [transactionLoading, setTransactionLoading] = useState(false);

  if (!service) {
    navigate("/");
    return null;
  }

  const nominal = service.service_tariff;

  const handlePayment = async () => {
    try {
      setTransactionLoading(true);

      await dispatch(
        transactionPayment({
          service_code: service.service_code,
        }),
      ).unwrap();

      toast.success("Pembayaran berhasil");

      navigate("/");
    } catch (error: unknown) {
      if (typeof error === "string") {
        toast.error(error);
      } else {
        toast.error("Pembayaran gagal");
      }
    }
  };

  return (
    <MainLayout activeMenu="transaction">
      <section className="mt-16">
        <p className="text-gray-600 text-xl">Pembayaran</p>
        <div className="flex items-center gap-3 mt-4">
          <img
            src={service.service_icon}
            alt={service.service_name}
            className="w-10 h-10"
          />
          <h1 className="text-3xl font-bold">{service.service_name}</h1>
        </div>
        <div className="mt-10">
          <input
            type="text"
            value={formatRupiah(nominal)}
            readOnly
            className="w-full border border-gray-300 rounded-md px-5 py-4 text-lg outline-none"
          />
          <button
            onClick={handlePayment}
            disabled={transactionLoading}
            className="mt-5 w-full py-4 rounded-md bg-red-500 text-white font-semibold disabled:opacity-70">
            {transactionLoading ? "Memproses..." : "Bayar"}
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Payment;
