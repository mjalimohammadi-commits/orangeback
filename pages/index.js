// pages/index.js
import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

function toNumber(value) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.-]+/g, "");
    const n = parseFloat(cleaned);
    return isFinite(n) ? n : null;
  }
  return null;
}

export default function Home({ products }) {
  return (
    <Layout title="OrangeBack | Amazon Cashback">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Shop on Amazon, Earn Cashback with OrangeBack
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Get up to <span className="font-bold">50% cashback</span> on your
          Amazon purchases. Sign up today and start saving.
        </p>
        <Link
          href="/signup"
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100"
        >
          Start Shopping
        </Link>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Products</h2>

        {(!products || products.length === 0) ? (
          <p className="text-gray-500 text-center">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const priceNum = toNumber(product.price);
              const cashbackNum = toNumber(product.cashback);

              return (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <div className="w-full h-56 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name || "Product image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-lg font-semibold mt-4 line-clamp-2">
                    {product.name || "Unnamed Product"}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    €{priceNum !== null ? priceNum.toFixed(2) : "—"}
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
                    Cashback: €{cashbackNum !== null ? cashbackNum.toFixed(2) : "0.00"}
                  </span>

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 block bg-orange-600 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                  >
                    View Product
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
}

// ✅ SSR → گرفتن دیتا از API (سازگار با Vercel و لوکال)
export async function getServerSideProps() {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/products`);
    const productsRaw = await res.json();

    // مسیر تصویر را اصلاح می‌کند تا در Vercel درست کار کند
    const normalizeImagePath = (img) => {
      if (!img || typeof img !== "string" || img.trim() === "") {
        return "/images/placeholder.png";
      }
      if (img.startsWith("http")) return img;
      if (img.startsWith("/product")) return `/images${img}`; // 👈 مهم
      if (img.startsWith("/images")) return img;
      return "/images/placeholder.png";
    };

    const products = Array.isArray(productsRaw)
      ? productsRaw.map((p) => ({
          id: p.id,
          name: p.name || "Unnamed Product",
          image: normalizeImagePath(p.image),
          price:
            typeof p.price === "number"
              ? p.price
              : parseFloat(String(p.price).replace(/[^\d.-]+/g, "")) || null,
          cashback:
            typeof p.cashback === "number"
              ? p.cashback
              : parseFloat(String(p.cashback).replace(/[^\d.-]+/g, "")) || null,
        }))
      : [];

    return { props: { products } };
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return { props: { products: [] } };
  }
}
