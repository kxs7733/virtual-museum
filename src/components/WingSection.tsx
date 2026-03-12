import { useRef, useEffect, useState } from 'react';
import type { WingData, Exhibit } from '../data/exhibits';

interface WingSectionProps {
  wing: WingData;
  index: number;
  isActive: boolean;
  onExhibitClick: (exhibit: Exhibit) => void;
}

function ExhibitCard({ exhibit, color, onClick }: {
  exhibit: Exhibit;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-[#0a0b1e]/90 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 hover:bg-[#0f1030]/95 transition-all duration-500 hover:border-opacity-30 hover:-translate-y-1"
      style={{ borderColor: `${color}20` }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="text-lg font-semibold text-white group-hover:text-white/100 transition-colors">
          {exhibit.title}
        </h4>
        <span
          className="shrink-0 w-2 h-2 rounded-full mt-2"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Subtitle */}
      {exhibit.subtitle && (
        <p className="text-xs mb-3 leading-relaxed" style={{ color: `${color}99` }}>
          {exhibit.subtitle}
        </p>
      )}

      {/* Description */}
      <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-3">
        {exhibit.description}
      </p>

      {/* Stats row */}
      {exhibit.stats && exhibit.stats.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {exhibit.stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-lg px-3 py-1.5">
              <span className="text-sm font-semibold text-white">{stat.value}</span>
              <span className="text-[10px] text-white/30 ml-1.5">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Highlight */}
      {exhibit.highlight && (
        <div
          className="text-xs p-3 rounded-lg border-l-2 mb-4"
          style={{
            borderLeftColor: color,
            backgroundColor: `${color}08`,
            color: `${color}dd`,
          }}
        >
          {exhibit.highlight}
        </div>
      )}

      {/* Tags */}
      {exhibit.tags && (
        <div className="flex flex-wrap gap-1.5">
          {exhibit.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${color}15`,
                color: `${color}aa`,
              }}
            >
              {tag}
            </span>
          ))}
          {exhibit.tags.length > 5 && (
            <span className="text-[10px] text-white/20 px-2 py-0.5">+{exhibit.tags.length - 5}</span>
          )}
        </div>
      )}

      {/* Click hint */}
      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-white/20 group-hover:text-white/40 transition-colors">
        <span>View details</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function WingSection({ wing, index, onExhibitClick }: WingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Alternate layout: even index = left aligned, odd = right aligned
  const isLeft = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-16 flex items-center"
      id={`wing-${wing.id}`}
    >
      <div
        className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Wing header */}
        <div className={`mb-12 ${isLeft ? '' : 'text-right'}`}>
          {/* Period badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4 ${
              isLeft ? '' : 'flex-row-reverse'
            }`}
            style={{
              backgroundColor: `${wing.accentColor}15`,
              color: wing.accentColor,
              border: `1px solid ${wing.accentColor}30`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: wing.accentColor }}
            />
            {wing.period}
          </div>

          {/* Wing name */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            {wing.name}
          </h2>
          <p className="text-lg text-white/40">{wing.subtitle}</p>
        </div>

        {/* Exhibits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wing.exhibits.map((exhibit, i) => (
            <div
              key={exhibit.id}
              style={{
                transitionDelay: `${i * 150}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s ease-out',
              }}
            >
              <ExhibitCard
                exhibit={exhibit}
                color={wing.accentColor}
                onClick={() => onExhibitClick(exhibit)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
