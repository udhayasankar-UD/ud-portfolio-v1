
import { useLocation } from "react-router-dom";
import React from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // The hash includes the "#" (e.g., "#projects")
  const isProjectsActive = location.hash === "#projects";

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="fixed left-0 top-0 w-full z-40 flex justify-center pt-8 pb-4 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent backdrop-blur-md">
        <div className="flex space-x-8 px-6">
          <a href="/" className="text-2xl font-bold gradient-text tracking-tight select-none">UD</a>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                `text-lg font-medium text-white/80 hover:text-blue-glow transition story-link ${
                  item.label === "Projects" && isProjectsActive
                    ? "text-blue-glow"
                    : ""
                }`
              }
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
      {/* Mobile Alert Message */}
      <div className="md:hidden fixed top-24 left-0 right-0 z-30 mx-4 mb-4">
        <div className="bg-blue-600/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg border border-blue-500/30">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">
              For the best experience, view on a larger screen
            </p>
          </div>
        </div>
      </div>
      
      {/* Space for navbar */}
      <div className="h-24" />
      <main>{children}</main>
    </div>
  );
}
