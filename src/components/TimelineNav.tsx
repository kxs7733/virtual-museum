import type { WingData } from '../data/exhibits';

interface TimelineNavProps {
  wings: WingData[];
  activeWing: number;
  scrollProgress: number;
  onNavigate: (index: number) => void;
}

export default function TimelineNav({ wings, activeWing, scrollProgress, onNavigate }: TimelineNavProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3">
      {wings.map((wing, i) => {
        const isActive = activeWing === i;
        return (
          <button
            key={wing.id}
            onClick={() => onNavigate(i)}
            className="group flex items-center gap-3 transition-all duration-300"
          >
            {/* Label (visible on hover or active) */}
            <span
              className={`text-xs tracking-wide transition-all duration-300 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
              }`}
              style={{ color: isActive ? wing.accentColor : '#ffffff80' }}
            >
              {wing.name}
            </span>

            {/* Dot / line */}
            <div
              className="transition-all duration-300 rounded-full"
              style={{
                width: isActive ? '24px' : '8px',
                height: '8px',
                backgroundColor: isActive ? wing.accentColor : '#ffffff20',
                boxShadow: isActive ? `0 0 12px ${wing.accentColor}60` : 'none',
              }}
            />
          </button>
        );
      })}

      {/* Progress line */}
      <div className="absolute right-[3px] top-0 bottom-0 w-px bg-white/5 -z-10">
        <div
          className="w-full bg-gradient-to-b from-purple-500 to-cyan-400 transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </nav>
  );
}
