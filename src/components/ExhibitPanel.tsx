import { useEffect, useCallback } from 'react';
import type { Exhibit } from '../data/exhibits';
import { wings } from '../data/exhibits';

interface ExhibitPanelProps {
  exhibit: Exhibit | null;
  isOpen: boolean;
  onClose: () => void;
}

function getAccentColor(exhibitId: string): string {
  for (const wing of wings) {
    if (wing.exhibits.some(e => e.id === exhibitId)) {
      return wing.accentColor;
    }
  }
  return '#4a90d9';
}

export default function ExhibitPanel({ exhibit, isOpen, onClose }: ExhibitPanelProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !exhibit) return null;

  const accentColor = getAccentColor(exhibit.id);
  const { title, subtitle, description, stats, links, tags, highlight } = exhibit;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel card */}
      <div
        className="relative z-10 max-w-2xl w-full mx-4 max-h-[85vh] overflow-y-auto exhibit-scroll rounded-2xl bg-gray-900/95 border border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${accentColor}33`,
          animation: 'countUp 0.3s ease-out forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors z-20"
          aria-label="Close panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-white pr-8">{title}</h2>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-1 text-sm" style={{ color: accentColor }}>
              {subtitle}
            </p>
          )}

          {/* Description */}
          <p className="mt-4 text-gray-300 leading-relaxed">{description}</p>

          {/* Highlight callout */}
          {highlight && (
            <div
              className="mt-5 p-4 rounded-lg border-l-4"
              style={{
                borderLeftColor: accentColor,
                backgroundColor: `${accentColor}10`,
              }}
            >
              <p className="text-sm font-medium text-white">{highlight}</p>
            </div>
          )}

          {/* Stats grid */}
          {stats && stats.length > 0 && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-4 text-center"
                >
                  <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-white">
                    {stat.prefix && <span className="text-sm text-gray-400">{stat.prefix}</span>}
                    {stat.value}
                    {stat.suffix && <span className="text-sm text-gray-400">{stat.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links as buttons */}
          {links && links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: accentColor }}
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
