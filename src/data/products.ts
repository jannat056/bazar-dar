export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  change: number;
  isIncrease: boolean;
  category: "price_up" | "price_down" | "all";
  image: string;
}

export const productsData: Product[] = [
  // 📈 আজকের দাম বেড়েছে
  { id: "1", name: "পেঁয়াজ", unit: "প্রতি কেজি", price: 54, change: 12.5, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=150&q=80" },
  { id: "2", name: "আদা", unit: "প্রতি কেজি", price: 85, change: 5.0, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80" },
  { id: "3", name: "বেগুন", unit: "প্রতি কেজি", price: 44, change: 4.5, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&q=80" },
  { id: "4", name: "রুই মাছ", unit: "প্রতি কেজি", price: 360, change: 4.2, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=150&q=80" },
  { id: "5", name: "ডিম", unit: "প্রতি হালি", price: 154, change: 3.5, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=150&q=80" },
  { id: "6", name: "মসুর ডাল (মোটা)", unit: "প্রতি কেজি", price: 135, change: 2.8, isIncrease: true, category: "price_up", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80" },

  // 📉 আজকের দাম কমেছে
  { id: "7", name: "কাঁচামরিচ", unit: "প্রতি কেজি", price: 92, change: 12.0, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1588879460417-af2e23d1828f?w=150&q=80" },
  { id: "8", name: "রসুন", unit: "প্রতি কেজি", price: 195, change: 3.2, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80" },
  { id: "9", name: "আলু", unit: "প্রতি কেজি", price: 30, change: 2.5, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&q=80" },
  { id: "10", name: "কাতলা মাছ", unit: "প্রতি কেজি", price: 380, change: 1.5, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=150&q=80" },
  { id: "11", name: "ব্রয়লার মুরগি", unit: "প্রতি কেজি", price: 185, change: 2.0, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=150&q=80" },
  { id: "12", name: "গম বা আটা", unit: "প্রতি কেজি", price: 55, change: 1.1, isIncrease: false, category: "price_down", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80" },

  // 🛒 সব পণ্য (সব আইটেম মিলিয়ে মূল গ্রিড)
  { id: "13", name: "নাজিরশাইল চাল", unit: "প্রতি কেজি", price: 74, change: 0.0, isIncrease: false, category: "all", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80" },
  { id: "14", name: "মিনিকেট চাল", unit: "প্রতি কেজি", price: 66, change: 1.2, isIncrease: false, category: "all", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80" },
  { id: "15", name: "সয়াবিন তেল", unit: "প্রতি লিটার", price: 185, change: 2.1, isIncrease: true, category: "all", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&q=80" },
  { id: "16", name: "চিনি", unit: "প্রতি কেজি", price: 140, change: 0.5, isIncrease: true, category: "all", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&q=80" },
  { id: "17", name: "মসুর ডাল (সরু)", unit: "প্রতি কেজি", price: 145, change: 1.8, isIncrease: true, category: "all", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80" },
  { id: "18", name: "গরুর মাংস", unit: "প্রতি কেজি", price: 780, change: 3.0, isIncrease: true, category: "all", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=150&q=80" },
];