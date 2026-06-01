"use client";

import { motion } from "framer-motion";
import FloatingShowcase from "./FloatingShowcase";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom easeOutExpo
      },
    },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden py-24 md:py-32">
      {/* 3D Parallax Shapes Background */}
      <FloatingShowcase />

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-white/80 font-medium tracking-wider font-outfit mb-8 shadow-lg select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-accent animate-pulse" />
            <span>Digital Experience Showroom</span>
          </motion.div>

          {/* Cinematic Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-black font-outfit tracking-tight leading-[1.05] text-white select-none"
          >
            Not Just Websites.
            <br />
            <span className="bg-gradient-to-r from-pink-accent via-purple-accent to-pink-accent bg-clip-text text-transparent bg-[size:200%_auto] animate-[marquee_10s_linear_infinite] filter drop-shadow-[0_0_30px_rgba(255,0,127,0.25)]">
              Memories
            </span>{" "}
            You Can Interact With.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 mt-8 text-lg sm:text-xl md:text-2xl font-light font-inter max-w-2xl leading-relaxed select-none"
          >
            Custom digital experiences crafted for love stories, birthdays, friendships, anniversaries, and unforgettable moments.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto"
          >
            <button
              onClick={() => {
                const el = document.getElementById("showcase");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-5 rounded-2xl bg-gradient-to-r from-pink-accent to-purple-accent text-white font-semibold font-outfit text-base shadow-[0_0_30px_rgba(255,0,127,0.3)] hover:shadow-[0_0_40px_rgba(255,0,127,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Experiences
              </span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-5 rounded-2xl glass-panel text-white font-semibold font-outfit text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Create My Website
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down indicator link */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none">
        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold font-outfit">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full border border-card-border flex items-center justify-center bg-black/40 text-gray-400"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}
