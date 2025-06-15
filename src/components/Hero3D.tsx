import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Animated cube with parallax + floating effect
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const { size } = useThree();

  const handlePointerMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / size.width) * 2 - 1;
    const y = -(offsetY / size.height) * 2 + 1;
    setTarget({ x: y * 0.4, y: x * 0.4 });
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (target.x - meshRef.current.rotation.x) * 0.07 + 0.003;
      meshRef.current.rotation.y += (target.y - meshRef.current.rotation.y) * 0.07 + 0.007;
      meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={[1.4, 1.4, 1.4]}
      onPointerMove={handlePointerMove}
      onPointerOut={() => setTarget({ x: 0, y: 0 })}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial
        args={["#60a5fa"]}
        metalness={1}
        roughness={0.15}
        emissive="#2563eb"
        emissiveIntensity={0.5}
        envMapIntensity={0.75}
      />
    </mesh>
  );
}

// AnimatedRoles: Shows each role with typewriter animation.
function AnimatedRoles() {
  const roles = [
    "Full-Stack Developer",
    "Game Developer",
    "UI & UX Designer",
  ];
  const [index, setIndex] = useState(0);     // Index of role
  const [displayed, setDisplayed] = useState(""); // Currently displayed text
  const [typing, setTyping] = useState(true);     // Typing or deleting

  useEffect(() => {
    let timeout: number | undefined;
    const word = roles[index];

    if (typing) {
      if (displayed.length < word.length) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 65);
      } else {
        // Pause before starting to delete
        timeout = window.setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, 36);
      } else {
        // Move to next role
        setTyping(true);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, roles]);

  return (
    <span
      className={
        "block mt-2 text-2xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-blue-glow via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(96,165,250,0.9)] select-none transition-all duration-200 min-h-[2.6rem] md:min-h-[3.2rem] lg:min-h-[3.5rem]"
      }
      aria-live="polite"
    >
      <span>{`I'm `}</span>
      <span className="border-r-2 border-blue-glow animate-pulse-slow">
        {displayed}
      </span>
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1.1s steps(2) infinite;
        }
      `}</style>
    </span>
  );
}

// Main hero export
export default function Hero3D() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-[90vh] pt-8 pb-10 w-full"
      style={{ minHeight: "600px" }}
    >
      {/* Blurred glowing gradient BG */}
      <div className="absolute inset-0 z-0 bg-hero-gradient opacity-95" />
      {/* Decorative blur ring glow */}
      <div className="absolute left-0 right-0 top-36 mx-auto w-80 h-80 rounded-full blur-3xl bg-blue-glow/40" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Glassy, elevated canvas with subtle animation */}
        <div className="w-[380px] h-[380px] rounded-full shadow-soft-glow border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-gray-900/90 mb-8 animate-float">
          <Canvas camera={{ position: [2.4, 2.4, 3.2] }} shadows>
            <ambientLight intensity={0.85} />
            <directionalLight position={[2, 4, 2]} intensity={1.1} castShadow color="#60a5fa" />
            <AnimatedCube />
          </Canvas>
        </div>
        {/* Animated text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center gradient-text animate-fade-in-up drop-shadow-[0_2px_14px_rgba(96,165,250,0.7)]">
          Hi, I’m Udhaya Sankar
        </h1>
        <AnimatedRoles />
        <div className="mt-6 text-lg md:text-xl text-blue-100 text-center max-w-2xl animate-fade-in-up">
          Building immersive web &amp; game experiences with 3D, modern UI, and a nerd’s passion for code.
        </div>
        <a
          href="#about"
          className="mt-12 neu-btn px-8 py-3 text-lg shadow-soft-glow flex items-center group transition hover:scale-105 hover:bg-blue-glow/80 animate-fade-in-up"
        >
          <span>Scroll Down</span>
          <svg width={24} height={24} className="ml-3 group-hover:translate-y-2 transition-all duration-200">
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
      {/* Floating animation for canvas */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 3.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
