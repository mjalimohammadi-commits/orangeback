import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";

export default function TransactionsPage() {
  const transactions = [
    {
      id: 1,
      date: "2025-10-01",
      product: "Wireless Headphones",
      image: "/images/headphones.jpg",
      amount: 59.99,
      cashback: 5.0,
      status: "Approved",
    },
    {
      id: 2,
      date: "2025-10-03",
      product: "iPhone 15 Case",
      image: "", // خالی، تست placeholder
      amount: 24.5,
      cashback: 2.0,
      status: "Pending",
    },
  ];

  return (
    <Layout title="Transactions - OrangeBack">
      <ProtectedRoute>
        <div className="max-w-6xl mx-auto py-16 px-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Transactions</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cashback</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx) => {
                    // ✅ تصویر پیش‌فرض برای محصولات بدون عکس
                    const productImage =
                      tx.image && tx.image.trim() !== ""
                        ? tx.image
                        : "/images/placeholder.png";

                    return (
                      <tr key={tx.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          {tx.date}
                        </td>

                        {/* Product cell with image */}
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 relative flex-shrink-0">
                              <Image
                                src={productImage}
                                alt={tx.product}
                                fill
                                className="object-cover rounded-md border border-gray-200"
                                sizes="50px"
                                onError={(e) => {
                                  e.target.src = "/images/placeholder.png";
                                }}
                              />
                            </div>
                            <span className="font-medium text-gray-800">
                              {tx.product}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                          €{typeof tx.amount === "number" ? tx.amount.toFixed(2) : "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-green-600 font-semibold whitespace-nowrap">
                          €{typeof tx.cashback === "number" ? tx.cashback.toFixed(2) : "0.00"}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                            tx.status === "Pending"
                              ? "text-yellow-600"
                              : tx.status === "Approved"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.status}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
