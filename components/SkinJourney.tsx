'use client';

import React, { useState, useRef, useCallback } from 'react';
import { MOCK_JOURNEY_DATA, SAMPLE_PORTRAITS } from '../data/skincareData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { SlidersHorizontal, ArrowUpRight, TrendingUp } from 'lucide-react';

export const SkinJourney: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
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

  return (
    <section id="journey" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Longitudinal Telemetry Data</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            "My Skin Journey" <span className="glow-text-violet">Dashboard</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Track your multi-month barrier recovery trajectory and compare baseline scan Month 1 against Month 3.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Recharts Trajectory (7 cols) */}
          <div className="lg:col-span-7 glass-card p-8 border border-[var(--border-glass)] shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                    Skin Health Trajectory
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Multi-parameter score evolution across 90 days.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+18.3% Overall Improvement</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_JOURNEY_DATA}>
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} />
                    <YAxis domain={[40, 100]} stroke="var(--text-muted)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-surface-elevated)', 
                        borderColor: 'var(--border-color)', 
                        borderRadius: '12px',
                        color: 'var(--text-primary)' 
                      }} 
                    />
                    <Line type="monotone" dataKey="score" name="Overall Health" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 6, fill: '#8B5CF6' }} />
                    <Line type="monotone" dataKey="hydration" name="Hydration Index" stroke="#06B6D4" strokeWidth={2.5} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="clarity" name="Pore Clarity" stroke="#10B981" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" /> Overall Health
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                <span className="w-3 h-3 rounded-full bg-[#06B6D4]" /> Hydration Index
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                <span className="w-3 h-3 rounded-full bg-[#10B981]" /> Pore Clarity
              </span>
            </div>
          </div>

          {/* Month 1 vs Month 3 Split Screen Slider (5 cols) */}
          <div className="lg:col-span-5 glass-card p-6 border border-[var(--border-glass)] shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] mb-1">
                Month 1 vs Month 3 Scan
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Interactive baseline photo comparison.
              </p>

              <div 
                ref={containerRef}
                onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-[var(--glass-border)] cursor-ew-resize select-none"
              >
                {/* Month 3 Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img src={SAMPLE_PORTRAITS[0].url} alt="Month 3 Scan" className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                    Month 3 (Score: 84)
                  </div>
                </div>

                {/* Month 1 Image Clipped */}
                <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                  <img src={SAMPLE_PORTRAITS[0].url} alt="Month 1 Scan" className="w-full h-full object-cover filter contrast-125 saturate-50" style={{ width: containerRef.current?.clientWidth || '100%' }} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 text-white font-bold text-[10px]">
                    Month 1 (Score: 71)
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#8B5CF6]" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-violet-600 shadow-xl flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <span className="text-[var(--text-muted)] block text-[10px]">Month 1 Baseline</span>
                <span className="font-heading font-extrabold text-sm text-[var(--text-primary)]">T-Zone Sebum: 84</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 block text-[10px]">Month 3 Result</span>
                <span className="font-heading font-extrabold text-sm text-emerald-400">T-Zone Sebum: 62 ✓</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
