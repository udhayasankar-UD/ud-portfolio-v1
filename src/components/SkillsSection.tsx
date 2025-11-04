import React, { useState } from "react";
import { Award } from "lucide-react";
import SkillsChart from "./SkillsChart";
import BrainExplorer from "./BrainExplorer";
import SkillDetailPanel from "./SkillDetailPanel";
import type { BrainRegion } from "./BrainExplorer";

const allSkills = [
  { name: "HTML & CSS", value: 70, color: "#60A5FA", description: "Strong foundation in web fundamentals", category: "design" },
  { name: "JavaScript", value: 40, color: "#818CF8", description: "Solid understanding of JS concepts", category: "development" },
  { name: "React", value: 40, color: "#6B8CFF", description: "Building modern user interfaces", category: "development" },
  { name: "Python", value: 50, color: "#EC4899", description: "Used for scripting & small game prototypes", category: "development" },
  { name: "Blender", value: 20, color: "#F59E0B", description: "Creating 3D models and animations", category: "design" },
  { name: "GameDev", value: 50, color: "#10B981", description: "Unity and game design fundamentals", category: "development" },
  { name: "Cloud", value: 10, color: "#EF4444", description: "Exploring cloud technologies", category: "tools" },
  { name: "AI & ML", value: 10, color: "#EF4444", description: "Learning machine learning basics", category: "tools" },
  { name: "Build Tools", value: 35, color: "#EF4444", description: "Development workflow optimization", category: "tools" }
];

type SkillCategory = 'all' | 'design' | 'development' | 'tools';

const categoryConfig = {
  design: { name: 'Design', color: 'bg-pink-500', skills: allSkills.filter(skill => skill.category === 'design') },
  development: { name: 'Development', color: 'bg-yellow-500', skills: allSkills.filter(skill => skill.category === 'development') },
  tools: { name: 'Tools', color: 'bg-red-500', skills: allSkills.filter(skill => skill.category === 'tools') },
  all: { name: 'All Skills', color: 'bg-blue-500', skills: allSkills }
};

export default function SkillsSection() {
  const [highlightedSkills, setHighlightedSkills] = useState<BrainRegion['skills']>([]);
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const handleSkillsHighlight = (skills: BrainRegion['skills'], region: BrainRegion) => {
    setHighlightedSkills(skills);
    setSelectedRegion(region);
    // Update active category based on brain region selection
    if (region.id === 'design') {
      setActiveCategory('design');
    } else if (region.id === 'development') {
      setActiveCategory('development');
    } else if (region.id === 'tools') {
      setActiveCategory('tools');
    } else {
      setActiveCategory('all');
    }
  };

  const handleCategoryChange = (category: SkillCategory) => {
    setActiveCategory(category);
    setHighlightedSkills([]);
    setSelectedRegion(null);
  };

  const getCurrentSkills = () => {
    return categoryConfig[activeCategory].skills;
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



          {/* Mobile & Tablet Layout - Only Brain Explorer */}
          <div className="lg:hidden space-y-6 sm:space-y-8">
            {/* Brain Explorer */}
            <div>
              <BrainExplorer
                onSkillsHighlight={handleSkillsHighlight}
                className="w-full"
              />
            </div>

            {/* Skill Detail Panel */}
            <SkillDetailPanel region={selectedRegion} />
          </div>

          {/* Desktop Layout - Brain Explorer + Skills Charts */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Skills Chart */}
            <div className="space-y-6">
              {activeCategory === 'design' ? (
                // Show only Design Skills when 'Design' is selected
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                    Design Skills
                  </h4>
                  <SkillsChart
                    skills={categoryConfig.design.skills}
                    highlightedSkills={highlightedSkills}
                    regionColor={selectedRegion?.color}
                  />
                </div>
              ) : activeCategory === 'development' ? (
                // Show only Development Skills when 'Development' is selected
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    Development Skills
                  </h4>
                  <SkillsChart
                    skills={categoryConfig.development.skills}
                    highlightedSkills={highlightedSkills}
                    regionColor={selectedRegion?.color}
                  />
                </div>
              ) : activeCategory === 'tools' ? (
                // Show only Tools Skills when 'Tools' is selected
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    Tools Skills
                  </h4>
                  <SkillsChart
                    skills={categoryConfig.tools.skills}
                    highlightedSkills={highlightedSkills}
                    regionColor={selectedRegion?.color}
                  />
                </div>
              ) : (
                // Show all categories when 'All Skills' is selected (default)
                <>
                  {/* Design Skills */}
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      Design Skills
                    </h4>
                    <SkillsChart
                      skills={categoryConfig.design.skills}
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
                      skills={categoryConfig.development.skills}
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
                      skills={categoryConfig.tools.skills}
                      highlightedSkills={highlightedSkills}
                      regionColor={selectedRegion?.color}
                    />
                  </div>
                </>
              )}
              
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