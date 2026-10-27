"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 px-4 md:px-12 sticky top-0 z-50 shadow-2xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Green Logo & Date matching Figma */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-2xs hover:bg-emerald-700 transition">
            <span className="font-bold text-sm">বাজার দর</span>
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block font-medium">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </span>
        </div>

        {/* Right: Theme Toggle + Profile / Auth */}
        <div className="flex items-center gap-3">
          
          {/* Dark/Light Mode Toggle Button */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
              aria-label="Toggle Theme"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}

          {isPending ? (
            <div className="h-8 w-20 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          ) : session?.user ? (
            // ইউজার লগইন করা থাকলে প্রোফাইল বা নাম দেখাবে (Clickable to /profile)
            <div className="flex items-center gap-2">
              <Link 
                href="/profile" 
                className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
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
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </Link>

              {/* লগআউট বাটন */}
              <button 
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        window.location.reload();
                      },
                    },
                  });
                }}
                className="text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
              >
                লগআউট
              </button>
            </div>
          ) : (
            // ইউজার লগইন করা না থাকলে সাইন ইন ও সাইন আপ বাটন দেখাবে
            <>
              <Link 
                href="/auth/signin" 
                className="text-xs font-semibold px-3.5 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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