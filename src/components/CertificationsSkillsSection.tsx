import React, { useState } from "react";
import { Award } from "lucide-react";
import CertCarousel from "./CertCarousel";
import SkillsChart from "./SkillsChart";
import BrainExplorer from "./BrainExplorer";
import SkillDetailPanel from "./SkillDetailPanel";
import type { BrainRegion } from "./BrainExplorer";

const allSkills = [
  { name: "HTML & CSS", value: 70, color: "#60A5FA", description: "Strong foundation in web fundamentals" },
  { name: "JavaScript", value: 40, color: "#818CF8", description: "Solid understanding of JS concepts" },
  { name: "React", value: 40, color: "#6B8CFF", description: "Building modern user interfaces" },
  { name: "AI & ML", value: 10, color: "#A855F7", description: "Learning machine learning basics" },
  { name: "Python", value: 50, color: "#EC4899", description: "Used for scripting & small game prototypes" },
  { name: "Blender", value: 20, color: "#F59E0B", description: "Creating 3D models and animations" },
  { name: "GameDev", value: 50, color: "#10B981", description: "Unity and game design fundamentals" },
  { name: "Cloud", value: 10, color: "#06B6D4", description: "Exploring cloud technologies" }
];

export default function CertificationsSkillsSection() {
  const [highlightedSkills, setHighlightedSkills] = useState<BrainRegion['skills']>([]);
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);

  const handleSkillsHighlight = (skills: BrainRegion['skills'], region: BrainRegion) => {
    setHighlightedSkills(skills);
    setSelectedRegion(region);
  };

  return (
    <section
      id="certifications-skills"
      className="w-full min-h-screen px-4 py-16 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-4">
            Certifications & Skills
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore my brain-mapped skills and professional certifications
          </p>
        </div>

        <div className="space-y-16">
          {/* Certifications Carousel */}
          <div>
            <CertCarousel />
          </div>

          {/* Brain Explorer & Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-glow/20">
                <Award className="w-6 h-6 text-blue-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white">Interactive Skills Map</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Skills Chart */}
              <div className="space-y-6">
                <SkillsChart 
                  skills={allSkills} 
                  highlightedSkills={highlightedSkills}
                  regionColor={selectedRegion?.color}
                />
                <SkillDetailPanel region={selectedRegion} />
              </div>

              {/* Brain Explorer */}
              <div className="lg:sticky lg:top-8">
                <BrainExplorer 
                  onSkillsHighlight={handleSkillsHighlight}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}