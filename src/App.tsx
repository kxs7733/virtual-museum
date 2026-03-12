import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene3D from './components/Scene3D';
import HeroSection from './components/HeroSection';
import WingSection from './components/WingSection';
import ExhibitPanel from './components/ExhibitPanel';
import TimelineNav from './components/TimelineNav';
import { wings, profileData, type Exhibit } from './data/exhibits';

export default function App() {
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [activeWing, setActiveWing] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(progress);

      // Determine active wing based on scroll position
      const wingIndex = Math.min(
        Math.floor(progress * (wings.length + 1)),
        wings.length - 1
      );
      setActiveWing(wingIndex);
    };

    const el = containerRef.current;
    el?.addEventListener('scroll', handleScroll, { passive: true });
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    const totalSections = wings.length + 1; // hero + wings
    const sectionHeight = (containerRef.current.scrollHeight - containerRef.current.clientHeight) / totalSections;
    containerRef.current.scrollTo({
      top: sectionHeight * (index + 1),
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full h-full relative bg-[#05051a]">
      {/* Fixed 3D background canvas */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ fov: 60, near: 0.1, far: 200, position: [0, 0, 20] }}
          style={{ background: '#05051a' }}
          dpr={[1, 2]}
        >
          <Scene3D scrollProgress={scrollProgress} activeWing={activeWing} />
        </Canvas>
      </div>

      {/* Scrollable content overlay */}
      <div
        ref={containerRef}
        className="relative z-10 h-full overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Hero section */}
        <HeroSection name={profileData.name} tagline={profileData.tagline} />

        {/* Wing sections */}
        {wings.map((wing, i) => (
          <WingSection
            key={wing.id}
            wing={wing}
            index={i}
            isActive={activeWing === i}
            onExhibitClick={setSelectedExhibit}
          />
        ))}

        {/* Footer */}
        <section className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Get in touch</p>
            <a
              href={`mailto:${profileData.contact.email}`}
              className="text-2xl text-white/80 hover:text-white transition-colors"
            >
              {profileData.contact.email}
            </a>
            <p className="text-white/30 mt-2">{profileData.contact.phone} | {profileData.contact.location}</p>
          </div>
        </section>
      </div>

      {/* Timeline navigation */}
      <TimelineNav
        wings={wings}
        activeWing={activeWing}
        scrollProgress={scrollProgress}
        onNavigate={scrollToSection}
      />

      {/* Exhibit detail panel */}
      <ExhibitPanel
        exhibit={selectedExhibit}
        isOpen={selectedExhibit !== null}
        onClose={() => setSelectedExhibit(null)}
      />
    </div>
  );
}
