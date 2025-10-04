export default function handler(req, res) {
  const transactions = [
    { id: 1, product: "Wireless Headphones", amount: 59.99, cashback: 5.0, status: "Confirmed", date: "2025-09-15" },
    { id: 2, product: "Gaming Mouse", amount: 39.99, cashback: 3.5, status: "Pending", date: "2025-09-20" },
    { id: 3, product: "Smartwatch", amount: 129.99, cashback: 10.0, status: "Completed", date: "2025-09-25" },
  ];

  res.status(200).json(transactions);
}
