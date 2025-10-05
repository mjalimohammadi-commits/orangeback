import { signIn } from "next-auth/react";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <Layout title="Login | OrangeBack">
      <section className="flex flex-col items-center justify-center py-16">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <form
          onSubmit={handleLogin}
          className="bg-white shadow rounded-xl p-6 w-full max-w-sm"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button className="bg-orange-600 text-white w-full py-2 rounded-xl hover:bg-orange-700">
            Login
          </button>
        </form>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-4 bg-red-500 text-white w-full max-w-sm py-2 rounded-xl hover:bg-red-600"
        >
          Continue with Google
        </button>
      </section>
    </Layout>
  );
}
