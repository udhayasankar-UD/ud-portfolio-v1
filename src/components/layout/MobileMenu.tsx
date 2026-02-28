import React from "react";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-gray-900 border-l border-white/10 z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition touch-target"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Links */}
        <nav className="pt-20 px-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 px-4 text-lg font-medium text-white/80 hover:text-blue-glow hover:bg-white/5 rounded-lg transition touch-target"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
