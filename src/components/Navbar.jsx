"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Dummy user session
const user = null; // Replace with actual session logic

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Hotels", href: "/hotels" },
    { label: "Rooms", href: "/rooms" },
    { label: "My Bookings", href: "/my_bookings" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="navbar bg-green-100 shadow-sm px-4">
      {/* Logo + Hamburger */}
      <div className="navbar-start flex items-center gap-2">
        <Link href="/" className="hidden md:flex items-center gap-2">
          <Image
            src="/TravelNestLogo.png"
            width={40}
            height={40}
            alt="Travel Nest Logo"
          />
          <span className="text-lg md:text-xl font-bold md:font-extrabold">
            TravelNest
          </span>
        </Link>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden btn btn-ghost ml-2 p-2"
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
      </div>

      {/* Centered Nav Links (Large Screens) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-3 py-2 hover:bg-secondary hover:text-white ${
                  pathname === item.href
                    ? "bg-primary text-white font-semibold"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Auth */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={user.image || "/default-user.png"}
                  width={40}
                  height={40}
                  alt="User"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="btn btn-outline btn-secondary btn-xs md:btn-sm lg:btn-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn btn-primary hover:btn-secondary btn-xs md:btn-sm lg:btn-md"
            >
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-36 bg-transparent shadow-md z-50">
          <ul className="menu menu-compact p-4 gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-0.5 hover:bg-base-200 ${
                    pathname === item.href
                      ? "bg-primary text-white font-semibold"
                      : ""
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
    </div>
  );
}
