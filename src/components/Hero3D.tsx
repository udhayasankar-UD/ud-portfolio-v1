import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import CursorBullet from "./CursorBullet";

// Floating particles background
function FloatingParticles({ count }: { count: number }) {
  const particlesRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
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



// Main hero export with enhanced interactivity
export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile viewport
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    // Detect touch device
    const checkTouch = () => setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    // Detect reduced motion preference
    const checkReducedMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    checkMobile();
    checkTouch();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return; // Skip mouse tracking on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  const particleCount = isMobile ? 15 : 50;
  const shouldAnimate = !prefersReducedMotion;

  return (
    <>
      {!isTouchDevice && <CursorBullet />}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center w-full overflow-hidden"
        style={{ cursor: !isTouchDevice && window.innerWidth > 1024 ? 'none' : 'default' }}
      >
        {/* Animated background with parallax - disabled on mobile */}
        <div
          className="absolute inset-0 z-0 bg-hero-gradient opacity-95"
          style={{
            transform: !isMobile && shouldAnimate ? `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` : 'none',
            transition: shouldAnimate ? 'transform 0.1s' : 'none'
          }}
        />

        {/* Multiple decorative blur rings - reduced on mobile for performance */}
        <div className={`absolute left-1/4 top-1/3 w-60 h-60 ${!isMobile ? 'sm:w-80 sm:h-80' : ''} rounded-full ${isMobile ? 'blur-2xl' : 'blur-3xl'} ${isMobile ? 'bg-blue-glow/10' : 'bg-blue-glow/20 sm:bg-blue-glow/30'} ${shouldAnimate ? 'animate-pulse' : ''}`} />
        {!isMobile && (
          <div
            className={`absolute right-1/4 top-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-2xl bg-purple-500/10 sm:bg-purple-500/15 ${shouldAnimate ? 'animate-pulse' : ''}`}
            style={{
              animationDelay: shouldAnimate ? '1s' : '0s',
              transform: shouldAnimate ? `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)` : 'none',
            }}
          />
        )}

        {/* Main content grid - responsive layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto container-responsive grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-screen">

          {/* Text content - order first on mobile */}
          <div className="order-1 lg:order-2 flex flex-col justify-center px-2 sm:px-0">
            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
              {/* First line - responsive wrapping */}
              <div className={`hero-line1 font-bold ${shouldAnimate ? 'animate-fade-in-up hover:scale-105 transition-transform duration-300' : ''} text-fluid-xl leading-tight`}>
                <span className="text-white block sm:inline">Hello, I'm </span>
                <span className="gradient-text hero-name-glow block sm:inline whitespace-nowrap">
                  Udhaya Sankar
                </span>
                <span className="text-white desktop-and-text"> and</span>
              </div>

              {/* Second line - typed role */}
              <TwoLineTypedRoles />
            </div>

            <div className={`mt-6 text-center lg:text-left text-blue-100 ${shouldAnimate ? 'animate-fade-in-up hover:text-white transition-colors duration-300' : ''} text-fluid-base max-w-2xl px-2 sm:px-0`}>
              Building immersive web &amp; game experiences with 3D, modern UI, and a nerd's passion for code.
            </div>
          </div>

          {/* Canvas container - order second on mobile, scaled appropriately */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div
              className={`w-[min(calc(100vw-48px),320px)] h-[min(calc(100vw-48px),320px)] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] rounded-full ${isMobile ? 'shadow-sm' : 'shadow-soft-glow'} border-2 border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-900/70 to-gray-900/90 ${shouldAnimate && !isMobile ? 'animate-float hover:shadow-[0_0_30px_10px_rgba(96,165,250,0.3)] transition-all duration-300' : ''} ${isTouchDevice ? 'cursor-pointer' : 'cursor-pointer touch-none'}`}
              style={{
                transform: !isMobile && shouldAnimate ? `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)` : 'none',
              }}
            >
              <Canvas camera={{ position: [2.4, 2.4, 3.2] }} shadows={!isMobile}>
                <ambientLight intensity={0.85} />
                <directionalLight position={[2, 4, 2]} intensity={1.1} castShadow={!isMobile} color="#60a5fa" />
                <FloatingParticles count={particleCount} />
                <AnimatedCube />
              </Canvas>
            </div>
          </div>
        </div>



        {/* Enhanced floating animation - disabled if reduced motion preferred */}
        <style>{`
          ${shouldAnimate ? `
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-6px) rotate(0.3deg); }
            66% { transform: translateY(-4px) rotate(-0.2deg); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          ` : ''}
          
          /* Remove heavy glows on mobile */
          @media (max-width: 767px) {
            #home .hero-name-glow {
              filter: none !important;
              -webkit-filter: none !important;
            }
            #home .hero-role-glow {
              filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.4)) !important;
              -webkit-filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.4)) !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
