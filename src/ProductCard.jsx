import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ProductCard({
  item,
  discount,
  getRemainingTime,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={() => window.open(item.affiliateLink, "_blank")}
      className="cursor-pointer group relative bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-blue-500/10
      hover:border-blue-400/50 transition-all duration-700 hover:scale-[1.04]
      shadow-xl hover:shadow-blue-500/30"
    >
      {item.isDeal && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-600 px-3 py-1 text-xs rounded-full shadow-lg">
          {discount}% OFF
        </div>
      )}

      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-blue-300 line-clamp-2">
        {item.name}
      </h3>

      <p className="text-sm text-gray-400 mt-1 line-clamp-3">
        {item.description}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-gray-500 line-through">
          ₹{item.originalPrice}
        </span>
        <span className="text-blue-400 text-xl font-bold">
          ₹{item.dealPrice}
        </span>
        <span className="text-green-400 text-sm">
          {discount}% OFF
        </span>
      </div>

      {item.isDeal && (
        <div className="mt-2 text-pink-400 text-sm font-mono">
          Ends in: {getRemainingTime(item.dealEnd)}
        </div>
      )}

      <a
        href={item.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="block mt-5 text-center py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500
        hover:opacity-90 transition shadow-lg"
      >
        View Luxury Deal
      </a>
    </motion.div>
  );
}
