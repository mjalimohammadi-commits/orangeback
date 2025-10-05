import Layout from "../../components/Layout";
import Image from "next/image";
import { useState } from "react";

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <Layout title="Product Not Found">
        <section className="py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-700">Product not found</h1>
        </section>
      </Layout>
    );
  }

  // ✅ حالت امن برای تصویر محصول (با fallback)
  const [imgSrc, setImgSrc] = useState(
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/placeholder.png"
  );

  const productPrice =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : parseFloat(product.price) || "—";

  const productCashback =
    typeof product.cashback === "number"
      ? product.cashback.toFixed(2)
      : parseFloat(product.cashback) || "0.00";

  return (
    <Layout title={`OrangeBack | ${product.name}`}>
      <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* ✅ Product Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-xl shadow-inner p-6 relative w-full h-[300px] md:h-[400px]">
          <Image
            src={imgSrc}
            alt={product.name || "Product image"}
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgSrc("/images/placeholder.png")}
          />
        </div>

        {/* ✅ Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name || "Unnamed Product"}
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            Price: €{productPrice !== "—" ? productPrice : "—"}
          </p>

          <p className="text-lg font-semibold text-orange-600 mb-6">
            Cashback: €{productCashback}
          </p>

          <button
            onClick={() => {
              window.open(
                product.amazonLink || "https://www.amazon.com",
                "_blank"
              );
            }}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-700 transition"
          >
            Shop with Cashback
          </button>

          <p className="mt-6 text-gray-500 text-sm">
            Cashback will be added to your account once your order is confirmed by Amazon.
          </p>
        </div>
      </section>
    </Layout>
  );
}

// ✅ SSR → دریافت دیتای محصول از API و اصلاح مسیر تصویر
export async function getServerSideProps({ params }) {
  try {
    const res = await fetch("http://localhost:3000/api/products");
    const productsRaw = await res.json();

    // تابع اصلاح مسیر تصویر برای جلوگیری از ارورهای 404 در Vercel
    const normalizeImagePath = (img) => {
      if (!img || typeof img !== "string" || img.trim() === "") {
        return "/images/placeholder.png";
      }

      if (img.startsWith("http")) return img;

      // اگر مسیر نسبی مثل "product1.jpg" بود → بفرست داخل /images/
      if (!img.startsWith("/")) return `/images/${img}`;

      // اگر از /images شروع میشه، خودش درسته
      if (img.startsWith("/images")) return img;

      // هر چیز دیگه → placeholder
      return "/images/placeholder.png";
    };

    const product = productsRaw.find((p) => p.id.toString() === params.id);

    // اگه محصول وجود نداشت
    if (!product) {
      return { props: { product: null } };
    }

    // اصلاح مسیر تصویر و داده‌ها
    const normalizedProduct = {
      ...product,
      image: normalizeImagePath(product.image),
      price:
        typeof product.price === "number"
          ? product.price
          : parseFloat(String(product.price).replace(/[^\d.-]+/g, "")) || null,
      cashback:
        typeof product.cashback === "number"
          ? product.cashback
          : parseFloat(String(product.cashback).replace(/[^\d.-]+/g, "")) || null,
    };

    return { props: { product: normalizedProduct } };
  } catch (err) {
    console.error("❌ Error loading product:", err);
    return { props: { product: null } };
  }
}
