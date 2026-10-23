import Image from "next/image";
import { productsData } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const priceUpProducts = productsData.filter((p) => p.category === "price_up");
  const priceDownProducts = productsData.filter((p) => p.category === "price_down");
  const allProducts = productsData;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Hero Banner Card */}
        <div className="bg-white rounded-2xl shadow-xs p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-gray-100">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              আজকের বাজার রেট ২০২৬
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-sm text-gray-500 max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা—দৈনন্দিন নিত্যপণ্যের সঠিক দাম ও দামের তারতম্য এক নজরে জেনে নিন।
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Image
              src="/assets/bazar-hero.png"
              alt="Bazar Basket"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Section 1: 📈 আজকের দাম বেড়েছে */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold text-lg">▲</span>
            <h2 className="text-xl font-bold text-gray-800">আজকের দাম বেড়েছে</h2>
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
            <span className="text-emerald-500 font-bold text-lg">▼</span>
            <h2 className="text-xl font-bold text-gray-800">আজকের দাম কমেছে</h2>
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
            <h2 className="text-xl font-bold text-gray-800">সব পণ্য</h2>
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