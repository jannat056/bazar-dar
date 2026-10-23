export interface Product {
  id: string;
  name: string;
  unit: string;
  price: number;
  change: number; // দামের তারতম্যের শতকরা হার
  isIncrease: boolean; // দাম বেড়েছে (true) নাকি কমেছে (false)
  category: "price_up" | "price_down" | "all";
  image: string;
}

export const productsData: Product[] = [
  // 📈 দাম বেড়েছে
  {
    id: "1",
    name: "পেঁয়াজ",
    unit: "প্রতি কেজি",
    price: 54,
    change: 12.5,
    isIncrease: true,
    category: "price_up",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=150&q=80",
  },
  {
    id: "2",
    name: "আদা",
    unit: "প্রতি কেজি",
    price: 85,
    change: 5.0,
    isIncrease: true,
    category: "price_up",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80",
  },
  {
    id: "3",
    name: "বেগুন",
    unit: "প্রতি কেজি",
    price: 44,
    change: 4.5,
    isIncrease: true,
    category: "price_up",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80",
  },

  // 📉 দাম কমেছে
  {
    id: "4",
    name: "কাঁচামরিচ",
    unit: "প্রতি কেজি",
    price: 92,
    change: 12.0,
    isIncrease: false,
    category: "price_down",
    image: "https://images.unsplash.com/photo-1588879460417-af2e23d1828f?w=150&q=80",
  },
  {
    id: "5",
    name: "রসুন",
    unit: "প্রতি কেজি",
    price: 195,
    change: 3.2,
    isIncrease: false,
    category: "price_down",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80",
  },
  {
    id: "6",
    name: "আলু",
    unit: "প্রতি কেজি",
    price: 30,
    change: 2.5,
    isIncrease: false,
    category: "price_down",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&q=80",
  },

  // 🛒 সব পণ্য
  {
    id: "7",
    name: "নাজিরশাইল চাল",
    unit: "প্রতি কেজি",
    price: 74,
    change: 0.0,
    isIncrease: false,
    category: "all",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&q=80",
  },
  {
    id: "8",
    name: "সয়াবিন তেল",
    unit: "প্রতি লিটার",
    price: 185,
    change: 2.1,
    isIncrease: true,
    category: "all",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&q=80",
  },
];