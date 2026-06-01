"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Product } from "@/data/products";
import { ArrowUpRight, Play, Heart, Radio, Music, Tv, Flame } from "lucide-react";

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
}

export default function ProductShowcase({ onSelectProduct }: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only register on client
    gsap.registerPlugin(ScrollTrigger);

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-200vw", // Total width of extra scrolled area (3 viewports total)
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${triggerRef.current?.offsetWidth}`,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-black py-20 relative select-none">
      {/* Background Ambient Lights */}
      <div className="absolute top-[30%] left-[40vw] w-[40vw] h-[40vw] rounded-full bg-pink-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10vw] w-[35vw] h-[35vw] rounded-full bg-purple-accent/5 blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="px-6 md:px-16 mb-16 relative z-10">
        <span className="text-pink-accent font-outfit uppercase tracking-widest text-sm font-semibold">
          Interactive Showroom
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-outfit mt-3">
          Explore The Experiences
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-xl">
          Hover over each card to preview the live interactive mechanics. Click to unlock customization details.
        </p>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="flex" style={{ width: "300vw" }}>
        <div
          ref={sectionRef}
          className="flex gap-8 px-6 md:px-16"
          style={{ willChange: "transform" }}
        >
          {products.map((product) => (
            <ShowcaseCard
              key={product.id}
              product={product}
              onClick={() => onSelectProduct(product)}
            />
          ))}

          {/* Catalog End Card */}
          <div className="w-[30vw] md:w-[24vw] min-w-[280px] h-[55vh] flex flex-col justify-between p-8 rounded-3xl border border-dashed border-card-border bg-card-bg/20 backdrop-blur-md self-center flex-shrink-0">
            <div>
              <span className="text-pink-accent font-outfit text-sm font-medium">Bespoke Design</span>
              <h3 className="text-2xl md:text-3xl font-bold font-outfit mt-4 text-white">Have a unique idea?</h3>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                We design entirely custom concepts tailored exactly to your relationship, brand, or memory.
              </p>
            </div>
            <a
              href={`https://wa.me/917703950966?text=${encodeURIComponent(
                "Hi Thee_Basicss! I have a unique idea for a custom website design and want to request a bespoke package. Let's talk details!"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-6 py-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-between group hover:bg-pink-accent hover:text-white transition-all duration-300"
            >
              Request Custom Design
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// INDIVIDUAL SHOWCASE CARD COMPONENT WITH TILT & MICRO-PREVIEWS
// -------------------------------------------------------------
function ShowcaseCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Tilt limits: rotateX max 8deg, rotateY max 8deg
    setTilt({
      rotateX: (yc - y) / 15,
      rotateY: (x - xc) / 15,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      data-cursor="view"
      className="w-[85vw] sm:w-[60vw] md:w-[42vw] max-w-[500px] h-[520px] md:h-[550px] rounded-3xl glass-panel relative flex flex-col justify-between overflow-hidden p-6 md:p-8 flex-shrink-0 cursor-pointer transition-shadow duration-500 shadow-2xl"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.015 : 1})`,
        transition: isHovered ? "box-shadow 0.3s, transform 0.05s ease-out" : "box-shadow 0.5s, transform 0.5s ease-out",
        boxShadow: isHovered
          ? `0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px ${product.accentColor}25`
          : "0 10px 40px -20px rgba(0, 0, 0, 0.8)",
      }}
    >
      {/* Background Radial Glow on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at 50% 50%, ${product.accentColor}10, transparent)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Card Header */}
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold font-outfit border border-card-border rounded-full px-3 py-1">
            Experience Showroom
          </span>
          <h3 className="text-3xl font-bold font-outfit mt-4 text-white flex items-center gap-3">
            {product.title}
          </h3>
        </div>
        <div
          className="w-12 h-12 rounded-full border border-card-border flex items-center justify-center bg-black/40 hover:bg-white hover:text-black transition-all"
          onClick={(e) => {
            e.stopPropagation();
            window.open(product.demoUrl, "_blank");
          }}
          title="Open Live Website Demo"
        >
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Card Interactive Micro-Preview Engine */}
      <div className="h-[40%] md:h-[45%] w-full flex items-center justify-center relative my-4 overflow-hidden rounded-2xl bg-black/40 border border-card-border">
        {/* High-fidelity visual mockup background */}
        <img
          src={`/${product.id}.png`}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none ${
            isHovered ? "scale-105 opacity-10 blur-[1px]" : "scale-100 opacity-40"
          }`}
        />

        {/* Interactive preview layers */}
        <div
          className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {product.id === "heart-lock" && <HeartLockPreview active={isHovered} />}
          {product.id === "birthday-cake" && <BirthdayCakePreview active={isHovered} />}
          {product.id === "vintage-radio" && <VintageRadioPreview active={isHovered} />}
          {product.id === "couple-spotify" && <CoupleSpotifyPreview active={isHovered} />}
          {product.id === "couple-netflix" && <CoupleNetflixPreview active={isHovered} />}
        </div>
      </div>

      {/* Card Bottom Meta */}
      <div className="relative z-10 mt-auto">
        <p className="text-gray-300 text-sm font-medium leading-relaxed">
          {product.tagline}
        </p>
        <div className="flex items-center justify-between mt-4 border-t border-card-border/60 pt-4">
          <span className="text-xs text-gray-500">Click to explore details</span>
          <span className="text-xs text-white/80 font-semibold group flex items-center gap-1">
            Preview Now <span className="text-pink-accent group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MICRO-PREVIEW ENGINES
