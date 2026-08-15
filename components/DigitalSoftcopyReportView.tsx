'use client';

import React from 'react';
import { AnalysisResult } from '../types';
import { getDynamicRoutineSteps, RECOMMENDED_PRODUCTS, MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { ShieldCheck, Download, Award, MapPin, Sparkles, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface DigitalSoftcopyReportViewProps {
  result: AnalysisResult;
  patientName?: string;
  onBackToApp?: () => void;
}

export const DigitalSoftcopyReportView: React.FC<DigitalSoftcopyReportViewProps> = ({
  result,
  patientName,
  onBackToApp
}) => {
  const displayName = (patientName || 'ANONYMOUS CLINICAL PATIENT').toUpperCase();
  const dynamicRoutine = getDynamicRoutineSteps(result.detectedSkinType || 'Dry & Dehydrated');

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-slate-200">
        
        {/* Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            {onBackToApp ? (
              <button
                onClick={onBackToApp}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 hover:text-black flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Nyoria Engine</span>
              </button>
            ) : (
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 hover:text-black flex items-center gap-2 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Nyoria Home</span>
              </Link>
            )}
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VERIFIED CLINICAL SOFTCOPY REPORT</span>
            </div>
          </div>

          <button
            onClick={handlePrintPDF}
            className="px-6 py-2.5 rounded-xl bg-violet-700 text-white font-heading font-bold text-xs shadow-md hover:bg-violet-800 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Save / Print PDF Softcopy</span>
          </button>
        </div>

        {/* Clinical Header Banner - Matches Screenshot Exact Layout */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 pb-4 border-b-2 border-violet-600">
          <div className="space-y-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-violet-800 tracking-tight">
              NYORIA SKIN INTELLIGENCE
            </h1>
            <div className="text-xs font-bold text-slate-600 tracking-wider uppercase">
              MOLECULAR DIAGNOSTIC REPORT (20 PARAMETERS)
            </div>
            <div className="mt-3 p-3 rounded-lg bg-purple-50 border-l-4 border-violet-600 font-mono text-xs font-bold text-slate-900">
              PATIENT / CLIENT: <span className="text-violet-700 font-extrabold">{displayName}</span> (SKIN TYPE: {result.detectedSkinType || 'Dry & Dehydrated'})
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-right text-xs font-mono space-y-1 text-slate-600 shrink-0">
            <div><strong>Report ID:</strong> <span className="text-violet-700 font-bold">{result.id}</span></div>
            <div><strong>Date:</strong> {result.timestamp}</div>
            <div><strong>Engine:</strong> Nyoria Protocol V2.4</div>
          </div>
        </div>

        {/* BIG OVERALL SCORE BANNER - Matches Screenshot Exact Purple Box Styling */}
        <div className="p-8 sm:p-10 rounded-2xl bg-purple-50/90 border border-purple-200 text-center space-y-2">
          <div className="font-heading font-black text-6xl sm:text-7xl text-violet-700 tracking-tight">
            {result.overallScore} / 100
          </div>
          <div className="font-heading font-extrabold text-xs sm:text-sm text-violet-900 uppercase tracking-wider">
            NYORIA CELLULAR HEALTH INDEX SCORE FOR {displayName}
          </div>
        </div>

        {/* SECTION I: 20 MICRO-DEPTH GRANULAR BIOMETRIC SKIN PARAMETERS - Matches Screenshot 2-Column Cards */}
        <div className="space-y-4 pt-2">
          <h2 className="font-heading font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-2">
            I. 20 Micro-Depth Granular Biometric Skin Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-violet-400 transition-all flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">
                    {metric.metricNumber}. {metric.name}
                  </h3>
                  <span className="font-heading font-extrabold text-sm text-violet-700 shrink-0">
                    {metric.score}%
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug font-sans">
                  <strong className="text-slate-800">Nyoria Micro-Detection:</strong> {metric.contextualDetectionText}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION II: CALIBRATED REGIMEN */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="font-heading font-extrabold text-lg text-slate-900">
            II. Calibrated Regimen for {result.detectedSkinType} (Morning & Evening)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Morning */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2.5">
              <h3 className="font-heading font-bold text-xs text-amber-800 uppercase tracking-wider">☀️ Morning Routine Steps</h3>
              <div className="space-y-2">
                {dynamicRoutine.morning.map(s => (
                  <div key={s.id} className="p-2.5 rounded-lg bg-white border border-amber-200 text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>AM 0{s.stepNumber}. {s.title}</span>
                      <span className="text-violet-700">{s.category}</span>
                    </div>
                    <div className="text-amber-900 font-semibold">{s.productName}</div>
                    <div className="text-slate-600 text-[11px]">{s.whySelected}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evening */}
            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-2.5">
              <h3 className="font-heading font-bold text-xs text-purple-900 uppercase tracking-wider">🌙 Evening Routine Steps</h3>
              <div className="space-y-2">
                {dynamicRoutine.evening.map(s => (
                  <div key={s.id} className="p-2.5 rounded-lg bg-white border border-purple-200 text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>PM 0{s.stepNumber}. {s.title}</span>
                      <span className="text-violet-700">{s.category}</span>
                    </div>
                    <div className="text-purple-900 font-semibold">{s.productName}</div>
                    <div className="text-slate-600 text-[11px]">{s.whySelected}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION III: PRESCRIBED NEPALI PHARMACEUTICAL FORMULATIONS */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="font-heading font-extrabold text-lg text-slate-900">
            III. Prescribed Nepali Pharmaceutical Formulations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RECOMMENDED_PRODUCTS.map(p => (
              <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-violet-700 uppercase">{p.brand}</span>
                  <h4 className="font-heading font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h4>
                  <div className="text-xs font-bold text-emerald-700">{p.priceNpr}</div>
                </div>

                <div className="pt-1.5 border-t border-slate-200 text-[10px] text-emerald-800 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>📍 Available Across Nepal</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION IV: VERIFIED CLINICAL REFERENCE CENTERS */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="font-heading font-extrabold text-lg text-slate-900">
            IV. Verified Clinical Reference Centers in Nepal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOCK_DERMATOLOGISTS.map(d => (
              <div key={d.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <strong className="text-xs font-heading text-slate-900 block">{d.name}</strong>
                <div className="text-violet-700 font-bold text-[11px]">{d.specialty}</div>
                <div className="text-slate-600 text-[11px]">{d.address}</div>
                <div className="text-cyan-700 font-mono font-bold text-[11px]">{d.phone}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Clinical Safeguard Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <div><strong>Clinical Notice:</strong> Formulated for <strong className="text-slate-800">{displayName}</strong> by Nyoria Diagnostic Protocol.</div>
          <div className="text-[10px] text-slate-400">Nyoria Skin Labs. All Rights Reserved. Clinical telemetry parameters for educational and cosmetic reference.</div>
        </div>

      </div>
    </div>
  );
};
