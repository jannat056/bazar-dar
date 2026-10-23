import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-gray-200">
      <div className="space-y-4 w-full md:w-2/3 text-center md:text-left">
        <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
          আজকের বাজার রেট ২০২৬
        </span>
        <h1 className="text-2xl md:text-3xl font-bold">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা—দৈনন্দিন নিত্যপণ্যের সঠিক দাম ও দামের তারতম্য এক নজরে জেনে নিন।
        </p>
        <div className="pt-2">
          <input
            type="text"
            placeholder="পণ্য সার্চ করুন (যেমন: পেঁয়াজ, চাল)..."
            className="input input-bordered w-full max-w-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>
      <div className="mt-6 md:mt-0">
        <Image
          src="/assets/bazar-hero.png"
          alt="Bazar Basket"
          width={160}
          height={160}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}