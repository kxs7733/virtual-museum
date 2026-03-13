import type { WingData } from '../data/exhibits';

interface RoomNavProps {
  wings: WingData[];
  currentRoom: number;
  onNavigate: (index: number) => void;
  visible: boolean;
}

export default function RoomNav({ wings, currentRoom, onNavigate, visible }: RoomNavProps) {
  if (!visible) return null;

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3">
      {/* Lobby */}
      <button
        onClick={() => onNavigate(-1)}
        className="group flex items-center gap-3 transition-all duration-300"
      >
        <span
          className={`text-xs tracking-wide transition-all duration-300 ${
            currentRoom === -1
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0'
          }`}
          style={{ color: currentRoom === -1 ? '#6644cc' : '#ffffff80' }}
        >
          Lobby
        </span>
        <div
          className="transition-all duration-300 rounded-full"
          style={{
            width: currentRoom === -1 ? '24px' : '8px',
            height: '8px',
            backgroundColor: currentRoom === -1 ? '#6644cc' : '#ffffff20',
            boxShadow: currentRoom === -1 ? '0 0 12px #6644cc60' : 'none',
          }}
        />
      </button>

      {wings.map((wing, i) => {
        const isActive = currentRoom === i;
        return (
          <button
            key={wing.id}
            onClick={() => onNavigate(i)}
            className="group flex items-center gap-3 transition-all duration-300"
          >
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
    </nav>
  );
}
