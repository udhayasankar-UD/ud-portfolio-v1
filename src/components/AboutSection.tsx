
import { Terminal, Gamepad2 } from "lucide-react";
import AvatarParallax from "./AvatarParallax";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full min-h-screen px-4 py-16 md:py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: Avatar and fun icons */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative mb-8 group transition-transform">
            <AvatarParallax
              src="public\Assets\me-1.jpg"
              alt="Udhaya Sankar Avatar"
              className="" // you may customize further if needed
            />
            <span className="absolute -top-4 -right-5 bg-blue-glow text-white rounded-full p-2 shadow-soft-glow">
              <Gamepad2 size={28} />
            </span>
            <span className="absolute -bottom-3 left-0 bg-gray-700 text-blue-glow rounded-full p-2">
              <Terminal size={25} />
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="neu-card px-4 py-2 text-blue-glow font-bold shadow-neu text-sm">React</span>
            <span className="neu-card px-4 py-2 text-gray-300 font-bold shadow-neu text-sm">Three.js</span>
            <span className="neu-card px-4 py-2 text-green-500 font-bold shadow-neu text-sm">Game Dev</span>
            <span className="neu-card px-4 py-2 text-yellow-400 font-bold shadow-neu text-sm">UI/UX</span>
          </div>
        </div>
        {/* Right: About Me */}
        <div>
          <h2 className="gradient-text text-2xl sm:text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="mb-4 text-base sm:text-lg text-gray-200">
            I'm Udhaya Sankar – a nerdy, creative front-end & game developer crafting beautiful immersive digital experiences! <br /> <br />
            I love blending 3D graphics, seamless UI, and playful code to make tech engaging and accessible. My toolkit spans React, Three.js, Unity, and design systems. <br /><br />
            When I'm not coding, I'm building games, exploring new frameworks, and leveling up my pixel art or low-poly Blender skills!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            <div className="neu-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-glow mb-1">5+</div>
              <div className="text-sm text-gray-300 font-medium">Years Coding</div>
            </div>
            <div className="neu-card p-4 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">12</div>
              <div className="text-sm text-gray-300 font-medium">Projects Launched</div>
            </div>
            <div className="neu-card p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">∞</div>
              <div className="text-sm text-gray-300 font-medium">Ideas Built</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
