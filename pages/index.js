import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-gray-500 mt-2">€{product.price}</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-full">
                Cashback: €{product.cashback}
              </span>
              <Link
                href={`/product/${product.id}`}
                className="mt-4 block bg-orange-600 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

// SSR → گرفتن دیتا از API
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return {
    props: { products },
  };
}
