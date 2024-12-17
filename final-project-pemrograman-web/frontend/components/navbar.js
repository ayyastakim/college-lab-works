"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter(); // Hook untuk navigasi

  useEffect(() => {
    // Periksa token autentikasi saat halaman dimuat
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Jika token ada, setIsLoggedIn true
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Menghapus token dari localStorage
    localStorage.removeItem("user"); // Menghapus data user dari localStorage
    setIsLoggedIn(false); // Update state isLoggedIn

    // Arahkan pengguna ke halaman login
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <Link href="/" className="px-4 py-2 hover:bg-blue-700 rounded">
          <h1 className="text-xl font-bold">Notes</h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link href="/add" className="px-4 py-2 hover:bg-blue-700 rounded">
            Add Notes
          </Link>

          <Link href="/my-notes" className="px-4 py-2 hover:bg-blue-700 rounded">
            My-Notes
          </Link>


          {/* Show Login if not logged in, Logout if logged in */}
          {!isLoggedIn ? (
            <Link href="/auth/login" className="px-4 py-2 hover:bg-blue-700 rounded">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-blue-700 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;