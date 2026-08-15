import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AnalysisResult, MetricCategory, FacialZone } from '../types';
import { InteractiveFaceMap } from './InteractiveFaceMap';
import { ShieldAlert, Award, UserPlus, Info, CheckCircle, Flame, Droplets, Eye } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
  onOpenDermModal: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  onOpenDermModal
}) => {
  const [activeMetricCategory, setActiveMetricCategory] = useState<MetricCategory | null>('Oiliness');
  const [activeZones, setActiveZones] = useState<FacialZone[]>(['forehead', 'nose', 'tZone']);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Animated circular SVG score counter upward from 0
  useEffect(() => {
    let current = 0;
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    const increment = result.overallScore / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= result.overallScore) {
        setAnimatedScore(result.overallScore);
        clearInterval(timer);
        // Trigger celebratory confetti burst
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [result.overallScore]);

  const handleMetricSelect = (category: MetricCategory, zones: FacialZone[]) => {
    setActiveMetricCategory(category);
    setActiveZones(zones);
  };

  const circleRadius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <section id="results" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Biometric Report ID: {result.id}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Your Skin Telemetry <span className="glow-text-purple">Report</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Interactive multi-spectrum analysis compiled at {result.timestamp}.
          </p>
        </div>

        {/* Top Grid: Hero Score & Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
          
          {/* Circular Score Ring (4 cols) */}
          <div className="lg:col-span-4 glass-card p-8 text-center flex flex-col items-center justify-center border border-[var(--border-glass)] shadow-xl relative overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx="96"
                  cy="96"
                  r={circleRadius}
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-[var(--border-color)] fill-none"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="96"
                  cy="96"
                  r={circleRadius}
                  stroke="url(#scoreGradient)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="fill-none transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-extrabold text-5xl text-[var(--text-primary)] tracking-tight">
                  {animatedScore}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-purple)] mt-1">
                  Overall Skin Score
                </span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Optimal Barrier Equilibrium</span>
            </div>
          </div>

          {/* Facial Summary & Dermatologist Trigger (8 cols) */}
          <div className="lg:col-span-8 glass-card p-8 border border-[var(--border-glass)] shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-xl text-[var(--text-primary)]">
                  Neural Telemetry Executive Summary
                </h3>
                {result.severityFlag && (
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Severity Alert
                  </span>
                )}
              </div>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                {result.facialSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)] block text-sm font-semibold mb-0.5">Clinical Recommendation</strong>
                {result.dermatologistAdvice}
              </div>

              <button
                onClick={onOpenDermModal}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white text-xs font-heading font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <UserPlus className="w-4 h-4" />
                <span>Find Certified Derm</span>
              </button>
            </div>
          </div>

        </div>

        {/* Main Analysis Body: Interactive Face Map & Biometric Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Face Map canvas wrapper (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <InteractiveFaceMap
              imageSrc={result.imageSrc}
              activeMetricCategory={activeMetricCategory}
              activeZones={activeZones}
            />
          </div>

          {/* Right Column: Grid of Biometric Metric Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.metrics.map((metric) => {
              const isSelected = activeMetricCategory === metric.id;
              
              return (
                <motion.div
                  key={metric.id}
                  onClick={() => handleMetricSelect(metric.id, metric.activeZones)}
                  onMouseEnter={() => handleMetricSelect(metric.id, metric.activeZones)}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-card p-5 cursor-pointer border transition-all duration-300 ${
                    isSelected 
                      ? 'border-[var(--accent-purple)] ring-2 ring-[var(--accent-purple)]/30 bg-[var(--bg-surface-elevated)] shadow-lg' 
                      : 'border-[var(--border-glass)] hover:border-[var(--accent-purple)]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-bold text-sm text-[var(--text-primary)]">
                      {metric.name}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      metric.status === 'Safe' ? 'bg-emerald-500/10 text-emerald-500' :
                      metric.status === 'Balanced' ? 'bg-purple-500/10 text-purple-500' :
                      'bg-rose-500/10 text-rose-500'
                    }`}>
                      {metric.status}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
                      {metric.score}<span className="text-xs text-[var(--text-muted)] font-normal">/100</span>
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      {metric.displayValue}
                    </span>
                  </div>

                  {/* Color-coded progress bar */}
                  <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2 overflow-hidden mb-3 border border-[var(--border-color)]">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${metric.score}%`,
                        backgroundColor: metric.status === 'Safe' ? '#10B981' : metric.status === 'Balanced' ? '#7C3AED' : '#F43F5E'
                      }}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-normal line-clamp-2">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Disclaimer Banner Box */}
        <div className="mt-12 p-4 rounded-2xl glass-card border border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-300 text-xs sm:text-sm font-medium flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0 text-amber-500" />
          <p>
            <strong>AI Medical Disclaimer:</strong> AI-based visual estimate for educational and routine customization purposes only. Not a medical diagnosis. Consult a board-certified dermatologist for persistent skin issues or lesions.
          </p>
        </div>

      </div>
    </section>
  );
};
