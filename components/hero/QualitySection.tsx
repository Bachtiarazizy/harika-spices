"use client";
import Image from "next/image";

export default function QualitySection() {
  return (
    <section className="bg-gray-100 py-32 min-h-screen flex items-center font-raleway">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-lg md:text-xl items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-calistoga text-gray-900 leading-tight mb-6">Who We Are</h2>
          <p className="text-gray-700 text-base md:text-lg  mb-8">
            Harika Spices is a premium Indonesian spices supplier, operating under the Harika master brand ecosystem. We focus on sustainable sourcing, quality control, and export‑ready supply chains for Indonesian spices.
          </p>
          <p className="text-gray-700 text-base md:text-lg  mb-8">
            Our role is simple and clear: Connect Indonesian spice farmers to global buyers, Maintain consistent quality and volume, Supply authentic Indonesian spices for export.We work with international partners who value traceability,
            reliability, and premium quality.{" "}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-700 text-base md:text-lg">Experience the richness of Indonesia&apos;s spice heritage with every shipment.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Global Trust</h4>
              <p className="text-gray-700 text-base md:text-lg">Partnering with farmers to ensure ethical sourcing and sustainable practices.</p>
            </div>
          </div>
        </div>

        {/* Right Content (Portrait Image) */}
        <div className="w-full hidden md:flex items-center justify-end">
          <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image src="/hero-bg.jpg" alt="Harika Spices Indonesia Exporter" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
