import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address ❌");
      return;
    }

    setLoading(true);

    const newUser = { name, email, password };
    localStorage.setItem("mockUser", JSON.stringify(newUser));
    localStorage.setItem("mockSession", JSON.stringify(newUser)); // ✅ مستقیم لاگین کنیم

    setLoading(false);
    toast.success("Account created successfully 🎉");

    // Redirect مستقیم به داشبورد
    window.location.href = "/dashboard";
  };

  return (
    <>
      <Head>
        <title>Signup | OrangeBack</title>
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          OrangeBack
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      {/* Signup Form */}
      <main className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold shadow ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} OrangeBack. All rights reserved.</p>
      </footer>
    </>
  );
}
