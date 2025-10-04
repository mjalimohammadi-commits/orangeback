import Layout from "../../components/Layout";
import Image from "next/image";

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

  return (
    <Layout title={`OrangeBack | ${product.name}`}>
      <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-2">Price: €{product.price}</p>
          <p className="text-lg font-semibold text-orange-600 mb-6">
            Cashback: €{product.cashback}
          </p>

          <button className="bg-orange-600 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-700">
            Shop with Cashback
          </button>

          <p className="mt-6 text-gray-500">
            Cashback will be added to your account once your order is confirmed by
            Amazon.
          </p>
        </div>
      </section>
    </Layout>
  );
}

// SSR → گرفتن دیتای محصول
export async function getServerSideProps({ params }) {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  const product = products.find((p) => p.id.toString() === params.id);

  return {
    props: { product: product || null },
  };
}
