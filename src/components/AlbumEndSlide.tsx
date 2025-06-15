
import React from "react";

export default function AlbumEndSlide({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-4xl md:text-5xl font-extrabold gradient-text animate-fade-in-up mb-4 text-center">
        ✨ That's my collection!
      </div>
      <div className="text-lg md:text-xl text-white/80 mb-6 animate-fade-in-up text-center max-w-lg">
        Want to see every project, play with demos, or browse the full gallery?
      </div>
      <button
        className="neu-btn bg-blue-glow text-white px-8 py-3 rounded-xl text-lg font-bold shadow-xl hover:bg-blue-400 animate-fade-in-up"
        style={{ minWidth: 220 }}
        onClick={onClick}
      >
        View All Projects
      </button>
    </div>
  );
}
