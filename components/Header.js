import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.png"
          alt="OrangeBack Logo"
          width={40}
          height={40}
          priority
        />
        <span className="text-2xl font-bold text-orange-600">OrangeBack</span>
      </Link>
      <nav className="space-x-6 text-gray-700 font-medium">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
