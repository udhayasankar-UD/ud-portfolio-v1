import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CertCard from './CertCard';
import CertModal from './CertModal';

export interface Certificate {
  id: number;
  title: string;
  provider: string;
  desc: string;
  image: string;
  alt: string;
}

const certificates: Certificate[] = [
  { 
    id: 1, 
    title: "Network Fundamentals", 
    provider: "Infosys Springboard", 
    desc: "Intro to networking principles, TCP/IP, and hands-on labs", 
    image: "/lovable-uploads/512a5493-a429-44f4-bf84-1a14f41026af.png", 
    alt: "Network Fundamentals certificate from Infosys Springboard" 
  },
  { 
    id: 2, 
    title: "AWS Certifications", 
    provider: "Amazon Web Services", 
    desc: "Cloud fundamentals & services overview (badge collection)", 
    image: "/lovable-uploads/c26f7f61-876e-4e2d-a80d-f59025983fcf.png", 
    alt: "AWS certification badge collection" 
  },
  { 
    id: 3, 
    title: "Python: Zero to Hero", 
    provider: "HCL GUVI", 
    desc: "Beginner-to-intermediate Python, scripting, and projects", 
    image: "/lovable-uploads/5672edac-5bef-4a83-b601-f006d4d4191b.png", 
    alt: "Python certificate from HCL GUVI" 
  },
  { 
    id: 4, 
    title: "Interion Tech Gala Workshop", 
    provider: "HCL GUVI", 
    desc: "Hands-on workshop covering prototyping and tools", 
    image: "/lovable-uploads/92ddbc05-36ea-4482-89a2-4933b2a97fb1.png", 
    alt: "Interion Tech Gala Workshop certificate" 
  },
  { 
    id: 5, 
    title: "Crash Course on Python", 
    provider: "Google", 
    desc: "Rapid Python foundations and Jupyter exercises", 
    image: "/lovable-uploads/cc64e937-4666-4767-876e-1fcee58ee6c4.png", 
    alt: "Google Crash Course on Python certificate" 
  },
  { 
    id: 6, 
    title: "Mastering Figma: Beginner to Expert UI/UX Design", 
    provider: "HCL GUVI", 
    desc: "UI/UX workflow, components, and responsive layouts in Figma", 
    image: "/lovable-uploads/14567575-4fe5-4482-9810-82ba05f3b023.png", 
    alt: "Mastering Figma certificate from HCL GUVI" 
  }
];

export default function CertCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && shouldAnimate) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % certificates.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, shouldAnimate]);

  // Pause auto-play on hover or focus
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  const handleFocus = () => setIsAutoPlaying(false);
  const handleBlur = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsAutoPlaying(false);
  };

  const handleModalClose = () => {
    setSelectedCert(null);
    setIsAutoPlaying(true);
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
    }
  };

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setIsAutoPlaying(true);
  };

  return (
    <>
      <div 
        className="relative w-full"
        role="region"
        aria-label="Certifications carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out justify-center"
            style={{
              transform: `translateX(calc(-${currentIndex * 424}px + 50% - 212px))`, // 400px card + 24px gap = 424px, center adjustment
            }}
          >
            {certificates.map((cert, index) => (
              <CertCard
                key={cert.id}
                certificate={cert}
                isActive={index === currentIndex}
                onClick={() => handleCardClick(cert)}
                shouldAnimate={shouldAnimate}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-blue-glow/20 hover:border-blue-glow/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-glow"
          aria-label="Previous certificate"
          tabIndex={0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-blue-glow/20 hover:border-blue-glow/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-glow"
          aria-label="Next certificate"
          tabIndex={0}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {certificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-glow ${
                index === currentIndex
                  ? 'bg-blue-glow shadow-lg shadow-blue-glow/30'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              aria-label={`Go to certificate ${index + 1}: ${certificates[index].title}`}
              tabIndex={0}
            />
          ))}
        </div>

        {/* Screen Reader Announcements */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          Showing certificate {currentIndex + 1} of {certificates.length}: {certificates[currentIndex].title}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <CertModal
          certificate={selectedCert}
          onClose={handleModalClose}
          onNext={() => {
            const nextIndex = (currentIndex + 1) % certificates.length;
            setCurrentIndex(nextIndex);
            setSelectedCert(certificates[nextIndex]);
          }}
          onPrev={() => {
            const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;
            setCurrentIndex(prevIndex);
            setSelectedCert(certificates[prevIndex]);
          }}
        />
      )}
    </>
  );
}