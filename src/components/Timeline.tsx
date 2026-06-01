"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Laptop, Image, Palette, Gift } from "lucide-react";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Choose a Website",
    description: "Browse our showroom catalog of interactive experiences. Pick a layout that resonates with your story—be it a Spotify Wrapped mimic, a digital cake to blow, or a Vintage radio receiver.",
    icon: <Laptop className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "Share Photos & Details",
    description: "Submit your personal details through our secure dashboard. Upload your photos, write out digital letters, select background tracks, or record audio clips that our engineers will integrate.",
    icon: <Image className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "We Design & Customize",
    description: "Our developers and designers custom-code your choices. We polish the interaction curves, optimize the shaders/confetti physics, build out animations, and prepare deployment files.",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    number: "04",
    title: "Receive & Surprise",
    description: "Get a private, custom encrypted URL (or custom domain) containing your experience. Send the secret link to the recipient and watch them interact with their memories.",
    icon: <Gift className="w-5 h-5" />,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out line drawing progress
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-black relative overflow-hidden select-none"
    >
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-pink-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-purple-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <span className="text-pink-accent font-outfit uppercase tracking-widest text-sm font-semibold">
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mt-3 text-white">
            Crafting Your Experience
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            A seamless journey from picking your template to sending an unforgettable interactive memory.
          </p>
        </div>

        {/* Timeline body */}
        <div className="relative">
          {/* Main Central Tracker Line (desktop only, left aligned on mobile) */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-card-border/80 -translate-x-1/2" />
          
          {/* Active Progress Drawing Line */}
          <motion.div
            className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-accent via-purple-accent to-pink-accent origin-top -translate-x-1/2"
            style={{ scaleY }}
          />

          {/* Timeline Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center relative"
                >
                  {/* Timeline Node Circle */}
                  <div className="absolute left-[30px] md:left-1/2 top-2 md:top-auto -translate-x-1/2 z-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      className="w-10 h-10 rounded-full bg-black border-2 border-pink-accent/60 flex items-center justify-center text-xs text-white font-bold font-mono shadow-[0_0_15px_rgba(255,0,127,0.2)]"
                    >
                      {step.number}
                    </motion.div>
                  </div>

                  {/* Left Side: Empty or Card */}
                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 md:pr-16 flex md:justify-end ${
                    isEven ? "block" : "hidden md:block md:invisible"
                  }`}>
                    {isEven && (
                      <TimelineCard step={step} alignment="right" />
                    )}
                  </div>

                  {/* Right Side: Empty or Card */}
                  <div className={`w-full md:w-1/2 pl-[70px] md:pl-16 flex md:justify-start ${
                    !isEven ? "block" : "hidden md:block md:invisible"
                  }`}>
                    {!isEven && (
                      <TimelineCard step={step} alignment="left" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// TIMELINE CARD COMPONENT
// -------------------------------------------------------------
function TimelineCard({ step, alignment }: { step: Step; alignment: "left" | "right" }) {
  const isRight = alignment === "right";

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md p-6 rounded-2xl glass-panel relative shadow-xl select-none"
    >
      {/* Icon Flag */}
      <div className="w-10 h-10 rounded-xl bg-purple-accent/10 border border-purple-accent/20 flex items-center justify-center text-purple-accent mb-4">
        {step.icon}
      </div>

      {/* Step Content */}
      <h3 className="text-xl font-bold font-outfit text-white mb-2">
        {step.title}
      </h3>
      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
}
