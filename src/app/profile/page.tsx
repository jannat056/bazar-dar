"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfileUpdatePage() {
  const { data: session } = useSession();
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
      setMessage("Name successfully updated!");
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (err) {
      setMessage("Update korte somossa hoyeche.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3] p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-2xs border border-gray-200/70 max-w-md w-full space-y-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">প্রোফাইল আপডেট করুন</h1>

        {message && (
          <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium text-center border border-emerald-200">
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f9faf8] text-xs border border-gray-200 focus:bg-white focus:border-emerald-600 rounded-lg py-2.5 px-3.5 outline-none transition text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#058847] hover:bg-[#04733c] text-white font-semibold py-2.5 rounded-lg transition text-xs shadow-2xs cursor-pointer disabled:opacity-50"
          >
            {loading ? "আপডেট হচ্ছে..." : "সেভ করুন"}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/profile" className="text-xs text-gray-500 hover:underline">
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}