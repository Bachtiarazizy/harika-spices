"use client";
import Image from "next/image";

export default function QualitySection() {
  return (
    <section className="bg-gray-100 py-32 min-h-screen flex items-center font-raleway">
      <div className="container mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 text-lg md:text-xl items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-tight mb-6">Delivering Authentic Spices with Unmatched Quality and Trust for Global Partners</h2>
          <p className="text-gray-700  mb-8">
            At Harika Spices, we are committed to sourcing and exporting the finest spices from Indonesia. Our dedication to quality and authenticity ensures that every product meets the highest standards for our global clients.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Premium Quality</h4>
              <p className="text-gray-700 text-lg">Experience the richness of Indonesia&apos;s spice heritage with every shipment.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Global Trust</h4>
              <p className="text-gray-700 text-lg">Partnering with farmers to ensure ethical sourcing and sustainable practices.</p>
            </div>
          </div>
        </div>

        {/* Right Content (Portrait Image) */}
        <div className="w-full flex items-center justify-end">
          <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image src="/hero-bg.jpg" alt="Harika Spices Indonesia Exporter" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
