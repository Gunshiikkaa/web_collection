"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function FloatingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Mouse positions for parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Soft springs
  const springX = useSpring(rawX, { damping: 50, stiffness: 200 });
  const springY = useSpring(rawY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse positions (-0.5 to 0.5)
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      rawX.set(nx);
      rawY.set(ny);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rawX, rawY]);

  // Parallax transform bindings per depth layer
  const layer1X = useTransform(springX, (val) => val * -60);
  const layer1Y = useTransform(springY, (val) => val * -60);
  
  const layer2X = useTransform(springX, (val) => val * 40);
  const layer2Y = useTransform(springY, (val) => val * 40);

  const layer3X = useTransform(springX, (val) => val * -25);
  const layer3Y = useTransform(springY, (val) => val * -25);

  const layer4X = useTransform(springX, (val) => val * 55);
  const layer4Y = useTransform(springY, (val) => val * 55);

  const layer5X = useTransform(springX, (val) => val * -45);
  const layer5Y = useTransform(springY, (val) => val * -45);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-10"
    >
      {/* Glow Backdrops */}
      <div className="absolute top-[20%] left-[15%] w-96 h-96 rounded-full bg-pink-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-purple-accent/10 blur-[120px] pointer-events-none" />

      {/* 1. ❤️ Floating Heart */}
      <motion.div
        className="absolute top-[18%] left-[8%] md:left-[12%] animate-float-slow"
        style={{ x: layer1X, y: layer1Y }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_35px_rgba(255,0,127,0.45)] filter transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer"
          onClick={() => {
            const el = document.getElementById("showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <defs>
            <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff007f" />
              <stop offset="50%" stopColor="#d9006c" />
              <stop offset="100%" stopColor="#7a0035" />
            </linearGradient>
            <linearGradient id="heartGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Main 3D Shape */}
          <path
            d="M100 170 C100 170 20 110 20 65 C20 35 45 15 75 15 C90 15 100 25 100 25 C100 25 110 15 125 15 C155 15 180 35 180 65 C180 110 100 170 100 170 Z"
            fill="url(#heartGrad)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          {/* Glass Gloss Overlay */}
          <path
            d="M100 20 C100 20 110 25 125 25 C145 25 165 40 165 65 C165 85 140 115 115 135 L105 142 C101 145 100 145 100 145 C100 145 99 145 95 142 L85 135 C60 115 35 85 35 65 C35 40 55 25 75 25 C90 25 100 20 100 20 Z"
            fill="url(#heartGlass)"
          />
          {/* Light Reflection Curve */}
          <path
            d="M45 55 C45 40 60 30 75 30"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </svg>
      </motion.div>

      {/* 2. 🎵 Spinning Vinyl Disc */}
      <motion.div
        className="absolute top-[22%] right-[8%] md:right-[15%] animate-float-medium"
        style={{ x: layer2X, y: layer2Y }}
      >
        <div className="relative group pointer-events-auto cursor-pointer">
          <svg
            width="140"
            height="140"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin-slow drop-shadow-[0_0_30px_rgba(139,92,246,0.35)] filter transition-all duration-300 hover:scale-105"
            onClick={() => {
              const el = document.getElementById("showcase");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <defs>
              <radialGradient id="vinylShine" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="40%" stopColor="#111111" />
                <stop offset="70%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <linearGradient id="labelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {/* Outer vinyl circle */}
            <circle cx="100" cy="100" r="90" fill="url(#vinylShine)" stroke="#222" strokeWidth="2" />
            {/* Grooves */}
            <circle cx="100" cy="100" r="80" stroke="#333" strokeWidth="0.7" />
            <circle cx="100" cy="100" r="70" stroke="#2a2a2a" strokeWidth="0.7" />
            <circle cx="100" cy="100" r="60" stroke="#333" strokeWidth="0.7" />
            <circle cx="100" cy="100" r="50" stroke="#222" strokeWidth="0.7" />
            
            {/* Center Label */}
            <circle cx="100" cy="100" r="32" fill="url(#labelGrad)" />
            {/* Mini Label details */}
            <circle cx="100" cy="100" r="24" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <path d="M90 100 A 10 10 0 0 1 110 100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
            
            {/* Spindle hole */}
            <circle cx="100" cy="100" r="8" fill="#030303" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>

      {/* 3. 🎬 Film Strip */}
      <motion.div
        className="absolute bottom-[28%] left-[6%] md:left-[10%] animate-float-fast"
        style={{ x: layer3X, y: layer3Y }}
      >
        <svg
          width="150"
          height="110"
          viewBox="0 0 200 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_25px_rgba(229,9,20,0.3)] filter transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer origin-center rotate-[-12deg]"
          onClick={() => {
            const el = document.getElementById("showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <defs>
            <linearGradient id="filmBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c1c1e" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            <linearGradient id="filmGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e50914" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Glowing ribbon base */}
          <rect x="10" y="25" width="180" height="100" rx="12" fill="url(#filmBody)" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          
          {/* Screen area (inner image placeholder) */}
          <rect x="35" y="45" width="130" height="60" rx="4" fill="url(#filmGlow)" />
          
          {/* Film sprockets (top) */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((cx, idx) => (
            <rect key={`top-${idx}`} x={cx - 5} y="32" width="10" height="7" rx="1.5" fill="#030303" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          ))}

          {/* Film sprockets (bottom) */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((cx, idx) => (
            <rect key={`bot-${idx}`} x={cx - 5} y="111" width="10" height="7" rx="1.5" fill="#030303" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          ))}

          {/* Play Icon details */}
          <path d="M93 63 L113 75 L93 87 Z" fill="white" opacity="0.8" />
        </svg>
      </motion.div>

      {/* 4. 🎂 3D-ish Birthday Cake */}
      <motion.div
        className="absolute bottom-[20%] right-[8%] md:right-[12%] animate-float-slow"
        style={{ x: layer4X, y: layer4Y }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_35px_rgba(245,158,11,0.35)] filter transition-all duration-300 hover:scale-105 pointer-events-auto cursor-pointer"
          onClick={() => {
            const el = document.getElementById("showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <defs>
            <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <linearGradient id="cakeFrosting" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#eab308" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Cake Base Layer */}
          <path d="M30 130 C30 110 60 100 100 100 C140 100 170 110 170 130 L170 160 C170 180 140 190 100 190 C60 190 30 180 30 160 Z" fill="url(#cakeGrad)" stroke="rgba(255,255,255,0.06)" />
          {/* Cake Top Frosting Ring */}
          <ellipse cx="100" cy="130" rx="70" ry="30" fill="url(#cakeFrosting)" stroke="rgba(0,0,0,0.05)" />
          
          {/* Frosting Drips */}
          <path d="M30 130 C30 142 45 145 60 138 C75 132 85 148 100 138 C115 128 125 144 140 135 C155 126 170 138 170 130 C170 115 140 100 100 100 C60 100 30 115 30 130 Z" fill="url(#cakeFrosting)" />

          {/* Candle 1 (Center) */}
          <rect x="96" y="70" width="8" height="35" rx="2" fill="#3b82f6" />
          <line x1="100" y1="70" x2="100" y2="62" stroke="#222" strokeWidth="2" />
          {/* Candle 1 Flame */}
          <ellipse cx="100" cy="54" rx="6" ry="10" fill="url(#flameGlow)" />
          <circle cx="100" cy="54" r="3" fill="#ffffff" />

          {/* Candle 2 (Left) */}
          <rect x="66" y="80" width="6" height="30" rx="1.5" fill="#a855f7" />
          <line x1="69" y1="80" x2="69" y2="73" stroke="#222" strokeWidth="2" />
          <ellipse cx="69" cy="67" rx="5" ry="8" fill="url(#flameGlow)" />

          {/* Candle 3 (Right) */}
          <rect x="126" y="80" width="6" height="30" rx="1.5" fill="#10b981" />
          <line x1="129" y1="80" x2="129" y2="73" stroke="#222" strokeWidth="2" />
          <ellipse cx="129" cy="67" rx="5" ry="8" fill="url(#flameGlow)" />
        </svg>
      </motion.div>

      {/* 5. 📻 Vintage Radio */}
      <motion.div
        className="absolute top-[48%] right-[4%] md:right-[6%] animate-float-medium"
        style={{ x: layer5X, y: layer5Y }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_30px_rgba(245,158,11,0.25)] filter transition-all duration-300 hover:scale-110 pointer-events-auto cursor-pointer rotate-[8deg]"
          onClick={() => {
            const el = document.getElementById("showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <defs>
            <linearGradient id="radioWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="goldBezel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>

          {/* Wooden Radio Body */}
          <rect x="20" y="45" width="160" height="110" rx="16" fill="url(#radioWood)" stroke="url(#goldBezel)" strokeWidth="3" />
          
          {/* Handle */}
          <path d="M50 45 C50 25 150 25 150 45" stroke="url(#goldBezel)" strokeWidth="6" fill="none" strokeLinecap="round" />
          
          {/* Speaker Grill */}
          <rect x="35" y="70" width="70" height="65" rx="6" fill="#1e1b4b" stroke="rgba(255,255,255,0.06)" />
          {[78, 86, 94, 102, 110, 118, 126].map((gy, idx) => (
            <line key={`grill-${idx}`} x1="42" y1={gy} x2="98" y2={gy} stroke="rgba(245,158,11,0.4)" strokeWidth="2" />
          ))}

          {/* Tuning Dial Plate */}
          <rect x="115" y="70" width="50" height="35" rx="4" fill="#000000" stroke="url(#goldBezel)" strokeWidth="1" />
          {/* Frequency Line */}
          <line x1="120" y1="87" x2="160" y2="87" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          {/* Pointer */}
          <line x1="138" y1="75" x2="138" y2="99" stroke="#ef4444" strokeWidth="2" />

          {/* Knobs */}
          <circle cx="128" cy="125" r="10" fill="url(#goldBezel)" />
          <circle cx="128" cy="125" r="6" fill="#111" />

          <circle cx="152" cy="125" r="10" fill="url(#goldBezel)" />
          <circle cx="152" cy="125" r="6" fill="#111" />
        </svg>
      </motion.div>
    </div>
  );
}
