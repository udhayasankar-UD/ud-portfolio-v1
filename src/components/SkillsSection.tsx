import React, { useState } from "react";
import { Award } from "lucide-react";
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

export default function SkillsSection() {
  const [highlightedSkills, setHighlightedSkills] = useState<BrainRegion['skills']>([]);
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);

  const handleSkillsHighlight = (skills: BrainRegion['skills'], region: BrainRegion) => {
    setHighlightedSkills(skills);
    setSelectedRegion(region);
  };

  return (
    <section
      id="skills"
      className="w-full min-h-screen container-responsive py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="gradient-text text-fluid-xl font-bold mb-4">
            Skills
          </h2>
          <p className="text-gray-300 text-fluid-base max-w-2xl mx-auto">
            Explore my brain-mapped skills and technical expertise
          </p>
        </div>

        {/* Brain Explorer & Skills */}
        <div>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="p-2 rounded-lg bg-blue-glow/20">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-glow" />
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Interactive Skills Map</h3>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6 sm:space-y-8">
            {/* Simplified Mobile Skills Chart */}
            <div className="block sm:hidden">
              <h4 className="text-lg font-bold text-white mb-4">Skills Overview</h4>
              <div className="space-y-3">
                {allSkills.map((skill) => {
                  const isHighlighted = highlightedSkills.some(h => h.name === skill.name);
                  return (
                    <div 
                      key={skill.name}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        isHighlighted 
                          ? 'bg-blue-glow/20 border border-blue-glow/40' 
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span className="text-xs text-blue-glow font-bold">{skill.value}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${skill.value}%`,
                            backgroundColor: isHighlighted ? selectedRegion?.color || skill.color : skill.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Brain Explorer */}
            <div className="order-1">
              <BrainExplorer
                onSkillsHighlight={handleSkillsHighlight}
                className="w-full"
              />
            </div>

            {/* Tablet Skills Charts (hidden on mobile) */}
            <div className="hidden sm:block lg:hidden space-y-6">
              {/* Design Skills */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  Design Skills
                </h4>
                <SkillsChart
                  skills={allSkills.filter(skill => ['HTML & CSS', 'Blender'].includes(skill.name))}
                  highlightedSkills={highlightedSkills}
                  regionColor={selectedRegion?.color}
                />
              </div>

              {/* Development Skills */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  Development Skills
                </h4>
                <SkillsChart
                  skills={allSkills.filter(skill => ['JavaScript', 'React', 'Python', 'GameDev'].includes(skill.name))}
                  highlightedSkills={highlightedSkills}
                  regionColor={selectedRegion?.color}
                />
              </div>

              {/* Tools Skills */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  Tools Skills
                </h4>
                <SkillsChart
                  skills={allSkills.filter(skill => ['Cloud', 'AI & ML'].includes(skill.name))}
                  highlightedSkills={highlightedSkills}
                  regionColor={selectedRegion?.color}
                />
              </div>
            </div>

            <SkillDetailPanel region={selectedRegion} />
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
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
    </section>
  );
}