
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";

function AnimatedCube() {
  const meshRef = useRef<any>(null);
  // Per-frame gentle rotation for the 3D element
  return (
    <mesh ref={meshRef} scale={[1.3, 1.3, 1.3]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#60a5fa" metalness={0.7} roughness={0.25} />
    </mesh>
  );
}

// Hero section: 3D graphic, headline, subheading, and call to scroll.
export default function Hero3D() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-[90vh] pt-8 pb-10 w-full"
      style={{ minHeight: "600px" }}
    >
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-95" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-[380px] h-[380px] rounded-full shadow-soft-glow border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-gray-900/90 mb-8">
          <Canvas camera={{ position: [2, 2, 3] }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[2, 4, 2]} intensity={0.9} />
            <AnimatedCube />
          </Canvas>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center gradient-text animate-fade-in-up">
          Hi, I’m Udhaya Sankar <br />
          <span className="text-blue-glow">Front-End & Game Developer</span>
        </h1>
        <div className="mt-5 text-lg md:text-xl text-blue-100 text-center max-w-2xl animate-fade-in-up">
          Building immersive web & game experiences with 3D, modern UI, and a nerd’s passion for code.
        </div>
        <a
          href="#about"
          className="mt-12 neu-btn px-8 py-3 text-lg shadow-soft-glow flex items-center group"
        >
          <span>Scroll Down</span>
          <svg width={24} height={24} className="ml-3 group-hover:translate-y-2 transition">
            <path
              d="M12 5v14m0 0l6-6m-6 6l-6-6"
              stroke="#60a5fa"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
