"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-12 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Green Logo & Date matching Figma */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-2xs hover:bg-emerald-700 transition">
            <span className="font-bold text-sm">বাজার দর</span>
          </Link>
          <span className="text-xs text-gray-500 hidden sm:inline-block font-medium">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
        </div>

        {/* Right: Sign In & Sign Up buttons matching Figma */}
        <div className="flex items-center gap-2">
          <Link 
            href="/auth/signin" 
            className="text-xs font-semibold px-3.5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            সাইন ইন
          </Link>
          <Link 
            href="/auth/signup" 
            className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700 transition"
          >
            সাইন আপ
          </Link>
        </div>

      </div>
    </header>
  );
}