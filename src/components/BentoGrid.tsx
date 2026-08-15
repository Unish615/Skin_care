import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Activity, LineChart, Sparkles, Sliders } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Telemetry Architecture</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Designed for <span className="glow-text-purple">Clinical Precision</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Powered by high-resolution facial feature extraction algorithms and dermatological clinical research.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Card 1: Computer Vision Landmark Mapping (Spans 2 cols on md) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="md:col-span-2 glass-card p-8 relative overflow-hidden group cursor-pointer border border-[var(--border-glass)]"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-[var(--accent-lavender)] text-[var(--accent-purple)]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-[var(--accent-purple)] uppercase tracking-wider font-semibold">Vision AI Engine</span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">128-Point Neural Face Mapping</h3>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 max-w-xl leading-relaxed">
              Our neural network detects micro-topography variances down to 0.02mm, mapping forehead wrinkles, infraorbital dark circles, nasal comedones, and cheek redness with multi-spectrum analysis.
            </p>

            {/* Micro Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div>
                <div className="text-2xl font-extrabold text-[var(--text-primary)] font-heading">128</div>
                <div className="text-xs text-[var(--text-muted)] font-medium">Biometric Points</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#06B6D4] font-heading">99.4%</div>
                <div className="text-xs text-[var(--text-muted)] font-medium">Zone Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#7C3AED] font-heading">&lt; 1.2s</div>
                <div className="text-xs text-[var(--text-muted)] font-medium">Scan Velocity</div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Biometric Hydration Telemetry */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="glass-card p-8 relative overflow-hidden group cursor-pointer border border-[var(--border-glass)]"
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit mb-6">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-wider font-semibold">Lipid Balance</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">TEWL Water Barrier Telemetry</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Calculates Transepidermal Water Loss ratios across malar and nasal zones to calibrate ceramide needs.
            </p>
            <div className="w-full bg-[var(--bg-secondary)] rounded-full h-3 overflow-hidden p-0.5 border border-[var(--border-color)]">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full w-[78%] group-hover:w-[88%] transition-all duration-700" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-[var(--text-muted)] font-medium">
              <span>Epidermal TEWL</span>
              <span className="font-semibold text-[var(--text-primary)]">78% Optimal</span>
            </div>
          </motion.div>

          {/* Bento Card 3: Privacy First Architecture */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="glass-card p-8 relative overflow-hidden group cursor-pointer border border-[var(--border-glass)]"
          >
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">Privacy Core</span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Ephemeral Memory Scan</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Your biometric photos are processed purely in ephemeral RAM and instantly deleted unless stored in your encrypted local profile.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Zero External Server Upload</span>
            </div>
          </motion.div>

          {/* Bento Card 4: Retinoid Calibration (Spans 2 cols on md) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="md:col-span-2 glass-card p-8 relative overflow-hidden group cursor-pointer border border-[var(--border-glass)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">Dosage Calibration</span>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Dermatological Active Ingredient Matcher</h3>
              </div>
            </div>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed mb-6">
              Automatically filters active concentrations (e.g. 0.3% Retinol vs 15% L-Ascorbic Acid vs 2% Salicylic) based on your redness and barrier stability scores to avoid over-exfoliation.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Salicylic Acid', 'Niacinamide 2%', 'L-Ascorbic Acid 15%', 'Ceramides NP', 'Centella Asiatica'].map((ing, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] group-hover:border-[var(--accent-purple)] transition-colors">
                  {ing}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
