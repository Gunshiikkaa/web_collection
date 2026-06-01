"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { X, CheckCircle, ExternalLink, Sparkles, ArrowRight } from "lucide-react";

interface ExperienceModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ExperienceModal({ product, isOpen, onClose }: ExperienceModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isOpen]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-6xl h-[85vh] sm:h-[80vh] md:h-[75vh] bg-[#09090b] border border-card-border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/50 border border-card-border flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Media / Live Emulation Visuals */}
            <div className="w-full md:w-[45%] h-[35%] md:h-full bg-[#030303] relative border-b md:border-b-0 md:border-r border-card-border flex items-center justify-center p-8 overflow-hidden">
              {/* Product Background Mockup Image */}
              <img
                src={`/${product.id}.png`}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none"
              />
              
              {/* Radial gradient backing based on item */}
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, ${product.accentColor}, transparent 80%), linear-gradient(to top, #09090b, transparent)`,
                }}
              />

              {/* Animated Floating Shapes specific to the visual */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-2 h-2 rounded-full bg-white animate-ping" />
                <div className="absolute bottom-[20%] right-[30%] w-3 h-3 rounded-full bg-white animate-pulse" />
              </div>

              {/* Central Premium Graphic */}
              <motion.div
                initial={{ rotate: -5, scale: 0.85 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex flex-col items-center gap-6"
              >
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center bg-black/60 border-2 shadow-2xl relative"
                  style={{ borderColor: product.accentColor }}
                >
                  {/* Rotating center design depending on type */}
                  <div
                    className="absolute inset-2 rounded-full border border-dashed opacity-45"
                    style={{
                      borderColor: product.accentColor,
                      animation: "spin-slow 25s linear infinite",
                    }}
                  />

                  {/* Icon */}
                  {product.id === "heart-lock" && (
                    <span className="text-6xl animate-pulse">❤️</span>
                  )}
                  {product.id === "birthday-cake" && (
                    <span className="text-6xl animate-bounce">🎂</span>
                  )}
                  {product.id === "vintage-radio" && (
                    <span className="text-6xl animate-bounce">📻</span>
                  )}
                  {product.id === "couple-spotify" && (
                    <span className="text-6xl animate-pulse">🎵</span>
                  )}
                  {product.id === "couple-netflix" && (
                    <span className="text-6xl animate-pulse">🎬</span>
                  )}
                </div>

                <div className="text-center">
                  <span
                    className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                    style={{
                      color: product.accentColor,
                      borderColor: `${product.accentColor}30`,
                      backgroundColor: `${product.accentColor}08`,
                    }}
                  >
                    Interactive Core Ready
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Information Sheet */}
            <div className="w-full md:w-[55%] h-[65%] md:h-full p-6 sm:p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
              {/* Product header info */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-pink-accent mb-3 font-outfit uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Premium Showcase</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold font-outfit text-white">
                  {product.title}
                </h2>

                <p className="text-gray-400 mt-4 text-sm md:text-base leading-relaxed">
                  {product.description}
                </p>

                {/* Features Checklist */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-outfit">
                    Interactive Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: product.accentColor }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-card-border pt-8 mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={product.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl border border-card-border text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all select-none cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Demo
                </a>

                <button
                  onClick={() => {
                    onClose();
                    // Smooth scroll to pricing
                    setTimeout(() => {
                      const el = document.getElementById("pricing");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 350);
                  }}
                  className="px-6 py-4 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all select-none cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${product.accentColor}, #000)`,
                    boxShadow: `0 0 25px ${product.accentColor}25`,
                  }}
                >
                  Order This Experience
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
