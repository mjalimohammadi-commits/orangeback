import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mockSession, setMockSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // بررسی session واقعی
    if (status === "loading") return;

    // اگر next-auth session نیست → mockSession چک کن
    const storedSession = localStorage.getItem("mockSession");
    if (storedSession) {
      setMockSession(JSON.parse(storedSession));
      setLoading(false);
    } else if (!session) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
