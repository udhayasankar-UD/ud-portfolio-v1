import { useState } from 'react';
import { Certificate } from './CertCarousel';

interface CertCardProps {
  certificate: Certificate;
  isActive: boolean;
  onClick: () => void;
  shouldAnimate: boolean;
}

export default function CertCard({ certificate, isActive, onClick, shouldAnimate }: CertCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [imageError, setImageError] = useState(false);

  const showOverlay = isHovered || isFocused;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`flex-none group cursor-pointer transition-all duration-500 ${
        shouldAnimate ? 'ease-in-out' : ''
      } ${
        isActive 
          ? 'scale-103 opacity-100 z-10' 
          : 'scale-100 opacity-80'
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-describedby={`cert-desc-${certificate.id}`}
      aria-label={`View ${certificate.title} certificate from ${certificate.provider}`}
    >
      {/* Main Card */}
      <div 
        className={`relative w-full h-[280px] md:w-[320px] md:h-[280px] lg:w-[400px] lg:h-[350px] rounded-xl overflow-hidden transition-all duration-300 p-3 ${
          isActive 
            ? 'shadow-2xl shadow-blue-glow/20 ring-2 ring-blue-glow/30' 
            : 'shadow-lg'
        } ${
          showOverlay ? 'transform -translate-y-2' : ''
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
        }}
      >
        {/* Certificate Image */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {!imageError ? (
            <img
              src={certificate.image}
              alt={certificate.alt}
              className="w-full h-full object-contain object-center bg-white/5"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            // Fallback placeholder
            <div className="w-full h-full bg-gradient-to-br from-blue-glow/20 to-purple-500/20 flex items-center justify-center rounded-lg">
              <div className="text-center text-white/70">
                <div className="text-4xl mb-2">📜</div>
                <div className="text-sm font-medium">{certificate.title}</div>
                <div className="text-xs">{certificate.provider}</div>
              </div>
            </div>
          )}

          {/* Overlay Gradient */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
              showOverlay ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Hover/Focus Overlay */}
          <div 
            className={`absolute inset-x-0 bottom-0 p-6 transform transition-all duration-300 ${
              showOverlay ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div 
              className="p-4 rounded-lg backdrop-blur-sm"
              style={{
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
              }}
            >
              <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                {certificate.title}
              </h3>
              <p className="text-blue-glow text-sm font-medium mb-2">
                {certificate.provider}
              </p>
              <p className="text-gray-300 text-sm line-clamp-2">
                {certificate.desc}
              </p>
            </div>
          </div>

          {/* Focus Ring */}
          {isFocused && (
            <div className="absolute inset-0 ring-2 ring-blue-glow ring-offset-2 ring-offset-transparent rounded-xl pointer-events-none" />
          )}
        </div>
      </div>

      {/* Hidden description for screen readers */}
      <div id={`cert-desc-${certificate.id}`} className="sr-only">
        {certificate.desc}
      </div>
    </div>
  );
}