"use client";

import { Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-card-border/60 py-16 md:py-20 select-none">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Logo & Pitch */}
          <div>
            <h3 className="text-2xl font-black font-outfit tracking-tighter text-white">
              Aura<span className="text-pink-accent">Craft</span>
            </h3>
            <p className="text-gray-500 text-xs md:text-sm mt-3 max-w-xs leading-relaxed">
              Crafting premium interactive digital experiences and custom web keepsakes for relationships, anniversaries, birthdays, and unforgettable moments.
            </p>
          </div>

          {/* Social Channels & Links */}
          <div className="flex flex-col md:items-end gap-4">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold font-outfit">
              Get in Touch
            </span>

            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-card-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 bg-card-bg/20 hover:bg-white/5 transition-all select-none cursor-pointer"
                title="Instagram Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@auracraft.studio"
                className="w-11 h-11 rounded-full border border-card-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 bg-card-bg/20 hover:bg-white/5 transition-all select-none cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-card-border flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 bg-card-bg/20 hover:bg-white/5 transition-all select-none cursor-pointer"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-card-border/40 mt-12 pt-8 text-[11px] text-gray-500 gap-4">
          <span>&copy; {currentYear} AuraCraft Studio. All rights reserved.</span>
          <button
            onClick={handleBackToTop}
            className="hover:text-white transition-colors cursor-pointer font-semibold uppercase tracking-wider font-outfit"
          >
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
