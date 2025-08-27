import Image from "next/image";
import React from "react";

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-100 py-32 min-h-screen flex items-center font-raleway">
      <div className="container text-lg md:text-xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-between">
        <div className="w-full flex items-center justify-start">
          <div className="relative w-[500px] h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image src="/hero.jpg" alt="Spices" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill className="object-cover rounded-lg" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-calistoga text-gray-900 leading-snug mb-6">Why Choose Harika Spices?</h2>
          <p className="text-gray-700 mb-8">Choosing Harika means gaining more than just a supplier — you gain a partner who prioritizes quality, trust, and your business growth.</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Direct sourcing from Indonesian farmers</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Rigorous quality control at every stage</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Transparent and ethical trade practices</h4>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Competitive pricing and consistent supply</h4>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-[#4D3D2A] text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">Request a Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
}