// -------------------------------------------------------------

// 1. ❤️ HEART LOCK
function HeartLockPreview({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        {/* Pulsing ring behind the lock */}
        <div
          className={`absolute inset-0 w-16 h-16 rounded-full bg-pink-accent/20 transition-transform duration-1000 ${
            active ? "scale-[2] opacity-0 animate-ping" : "scale-100 opacity-100"
          }`}
        />
        {/* Dial ring */}
        <div
          className={`w-16 h-16 rounded-full border-2 border-dashed border-pink-accent/40 flex items-center justify-center transition-transform duration-1000 ${
            active ? "rotate-[360deg] scale-110" : "rotate-0 scale-100"
          }`}
        >
          {/* Keyhole/Lock Center */}
          <div className="w-10 h-10 rounded-full bg-black/60 border border-card-border flex items-center justify-center">
            {active ? (
              <Heart className="w-5 h-5 text-pink-accent fill-pink-accent animate-pulse" />
            ) : (
              <span className="text-xs font-mono text-pink-accent/70 font-bold">14</span>
            )}
          </div>
        </div>
      </div>
      <div className="text-center">
        <span className="text-[10px] font-mono tracking-widest text-pink-accent uppercase">
          {active ? "Access Granted: Unlocking..." : "Enter Passcode"}
        </span>
      </div>
    </div>
  );
}

