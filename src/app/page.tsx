"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Particles from "@/components/Particles";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ExperienceModal from "@/components/ExperienceModal";
import { Product } from "@/data/products";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen text-white bg-black font-sans selection:bg-pink-accent/30 selection:text-white overflow-hidden">
        {/* Dynamic Backgrounds & Cursor */}
        <CustomCursor />
        <Particles />

        {/* Hero Section */}
        <Hero />

        {/* Horizontal Card Showcase */}
        <div id="showcase">
          <ProductShowcase onSelectProduct={handleSelectProduct} />
        </div>

        {/* Timeline / How it works */}
        <Timeline />

        {/* Continuous Testimonials slider */}
        <Testimonials />

        {/* Final emotional call-to-action */}
        <FinalCTA />

        {/* Clean Luxury Footer */}
        <Footer />

        {/* Shared Detail Modal overlay */}
        <ExperienceModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </SmoothScroll>
  );
}
