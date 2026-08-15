'use client';

import React from 'react';
import { Activity, Shield, FileText, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
                Nyoria <span className="glow-text-violet">Skin Labs</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] max-w-sm leading-relaxed">
              Nyoria Molecular Diagnostic Protocol — Ultra-high fidelity cutaneous cellular telemetry and biometric analysis engineered for educational clinical customization.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-medium">
            <div>
              <strong className="text-[var(--text-primary)] block text-sm font-bold mb-3">Diagnostic Platform</strong>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-violet-400">Overview</a></li>
                <li><a href="#results" className="hover:text-violet-400">20-Metric Dashboard</a></li>
                <li><a href="#routine" className="hover:text-violet-400">Nepali Formulations</a></li>
                <li><a href="#dermatologists" className="hover:text-violet-400">Nepal Dermatologists</a></li>
              </ul>
            </div>

            <div>
              <strong className="text-[var(--text-primary)] block text-sm font-bold mb-3">Clinical Compliance</strong>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Ephemeral RAM Processing</li>
                <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-violet-400" /> Zero Permanent Cloud Storage</li>
                <li className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-cyan-400" /> Educational Dermal Advisory</li>
              </ul>
            </div>

            <div>
              <strong className="text-[var(--text-primary)] block text-sm font-bold mb-3">Licensing & Regulatory</strong>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                Operated under Nyoria Skin Labs clinical software licensing. All product references denote authentic pharmaceutical formulations registered in Nepal.
              </p>
            </div>
          </div>

        </div>

        {/* Legal Bottom */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-4">
          <p>© {new Date().getFullYear()} Nyoria Skin Labs. All Rights Reserved. Clinical Demonstration Diagnostic System.</p>
          <div className="flex items-center gap-4 font-semibold">
            <span>Terms of Clinical Use</span>
            <span>•</span>
            <span>Privacy Telemetry</span>
            <span>•</span>
            <span>Nepal Pharmacy Directory</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
