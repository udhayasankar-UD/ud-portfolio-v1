import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);

  // The hash includes the "#" (e.g., "#projects")
  const isProjectsActive = location.hash === "#projects";

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed left-0 top-0 w-full z-40 flex justify-center pt-8 pb-4 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent backdrop-blur-md">
        <div className="flex items-center justify-between w-full max-w-7xl px-6">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold gradient-text tracking-tight select-none">UD</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={
                  `text-lg font-medium text-white/80 hover:text-blue-glow transition story-link ${
                    item.label === "Projects" && isProjectsActive
                      ? "text-blue-glow"
                      : ""
                  } ${
                    item.label === "Blog" && location.pathname === "/blog"
                      ? "text-blue-glow"
                      : ""
                  }`
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition touch-target"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />

      {/* Mobile Alert Message */}
      {!alertDismissed && (
        <div className="md:hidden fixed top-24 left-0 right-0 z-30 mx-4 mb-4">
          <div className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 flex-1">
                <svg className="w-5 h-5 text-blue-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium">
                  For the best experience, view on a larger screen
                </p>
              </div>
              <button
                onClick={() => setAlertDismissed(true)}
                className="ml-2 w-8 h-8 flex items-center justify-center text-blue-200 hover:text-white transition flex-shrink-0"
                aria-label="Dismiss alert"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Space for navbar */}
      <div className="h-24" />
      <main>{children}</main>
    </div>
  );
}
