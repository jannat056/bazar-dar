"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getFormattedBanglaDate } from "@/lib/utils";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Ticker items
  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "৪৮", change: "২.১%", isUp: true },
    { name: "মিনিক্রেট চাল", price: "৯৯", change: "২.৯%", isUp: false },
    { name: "বাটাম সাইজ চাল", price: "৬৬", change: "৩.১%", isUp: true },
    { name: "মসুর ডাল", price: "১৪২", change: "২.৯%", isUp: true },
    { name: "ছোলা", price: "১২০", change: "২.৪%", isUp: false },
  ];

  // 1. Register User & Trigger OTP
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage("দয়া করে সবগুলো ফিল্ড পূরণ করুন!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      // Step A: Create user account in DB
      const res = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (res.error) {
        const msg = res.error.message || "";
        if (msg.toLowerCase().includes("exist")) {
          setErrorMessage("এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট করা আছে! অনুগ্রহ করে সাইন ইন করুন।");
        } else {
          setErrorMessage(msg || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
        }
        setLoading(false);
        return;
      }

      // Step B: Send OTP email via BetterAuth emailOtp plugin
      // Fixed: Removed incorrect type or set it properly according to sign-up flow
      const otpRes = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification", 
      });

      if (otpRes.error) {
        setErrorMessage(otpRes.error.message || "OTP পাঠাতে সমস্যা হয়েছে।");
        setLoading(false);
        return;
      }

      setLoading(false);
      setStep("otp"); // Move to OTP input view
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMessage("নেটওয়ার্ক বা সার্ভার এরর হয়েছে!");
      setLoading(false);
    }
  };

  // 2. Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!otp.trim()) {
      setErrorMessage("দয়া করে ৬ ডিজিটের OTP কোডটি দিন।");
      return;
    }

    setLoading(true);

    try {
      // Verify email using BetterAuth emailOtp plugin
      const res = await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      if (res.error) {
        setErrorMessage(res.error.message || "OTP ভেরিফিকেশন ব্যর্থ হয়েছে!");
        setLoading(false);
      } else {
        router.push("/"); // Success
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setErrorMessage("OTP ভেরিফাই করতে সমস্যা হয়েছে!");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f6f3] min-h-screen text-gray-800 flex flex-col justify-between font-sans selection:bg-emerald-100">
      <div>
        {/* Header */}
        <header className="bg-white border-b border-gray-100 py-2.5 px-4 md:px-12 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 bg-[#058847] text-white px-3 py-1.5 rounded-lg font-bold text-base shadow-2xs hover:bg-[#04733c] transition">
                <span>🛒</span>
                <span>বাজার দর</span>
              </Link>
              <span className="text-xs text-gray-400 font-medium hidden sm:inline-block">
                {getFormattedBanglaDate()}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/auth/signin" className="text-xs font-semibold px-4 py-2 text-gray-700 hover:text-emerald-700 transition">
                সাইন ইন
              </Link>
              <Link href="/auth/signup" className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#058847] text-white shadow-2xs hover:bg-[#04733c] transition">
                সাইন আপ
              </Link>
            </div>
          </div>
        </header>

        {/* Category Nav */}
        <div className="bg-[#f9faf8] border-b border-gray-200/60 py-2 px-4 overflow-x-auto whitespace-nowrap text-xs flex items-center justify-center gap-7 text-gray-600 shadow-2xs">
          <span>⚪ চাল</span><span>🫘 ডাল</span><span>🛢 তেল</span><span>🥬 সবজি</span><span>🐟 মাছ</span><span>🥩 মাংস</span><span>🥛 ডিম-দুধ</span><span>🌶 মসলা</span>
        </div>

        {/* Live Price Ticker */}
        <div className="bg-[#f4f6f3] border-b border-gray-200/50 py-1.5 px-4 overflow-x-auto whitespace-nowrap text-[11px] flex items-center gap-5 justify-center">
          {tickerItems.map((item, index) => (
            <div key={index} className="inline-flex items-center gap-1 text-gray-700">
              <span className="w-2.5 h-2.5 bg-gray-300 rounded-full inline-block"></span>
              <span>{item.name} {item.price} টাকা/কেজি</span>
              <span className={item.isUp ? "text-red-500 font-semibold" : "text-emerald-600 font-semibold"}>
                {item.isUp ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Main Section */}
        <main className="max-w-[430px] mx-auto my-10 px-4">
          <div className="text-center space-y-1 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {step === "form" ? "অ্যাকাউন্ট তৈরি করুন" : "ইমেইল ভেরিফিকেশন (OTP)"}
            </h1>
            <p className="text-xs text-gray-500">
              {step === "form" 
                ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।" 
                : `${email} ইমেইলে পাঠানো OTP কোডটি নিচে দিন।`}
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl shadow-2xs border border-gray-200/70">
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium shadow-sm">
                {errorMessage}{" "}
                {errorMessage.includes("সাইন ইন") && (
                  <div className="mt-1">
                    <Link href="/auth/signin" className="underline font-bold text-emerald-700">
                      Sign In করুন →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {step === "form" ? (
              /* FORM STEP */
              <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">নাম</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: রহিম উদ্দিন"
                    required
                    className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">ইমেইল</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">পাসওয়ার্ড</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    required
                    className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">পাসওয়ার্ড নিশ্চিত করুন</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="আবার লিখুন"
                    required
                    className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800 placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#058847] hover:bg-[#04733c] text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-2xs mt-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
                </button>
              </form>
            ) : (
              /* OTP STEP */
              <form className="space-y-4" onSubmit={handleVerifyOTP}>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">৬ ডিজিটের OTP কোড</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                    className="w-full bg-[#f9faf8] text-center text-lg tracking-widest font-bold border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#058847] hover:bg-[#04733c] text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? "ভেরিফাই করা হচ্ছে..." : "ভেরিফাই ও অ্যাকাউন্ট নিশ্চিত করুন"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-full text-xs text-gray-500 hover:underline text-center block pt-2 cursor-pointer"
                >
                  ← ফর্মে ফিরে যান
                </button>
              </form>
            )}

            {/* Social Logins */}
            {step === "form" && (
              <>
                <div className="relative my-5 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200/80"></div>
                  </div>
                  <div className="relative inline-block px-3 bg-white text-[11px] text-gray-400 font-medium">অথবা</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => authClient.signIn.social({ provider: "google" })}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span className="text-emerald-600 font-bold text-xs">G</span> Google দিয়ে চালিয়ে যান
                  </button>
                  <button
                    type="button"
                    onClick={() => authClient.signIn.social({ provider: "github" })}
                    className="flex items-center justify-center gap-2 py-2 px-2 border border-gray-200 rounded-lg text-[11px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <span>🐙</span> GitHub দিয়ে চালিয়ে যান
                  </button>
                </div>
              </>
            )}

            <div className="text-center mt-5 text-xs text-gray-500">
              অ্যাকাউন্ট আছে?{" "}
              <Link href="/auth/signin" className="text-[#058847] font-semibold hover:underline">
                সাইন ইন করুন
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition">
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
      </div>

      <footer className="bg-transparent py-4 px-4 md:px-12 text-[11px] text-gray-400 border-t border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}