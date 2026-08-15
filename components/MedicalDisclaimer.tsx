'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-violet-500/30 py-3 px-4 text-white text-xs font-medium shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <p className="leading-tight text-slate-200">
            <strong className="text-amber-400 uppercase font-semibold mr-1">Medical Safeguard:</strong>
            SkinAI provides visual computer vision cosmetic estimates for educational and routine customization purposes only. It does not replace professional dermatological advice or medical diagnosis. Consult a board-certified dermatologist for persistent skin issues.
          </p>
        </div>
      </div>
    </div>
  );
};
