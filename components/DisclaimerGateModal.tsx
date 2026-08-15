'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Volume2 } from 'lucide-react';

interface DisclaimerGateModalProps {
  isOpen: boolean;
  onEnter: () => void;
}

export const DisclaimerGateModal: React.FC<DisclaimerGateModalProps> = ({ isOpen, onEnter }) => {
  const handleEnterClick = () => {
    // ABSOLUTE STATE SEPARATION: No audio calls, no Web Audio API, no media triggers in this handler.
    // Line 1 instantly unmounts the modal state token for zero-lag entry under all browser policies.
    onEnter();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="w-full max-w-2xl glass-panel p-6 sm:p-10 bg-slate-950/95 border-2 border-violet-500/50 shadow-[0_0_50px_rgba(139,92,246,0.3)] relative rounded-3xl space-y-6 text-center max-h-[90vh] overflow-y-auto"
        >
          {/* Top Warning Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg animate-pulse">
            <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              NYORIA PROTOCOL // FIRST-LOAD GATEWAY
            </span>
            <h2 className="font-heading font-extrabold text-xl sm:text-3xl text-white tracking-tight leading-snug">
              महत्वपूर्ण सूचना (Clinical Simulation Disclaimer)
            </h2>
          </div>

          {/* DUAL-LANGUAGE DISCLAIMER TEXT (NEPALI + ENGLISH) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans text-left space-y-4 shadow-inner">
            
            {/* Nepali Version */}
            <div className="space-y-1 border-b border-slate-800 pb-3">
              <p className="font-bold text-amber-400 text-[10px] font-mono tracking-wider uppercase">
                [NEPALI CLINICAL STATEMENT]
              </p>
              <p className="font-medium text-white leading-relaxed">
                "यो वेबसाइटले दिएको कुराहरू १००% सही हुँदैन। यो हामीले यस प्रकारको प्रणाली पनि बनाउन सकिन्छ भनेर प्रदर्शनको लागि मात्र बनाएका हौं। आफ्नो छालाको वास्तविक अवस्था र गम्भीर समस्याको बारेमा बुझ्नको लागि कृपया नजिकैको स्वास्थ्य चौकी वा छाला रोग विशेषज्ञकोमा जानुहोस्।"
              </p>
            </div>

            {/* English Version */}
            <div className="space-y-1">
              <p className="font-bold text-cyan-400 text-[10px] font-mono tracking-wider uppercase">
                [ENGLISH CLINICAL STATEMENT]
              </p>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                "The evaluations provided by this system are simulations for educational profiling and demonstration purposes only. They do not claim 100% medical accuracy or diagnostic certainty. For precise skin analysis and professional medical evaluation, please visit your nearest health post or consult a certified dermatologist."
              </p>
            </div>

          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Click below to instantly enter the Nyoria Clinical Dashboard</span>
          </div>

          {/* Glowing Action Button */}
          <button
            onClick={handleEnterClick}
            className="w-full py-4 rounded-2xl font-heading font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            <CheckCircle className="w-5 h-5 text-emerald-300 group-hover:rotate-12 transition-transform" />
            <span>I Understand & Enter</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
