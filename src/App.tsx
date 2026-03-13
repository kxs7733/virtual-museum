import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import MuseumScene from './components/MuseumScene';
import ExhibitPanel from './components/ExhibitPanel';
import RoomNav from './components/RoomNav';
import { wings, profileData, type Exhibit } from './data/exhibits';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState(-1); // -1 = lobby
  const [selectedExhibit, setSelectedExhibit] = useState<Exhibit | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = useCallback(
    (room: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setCurrentRoom(room);
      setTimeout(() => setTransitioning(false), 1200);
    },
    [transitioning],
  );

  const handleExhibitClick = useCallback((exhibit: Exhibit) => {
    setSelectedExhibit(exhibit);
  }, []);

  return (
    <div className="w-full h-full relative bg-[#020210]">
      {/* Full-screen 3D canvas */}
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 500, position: [0, 4, 18] }}
        style={{ background: '#020210' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <MuseumScene
          currentRoom={currentRoom}
          onExhibitClick={handleExhibitClick}
          onRoomEnter={navigateTo}
        />
      </Canvas>

      {/* Lobby overlay — name & tagline */}
      {currentRoom === -1 && !transitioning && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center pointer-events-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-3 drop-shadow-2xl">
              {profileData.name}
            </h1>
            <p className="text-lg md:text-xl text-white/50 mb-8 max-w-xl mx-auto">
              {profileData.tagline}
            </p>
            <button
              onClick={() => navigateTo(0)}
              className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm tracking-widest uppercase hover:bg-white/20 transition-all duration-300"
            >
              Enter Museum
            </button>
          </div>
        </div>
      )}

      {/* Room title overlay */}
      {currentRoom >= 0 && !selectedExhibit && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-wider uppercase mb-2 backdrop-blur-md"
            style={{
              backgroundColor: `${wings[currentRoom].accentColor}20`,
              color: wings[currentRoom].accentColor,
              border: `1px solid ${wings[currentRoom].accentColor}40`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: wings[currentRoom].accentColor }}
            />
            {wings[currentRoom].period}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {wings[currentRoom].name}
          </h2>
          <p className="text-white/40 text-sm mt-1">{wings[currentRoom].subtitle}</p>
        </div>
      )}

      {/* Navigation arrows */}
      {currentRoom >= 0 && !selectedExhibit && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button
            onClick={() => navigateTo(currentRoom <= 0 ? -1 : currentRoom - 1)}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            disabled={transitioning}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="text-white/40 text-sm tabular-nums">
            {currentRoom + 1} / {wings.length}
          </span>
          <button
            onClick={() =>
              navigateTo(currentRoom >= wings.length - 1 ? wings.length - 1 : currentRoom + 1)
            }
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
            disabled={transitioning || currentRoom >= wings.length - 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Contact footer */}
      {currentRoom >= 0 && !selectedExhibit && (
        <div className="fixed bottom-8 right-8 z-20">
          <a
            href={`mailto:${profileData.contact.email}`}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            {profileData.contact.email}
          </a>
        </div>
      )}

      {/* Side room nav */}
      <RoomNav
        wings={wings}
        currentRoom={currentRoom}
        onNavigate={navigateTo}
        visible={!selectedExhibit}
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
