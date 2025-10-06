// pages/api/products.js

export default function handler(req, res) {
  // ساخت مسیر درست برای تصاویر بر اساس محیط
  const host =
    req.headers.host || process.env.VERCEL_URL || "localhost:3000";
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  // ✅ داده‌ها
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "59.99",
      cashback: "5.00",
      image: `${baseUrl}/images/product1.jpg`,
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: "39.99",
      cashback: "3.50",
      image: `${baseUrl}/images/product2.jpg`,
    },
    {
      id: 3,
      name: "Smartwatch",
      price: "129.99",
      cashback: "10.00",
      image: `${baseUrl}/images/product3.jpg`,
    },
  ];

  res.status(200).json(products);
}
