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
      
      {/* Space for navbar */}
      <div className="h-24" />
      <main>{children}</main>
    </div>
  );
}
