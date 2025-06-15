
import { ArrowRight, Sparkles } from "lucide-react";

interface ProjectFinalPanelProps {
  isActive: boolean;
}

export default function ProjectFinalPanel({ isActive }: ProjectFinalPanelProps) {
  return (
    <div className={`
      w-full max-w-3xl mx-auto glass-card neu-card p-10 rounded-2xl shadow-soft-glow text-center
      transition-all duration-700 transform
      ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-60 translate-y-4 scale-95'}
    `}>
      <div className="space-y-8">
        <div className="relative">
          <Sparkles className="w-16 h-16 text-blue-glow mx-auto mb-6 animate-pulse" />
          <div className="absolute inset-0 bg-blue-glow/20 blur-xl rounded-full" />
        </div>
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            ✨ That's my portfolio so far
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Want to see all of my work and explore more projects?
          </p>
        </div>

        <div className="space-y-4">
          <button className="group w-full md:w-auto px-8 py-4 bg-blue-glow text-white text-lg font-bold rounded-xl shadow-neu hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3">
            View All Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-gray-400 text-sm">
            Or scroll back up to explore projects in detail
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-glow">6+</div>
            <div className="text-sm text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-glow">3</div>
            <div className="text-sm text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-glow">15+</div>
            <div className="text-sm text-gray-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-glow">2+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}
