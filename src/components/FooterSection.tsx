
export default function FooterSection() {
  return (
    <footer className="w-full py-8 bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-4">
          <a href="https://github.com/udhayasankar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2 hover:scale-110 hover:bg-blue-glow/20 transition">
            {/* Github */}
            <svg fill="none" viewBox="0 0 24 24" width={28} height={28} className="text-gray-300 hover:text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.167 6.84 9.49.5.09.66-.217.66-.483 0-.237-.01-1.022-.015-1.85-2.782.604-3.37-1.342-3.37-1.342-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.07-.608.07-.608 1.004.07 1.53 1.034 1.53 1.034.893 1.53 2.342 1.088 2.912.833.092-.646.35-1.09.636-1.341-2.22-.252-4.555-1.111-4.555-4.945 0-1.092.39-1.983 1.032-2.68-.104-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.843a9.53 9.53 0 012.508.338c1.91-1.294 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.643.697 1.03 1.588 1.03 2.68 0 3.842-2.337 4.69-4.565 4.938.36.31.68.918.68 1.85 0 1.335-.012 2.413-.012 2.74 0 .267.16.577.67.48A10.014 10.014 0 0022 12c0-5.52-4.48-10-10-10z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a href="https://linkedin.com/in/udhayasankar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full p-2 hover:scale-110 hover:bg-blue-glow/20 transition">
            {/* LinkedIn */}
            <svg viewBox="0 0 24 24" width={28} height={28} className="text-blue-400 hover:text-blue-300">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.26c-.97 0-1.75-.78-1.75-1.74S5.53 4.26 6.5 4.26 8.25 5.04 8.25 6s-.79 1.74-1.75 1.74zm13.5 11.26h-3v-5.6c0-1.34-.48-2.26-1.68-2.26-.92 0-1.47.62-1.71 1.22-.09.21-.11.5-.11.79v5.85h-3s.04-9.48 0-10.48h3v1.48c.39-.6 1.08-1.45 2.63-1.45 1.92 0 3.37 1.25 3.37 3.94v6.51z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a href="https://dev.to/udhayasankar" target="_blank" rel="noopener noreferrer" aria-label="Dev.to" className="rounded-full p-2 hover:scale-110 hover:bg-blue-glow/20 transition">
            {/* Dev.to */}
            <svg viewBox="0 0 50 40" fill="none" width={30} height={24} className="text-gray-100 hover:text-white">
              <rect width="50" height="40" rx="8" fill="currentColor" />
              <text x="13" y="28" fontSize="18" fontFamily="monospace" fontWeight="bold" fill="#292929">DEV</text>
            </svg>
          </a>
          <a href="https://youtube.com/@udhayasankar" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full p-2 hover:scale-110 hover:bg-blue-glow/20 transition">
            {/* Youtube */}
            <svg viewBox="0 0 30 24" width={30} height={24} className="text-red-400 hover:text-red-300">
              <rect x="0" y="0" width="30" height="24" rx="5" fill="currentColor" />
              <polygon points="12,8 22,12 12,16" fill="#fff" />
            </svg>
          </a>
        </div>
        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Udhaya Sankar U &mdash; Crafted with <span className="text-blue-glow">♥</span>
        </div>
      </div>
    </footer>
  );
}
