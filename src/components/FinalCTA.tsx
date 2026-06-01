"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-28 md:py-36 bg-[#030303] relative overflow-hidden select-none border-t border-card-border/40">
      {/* Background glow orb */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-accent/5 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Tag line */}
          <span className="text-pink-accent font-outfit uppercase tracking-widest text-xs font-bold border border-pink-accent/20 rounded-full px-4 py-1.5 bg-pink-accent/5 mb-8">
            Create a Keepsake
          </span>

          {/* Core Title */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-outfit text-white tracking-tight leading-tight">
            Some Gifts Are Forgotten.
            <br />
            <span className="bg-gradient-to-r from-pink-accent to-purple-accent bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(255,0,127,0.15)]">
              Experiences Stay Forever.
            </span>
          </h2>

          <p className="text-gray-400 mt-6 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            Ready to blow them away with an interactive love story, customized birthday visuals, or retro radio mix-tapes? Let's build your showcase.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto">
            <a
              href={`https://wa.me/917703950966?text=${encodeURIComponent(
                "Hi AuraCraft! I am ready to order a custom interactive website experience. Let's get started!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4.5 rounded-xl bg-gradient-to-r from-pink-accent to-purple-accent text-white font-semibold font-outfit text-sm hover:opacity-95 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(255,0,127,0.2)]"
            >
              Order Now
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("showcase");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4.5 rounded-xl glass-panel text-white font-semibold font-outfit text-sm hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              View Demos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
