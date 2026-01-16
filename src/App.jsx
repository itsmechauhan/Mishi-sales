import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ProductCard from "./ProductCard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const calcDiscount = (original, deal) =>
    Math.round(((original - deal) / original) * 100);

  const getRemainingTime = (end) => {
    const diff = new Date(end) - time;
    if (diff <= 0) return "Expired";
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return `${h}h ${m}m ${s}s`;
  };

  const filtered = products.filter((p) => {
    const s = p.name.toLowerCase().includes(search.toLowerCase());
    const c =
      category === "All" ||
      category === p.category ||
      (category === "Deals" && p.isDeal);
    return s && c;
  });

  const categories = [
    "All",
    "Deals",
    ...new Set(products.map((p) => p.category).filter((c) => c !== "Deals")),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#030b1a] to-black text-white font-[Poppins]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Mishi Sales
          </h1>
          <input
            type="text"
            placeholder="Search luxury collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#0a1028] px-4 py-2 rounded-full border border-blue-500/30 outline-none focus:ring-2 focus:ring-blue-600 text-sm"
          />
        </div>
      </nav>

      {/* CATEGORIES */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3 overflow-x-auto">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${
              category === cat
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/40"
                : "bg-white/5 text-blue-300 hover:bg-blue-500/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Luxury Deals. Curated Elegance.
        </h2>
        <p className="text-gray-400 mt-3">
          Where premium meets performance.
        </p>
      </motion.div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {filtered.map((item) => {
    const discount = calcDiscount(
      item.originalPrice,
      item.dealPrice
    );

    return (
      <ProductCard
        key={item.id}
        item={item}
        discount={discount}
        getRemainingTime={getRemainingTime}
      />
    );
  })}
</div>



      {/* FOOTER (LUXURY GLOW) */}
      <footer
        onMouseMove={(e) => {
          e.currentTarget.style.setProperty("--x", `${e.clientX}px`);
          e.currentTarget.style.setProperty("--y", `${e.clientY}px`);
        }}
        className="relative bg-gradient-to-t from-black via-[#020b1f] to-black border-t border-blue-500/20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Mishi Sales
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Curated with taste. Designed for discovery. Crafted in luxury.
          </p>
          <div className="mt-6 text-xs text-gray-600">
            © {new Date().getFullYear()} Mishi Sales — A Premium Digital Boutique
          </div>
        </div>

        {/* glow layer */}
        <div className="pointer-events-none absolute inset-0
          bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(59,130,246,0.25),transparent_40%)]">
        </div>
      </footer>
    </div>
  );
}
