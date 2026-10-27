"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getFormattedBanglaDate } from "@/lib/utils";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Ticker items matching Figma design
  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "৪৮", change: "২.১%", isUp: true },
    { name: "মিনিক্রেট চাল", price: "৯৯", change: "২.৯%", isUp: false },
    { name: "বাটাম সাইজ চাল", price: "৬৬", change: "৩.১%", isUp: true },
    { name: "মসুর ডাল", price: "১৪২", change: "২.৯%", isUp: true },
    { name: "ছোলা", price: "১২০", change: "২.৪%", isUp: false },
    { name: "আমন ডাল (খোসা সহ)", price: "১১০", change: "১.৫%", isUp: false },
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      console.log("Attempting sign in with:", email);
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            console.log("Sign in successful!");
            router.push("/"); // Successful sign in redirects to home page
          },
          onError: (ctx) => {
            console.error("Sign in error context:", ctx);
            setErrorMessage(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে!");
            setLoading(false);
          },
        }
      );
    } catch (err) {
      console.error("Network or server catch error:", err);
      setErrorMessage("নেটওয়ার্ক বা সার্ভারে সমস্যা হয়েছে! আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f6f3] min-h-screen text-gray-800 flex flex-col justify-between font-sans selection:bg-emerald-100">
      <div>
        {/* 1. Header Navigation Bar */}
        <header className="bg-white border-b border-gray-100 py-2.5 px-4 md:px-12 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 bg-[#058847] text-white px-3 py-1.5 rounded-lg font-bold text-base shadow-xs hover:bg-[#04733c] transition-all cursor-pointer"
              >
                <span>🛒</span>
                <span>বাজার দর</span>
              </Link>
              <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
                {getFormattedBanglaDate()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="text-xs font-semibold px-4 py-2 text-gray-700 hover:text-emerald-700 transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/auth/signup"
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#058847] text-white shadow-xs hover:bg-[#04733c] transition-all cursor-pointer"
              >
                সাইন আপ
              </Link>
            </div>
          </div>
        </header>

        {/* 2. Category Nav Bar */}
        <div className="bg-[#f9faf8] border-b border-gray-200/60 py-2 px-4 overflow-x-auto whitespace-nowrap text-xs flex items-center justify-start sm:justify-center gap-6 sm:gap-8 text-gray-600 shadow-2xs">
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">⚪ চাল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🫘 ডাল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🛢 তেল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🥬 সবজি</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🐟 মাছ</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🥩 মাংস</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🥛 ডিম-দুধ</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition-colors">🌶 মসলা</span>
        </div>

        {/* 3. Ticker Bar */}
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

        {/* 4. Sign In Form Section */}
        <main className="max-w-[430px] mx-auto my-10 px-4">
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              সাইন ইন
            </h1>
            <p className="text-xs text-gray-500">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-200/70">
            {/* Error Message Display */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium shadow-xs">
                {errorMessage}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSignIn}>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ইমেইল
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  required
                  className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition-all text-gray-800 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#058847] hover:bg-[#04733c] active:scale-[0.99] text-white font-semibold py-2.5 rounded-lg transition-all text-xs shadow-xs mt-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/80"></div>
              </div>
              <div className="relative inline-block px-3 bg-white text-[11px] text-gray-400 font-medium">
                অথবা
              </div>
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => signIn.social({ provider: "google" })}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="text-emerald-600 font-bold text-xs">G</span> Google দিয়ে চালিয়ে যান
              </button>
              <button
                type="button"
                onClick={() => signIn.social({ provider: "github" })}
                className="flex items-center justify-center gap-2 py-2 px-2.5 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>🐙</span> GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            {/* Toggle Link to Sign Up */}
            <div className="text-center mt-5 text-xs text-gray-500">
              অ্যাকাউন্ট নেই?{" "}
              <Link href="/auth/signup" className="text-[#058847] font-semibold hover:underline">
                সাইন আপ করুন
              </Link>
            </div>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
      </div>

      {/* 5. Minimal Footer */}
      <footer className="bg-transparent py-4 px-4 md:px-12 text-[11px] text-gray-400 border-t border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}