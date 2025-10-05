// pages/api/products.js

export default function handler(req, res) {
  // مسیر پایه بر اساس محیط
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  // ✅ داده‌های محصولات با مسیر تصویر اصلاح‌شده
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
