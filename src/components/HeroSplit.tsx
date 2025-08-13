import React, { Suspense, useState, useEffect } from "react";
import { ReactTyped as Typed } from "react-typed";
import CursorBullet from "./CursorBullet";

// Lazy load the 3D component
const Hero3DCanvas = React.lazy(() => import("./Hero3DCanvas"));

// Fallback placeholder component
function CanvasFallback() {
  return (
    <div className="w-full h-full bg-hero-gradient rounded-2xl flex items-center justify-center border border-white/10">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-glow/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded bg-blue-glow animate-pulse"></div>
        </div>
        <p className="text-white/60 text-sm">Loading 3D Experience...</p>
      </div>
    </div>
  );
}

// Smooth scroll functionality for mouse icon
function handleScrollToAbout(e: React.MouseEvent) {
  e.preventDefault();
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mouse scroll indicator
function MouseScrollIcon() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={handleScrollToAbout}
      aria-label="Scroll to about section"
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 focus:outline-none focus:ring-2 focus:ring-blue-glow focus:ring-offset-2 focus:ring-offset-gray-900 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center hover:border-blue-glow transition-colors">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </button>
  );
}

export default function HeroSplit() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <CursorBullet />
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden"
      >
        {/* Animated background with parallax */}
        <div 
          className="absolute inset-0 z-0 bg-hero-gradient opacity-95 transition-transform duration-100"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />
        
        {/* Decorative blur rings */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl bg-blue-glow/20 animate-pulse" />
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-2xl bg-purple-500/10 animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${-50 + mousePosition.x * -5}%, ${-50 + mousePosition.y * -5}%)`,
          }}
        />

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Mobile: Stack vertically (text above canvas) */}
          <div className="lg:hidden flex flex-col items-center space-y-8">
            {/* Text content on mobile */}
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Hi, I'm Udhaya Sankar
              </h1>
              
              <div className="text-2xl md:text-3xl font-semibold min-h-[2.5rem] mb-6">
                <span className="text-white">I'm </span>
                <span 
                  className="relative text-blue-400 bg-gradient-to-r from-blue-400/20 to-purple-400/20 px-2 py-1 rounded"
                  style={{ textShadow: '0 8px 20px rgba(60,120,255,0.12)' }}
                >
                  <Typed
                    strings={[
                      "Full-Stack Developer",
                      "Game Developer", 
                      "UI & UX Designer"
                    ]}
                    typeSpeed={50}
                    backSpeed={30}
                    backDelay={1000}
                    loop
                  />
                </span>
              </div>
              
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
              </p>
            </div>

            {/* 3D Canvas on mobile */}
            <div className="w-full max-w-md h-80">
              <Suspense fallback={<CanvasFallback />}>
                <Hero3DCanvas />
              </Suspense>
            </div>
          </div>

          {/* Desktop: Split layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left column: 3D Canvas */}
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto">
                <Suspense fallback={<CanvasFallback />}>
                  <Hero3DCanvas />
                </Suspense>
              </div>
              {/* Hover hint */}
              <div className="absolute bottom-4 left-4 text-white/40 text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Click &amp; drag to rotate
              </div>
            </div>

            {/* Right column: Text content */}
            <div className="space-y-8">
              <div>
                <h1 
                  className="text-5xl xl:text-6xl font-bold text-white mb-6"
                  style={{ textShadow: '0 8px 20px rgba(60,120,255,0.12)' }}
                >
                  Hi, I'm Udhaya Sankar
                </h1>
                
                <div className="text-3xl xl:text-4xl font-semibold min-h-[3rem] mb-8">
                  <span className="text-white">I'm </span>
                  <span 
                    className="relative text-blue-400 bg-gradient-to-r from-blue-400/20 to-purple-400/20 px-3 py-1 rounded"
                    style={{ textShadow: '0 8px 20px rgba(60,120,255,0.12)' }}
                  >
                    <Typed
                      strings={[
                        "Full-Stack Developer",
                        "Game Developer", 
                        "UI & UX Designer"
                      ]}
                      typeSpeed={50}
                      backSpeed={30}
                      backDelay={1000}
                      loop
                    />
                  </span>
                </div>
                
                <p className="text-xl text-white/80 max-w-lg mb-10">
                  Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="neu-btn px-8 py-3 text-lg shadow-soft-glow text-white hover:text-blue-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-glow focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="px-8 py-3 text-lg border-2 border-white/20 rounded-xl text-white hover:border-blue-glow hover:text-blue-glow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-glow focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Screen reader live region for typed text */}
        <div 
          aria-live="polite" 
          aria-label="Current role"
          className="sr-only"
        >
          {/* This will be announced when the typed text changes */}
        </div>

        <MouseScrollIcon />
      </section>
    </>
  );
}