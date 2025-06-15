
import React, { useRef, useEffect, useState } from "react";
import AlbumCase from "./AlbumCase";
import AlbumDetailsCard from "./AlbumDetailsCard";
import AlbumEndSlide from "./AlbumEndSlide";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin (fix: remove .globals() usage)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    title: "Your Wellbeing",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    desc: "A modern React-driven app for wellness and self-care.",
    tech: ["React", "TypeScript", "AI"],
    href: "#"
  },
  {
    title: "Unsung Empires: The Cholas II",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    desc: "Epic historical strategy game – contributions in 3D, AI & gameplay!",
    tech: ["Unity", "C#", "3D", "AI"],
    href: "#"
  },
  {
    title: "Car-Park AI",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    desc: "AI-powered parking solution, real-time dashboard, web UI.",
    tech: ["React", "Python", "Dashboard"],
    href: "#"
  },
  {
    title: "Game Portfolio",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    desc: "Thumbnails, demo builds & playtest videos for my indie projects.",
    tech: ["Games", "Web"],
    href: "#"
  },
  {
    title: "AURA e-Commerce Revamp",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=600&q=80",
    desc: "UI/UX overhaul for efficient online shopping. Lightning-fast SPA.",
    tech: ["SPA", "UI/UX", "eCommerce"],
    href: "#"
  },
  {
    title: "Interion Workshop",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    desc: "API-driven interior design playground. Open source!",
    tech: ["Open Source", "API"],
    href: "#"
  }
];

export default function AlbumProjectsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useState(false);

  // Responsive: fallback for mobile, don't pin
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width:768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Don't run GSAP on mobile
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    document.body.classList.add("no-scrollbar"); // Nice UX
    // Pin + horizontal animation using ScrollTrigger
    const totalPanels = PROJECTS.length + 1;
    const width = track.scrollWidth;
    const singleCase = track.offsetWidth / totalPanels;

    let st: ScrollTrigger;
    let tween: gsap.core.Tween;

    gsap.set(track, { x: 0 });

    st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${width - section.offsetWidth + 320}`,
      pin: true,
      scrub: 1.4,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Calculate which is centered (roughly)
        const prog = self.progress;
        let idx = Math.min(
          PROJECTS.length - 1,
          Math.floor((prog * (PROJECTS.length + 0.4)) )
        );
        setActiveIdx(idx);

        // If at the end, show CTA
        setIsEnd(prog > 0.98);
      },
      onLeave: () => {
        document.body.classList.remove("no-scrollbar");
      },
      onLeaveBack: () => {
        document.body.classList.remove("no-scrollbar");
      }
    });

    tween = gsap.to(track, {
      x: () => -(width - section.offsetWidth),
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${width - section.offsetWidth + 320}`,
        scrub: 1.4
      }
    });

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    return () => {
      st?.kill();
      tween?.kill();
      document.body.style.overflow = "";
      document.body.classList.remove("no-scrollbar");
    };
    // eslint-disable-next-line
  }, [isMobile]);

  // Mobile: vertical stack, fade-in scroll
  if (isMobile) {
    return (
      <section
        id="projects"
        className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 px-2"
      >
        <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-8 text-center">
          My Album Projects
        </h2>
        <div className="space-y-24 max-w-xl mx-auto">
          {PROJECTS.map((proj, idx) => (
            <div key={proj.title} className="flex flex-col items-center animate-fade-in-up">
              <AlbumCase
                image={proj.image}
                title={proj.title}
                active={true}
                onClick={() => setActiveIdx(idx)}
              />
              <AlbumDetailsCard {...proj} />
            </div>
          ))}
        </div>
        <div className="my-24">
          <AlbumEndSlide onClick={() => window.location.href = "#projects"} />
        </div>
      </section>
    );
  }

  // Desktop/tablet: horizontal "CD shelf"
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col justify-center items-center overflow-hidden"
    >
      <h2 className="gradient-text text-3xl md:text-4xl font-bold mb-3 text-center z-40 pt-4 select-none">
        My Album Projects
      </h2>
      <div className="text-white/80 font-mono mb-8 text-md md:text-lg text-center z-40 select-none">
        <span className="album-scroll-hint">↓ Scroll to explore each project</span>
      </div>

      <div
        ref={trackRef}
        className="case-track flex flex-row gap-14 px-40 items-start w-max relative mx-auto will-change-transform"
        style={{
          height: "360px",
          minWidth: "100vw",
        }}
      >
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.title}
            className="flex flex-col items-center min-w-[200px] mx-2"
          >
            <AlbumCase
              image={proj.image}
              title={proj.title}
              active={activeIdx === idx && !isEnd}
              onClick={() => setActiveIdx(idx)}
            />
            {activeIdx === idx && !isEnd && (
              <AlbumDetailsCard {...proj} />
            )}
          </div>
        ))}
        {/* End slide */}
        <div
          className="flex flex-col items-center justify-center min-w-[420px] h-[320px] mx-8"
          aria-hidden={!isEnd}
        >
          {isEnd && (
            <AlbumEndSlide onClick={() => window.location.href = "#projects"} />
          )}
        </div>
      </div>
    </section>
  );
}
