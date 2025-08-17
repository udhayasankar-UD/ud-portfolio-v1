
import { ArrowRight, Sparkles } from "lucide-react";

export default function AlbumEndSlide() {
  const handleViewAll = () => {
    // Scroll to contact section since projects section is removed
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-20">
      <div className="text-center max-w-2xl">
        {/* Sparkles Icon */}
        <div className="mb-8">
          <Sparkles className="w-16 h-16 text-blue-glow mx-auto animate-pulse" />
        </div>

        {/* Main Text */}
        <h2 className="gradient-text text-5xl md:text-7xl font-bold mb-6">
          That's My Top Collections!
        </h2>
        
        <p className="text-white/80 text-xl md:text-2xl mb-8 leading-relaxed">
          Ready to work together on your next project?
        </p>

        {/* CTA Button */}
        <button
          onClick={handleViewAll}
          className="neu-btn bg-blue-glow hover:bg-blue-400 text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-105"
        >
          Get In Touch
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-glow/50 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
