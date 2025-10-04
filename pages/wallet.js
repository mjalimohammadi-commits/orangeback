import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    // ✅ شبیه‌سازی درخواست API برای تست
    const timer = setTimeout(() => {
      setWallet({
        balance: 120.5,
        minWithdrawal: 10, // حداقل برداشت = 10 یورو
        transactions: [
          { id: 1, type: "cashback", amount: 20, status: "confirmed" },
          { id: 2, type: "withdrawal", amount: -50, status: "pending" },
        ],
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!wallet) return;

    const amount = parseFloat(withdrawAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount 💶");
      return;
    }

    if (amount < 10) {
      toast.error("Minimum withdrawal amount is €10 🚫");
      return;
    }

    if (amount > wallet.balance) {
      toast.error("Insufficient balance ❌");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Withdrawal request submitted ✅");

      // آپدیت موقت داده‌ها
      setWallet((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        transactions: [
          ...prev.transactions,
          {
            id: prev.transactions.length + 1,
            type: "withdrawal",
            amount: -amount,
            status: "pending",
          },
        ],
      }));
      setWithdrawAmount("");
    }, 1200);
  };

  if (!wallet) {
    return (
      <Layout title="Wallet - OrangeBack">
        <ProtectedRoute>
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600 animate-pulse">Loading wallet...</p>
          </div>
        </ProtectedRoute>
      </Layout>
    );
  }

  return (
    <Layout title="Wallet - OrangeBack">
      <ProtectedRoute>
        <div className="flex flex-col items-center py-16 px-6">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
            <h1 className="text-2xl font-bold text-gray-800">My Wallet</h1>
            <p className="mt-4 text-gray-600">
              Check your cashback balance and manage withdrawals.
            </p>

            {/* Balance */}
            <div className="mt-8 bg-gray-50 rounded-xl p-6 shadow-inner">
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-4xl font-bold text-orange-600 mt-2">
                €{wallet.balance.toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Minimum withdrawal: €10.00
              </p>
            </div>

            {/* Withdraw Form */}
            <form onSubmit={handleWithdraw} className="mt-8 text-left">
              <label className="block text-sm text-gray-600 mb-2">
                Enter withdrawal amount (€)
              </label>
              <input
                type="number"
                min="10"
                step="0.01"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="e.g. 25.00"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 w-full py-3 rounded-xl font-semibold shadow transition ${
                  !loading
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Processing..." : "Request Withdrawal"}
              </button>
            </form>

            {/* Transactions */}
            <div className="mt-10 text-left">
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Transactions
              </h2>
              <ul className="space-y-3">
                {wallet.transactions.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center border rounded-lg p-3 bg-gray-50"
                  >
                    <span className="capitalize">{t.type}</span>
                    <span
                      className={`${
                        t.amount > 0 ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      {t.amount > 0 ? "+" : ""}
                      {t.amount} €
                    </span>
                    <span className="text-sm text-gray-500">{t.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
