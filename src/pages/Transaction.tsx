import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { formatRupiah } from "../utils/formatter";
import { fetchTransactionHistory } from "../features/history/historyService";
import type { TransactionHistory } from "../types";

const Transaction = () => {
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadHistory = async (currentOffset = 0) => {
    try {
      setLoading(true);

      const response = await fetchTransactionHistory({
        offset: currentOffset,
        limit,
      });

      const newData = response.data?.records || [];

      if (currentOffset === 0) {
        setTransactions(newData);
      } else {
        setTransactions((prev) => [...prev, ...newData]);
      }

      if (newData.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeHistory = async () => {
      await loadHistory(0);
    };

    initializeHistory();
  }, []);

  const handleShowMore = () => {
    const nextOffset = offset + limit;

    setOffset(nextOffset);

    loadHistory(nextOffset);
  };

  return (
    <MainLayout activeMenu="transaction">
      <section className="mt-14">
        <h1 className="text-3xl font-bold">Semua Transaksi</h1>

        <div className="mt-8 space-y-4">
          {transactions.length === 0 && !loading ? (
            <div className="text-center text-gray-500 py-10">
              Tidak ada transaksi
            </div>
          ) : (
            transactions.map((item: TransactionHistory, index: number) => {
              const isTopUp = item.transaction_type === "TOPUP";

              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-5 flex items-start justify-between">
                  <div>
                    <h2
                      className={`text-2xl font-bold ${
                        isTopUp ? "text-green-500" : "text-red-500"
                      }`}>
                      {isTopUp ? "+" : "-"} {formatRupiah(item.total_amount)}
                    </h2>

                    <p className="text-sm text-gray-400 mt-2">
                      {new Date(item.created_on).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      WIB
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    {item.description}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {hasMore && transactions.length > 0 && (
          <div className="mt-10 text-center">
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="text-red-500 font-semibold hover:underline disabled:opacity-50">
              {loading ? "Loading..." : "Show more"}
            </button>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Transaction;
