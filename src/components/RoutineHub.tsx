import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTINE_STEPS_MORNING, ROUTINE_STEPS_EVENING } from '../data/skincareData';
import { Sun, Moon, Info, Sparkles, Check, Clock } from 'lucide-react';

export const RoutineHub: React.FC = () => {
  const [activeTiming, setActiveTiming] = useState<'morning' | 'evening'>('morning');
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);

  const steps = activeTiming === 'morning' ? ROUTINE_STEPS_MORNING : ROUTINE_STEPS_EVENING;

  return (
    <section id="routine" className="py-24 bg-[var(--bg-secondary)]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Telemetry-Guided Regimen</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Personalized <span className="glow-text-purple">Skincare Routine</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Chronologically structured steps with precision active ingredient dosages calibrated to your biometric skin score.
          </p>

          {/* Morning vs Evening Tab Switcher */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] shadow-md">
              <button
                onClick={() => setActiveTiming('morning')}
                className={`px-6 py-3 rounded-xl font-heading font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                  activeTiming === 'morning'
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>☀️ Morning Routine</span>
              </button>

              <button
                onClick={() => setActiveTiming('evening')}
                className={`px-6 py-3 rounded-xl font-heading font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                  activeTiming === 'evening'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>🌙 Evening Routine</span>
              </button>
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTiming}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredStepId(step.id)}
                onMouseLeave={() => setHoveredStepId(null)}
                className="glass-card p-6 relative flex flex-col justify-between border border-[var(--border-glass)] shadow-xl group hover:border-[var(--accent-purple)] transition-all duration-300"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-xl bg-[var(--accent-lavender)] text-[var(--accent-purple)] font-heading font-extrabold text-sm flex items-center justify-center shadow-sm">
                    0{step.stepNumber}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md">
                    {step.category}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg w-fit">
                    Active: {step.activeIngredient}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.usageInstructions}
                  </p>
                </div>

                {/* Active Ingredient Rationale Tooltip Box */}
                <div className="relative pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-purple)]">
                    <Info className="w-4 h-4 shrink-0" />
                    <span>Biometric Rationale</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                    {step.whySelected}
                  </p>
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
