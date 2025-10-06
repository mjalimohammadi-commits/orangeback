import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home({ products }) {
  return (
    <Layout title="OrangeBack | Amazon Cashback">
      <section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Shop on Amazon, Earn Cashback with OrangeBack
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Get up to <span className="font-bold">50% cashback</span> on your Amazon purchases.
        </p>
        <Link
          href="/signup"
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100"
        >
          Start Shopping
        </Link>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Products</h2>

        {!products?.length ? (
          <p className="text-gray-500 text-center">No products available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="w-full h-56 relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name || "Product"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <h3 className="text-lg font-semibold mt-4 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-2">€{product.price.toFixed(2)}</p>

                <span className="inline-block mt-2 px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
                  Cashback: €{product.cashback.toFixed(2)}
                </span>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 block bg-orange-600 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

// ✅ SSR - Fix for Unexpected token '<'
export async function getServerSideProps({ req }) {
  try {
    // 🔹 تعیین پروتکل و دامنه دقیق
    const protocol =
      req.headers["x-forwarded-proto"] ||
      (req.headers.host.includes("localhost") ? "http" : "https");

    const baseUrl = `${protocol}://${req.headers.host}`;

    const res = await fetch(`${baseUrl}/api/products`);

    if (!res.ok) {
      console.error("❌ Fetch failed:", res.status, res.statusText);
      throw new Error(`Failed: ${res.status}`);
    }

    const productsRaw = await res.json();

    const normalizeImagePath = (img) => {
      if (!img || typeof img !== "string" || img.trim() === "") return "/images/placeholder.png";
      if (img.startsWith("http")) return img;
      if (img.startsWith("/images")) return img;
      if (img.startsWith("/product")) return `/images${img}`;
      return `/images/${img}`;
    };

    const products = productsRaw.map((p) => ({
      id: p.id,
      name: p.name || "Unnamed Product",
      image: normalizeImagePath(p.image),
      price: parseFloat(p.price) || 0,
      cashback: parseFloat(p.cashback) || 0,
    }));

    return { props: { products } };
  } catch (err) {
    console.error("❌ Failed to fetch products:", err);
    return { props: { products: [] } };
  }
}
