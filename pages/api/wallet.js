export default function handler(req, res) {
  // Mock wallet data
  const wallet = {
    balance: 12.75,
    minWithdrawal: 5.0,
    currency: "EUR",
    transactions: [
      { id: 1, type: "cashback", amount: 5.0, status: "Confirmed", date: "2025-09-15" },
      { id: 2, type: "withdrawal", amount: -5.0, status: "Completed", date: "2025-09-20" },
      { id: 3, type: "cashback", amount: 7.75, status: "Pending", date: "2025-09-25" },
    ],
  };

  res.status(200).json(wallet);
}
