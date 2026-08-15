'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, UserCheck, Terminal, RotateCcw, Activity, CheckCircle2, Scan, ShieldAlert } from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../data/skincareData';
import { analyzeSkin } from '../services/skinAnalysisService';
import { AnalysisResult } from '../types';

interface PhotoUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete
}) => {
  const [selectedImage, setSelectedImage] = useState<string | File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const originalUrl = URL.createObjectURL(file);
      setPreviewUrl(originalUrl);
    }
  };

  const handleSampleSelect = (url: string) => {
    setSelectedImage(url);
    setPreviewUrl(url);
  };

  const handleResetPhoto = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setIsScanning(false);
  };

  const triggerAnalysis = async () => {
    if (!selectedImage) return;

    setIsScanning(true);
    setScanProgress(0);
    setDiagnosticLogs([]);

    const logStream = [
      '[NYORIA CELLULAR FACIAL SCANNER INITIALIZED]',
      '[PURE FACIAL DERMAL LOCK: FOREHEAD & CHEEKS REGISTERED]',
      '[PURE FACIAL DERMAL LOCK: NOSE, NASAL ALAR & CHIN SENSORS LOCK]',
      '[T-ZONE & U-ZONE LIPID BALANCING ANALYSIS...]',
      '[EPIDERMAL MOISTURE DEFICIT MAPPING IN PROGRESS...]',
      '[VASCULAR ERYTHEMA & PIGMENT UNIFORMITY: COMPUTING...]',
      '[NYORIA MOLECULAR PROTOCOL: CALIBRATING REGIMEN...]'
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logStream.length) {
        setDiagnosticLogs(prev => [...prev, logStream[currentIdx]]);
        setScanProgress(Math.floor(((currentIdx + 1) / logStream.length) * 100));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    try {
      const result = await analyzeSkin(selectedImage);
      setIsScanning(false);
      onAnalysisComplete(result);
    } catch (err) {
      setIsScanning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative max-h-[92vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
              Nyoria Engine Cellular Facial Dermal Scanner
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 overflow-y-auto flex-1">
          <AnimatePresence mode="wait">
            
            {/* SCANNING STATE */}
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Left: Facial Target Viewport with Laser Beam Overlay */}
                <div className="md:col-span-7 relative aspect-square rounded-3xl overflow-hidden glass-panel border-2 border-violet-500/60 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center bg-slate-950">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Facial Dermis Target" 
                      className="absolute inset-0 w-full h-full object-cover filter contrast-110"
                    />
                  )}

                  {/* Oval Facial Lock Reticle Overlay */}
                  <div className="absolute inset-0 border-[35px] border-slate-950/70 rounded-[90px] pointer-events-none z-10 flex items-center justify-center">
                    <div className="border-2 border-dashed border-cyan-400/80 rounded-full w-full h-full animate-pulse" />
                  </div>

                  {/* Laser Beam */}
                  <div className="laser-line z-20" />

                  <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-cyan-300 bg-slate-950/90 px-3 py-1.5 rounded-full border border-cyan-500/40 flex items-center gap-1.5 font-bold shadow-lg">
                    <Scan className="w-3.5 h-3.5 text-cyan-400" />
                    <span>FACIAL_DERMIS_LOCK // ACTIVE</span>
                  </div>
                </div>

                {/* Right: Diagnostic Terminal Stream Logs */}
                <div className="md:col-span-5 h-full min-h-[340px] bg-slate-950 p-5 rounded-2xl border border-violet-500/30 flex flex-col justify-between font-mono text-xs shadow-2xl">
                  <div>
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-violet-400">
                      <Terminal className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-wider">Facial Telemetry Stream</span>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {diagnosticLogs.map((log, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-violet-300/90 leading-tight">
                          {log}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 font-bold">NYORIA_SCAN_PROGRESS</span>
                    <span className="font-bold text-lg text-violet-400">{scanProgress}%</span>
                  </div>
                </div>

              </motion.div>
            ) : (

              /* PHOTO VIEWPORT OR DROPZONE STATE */
              <motion.div key="upload" className="space-y-6">
                
                {previewUrl ? (
                  /* SELECTED PHOTO VIEWPORT */
                  <div className="space-y-4">
                    <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden glass-panel border-2 border-violet-500/60 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                      <img src={previewUrl} alt="Selected Biometric Scan Target" className="w-full h-full object-cover" />
                      
                      {/* Floating Replace Photo Button */}
                      <button
                        onClick={handleResetPhoto}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-violet-500/50 text-white font-heading font-bold text-xs shadow-2xl flex items-center gap-2 transition-transform hover:scale-105 z-20"
                      >
                        <RotateCcw className="w-4 h-4 text-violet-400" />
                        <span>🔄 Replace Photo</span>
                      </button>

                      <div className="absolute top-4 left-4 z-20 text-[10px] font-mono text-violet-300 bg-slate-950/90 px-2.5 py-1 rounded-full border border-violet-500/30">
                        PHOTO_READY_FOR_SCAN
                      </div>
                    </div>
                  </div>
                ) : (
                  /* DROPZONE & SAMPLE SELECTOR */
                  <>
                    <label className="relative border-2 border-dashed border-[var(--border-color)] hover:border-violet-500 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer bg-[var(--bg-secondary)]/40 transition-colors group">
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      
                      <div className="p-5 rounded-3xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300 animate-float-slow">
                        <Camera className="w-10 h-10" />
                      </div>

                      <div className="text-center space-y-1">
                        <p className="font-heading font-bold text-base text-[var(--text-primary)]">
                          Drop photo here, or <span className="text-violet-400 underline">browse files</span>
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">
                          Upload your face photo for 20-metric Nyoria skin diagnostic analysis.
                        </p>
                      </div>
                    </label>

                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-violet-400" />
                        <span>Or Select Sample Face Profile</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {SAMPLE_PORTRAITS.map((sample) => (
                          <div
                            key={sample.id}
                            onClick={() => handleSampleSelect(sample.url)}
                            className="glass-card p-3 cursor-pointer border border-[var(--border-color)] hover:border-violet-500/50 rounded-2xl transition-all"
                          >
                            <img src={sample.url} alt={sample.name} className="w-full aspect-square object-cover rounded-xl mb-2" />
                            <div className="font-heading font-bold text-xs text-[var(--text-primary)]">{sample.name}</div>
                            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{sample.type}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        {!isScanning && (
          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
              Cancel
            </button>
            <button
              disabled={!selectedImage}
              onClick={triggerAnalysis}
              className={`px-8 py-3.5 rounded-xl font-heading font-bold text-xs text-white flex items-center gap-2 transition-all ${
                selectedImage 
                  ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-500/30 hover:scale-[1.02]' 
                  : 'bg-slate-500 opacity-50 cursor-not-allowed'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Trigger Skin Analysis</span>
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
