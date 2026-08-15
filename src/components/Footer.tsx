import React from 'react';
import { Activity, ShieldAlert, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-16 pb-28 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
                  Skin<span className="glow-text-purple">AI</span>
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Privacy-first computer vision skincare telemetry blending clinical healthcare algorithms with luxury MedSpa aesthetic precision.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-4">
                Telemetry Modules
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li><a href="#hero" className="hover:text-[var(--accent-purple)] transition-colors">128-Point Neural Scanner</a></li>
                <li><a href="#features" className="hover:text-[var(--accent-purple)] transition-colors">TEWL Water Barrier Index</a></li>
                <li><a href="#results" className="hover:text-[var(--accent-purple)] transition-colors">Erythema & Pigment Mapping</a></li>
                <li><a href="#routine" className="hover:text-[var(--accent-purple)] transition-colors">Active Ingredient Dosage</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-4">
                Compliance & Standards
              </h4>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                <li>Ephemeral Processing Protocol</li>
                <li>Dermatological Algorithm V2.4</li>
                <li>HIPAA Privacy Architecture</li>
                <li>ISO 27001 Data Encryption</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--text-primary)] mb-4">
                Platform Status
              </h4>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Vision AI Core: 100% Operational</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-3">
                Created with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> for clinical aesthetics.
              </p>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
            <p>© {new Date().getFullYear()} SkinAI Technologies Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Terms of Service</span>
              <span>Privacy Policy</span>
              <span>Dermatology Board Review</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Prominent Sticky Global Medical Disclaimer Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-purple-500/30 py-3 px-4 text-white text-xs font-medium shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="leading-tight text-slate-200">
              <strong className="text-amber-400 uppercase font-semibold mr-1">Medical Disclaimer:</strong>
              SkinAI provides visual computer vision estimates for educational and cosmetic routine purposes. It does not replace professional dermatological advice or medical diagnosis. Consult a board-certified dermatologist for persistent skin conditions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