// 2. 🎂 BIRTHDAY CAKE
function BirthdayCakePreview({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Confetti Rain Layer (only active on hover) */}
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * -50;
            const delay = Math.random() * 0.8;
            const color = ["bg-yellow-400", "bg-pink-500", "bg-blue-400", "bg-green-400", "bg-purple-500"][i % 5];
            return (
              <div
                key={i}
                className={`absolute w-1.5 h-1.5 rounded-full ${color}`}
                style={{
                  left: `${randomX}%`,
                  top: `${randomY}px`,
                  animation: `fall 1.5s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Isometric Cake Drawing */}
      <div className="relative flex flex-col items-center mt-4">
        {/* Flames */}
        <div className="flex gap-5 mb-1 justify-center relative">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="relative w-2 h-6 flex flex-col items-center">
              {/* Flame bubble */}
              <div
                className={`w-2.5 h-4 bg-orange-400 rounded-full transition-all duration-300 ${
                  active ? "opacity-0 scale-0 -translate-y-4" : "opacity-100 scale-100"
                }`}
                style={{
                  background: "radial-gradient(circle, #fef08a 20%, #f97316 80%)",
                  animation: !active ? `flicker ${0.3 + idx * 0.1}s ease-in-out infinite alternate` : "none",
                }}
              />
              {/* Candle stem */}
              <div className="w-1 h-3 bg-blue-400 rounded-sm" />
            </div>
          ))}
        </div>

        {/* Cake top circle */}
        <div className="w-24 h-8 rounded-full bg-white border border-gray-200 relative flex items-center justify-center shadow-lg">
          <div className="w-20 h-5 rounded-full bg-orange-200" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); }
          100% { transform: scale(1.15) rotate(1deg); }
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase mt-3">
        {active ? "Candles Extinguished!" : "Blow to Extinguish"}
      </span>
    </div>
  );
}

// 3. 📻 VINTAGE RADIO
function VintageRadioPreview({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full px-6">
      {/* Static Visualizer sweep */}
      <div className="w-36 h-12 bg-black/80 rounded-md border border-amber-accent/20 relative overflow-hidden flex items-end px-3 py-1 gap-[3px]">
        {/* Dynamic sweeping lines */}
        {[...Array(12)].map((_, i) => {
          const heightPercent = active ? 20 + Math.random() * 80 : 15;
          return (
            <div
              key={i}
              className="w-1.5 bg-amber-accent/80 rounded-t-sm transition-all duration-200"
              style={{
                height: `${heightPercent}%`,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          );
        })}

        {/* Sweep scale indicator line */}
        <div
          className={`absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_red] transition-all duration-1000 ${
            active ? "left-[90%] scale-y-110" : "left-[10%] scale-y-100"
          }`}
        />
      </div>

      <div className="flex gap-8 justify-center items-center">
        {/* Dial knob */}
        <div
          className={`w-6 h-6 rounded-full border border-amber-accent/40 bg-zinc-800 flex items-center justify-center transition-transform duration-1000 ${
            active ? "rotate-[180deg]" : "rotate-0"
          }`}
        >
          <div className="w-1 h-3 bg-amber-accent rounded-sm translate-y-[-2px]" />
        </div>
        <span className="text-[10px] font-mono tracking-widest text-amber-accent uppercase">
          {active ? "Tuned: 98.4 FM Mixtape" : "Scanning Mixtape"}
        </span>
      </div>
    </div>
  );
}

// 4. 🎵 COUPLE SPOTIFY
function CoupleSpotifyPreview({ active }: { active: boolean }) {
  return (
    <div className="flex items-center justify-center w-full h-full relative overflow-hidden px-8">
      {/* Vinyl record container */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Vinyl Disc that slides out */}
        <div
          className={`absolute w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shadow-lg transition-transform duration-700 ${
            active ? "translate-x-12 rotate-[360deg] animate-spin-slow" : "translate-x-0 rotate-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="w-8 h-8 rounded-full bg-spotify/90 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-black" />
          </div>
        </div>

        {/* Album Artwork Cover Card */}
        <div className="w-24 h-24 bg-gradient-to-br from-spotify/30 to-black rounded-lg border border-spotify/30 relative z-10 flex flex-col justify-between p-3 shadow-2xl">
          <Music className="w-6 h-6 text-spotify animate-pulse" />
          <div>
            <div className="h-2 w-12 bg-white/70 rounded-full mb-1" />
            <div className="h-1.5 w-8 bg-white/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="absolute bottom-2 left-6 right-6 flex flex-col gap-1">
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-spotify rounded-full transition-all duration-[3000ms] ease-out"
            style={{ width: active ? "100%" : "20%" }}
          />
        </div>
        <div className="flex justify-between text-[8px] text-gray-500 font-mono">
          <span>0:45</span>
          <span>3:20</span>
        </div>
      </div>
    </div>
  );
}

// 5. 🎬 COUPLE NETFLIX
function CoupleNetflixPreview({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full relative flex flex-col justify-end p-4 bg-gradient-to-t from-black via-black/40 to-transparent">
      {/* Glowing Backdrop */}
      <div
        className={`absolute inset-0 bg-red-600/10 transition-opacity duration-500 pointer-events-none ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Cinematic Logo banner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`text-6xl font-black font-outfit text-netflix tracking-tighter transition-all duration-700 ${
            active ? "scale-125 opacity-10 blur-[2px]" : "scale-100 opacity-60"
          }`}
        >
          N
        </span>
      </div>

      {/* Film Overlay details */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-netflix text-white font-bold px-1.5 py-0.5 rounded-sm">
            ORIGINAL
          </span>
          <span
            className={`text-[9px] text-green-400 font-bold tracking-wider transition-opacity duration-300 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            99% Match
          </span>
        </div>
        <h4 className="text-lg font-bold font-outfit text-white tracking-wide leading-tight">
          Our Love Story
        </h4>
        <p className="text-[9px] text-gray-400 line-clamp-1">
          Starring You & Me • Season 1 • Episodes: 12
        </p>

        {/* Play indicator bar */}
        <div
          className={`h-0.5 bg-netflix rounded-full transition-all duration-[2000ms] ${
            active ? "w-3/4" : "w-1/4"
          }`}
        />
      </div>
    </div>
  );
}
