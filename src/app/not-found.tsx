import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-900 text-gray-100">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-extrabold text-emerald-500">404</h1>
        <h2 className="text-2xl font-bold">পণ্য বা পেজটি খুঁজে পাওয়া যায়নি!</h2>
        <p className="text-sm text-gray-400">
          আপনি যে পেজটি খুঁজছেন তা হয়তো রিমুভ করা হয়েছে অথবা ইউআরএলটি সঠিক নয়। চলুন মূল বাজারে ফিরে যাওয়া যাক।
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-full border-none shadow-md"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}