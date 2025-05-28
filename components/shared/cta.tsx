import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Cta() {
  return (
    <section className="relative w-full bg-[#4A2C1D] text-white px-8 md:px-16 py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl md:text-4xl font-light mb-4 text-white">Ready to Experience Premium Quality?</h3>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">Contact us today to learn more about our wholesale opportunities and premium spice offerings.</p>
        <Link href="/contact" className="inline-flex items-center gap-3 bg-[#D2691E] text-white px-8 py-4 rounded-full hover:bg-[#B8541A] transition-colors duration-300 font-medium">
          <span>Get Started</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
