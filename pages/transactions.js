import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // ✅ شبیه‌سازی داده‌ها (mock)
    const timer = setTimeout(() => {
      setTransactions([
        {
          id: 1,
          date: "2025-09-25",
          product: "Amazon Echo Dot",
          amount: 59.99,
          cashback: 3.0,
          status: "Confirmed",
        },
        {
          id: 2,
          date: "2025-09-20",
          product: "Logitech Mouse",
          amount: 29.99,
          cashback: 1.5,
          status: "Pending",
        },
      ]);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Transactions - OrangeBack">
      <ProtectedRoute>
        <div className="py-16 px-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Transactions
          </h1>

          {transactions.length === 0 ? (
            <p className="text-gray-600 animate-pulse">Loading transactions...</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow rounded-xl">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Cashback</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{t.date}</td>
                      <td className="px-4 py-3">{t.product}</td>
                      <td className="px-4 py-3">€{t.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-green-600">
                        +€{t.cashback.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            t.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : t.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
