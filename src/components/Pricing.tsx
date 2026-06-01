"use client";

import { pricingPlans } from "@/data/products";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const getWhatsAppLink = (planName: string, price: string) => {
    const phone = "1234567890"; // Prefilled contact phone, customizable
    const text = encodeURIComponent(
      `Hi AuraCraft! I am looking to order the ${planName} package (${price}) for a custom interactive experience. I'd love to share my details and get started!`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-black relative overflow-hidden select-none">
      {/* Glow Orbs */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] rounded-full bg-pink-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-pink-accent font-outfit uppercase tracking-widest text-sm font-semibold">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-6xl font-bold font-outfit mt-3 text-white">
            Choose Your Experience
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            Transparent pricing crafted to fit simple template gifts or custom 1-of-1 digital masterpieces.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 bg-card-bg/40 backdrop-blur-md border flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? "border-pink-accent/40 shadow-[0_0_40px_rgba(255,0,127,0.12)] md:scale-105"
                  : "border-card-border hover:border-card-border-hover"
              } glass-panel-hover`}
            >
              {/* Popular Tag */}
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-accent to-purple-accent text-white text-[10px] font-bold font-outfit uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Card Title & Cost */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 font-outfit">
                  {plan.name}
                </span>
                
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-5xl font-black font-outfit text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">USD</span>
                </div>

                <p className="text-gray-400 mt-3 text-xs leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>

                {/* Features list */}
                <div className="border-t border-card-border/60 my-6 pt-6">
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular ? "bg-pink-accent/15 text-pink-accent" : "bg-zinc-800 text-gray-400"
                          }`}
                        >
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Order Button */}
              <a
                href={getWhatsAppLink(plan.name, plan.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-xl text-center text-sm font-semibold select-none cursor-pointer mt-8 transition-all block ${
                  plan.popular
                    ? "bg-gradient-to-r from-pink-accent to-purple-accent text-white shadow-md hover:opacity-95"
                    : "bg-white text-black hover:bg-pink-accent hover:text-white"
                }`}
              >
                Order {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
