import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-white text-gray-600 border-t border-gray-100 rounded mt-12">
      <div className="flex items-center gap-2">
        <Image src="/assets/logo-icon.png" alt="Logo" width={32} height={32} />
        <span className="font-bold text-xl text-emerald-800">বাজার দর</span>
      </div>
      <p className="font-medium text-sm max-w-md">
        দৈনিক নিত্যপ্রয়োজনীয় পণ্যের সঠিক দাম ও বাজারের সঠিক আপডেট এক নজরে।
      </p>
      <nav className="grid grid-flow-col gap-6 font-medium">
        <Link href="/" className="link link-hover hover:text-emerald-600">হোম</Link>
        <Link href="/category" className="link link-hover hover:text-emerald-600">ক্যাটাগরি</Link>
        <Link href="/profile" className="link link-hover hover:text-emerald-600">প্রোফাইল</Link>
      </nav>
      <aside>
        <p className="text-xs text-gray-400">
          Copyright © {new Date().getFullYear()} - সর্বস্বত্ব সংরক্ষিত
        </p>
      </aside>
    </footer>
  );
}