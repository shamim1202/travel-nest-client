"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: "Rooms", href: "/rooms" },
    { label: "My Bookings", href: "/my_bookings" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    setMounted(true);

    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen to custom event from login/register pages
    const handleUserUpdate = (e) => {
      setUser(e.detail || null);
    };
    window.addEventListener("userUpdated", handleUserUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
    };
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Logged out successfully",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    router.push("/");
  };

  return (
    <nav className="bg-green-100 shadow-sm px-4 md:px-8 relative">
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between md:hidden py-3">
        {/* Hamburger */}
        <button
          className="btn btn-ghost p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="mx-auto flex items-center gap-2">
          <Image src="/TravelNestLogo.png" width={40} height={40} alt="Logo" />
        </Link>

        {/* Auth Buttons / User */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photo || "/default-user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48"
              >
                <li className="m-4">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
                <li>
                  <Link href="/add-hotel" className="px-4 py-1">
                    Add Hotel
                  </Link>
                </li>
                <li>
                  <Link href="/manage-booking" className="px-4 py-1">
                    Manage Booking
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="btn btn-xs btn-outline btn-secondary rounded-none"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-xs btn-primary rounded-none"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-48 bg-white/70 shadow-lg z-50 p-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-1 rounded-none text-sm hover:bg-green-200 ${
                    pathname === item.href ? "bg-green-300" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/TravelNestLogo.png" width={40} height={40} alt="Logo" />
          <span className="text-xl font-bold">TravelNest</span>
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 rounded hover:bg-green-200 ${
                  pathname === item.href ? "bg-green-300 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth / User */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-16 rounded-full">
                  <img
                    src={user.photo || "/default-user.png"}
                    alt="User"
                    className="w-14 h-14 rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="px-4 py-2">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
                <div className="space-y-2">
                  <li>
                    <Link href="/add-hotel" className="px-4 py-1">
                      Add Hotel
                    </Link>
                  </li>
                  <li>
                    <Link href="/manage-booking" className="px-4 py-1">
                      Manage Booking
                    </Link>
                  </li>
                </div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-left btn btn-error btn-sm w-full text-sm text-white my-1"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-outline btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
