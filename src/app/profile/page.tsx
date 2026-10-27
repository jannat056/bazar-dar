"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await authClient.updateUser({ name });
      setMessage("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
      setTimeout(() => {
        window.location.reload(); // রিফ্রেশ হয়ে আপডেট ডাটা দেখাবে
      }, 1000);
    } catch (err) {
      setMessage("আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f6f3] flex items-center justify-center">
        <p className="text-sm text-gray-500 font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f3] flex flex-col font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto w-full p-6 space-y-6 mt-4">
        {/* Top Header Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-xs text-gray-500 mt-0.5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং পরিবর্তন করুন।</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-4">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-14 h-14 rounded-full object-cover border border-gray-200" 
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold">
                {session?.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold text-gray-900">{session?.user?.name || "ইউজার"}</h2>
              <p className="text-xs text-gray-500">{session?.user?.email}</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button 
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                    router.refresh();
                  },
                },
              });
            }}
            className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
          >
            ← সাইন আউট
          </button>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium text-center border border-emerald-200">
            {message}
          </div>
        )}

        {/* Update Form Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">তথ্য পরিবর্তন</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f9faf8] text-xs border border-gray-300 focus:bg-white focus:border-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-900 font-medium"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#058847] hover:bg-[#04733c] text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-2xs cursor-pointer disabled:opacity-50"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}