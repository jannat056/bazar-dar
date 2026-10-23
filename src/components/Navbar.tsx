"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-white shadow-xs px-4 md:px-12 sticky top-0 z-50 border-b border-gray-100">
      {/* Brand Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/category">Category</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 btn btn-ghost text-xl font-bold text-emerald-700">
          <Image src="/assets/logo-icon.png" alt="Logo" width={28} height={28} />
          বাজার দর
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-3 text-gray-600">
          <li>
            <Link href="/" className="hover:text-emerald-600">Home</Link>
          </li>
          <li>
            <Link href="/category" className="hover:text-emerald-600">Category</Link>
          </li>
        </ul>
      </div>

      {/* User Actions & Profile Menu */}
      <div className="navbar-end gap-3">
        <input
          type="text"
          placeholder="পণ্য খুঁজুন..."
          className="input input-bordered input-sm w-36 md:w-56 rounded-full bg-gray-50 hidden sm:block"
        />

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                alt="User"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-gray-100"
          >
            <li>
              <Link href="/profile" className="justify-between py-2">
                প্রোফাইল
                <span className="badge badge-emerald badge-sm">নতুন</span>
              </Link>
            </li>
            <li>
              <Link href="/sign-in" className="py-2">লগইন</Link>
            </li>
            <li>
              <Link href="/sign-up" className="py-2">রেজিস্ট্রেশন</Link>
            </li>
            <div className="divider my-1"></div>
            <li>
              <button className="text-error font-semibold py-2">লগআউট</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}