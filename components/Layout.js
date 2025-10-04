import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Layout({ children, title = "OrangeBack" }) {
  const { data: session } = useSession();
  const [mockSession, setMockSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("mockSession");
    if (storedSession) {
      setMockSession(JSON.parse(storedSession));
    }
  }, []);

  const handleMockLogout = () => {
    localStorage.removeItem("mockSession");
    setMockSession(null);
    window.location.href = "/"; // برگشت به صفحه اصلی
  };

  const isLoggedIn = session || mockSession;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Earn cashback on your Amazon purchases with OrangeBack."
        />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="OrangeBack" />
        <meta property="og:type" content="website" />
      </Head>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <Link href="/" className="text-2xl font-bold text-orange-600">
          OrangeBack
        </Link>
        <nav className="space-x-6 text-gray-700 font-medium">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/wallet">Wallet</Link>
              <Link href="/transactions">Transactions</Link>
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 font-semibold"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleMockLogout}
                  className="text-red-600 font-semibold"
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      {/* Main */}
      <main className="min-h-screen bg-gray-50">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-10">
        <p>© {new Date().getFullYear()} OrangeBack. All rights reserved.</p>
      </footer>
    </>
  );
}
