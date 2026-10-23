"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Ticker items matching design
  const tickerItems = [
    { name: "স্বর্ণমাছি চাল", price: "৪৮", change: "২.১%", isUp: true },
    { name: "মিনিক্রেট চাল", price: "৯৯", change: "২.৯%", isUp: false },
    { name: "বাটাম সাইজ চাল", price: "৬৬", change: "৩.১%", isUp: true },
    { name: "মসুর ডাল", price: "১৪২", change: "২.৯%", isUp: true },
    { name: "ছোলা", price: "১২০", change: "২.৪%", isUp: false },
    { name: "আমন ডাল (খোসা সহ)", price: "১১০", change: "১.৫%", isUp: false },
  ];

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  // Sign out handler
  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  // Update profile name handler
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      await authClient.updateUser({
        name: name,
      });
      setMessage("নাম সফলভাবে আপডেট করা হয়েছে!");
    } catch (err) {
      setMessage("আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex items-center justify-center text-sm font-medium text-gray-600">
        লোডিং হচ্ছে...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex flex-col items-center justify-center gap-4 text-sm font-medium text-gray-700">
        <p>প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।</p>
        <Link
          href="/auth/signin"
          className="bg-[#058847] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#04733c] transition"
        >
          সাইন ইন পেজে যান
        </Link>
      </div>
    );
  }

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
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </span>
            </div>

            {/* Top Right User Profile Dropdown / Nav */}
            <div className="flex items-center gap-2">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-emerald-700 transition"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User Avatar"
                    width={28}
                    height={28}
                    className="rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                )}
                <span>{session.user.name || "User"}</span>
                <span className="text-[10px] text-gray-400">▼</span>
              </Link>
            </div>
          </div>
        </header>

        {/* 2. Category Nav Bar */}
        <div className="bg-[#f9faf8] border-b border-gray-200/60 py-2 px-4 overflow-x-auto whitespace-nowrap text-xs flex items-center justify-start sm:justify-center gap-6 sm:gap-8 text-gray-600 shadow-2xs">
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">⚪ চাল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🫘 ডাল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🛢 তেল</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🥬 সবজি</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🐟 মাছ</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🥩 মাংস</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🥛 ডিম-দুধ</span>
          <span className="hover:text-emerald-700 cursor-pointer font-medium transition">🌶 মসলা</span>
        </div>

        {/* 3. Ticker Bar */}
        <div className="bg-[#f4f6f3] border-b border-gray-200/50 py-1.5 px-4 overflow-x-auto whitespace-nowrap text-[11px] flex items-center gap-5 justify-start sm:justify-center">
          {tickerItems.map((item, index) => (
            <div key={index} className="inline-flex items-center gap-1 text-gray-700">
              <span className="w-2.5 h-2.5 bg-gray-300 rounded-full inline-block"></span>
              <span>
                {item.name} {item.price} টাকা/কেজি
              </span>
              <span className={item.isUp ? "text-red-500 font-semibold" : "text-emerald-600 font-semibold"}>
                {item.isUp ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* 4. Main Profile Content */}
        <main className="max-w-[550px] mx-auto my-10 px-4 space-y-6">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">আমার প্রোফাইল</h1>
            <p className="text-xs text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
          </div>

          {/* Top User Info & Sign Out Card */}
          <div className="bg-white p-6 rounded-2xl shadow-2xs border border-gray-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  width={64}
                  height={64}
                  className="rounded-2xl object-cover border border-gray-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#058847] text-white text-2xl font-bold flex items-center justify-center shadow-2xs">
                  {session.user.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {session.user.name}
                </h2>
                <p className="text-xs text-gray-500 font-medium">{session.user.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>🚪</span> সাইন আউট
            </button>
          </div>

          {/* Edit Information Card */}
          <div className="bg-white p-6 rounded-2xl shadow-2xs border border-gray-200/70 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">তথ্য</h3>

            {message && (
              <div
                className={`p-3 text-xs rounded-xl text-center font-medium ${
                  message.includes("সফলভাবে")
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">নাম</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full bg-[#058847] hover:bg-[#04733c] text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-2xs cursor-pointer disabled:opacity-50"
              >
                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* 5. Minimal Footer */}
      <footer className="bg-transparent py-4 px-4 md:px-12 text-[11px] text-gray-400 border-t border-gray-200/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}