import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="bg-white p-4 rounded-xl shadow-xs hover:shadow-md transition border border-gray-100 flex items-center justify-between group text-gray-800"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-50 rounded-lg p-1 flex items-center justify-center border border-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={50}
            height={50}
            className="object-cover rounded-md group-hover:scale-105 transition-transform"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{product.name}</h3>
          <p className="text-xs text-gray-400">{product.unit}</p>
          <p className="font-bold text-gray-900 mt-1">
            {product.price} টাকা
          </p>
        </div>
      </div>
      <div className="text-right">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
            product.isIncrease
              ? "text-red-600 bg-red-50"
              : "text-emerald-600 bg-emerald-50"
          }`}
        >
          {product.isIncrease ? "▲" : "▼"} {product.change}%
        </span>
      </div>
    </Link>
  );
}