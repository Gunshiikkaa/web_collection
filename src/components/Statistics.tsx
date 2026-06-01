"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, RefreshCw, Clock, Globe } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}

function StatItem({ icon, target, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // 1.5 seconds count duration
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = Math.floor(easedProgress * target);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col items-center text-center relative select-none"
    >
      {/* Icon Frame */}
      <div className="w-12 h-12 rounded-xl bg-pink-accent/10 border border-pink-accent/20 flex items-center justify-center text-pink-accent mb-6">
        {icon}
      </div>

      {/* Counter */}
      <h3 className="text-4xl md:text-5xl font-black font-outfit text-white tracking-tight mb-2">
        {count}
        <span className="text-pink-accent">{suffix}</span>
      </h3>

      {/* Label */}
      <p className="text-gray-400 text-sm font-medium tracking-wide">
        {label}
      </p>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 md:py-32 bg-[#030303] relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-accent/5 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-pink-accent font-outfit uppercase tracking-widest text-sm font-semibold">
            Track Record
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mt-3 text-white">
            Created for Connection
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            From anniversaries to milestones, we deliver digital memories that bridge gaps and create bonds.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatItem
            icon={<Award className="w-6 h-6" />}
            target={100}
            suffix="+"
            label="Custom Experiences Built"
          />
          <StatItem
            icon={<RefreshCw className="w-6 h-6" />}
            target={95}
            suffix="%"
            label="Repeat Happy Customers"
          />
          <StatItem
            icon={<Clock className="w-6 h-6" />}
            target={24}
            suffix="h"
            label="Delivery Option Available"
          />
          <StatItem
            icon={<Globe className="w-6 h-6" />}
            target={1}
            suffix="B"
            label="Worldwide Virtual Delivery"
          />
        </div>
      </div>
    </section>
  );
}
