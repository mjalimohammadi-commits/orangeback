export default function handler(req, res) {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "59.99",
      cashback: "5.00",
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: "39.99",
      cashback: "3.50",
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Smartwatch",
      price: "129.99",
      cashback: "10.00",
      image: "/product3.jpg",
    },
  ];

  res.status(200).json(products);
}
