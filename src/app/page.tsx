"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { productsData } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";

export default function HomePage() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const priceUpProducts = productsData.filter((p) => p.category === "price_up");
  const priceDownProducts = productsData.filter((p) => p.category === "price_down");
  const allProducts = productsData;

  // Categories list
  const categories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🫘" },
    { name: "তেল", slug: "oil", icon: "🛢" },
    { name: "সবজি", slug: "vegetable", icon: "🥬" },
    { name: "মাছ", slug: "fish", icon: "🐟" },
    { name: "মাংস", slug: "meat", icon: "🥩" },
    { name: "ডিম-দুধ", slug: "egg", icon: "🥛" },
    { name: "মসলা", slug: "spice", icon: "🌶" },
  ];

  return (
    <div className="bg-[#f4f6f3] min-h-screen text-gray-800 flex flex-col justify-between font-sans selection:bg-emerald-100">
      <div>
        {/* 1. Header Navigation Bar */}
        <header className="bg-white border-b border-gray-100 py-2.5 px-4 md:px-12 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 bg-[#058847] text-white px-3 py-1.5 rounded-lg font-bold text-base shadow-2xs hover:bg-[#04733c] transition cursor-pointer"
              >
                <span>🛒</span>
                <span>বাজার দর</span>
              </Link>
              <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬[cite: 1]
              </span>
            </div>

            {/* Profile Dropdown / Auth Actions */}
            <div className="relative">
              {session?.user ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-emerald-700 transition cursor-pointer py-1 px-2 rounded-lg hover:bg-gray-50"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={28}
                        height={28}
                        className="rounded-full border border-gray-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        {session.user.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span>{session.user.name}</span>
                    <span className="text-[10px] text-gray-400">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs font-bold text-gray-900">{session.user.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{session.user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-xs text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium transition"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        👤 আমার প্রোফাইল
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut();
                          router.push("/auth/signin");
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium transition cursor-pointer"
                      >
                        🚪 সাইন আউট
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/signin"
                    className="text-xs font-semibold px-4 py-2 text-gray-700 hover:text-emerald-700 transition"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#058847] text-white hover:bg-[#04733c] transition"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 2. Top Category Nav Bar */}
        <div className="bg-[#f9faf8] border-b border-gray-200/60 py-2 px-4 overflow-x-auto whitespace-nowrap text-xs flex items-center justify-start sm:justify-center gap-3 text-gray-600 shadow-2xs">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium text-xs hover:bg-gray-100 text-gray-700 cursor-pointer"
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>

        {/* 3. Top Live Market Ticker Bar */}
        <div className="bg-[#f4f6f3] border-b border-gray-200/50 py-1.5 px-4 overflow-x-auto whitespace-nowrap text-[11px] flex items-center gap-5 justify-start sm:justify-center">
          <span className="font-bold text-emerald-700 flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-gray-200 shadow-2xs">
            🔴 লাইভ বাজার রেট:
          </span>
          {productsData.map((item) => (
            <div key={item.id} className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-md border border-gray-200 text-gray-700 shadow-2xs">
              <span className="font-medium">{item.name}</span>
              <span className={item.isIncrease ? "text-red-500 font-semibold" : "text-emerald-600 font-semibold"}>
                {item.isIncrease ? "▲" : "▼"} {item.change}%
              </span>
            </div>
          ))}
        </div>

        {/* 4. Main Body Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-10 pt-8 pb-16">
          
          {/* Hero Section Component */}
          <Hero />

          {/* Section 1: 📈 আজকের দাম বেড়েছে */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 font-bold text-lg">▲</span>
              <h2 className="text-xl font-bold text-gray-900">আজকের দাম বেড়েছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceUpProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Section 2: 📉 আজকের দাম কমেছে */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 font-bold text-lg">▼</span>
              <h2 className="text-xl font-bold text-gray-900">আজকের দাম কমেছে</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {priceDownProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Section 3: 🛒 সব পণ্য */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-transparent py-4 px-4 md:px-12 text-[11px] text-gray-400 border-t border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}