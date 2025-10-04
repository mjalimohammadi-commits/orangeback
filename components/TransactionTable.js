export default function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto mt-6">
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
              <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{tx.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{tx.product}</td>
                <td className="px-6 py-4 text-sm text-gray-700">€{tx.amount}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                  €{tx.cashback}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
