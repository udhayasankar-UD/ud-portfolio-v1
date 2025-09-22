import React from "react";
import { Award } from "lucide-react";
import CertCarousel from "./CertCarousel";

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="w-full min-h-screen container-responsive py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="gradient-text text-fluid-xl font-bold mb-4">
            Certifications
          </h2>
          <p className="text-gray-300 text-fluid-base max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        {/* Certifications Carousel */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="p-2 rounded-lg bg-blue-glow/20">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-glow" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">My Certifications</h3>
        </div>
        
        <CertCarousel />
      </div>
    </section>
  );
}