"use client";

import { testimonials } from "@/data/products";
import { Star } from "lucide-react";

export default function Testimonials() {
  // Duplicate testimonials list to make the loop seamless
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-[#030303] overflow-hidden select-none border-t border-b border-card-border/40">
      <div className="container mx-auto px-6 max-w-6xl mb-16 text-center">
        <span className="text-pink-accent font-outfit uppercase tracking-widest text-sm font-semibold">
          Customer Stories
        </span>
        <h2 className="text-4xl md:text-6xl font-bold font-outfit mt-3 text-white">
          Loved by Hearts Worldwide
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          See how our custom digital experiences have surprised, delighted, and brought people closer together.
        </p>
      </div>

      {/* Infinite Horizontal Scroll Track */}
      <div className="relative w-full flex items-center justify-start py-4 overflow-hidden mask-gradient-x">
        {/* Soft fading edges overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

        {/* Scrolling elements container */}
        <div className="animate-marquee gap-6 flex">
          {doubledTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-[300px] md:w-[380px] p-6 rounded-2xl glass-panel relative flex-shrink-0 flex flex-col justify-between shadow-lg"
            >
              {/* Card Quote */}
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Card User Meta */}
              <div className="flex items-center justify-between border-t border-card-border/50 pt-4">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-900 border border-card-border text-sm font-bold font-outfit text-white shadow-xl relative"
                  >
                    {/* Tiny ambient ring glow inside */}
                    <div className="absolute inset-0.5 rounded-full border border-pink-accent/20 animate-pulse" />
                    {testimonial.initials}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {testimonial.name}
                    </h4>
                    <span className="text-[10px] text-gray-500 font-medium font-outfit">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
