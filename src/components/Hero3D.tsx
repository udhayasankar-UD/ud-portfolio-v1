import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import CursorBullet from "./CursorBullet";

// Floating particles background
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  // Reduce particle count on mobile for performance
  const particleCount = window.innerWidth < 768 ? 25 : 50;
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
    
    velocities[i] = (Math.random() - 0.5) * 0.02;
    velocities[i + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Wrap around boundaries
        if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[{
          size: 0.05,
          color: "#60a5fa",
          transparent: true,
          opacity: 0.6,
          sizeAttenuation: true
        }]}
      />
    </points>
  );
}

// Enhanced animated cube with more effects
function AnimatedCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { size } = useThree();

  const handlePointerMove = (e: any) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const x = (offsetX / size.width) * 2 - 1;
    const y = -(offsetY / size.height) * 2 + 1;
    setTarget({ x: y * 0.4, y: x * 0.4 });
  };

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Slower floating
      meshRef.current.rotation.x += (target.x - meshRef.current.rotation.x) * 0.07 + 0.001;
      meshRef.current.rotation.y += (target.y - meshRef.current.rotation.y) * 0.07 + 0.0015;
      meshRef.current.position.y = Math.sin(time * 0.36) * 0.13; // was time*0.8

      // Slower, more subtle "pulsing glow"
      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.46 + Math.sin(time * 0.65) * 0.08;
      }

      // More subtle scale
      const scale = isHovered ? 1.55 : 1.38;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.06);
    }
  });

  const materialRef = useRef<THREE.MeshStandardMaterial>();

  if (!materialRef.current) {
    materialRef.current = new THREE.MeshStandardMaterial({
      color: "#60a5fa",
      metalness: 1,
      roughness: 0.15,
      emissive: "#2563eb",
      emissiveIntensity: 0.5,
      envMapIntensity: 0.75,
    });
  }

  return (
    <mesh
      ref={meshRef}
      scale={[1.4, 1.4, 1.4]}
      onPointerMove={handlePointerMove}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setTarget({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  );
}

// Two-line typed roles with accessibility
function TwoLineTypedRoles() {
  const roles = [
    "Full-Stack Developer",
    "Game Developer", 
    "UI & UX Designer",
  ];
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [announceRole, setAnnounceRole] = useState("");

  useEffect(() => {
    let timeout: number | undefined;
    const word = roles[index];

    if (typing) {
      if (displayed.length < word.length) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 65);
      } else {
        // Announce complete role for screen readers
        setAnnounceRole(`and I'm ${word}`);
        timeout = window.setTimeout(() => setTyping(false), 1000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, 36);
      } else {
        setTyping(true);
        setIndex((prev) => (prev + 1) % roles.length);
        setAnnounceRole("");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, roles]);

  return (
    <>
      <div className="hero-line2 text-fluid-lg">
        <span className="text-white desktop-and-text">I'm </span>
        <span className="text-white mobile-and-text hidden">and I'm </span>
        <span 
          className="relative typed-role hero-role-glow inline-block"
          aria-hidden="true"
        >
          <span className="inline-block min-w-[200px] sm:min-w-[280px]">{displayed}</span>
          <span className="absolute border-r-2 border-blue-400 ml-1 h-full animate-pulse"></span>
        </span>
      </div>
      
      {/* Screen reader announcement */}
      <span className="sr-only" aria-live="polite">
        {announceRole}
      </span>
      
      <style>{`
        /* ---- KEEP gradient globally (NO glow here) ---- */
        .gradient-text {
          background: linear-gradient(90deg, #8fbfff 0%, #6aa0ff 60%, #5b7fff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* Keep typed-role's color and weight globally but NO glow */
        .typed-role {
          color: #8fbfff;
          font-weight: 700;
          position: relative;
          z-index: 2;
          /* no drop-shadow globally */
        }

        /* ---------------- HERO-ONLY GLOW (scoped) ---------------- */
        #home .hero-name-glow {
          /* glow for the big name only when inside #home */
          filter: drop-shadow(0 0 10px rgba(96,165,250,0.6)) 
                  drop-shadow(0 0 20px rgba(96,165,250,0.3));
          -webkit-filter: drop-shadow(0 0 10px rgba(96,165,250,0.6)) 
                           drop-shadow(0 0 20px rgba(96,165,250,0.3));
          position: relative;
          z-index: 2;
        }

        #home .hero-role-glow {
          /* glow for the typed role inside #home */
          filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.7)) 
                  drop-shadow(0 0 25px rgba(96, 165, 250, 0.4)) 
                  drop-shadow(0 0 40px rgba(96, 165, 250, 0.2));
          -webkit-filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.7)) 
                           drop-shadow(0 0 25px rgba(96, 165, 250, 0.4)) 
                           drop-shadow(0 0 40px rgba(96, 165, 250, 0.2));
          position: relative;
          z-index: 2;
        }

        /* Desktop layout (hero-scoped) */
        @media (min-width: 901px) {
          #home .desktop-and-text { display: inline; }
          #home .mobile-and-text { display: none !important; }
        }

        /* Mobile layout - allow glow to escape container (hero-scoped) */
        @media (max-width: 900px) {
          #home .desktop-and-text { display: none !important; }
          #home .mobile-and-text { display: inline !important; }

          #home .hero-line1 {
            overflow: visible; /* was hidden — caused the rectangular clipping */
            font-size: clamp(18px, 5.5vw, 32px) !important;
            line-height: 1.2;
          }
          #home .hero-line2 {
            overflow: visible; /* was hidden — caused the rectangular clipping */
            font-size: clamp(16px, 4.8vw, 28px) !important;
            line-height: 1.2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #home .animate-pulse { animation: none; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        #home .animate-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
    </>
  );
}

// Scroll indicator with animation
function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-20 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-blue-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Main hero export with enhanced interactivity
export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <CursorBullet />
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center w-full overflow-hidden"
        style={{ cursor: window.innerWidth > 1024 ? 'none' : 'default' }}
      >
        {/* Animated background with parallax */}
        <div 
          className="absolute inset-0 z-0 bg-hero-gradient opacity-95 transition-transform duration-100"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />
        
        {/* Multiple decorative blur rings with different animations */}
        <div className="absolute left-1/4 top-1/3 w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-3xl bg-blue-glow/20 sm:bg-blue-glow/30 animate-pulse" />
        <div 
          className="absolute right-1/4 top-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-2xl bg-purple-500/10 sm:bg-purple-500/15 animate-pulse"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`,
          }}
        />

        {/* Main content grid - responsive layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto container-responsive grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-screen">
          
          {/* Text content - order first on mobile */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              {/* First line - responsive wrapping */}
              <div className="hero-line1 font-bold animate-fade-in-up hover:scale-105 transition-transform duration-300 text-fluid-xl leading-tight">
                <span className="text-white block sm:inline">Hello, I'm </span>
                <span className="gradient-text hero-name-glow block sm:inline">
                  Udhaya Sankar
                </span>
                <span className="text-white desktop-and-text"> and</span>
              </div>
              
              {/* Second line - typed role */}
              <TwoLineTypedRoles />
            </div>
            
            <div className="mt-6 text-center lg:text-left text-blue-100 animate-fade-in-up hover:text-white transition-colors duration-300 text-fluid-base max-w-2xl">
              Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
            </div>
          </div>

          {/* Canvas container - order second on mobile */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div 
              className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] rounded-full shadow-soft-glow border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-gray-900/90 animate-float hover:shadow-[0_0_30px_10px_rgba(96,165,250,0.3)] transition-all duration-300 cursor-pointer touch-none"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
              }}
            >
              <Canvas camera={{ position: [2.4, 2.4, 3.2] }} shadows>
                <ambientLight intensity={0.85} />
                <directionalLight position={[2, 4, 2]} intensity={1.1} castShadow color="#60a5fa" />
                <FloatingParticles />
                <AnimatedCube />
              </Canvas>
            </div>
          </div>
        </div>

        <ScrollIndicator />

        {/* Enhanced floating animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-6px) rotate(0.3deg); }
            66% { transform: translateY(-4px) rotate(-0.2deg); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        `}</style>
      </section>
    </>
  );
}
