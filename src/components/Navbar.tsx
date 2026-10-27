"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // Better Auth client hook import

export default function Navbar() {
  // Better Auth থেকে সেশন ডাটা ফেচ করা
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-12 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Green Logo & Date matching Figma */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-2xs hover:bg-emerald-700 transition">
            <span className="font-bold text-sm">বাজার দর</span>
          </Link>
          <span className="text-xs text-gray-500 hidden sm:inline-block font-medium">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
        </div>

        {/* Right: Dynamic Auth State (Profile vs Sign In/Up) */}
        <div className="flex items-center gap-2">
          {isPending ? (
            // লোডিং হওয়াকালীন স্ক্যালিটন বা ছোট স্পিনার দেখাতে পারেন
            <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-lg"></div>
          ) : session?.user ? (
            // ইউজার লগইন করা থাকলে প্রোফাইল বা নাম দেখাবে
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-6 h-6 rounded-full object-cover" 
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-xs font-semibold text-gray-700 max-w-[100px] truncate">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </div>

              {/* লগআউট বাটন চাইলে রাখতে পারেন */}
              <button 
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.reload(); // রিফ্রেশ হয়ে হোমপেজে নিয়ে যাবে
                      },
                    },
                  });
                }}
                className="text-xs font-medium text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition"
              >
                লগআউট
              </button>
            </div>
          ) : (
            // ইউজার লগইন করা না থাকলে সাইন ইন ও সাইন আপ বাটন দেখাবে
            <>
              <Link 
                href="/auth/signin" 
                className="text-xs font-semibold px-3.5 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                সাইন ইন
              </Link>
              <Link 
                href="/auth/signup" 
                className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700 transition"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}