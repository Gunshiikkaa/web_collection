"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Position coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lag follow effect
  const springConfig = { damping: 40, stiffness: 350, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only activate cursor on desktop (touch screens have no cursor)
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      return;
    }

    // Hide normal cursor
    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Center the cursor elements on the mouse coordinates
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Track hover types globally using data attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find the closest parent with custom cursor data
      const interactiveEl = target.closest("[data-cursor]") as HTMLElement | null;
      
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor");
        if (type === "view" || type === "drag") {
          setCursorType(type as any);
          return;
        }
      }

      // Check standard interactive elements
      const isClickable = target.closest("button, a, input, select, textarea, [role='button']") || 
                          window.getComputedStyle(target).cursor === "pointer";
      
      if (isClickable) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  // Determine scale and color depending on type
  const getVariants = () => {
    switch (cursorType) {
      case "pointer":
        return {
          width: 44,
          height: 44,
          backgroundColor: "rgba(255, 0, 127, 0.15)",
          borderColor: "#ff007f",
          borderWidth: "1.5px",
        };
      case "view":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: "1px",
        };
      case "drag":
        return {
          width: 80,
          height: 80,
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderColor: "#8b5cf6",
          borderWidth: "1px",
        };
      default:
        return {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          borderWidth: "1px",
        };
    }
  };

  return (
    <div
      ref={cursorRef}
      className="fixed inset-0 pointer-events-none z-9999 mix-blend-screen"
      style={{ pointerEvents: "none" }}
    >
      {/* Outer Ring */}
      <motion.div
        className="fixed rounded-full border flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={getVariants()}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      >
        {/* Outer text indicator */}
        {cursorType === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium font-outfit uppercase tracking-widest text-white text-glow-pink"
          >
            View
          </motion.span>
        )}
        {cursorType === "drag" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium font-outfit uppercase tracking-widest text-purple-accent text-glow-purple"
          >
            Drag
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType !== "default" ? 0.3 : 1,
          backgroundColor: cursorType === "pointer" ? "#ff007f" : "#ffffff",
        }}
      />
    </div>
  );
}
