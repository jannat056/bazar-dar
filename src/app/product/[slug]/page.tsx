"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CategoryDynamicPage() {
  const { data: session } = useSession();
  const params = useParams();
  const categorySlug = (params?.slug as string) || "chal";

  const [sortBy, setSortBy] = useState("default");

  const categoryNames: Record<string, { name: string; icon: string; count: string }> = {
    chal: { name: "চাল", icon: "🍚", count: "৪টি পণ্যের আজকের দাম ও পরিবর্তন" },
    dal: { name: "ডাল", icon: "🫘", count: "৫টি পণ্যের আজকের দাম ও পরিবর্তন" },
    oil: { name: "তেল", icon: "🛢", count: "৩টি পণ্যের আজকের দাম ও পরিবর্তন" },
    vegetable: { name: "সবজি", icon: "🥬", count: "৮টি পণ্যের আজকের দাম ও পরিবর্তন" },
    fish: { name: "মাছ", icon: "🐟", count: "৬টি পণ্যের আজকের দাম ও পরিবর্তন" },
    meat: { name: "মাংস", icon: "🥩", count: "৪টি পণ্যের আজকের দাম ও পরিবর্তন" },
    egg: { name: "ডিম-দুধ", icon: "🥛", count: "৩টি পণ্যের আজকের দাম ও পরিবর্তন" },
    spice: { name: "মসলা", icon: "🌶", count: "৫টি পণ্যের আজকের দাম ও পরিবর্তন" },
  };

  const currentCategory = categoryNames[categorySlug] || categoryNames["chal"];

  const products = [
    {
      id: 1,
      slug: "swornamachi-chal",
      name: "স্বর্ণমাছি চাল",
      unit: "প্রতি কেজি",
      price: "৪৮",
      change: "২.১%",
      isUp: true,
    },
    {
      id: 2,
      slug: "miniket-chal",
      name: "মিনিক্রেট চাল",
      unit: "প্রতি কেজি",
      price: "৯৯",
      change: "২.৯%",
      isUp: false,
    },
    {
      id: 3,
      slug: "nazir-chal",
      name: "নাজির চাল",
      unit: "প্রতি কেজি",
      price: "৭৪",
      change: "০.০%",
      isNeutral: true,
    },
    {
      id: 4,
      slug: "batam-rice",
      name: "বাটাম সাইজ চাল",
      unit: "প্রতি কেজি",
      price: "৬৬",
      change: "৩.১%",
      isUp: true,
    },
  ];

  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "৪৮", change: "২.১%", isUp: true },
    { name: "মিনিক্রেট চাল", price: "৯৯", change: "২.৯%", isUp: false },
    { name: "বাটাম সাইজ চাল", price: "৬৬", change: "৩.১%", isUp: true },
    { name: "মসুর ডাল", price: "১৪২", change: "২.৯%", isUp: true },
    { name: "ছোলা", price: "১২০", change: "২.৪%", isUp: false },
    { name: "আমন ডাল (খোসা সহ)", price: "১১০", change: "১.৫%", isUp: false },
  ];

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

            <div className="flex items-center gap-2">
              {session?.user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-emerald-700 transition"
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
                </Link>
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

        <div className="bg-[#f9faf8] border-b border-gray-200/60 py-2 px-4 overflow-x-auto whitespace-nowrap text-xs flex items-center justify-start sm:justify-center gap-3 text-gray-600 shadow-2xs">
          {categories.map((cat) => {
            const isActive = categorySlug === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition font-medium text-xs cursor-pointer ${
                  isActive
                    ? "bg-[#058847] text-white shadow-2xs font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="bg-[#f4f6f3] border-b border-gray-200/50 py-1.5 px-4 overflow-x-auto whitespace-nowrap text-[11px] flex items-center gap-5 justify-start sm:justify-center">
          {tickerItems.map((item, index) => (
            <div key={index} className="inline-flex items-center gap-1 text-gray-700">
              <span className="w-2.5 h-2.5 bg-gray-300 rounded-full inline-block"></span>
              <span>
                {item.name} {item.price} টাকা/কেজি
              </span>
              <span
                className={
                  item.isUp ? "text-red-500 font-semibold" : "text-emerald-600 font-semibold"
                }
              >
                {item.isUp ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>

        <main className="max-w-6xl mx-auto my-8 px-4 space-y-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/70 shadow-2xs flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl border border-gray-100">
              {currentCategory.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {currentCategory.name}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">{currentCategory.count}</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-gray-200/70 shadow-2xs flex items-center justify-between">
            <div></div>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <span>সাজান</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#f9faf8] border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:border-emerald-600 text-xs font-medium text-gray-700 cursor-pointer"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-gray-500 font-medium px-1">
            মোট ৪টি পণ্য দেখানো হচ্ছে[cite: 7]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="bg-white p-5 rounded-2xl border border-gray-200/70 shadow-2xs hover:shadow-md transition duration-200 flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                    {currentCategory.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-medium">
                      আজকের দাম
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {item.price} টাকা
                    </span>
                  </div>

                  <div>
                    {item.isNeutral ? (
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        — {item.change}
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                          item.isUp
                            ? "bg-red-50 text-red-500"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {item.isUp ? "▲" : "▼"} {item.change}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <footer className="bg-transparent py-4 px-4 md:px-12 text-[11px] text-gray-400 border-t border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}