import { useEffect, useRef } from 'react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Certificate } from './CertCarousel';

interface CertModalProps {
  certificate: Certificate;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CertModal({ certificate, onClose, onNext, onPrev }: CertModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // Focus the modal when it opens
    modal.focus();

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(certificate.image);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${certificate.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(certificate.image, '_blank');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{ backdropFilter: 'blur(8px)' }}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden focus:outline-none"
        style={{
          background: 'rgba(11, 17, 22, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(96, 165, 250, 0.2)',
        }}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <h2 id="modal-title" className="text-xl font-bold text-white mb-1 truncate">
              {certificate.title}
            </h2>
            <p className="text-blue-glow text-sm font-medium">
              {certificate.provider}
            </p>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            {/* Navigation Buttons */}
            <button
              onClick={onPrev}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-blue-glow/20 hover:text-blue-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-glow"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={onNext}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-blue-glow/20 hover:text-blue-glow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-glow"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-lg bg-blue-glow/20 text-blue-glow hover:bg-blue-glow/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-glow"
              title="Download certificate"
              aria-label="Download certificate"
            >
              <Download className="w-5 h-5" />
            </button>

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative flex-1 flex items-center justify-center p-6 max-h-[70vh]">
          <img
            ref={imageRef}
            src={certificate.image}
            alt={certificate.alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={(e) => {
              // Fallback for broken images
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          
          {/* Fallback content */}
          <div className="hidden text-center text-white/70">
            <div className="text-6xl mb-4">📜</div>
            <div className="text-lg font-medium mb-2">{certificate.title}</div>
            <div className="text-base text-blue-glow mb-2">{certificate.provider}</div>
            <div className="text-sm text-gray-300">{certificate.desc}</div>
            <div className="mt-4 text-xs text-gray-400">
              Certificate image could not be loaded
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <p id="modal-description" className="text-gray-300 text-sm">
            {certificate.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-glow/20 text-blue-glow rounded-lg hover:bg-blue-glow/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-glow text-sm font-medium"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download Certificate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}