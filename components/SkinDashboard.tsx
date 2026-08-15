'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { AnalysisResult, HealthVectorGroup, Metric20ExactCategory } from '../types';
import { Card3DTilt } from './Card3DTilt';
import { PDFReportGenerator } from './PDFReportGenerator';
import { Award, UserPlus, Info, CheckCircle, X, Search, Layers } from 'lucide-react';

interface SkinDashboardProps {
  result: AnalysisResult;
  onOpenDermModal: () => void;
}

const VECTOR_TABS: HealthVectorGroup[] = [
  'Epidermal Dynamics & Water/Oil',
  'Acne & Follicular Health',
  'Pigmentation & Vascular Integrity',
  'Tissue Texture & Structural Integrity'
];

export const SkinDashboard: React.FC<SkinDashboardProps> = ({ result, onOpenDermModal }) => {
  const [selectedVector, setSelectedVector] = useState<HealthVectorGroup>('Epidermal Dynamics & Water/Oil');
  const [selectedMetricId, setSelectedMetricId] = useState<Metric20ExactCategory>('metric1_stratumHydration');
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showContextualPopup, setShowContextualPopup] = useState(true);

  useEffect(() => {
    let current = 0;
    const duration = 1200;
    const steps = 30;
    const increment = result.overallScore / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= result.overallScore) {
        setAnimatedScore(result.overallScore);
        clearInterval(timer);
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.overallScore]);

  const activeMetricObj = result.metrics.find(m => m.id === selectedMetricId) || result.metrics[0];

  const handleMetricSelect = (id: Metric20ExactCategory, vector: HealthVectorGroup) => {
    setSelectedMetricId(id);
    setSelectedVector(vector);
    setShowContextualPopup(true);
  };

  // Determine CSS pixel micro-zoom transform origin based on active facial zone
  const getZoomClass = (zone: string) => {
    switch (zone) {
      case 'forehead': return 'scale-[1.5] origin-top';
      case 'nose': return 'scale-[1.6] origin-center';
      case 'cheeks': return 'scale-[1.45] origin-left';
      case 'chin': return 'scale-[1.5] origin-bottom';
      case 'underEye': case 'periorbital': return 'scale-[1.6] origin-top-left';
      case 'uZone': case 'jawline': return 'scale-[1.45] origin-bottom-right';
      default: return 'scale-100 origin-center';
    }
  };

  const filteredMetrics = result.metrics.filter(m => m.vectorGroup === selectedVector);

  return (
    <section id="results" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Nyoria 20-Metric Diagnostic Protocol ID: {result.id}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Nyoria Clinical <span className="glow-text-violet">20-Depth Cellular Dashboard</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Click any of the 20 skin parameters below to execute pixel micro-zooming, facial heatmap overlays, and cellular molecular detection popups.
          </p>
        </div>

        {/* Top: Nyoria Cellular Health Index Wheel & Executive Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Nyoria Cellular Health Index Wheel (4 cols) */}
          <div className="lg:col-span-4 glass-card p-8 text-center flex flex-col items-center justify-center border border-[var(--border-glass)] shadow-2xl relative overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="70" stroke="currentColor" strokeWidth="10" className="text-[var(--border-color)] fill-none" />
                <circle
                  cx="96"
                  cy="96"
                  r="70"
                  stroke="url(#nyoriaGradientExact20)"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 - (animatedScore / 100) * 2 * Math.PI * 70}
                  strokeLinecap="round"
                  className="fill-none transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="nyoriaGradientExact20" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-extrabold text-5xl text-[var(--text-primary)]">
                  {animatedScore}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400 mt-1">
                  Nyoria Health Index
                </span>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <CheckCircle className="w-4 h-4" />
              <span>Exact 20 Parameters Processed</span>
            </div>
          </div>

          {/* Executive Summary Box (8 cols) */}
          <div className="lg:col-span-8 glass-card p-8 border border-[var(--border-glass)] shadow-2xl space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)] mb-2">
                Nyoria Engine Cellular Telemetry Summary
              </h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                {result.facialSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)] block text-sm font-semibold mb-0.5">Nyoria Protocol Advice</strong>
                {result.dermatologistAdvice}
              </div>
              <button
                onClick={onOpenDermModal}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-heading font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
              >
                <UserPlus className="w-4 h-4" />
                <span>Verified Nepal Centers</span>
              </button>
            </div>
          </div>

        </div>

        {/* Vector Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2 border-b border-[var(--border-color)]">
          {VECTOR_TABS.map((vector) => (
            <button
              key={vector}
              onClick={() => {
                setSelectedVector(vector);
                const firstInGroup = result.metrics.find(m => m.vectorGroup === vector);
                if (firstInGroup) {
                  setSelectedMetricId(firstInGroup.id);
                }
              }}
              className={`px-5 py-2.5 rounded-full font-heading font-bold text-xs transition-all ${
                selectedVector === vector
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                  : 'glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {vector}
            </button>
          ))}
        </div>

        {/* Main Section: Interactive Zoom Viewport (5 cols) & 20 Metric Cards (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Zoom Canvas & Contextual Detection Popup Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass-panel border-2 border-violet-500/40 shadow-2xl">
              
              {/* FACE IMAGE WITH DYNAMIC ZOOM TRANSFORM */}
              <div className={`w-full h-full transition-transform duration-700 ease-in-out ${getZoomClass(activeMetricObj.activeZone)}`}>
                <img
                  src={result.imageSrc}
                  alt="Analyzed Biometric Face Map"
                  className="w-full h-full object-cover"
                />

                {/* Translucent Heatmap Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                  {activeMetricObj.activeZone === 'forehead' && (
                    <div className="absolute top-[18%] left-[50%] -translate-x-1/2 w-48 h-20 bg-purple-500/40 rounded-full blur-xl border-2 border-purple-400 animate-pulse" />
                  )}
                  {activeMetricObj.activeZone === 'nose' && (
                    <div className="absolute top-[38%] left-[50%] -translate-x-1/2 w-16 h-28 bg-purple-500/40 rounded-full blur-xl border-2 border-purple-400 animate-pulse" />
                  )}
                  {activeMetricObj.activeZone === 'cheeks' && (
                    <div className="absolute top-[52%] left-[24%] w-24 h-20 bg-rose-500/40 rounded-full blur-xl border-2 border-rose-400 animate-pulse" />
                  )}
                  {activeMetricObj.activeZone === 'chin' && (
                    <div className="absolute bottom-[16%] left-[50%] -translate-x-1/2 w-24 h-16 bg-cyan-500/40 rounded-full blur-xl border-2 border-cyan-400 animate-pulse" />
                  )}
                  {activeMetricObj.activeZone === 'underEye' && (
                    <div className="absolute top-[38%] left-[32%] w-14 h-8 bg-pink-500/50 rounded-full blur-md border border-pink-400 animate-pulse" />
                  )}
                  {activeMetricObj.activeZone === 'uZone' && (
                    <div className="absolute top-[58%] left-[38%] w-32 h-20 bg-amber-500/40 rounded-full blur-xl border-2 border-amber-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Viewport Overlay Badges */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-cyan-400 bg-slate-900/90 px-3 py-1 rounded-full border border-cyan-500/30">
                FOCAL_ZOOM // {activeMetricObj.activeZone.toUpperCase()}
              </div>

              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-violet-300 bg-slate-900/90 px-3 py-1 rounded-full border border-violet-500/30">
                METRIC #{activeMetricObj.metricNumber} // {activeMetricObj.id.toUpperCase()}
              </div>
            </div>

            {/* ON-SCREEN NYORIA DETECTION CONTEXTUAL POPUP CARD */}
            <AnimatePresence>
              {showContextualPopup && activeMetricObj && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-5 rounded-2xl glass-panel border border-violet-500/40 bg-slate-950/90 text-white shadow-2xl relative space-y-2"
                >
                  <button
                    onClick={() => setShowContextualPopup(false)}
                    className="absolute top-3.5 right-3.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Search className="w-3.5 h-3.5" />
                    <span>NYORIA MOLECULAR DETECTION POPUP</span>
                  </div>

                  <div className="font-heading font-bold text-sm text-violet-300">
                    {activeMetricObj.name} ({activeMetricObj.score}/100)
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeMetricObj.contextualDetectionText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: 20 Metric Cards Filtered by Health Vector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono pb-2 border-b border-[var(--border-color)]">
              <span className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                <Layers className="w-4 h-4 text-violet-400" />
                {selectedVector}
              </span>
              <span>Showing {filteredMetrics.length} Metrics</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMetrics.map((metric) => {
                const isSelected = selectedMetricId === metric.id;
                const radius = 22;
                const circ = 2 * Math.PI * radius;
                const offset = circ - (metric.score / 100) * circ;

                return (
                  <Card3DTilt
                    key={metric.id}
                    onClick={() => handleMetricSelect(metric.id, metric.vectorGroup)}
                    className={`glass-card p-5 border transition-all duration-300 ${
                      isSelected 
                        ? 'border-violet-500 ring-2 ring-violet-500/40 bg-[var(--bg-surface-elevated)] shadow-xl' 
                        : 'border-[var(--border-glass)] hover:border-violet-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-heading font-bold text-xs text-[var(--text-primary)] line-clamp-1">
                        {metric.name}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                        metric.status === 'Optimal' ? 'bg-emerald-500/10 text-emerald-400' :
                        metric.status === 'Balanced' ? 'bg-violet-500/10 text-violet-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {metric.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="relative w-12 h-12">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="4" className="text-[var(--border-color)] fill-none" />
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            stroke={metric.status === 'Optimal' ? '#10B981' : metric.status === 'Balanced' ? '#8B5CF6' : '#F59E0B'}
                            strokeWidth="4"
                            strokeDasharray={circ}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="fill-none transition-all duration-700 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-heading font-extrabold text-xs text-[var(--text-primary)]">
                          {metric.score}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-[var(--text-primary)] block">
                          {metric.displayValue}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {metric.metricUnit}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                      {metric.description}
                    </p>
                  </Card3DTilt>
                );
              })}
            </div>
          </div>

        </div>

        {/* Printable PDF Diagnostic Export */}
        <PDFReportGenerator result={result} />

        {/* Clinical Safeguard */}
        <div className="p-4 rounded-2xl glass-card border border-amber-500/30 bg-amber-500/5 text-amber-500 text-xs sm:text-sm font-medium flex items-center gap-3">
          <Info className="w-5 h-5 shrink-0 text-amber-400" />
          <p>
            <strong>Nyoria Clinical Safeguard:</strong> Nyoria Skin Intelligence provides visual cosmetic telemetry estimates for educational and routine customization purposes only. It is not a medical diagnosis. Consult a board-certified dermatologist in Nepal for persistent skin issues.
          </p>
        </div>

      </div>
    </section>
  );
};
