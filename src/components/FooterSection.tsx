
import { Github, Linkedin, Youtube, Instagram } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="w-full py-12 bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex gap-6">
          <a 
            href="https://github.com/udhayasankar0/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub" 
            className="rounded-full p-3 bg-gray-800 hover:bg-gray-700 hover:scale-110 transition-all duration-200"
          >
            <Github className="w-7 h-7 text-gray-300 hover:text-white" />
          </a>
          <a 
            href="https://www.linkedin.com/in/udhayasankar0/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn" 
            className="rounded-full p-3 bg-gray-800 hover:bg-blue-600 hover:scale-110 transition-all duration-200"
          >
            <Linkedin className="w-7 h-7 text-blue-400 hover:text-white" />
          </a>
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="YouTube" 
            className="rounded-full p-3 bg-gray-800 hover:bg-red-600 hover:scale-110 transition-all duration-200"
          >
            <Youtube className="w-7 h-7 text-red-400 hover:text-white" />
          </a>
          <a 
            href="https://www.instagram.com/kid__gamer__/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Instagram" 
            className="rounded-full p-3 bg-gray-800 hover:bg-purple-600 hover:scale-110 transition-all duration-200"
          >
            <Instagram className="w-7 h-7 text-purple-400 hover:text-white" />
          </a>
        </div>
        <div className="text-gray-500 text-base">
          &copy; {new Date().getFullYear()} Udhaya Sankar U &mdash; Crafted with <span className="text-blue-glow">♥</span>
        </div>
      </div>
    </footer>
  );
}
