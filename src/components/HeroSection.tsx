interface HeroSectionProps {
  name: string;
  tagline: string;
}

export default function HeroSection({ name, tagline }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-8">
      <div className="text-center max-w-3xl mx-auto">
        {/* Overline */}
        <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-6 animate-fade-in">
          Virtual Museum of Experience
        </p>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-6">
          {name.split(' ').map((word, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `slideUp 0.8s ${i * 0.15}s ease-out both`,
              }}
            >
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p
          className="text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed"
          style={{ animation: 'slideUp 0.8s 0.5s ease-out both' }}
        >
          {tagline}
        </p>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{ animation: 'slideUp 0.8s 0.8s ease-out both' }}
        >
          <p className="text-white/20 text-xs tracking-widest uppercase">Scroll to explore</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
