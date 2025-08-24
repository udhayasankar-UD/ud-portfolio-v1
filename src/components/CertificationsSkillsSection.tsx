import { Award } from "lucide-react";
import CertCarousel from "./CertCarousel";
import SkillsChart from "./SkillsChart";

const skills = [
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
  return (
    <section
      id="certifications-skills"
      className="w-full min-h-screen px-4 py-16 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="gradient-text text-4xl md:text-5xl font-bold mb-4">
            Certifications & Skills
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Tools and certificates that shape my work
          </p>
        </div>

        {/* Single Column Layout */}
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Certifications Carousel */}
          <div>
            <CertCarousel />
          </div>

          {/* Skills Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-glow/20">
                <Award className="w-6 h-6 text-blue-glow" />
              </div>
              <h3 className="text-2xl font-bold text-white">Skills</h3>
            </div>
            <SkillsChart skills={skills} />
          </div>
        </div>
      </div>
    </section>
  );
}