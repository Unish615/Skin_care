import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 bg-[var(--bg-secondary)]/50 border-y border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-cyan)] text-[var(--accent-cyan-bright)] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Visual Comparison</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
            Before & After <span className="glow-text-purple">AI Telemetry Map</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Drag the slider horizontally to compare un-analyzed skin against our AI multi-spectrum feature overlay map.
          </p>
        </div>

        {/* Slider Card Container */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden glass-panel border border-[var(--glass-border)] shadow-2xl select-none cursor-ew-resize"
          >
            {/* After Image Layer (Fully visible underneath) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
                alt="Analyzed Skin with Telemetry" 
                className="w-full h-full object-cover"
              />
              {/* Simulated AI Heatmap Mesh Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-cyan-500/20 to-transparent mix-blend-color-dodge pointer-events-none" />
              
              {/* Overlay AI Zone Indicators */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 glass-card px-3 py-1.5 text-xs font-semibold text-white bg-purple-600/80 shadow-lg pointer-events-none">
                T-Zone Moisture: 78%
              </div>
              <div className="absolute bottom-1/4 right-1/4 glass-card px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600/80 shadow-lg pointer-events-none">
                Cheek Erythema: Safe
              </div>

              {/* Badge label right */}
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-purple-600 text-white font-heading font-semibold text-xs shadow-lg uppercase tracking-wider">
                ✨ AI Analyzed Map
              </div>
            </div>

            {/* Before Image Layer (Clipped dynamically based on slider position) */}
            <div 
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
                alt="Original Unanalyzed Skin" 
                className="w-full h-full object-cover filter grayscale-[25%] contrast-[90%]"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
              {/* Badge label left */}
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-heading font-semibold text-xs shadow-lg uppercase tracking-wider">
                Raw Camera Feed
              </div>
            </div>

            {/* Vertical Divider Handle Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(124,58,237,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circle Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-purple-600 border-2 border-purple-500 shadow-2xl flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-5 h-5 rotate-90" />
              </div>
            </div>

          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--text-muted)]">
            <span>◀ Slide left to reveal AI heatmap</span>
            <span>Slide right to inspect raw feed ▶</span>
          </div>
        </div>

      </div>
    </section>
  );
};
