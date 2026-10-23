"use client";

import Link from "next/link";
import { productsData } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";

export default function HomePage() {
  const priceUpProducts = productsData.filter((p) => p.category === "price_up");
  const priceDownProducts = productsData.filter((p) => p.category === "price_down");
  const allProducts = productsData;

  // Top Ticker Items
  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "৪৮", change: "২.১%", isUp: true },
    { name: "মিনিক্রেট চাল", price: "৯৯", change: "২.৯%", isUp: false },
    { name: "বাটাম সাইজ চাল", price: "৬৬", change: "৩.১%", isUp: true },
    { name: "মসুর ডাল", price: "১৪২", change: "২.৯%", isUp: true },
    { name: "ছোলা", price: "১২০", change: "২.৪%", isUp: false },
    { name: "আমন ডাল (খোসা সহ)", price: "১১০", change: "১.৫%", isUp: false },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Live Market Ticker Bar */}
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

      <div className="max-w-7xl mx-auto px-4 md:px-12 space-y-10 pt-4">
        
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
  );
}