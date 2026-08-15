import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, CheckCircle2, Sparkles, X, RefreshCw, UserCheck, AlertCircle } from 'lucide-react';
import { SAMPLE_PORTRAITS } from '../data/skincareData';
import { analyzeSkin } from '../services/skinAnalysisService';
import { AnalysisResult } from '../types';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'sample'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('Initializing Vision Neural Pipeline...');
  const [scanProgress, setScanProgress] = useState(0);

  // Camera state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Dynamic float node callouts during scanning
  const [activeCallouts, setActiveCallouts] = useState<string[]>([]);

  // Camera initialization
  useEffect(() => {
    if (isOpen && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setCameraError('Webcam access unavailable or permission denied. Please select a file or sample portrait.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUrl);
      setPreviewUrl(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSampleSelect = (url: string) => {
    setSelectedImage(url);
    setPreviewUrl(url);
  };

  const triggerScanProcess = async () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setScanProgress(0);

    const calloutSequence = [
      'Analyzing T-Zone Sebum Density...',
      'Measuring Transepidermal Water Loss (TEWL)...',
      'Detecting Micro-Erythema & Capillary Dilation...',
      'Mapping Comedonal & Pore Topography...',
      'Evaluating Infraorbital Vascularity...',
      'Synthesizing Dermatological Score Index...'
    ];

    // Progress counter & text callouts
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setScanProgress(Math.min(100, Math.floor((currentStep / calloutSequence.length) * 100)));
      if (currentStep < calloutSequence.length) {
        setScanStepText(calloutSequence[currentStep]);
        setActiveCallouts(prev => [...prev.slice(-2), calloutSequence[currentStep]]);
      } else {
        clearInterval(interval);
      }
    }, 450);

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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="w-full max-w-3xl glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col justify-between"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-purple)]" />
            <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
              AI Vision Telemetry Scanner
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-6 overflow-y-auto flex-1">

          {/* SCANNING PHASE OVERLAY */}
          {isScanning ? (
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-[var(--glass-border)] flex items-center justify-center">
              
              {/* Blurred user photo underneath */}
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Scanning Target" 
                  className="absolute inset-0 w-full h-full object-cover filter blur-md scale-105 contrast-125"
                />
              )}

              {/* Glowing vertical laser scan line */}
              <div className="laser-line" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

              {/* Floating Dynamic Callout Text Nodes */}
              <div className="absolute top-8 left-8 glass-card px-3 py-1.5 text-xs font-semibold text-cyan-400 bg-slate-900/80 shadow-lg float-node">
                ✓ Lighting calibrated: 98%
              </div>

              <div className="absolute bottom-12 right-8 glass-card px-3 py-1.5 text-xs font-semibold text-purple-400 bg-slate-900/80 shadow-lg float-node" style={{ animationDelay: '1s' }}>
                {scanStepText}
              </div>

              {/* Center Spinner & Progress Ring */}
              <div className="relative z-20 text-center space-y-4 bg-slate-900/70 p-6 rounded-2xl backdrop-blur-md border border-white/10 max-w-sm">
                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-cyan-400 animate-spin mx-auto" />
                <div>
                  <div className="font-heading font-extrabold text-2xl text-white">
                    {scanProgress}%
                  </div>
                  <p className="text-xs font-medium text-cyan-200 mt-1">
                    {scanStepText}
                  </p>
                </div>
              </div>

            </div>
          ) : (

            /* SELECTION & CAMERA CAPTURE PHASE */
            <div className="space-y-6">

              {/* Tab Switcher */}
              <div className="flex p-1 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)]">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'upload' ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-purple)] shadow-sm' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </button>

                <button
                  onClick={() => setActiveTab('camera')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'camera' ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-purple)] shadow-sm' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Live Webcam</span>
                </button>

                <button
                  onClick={() => setActiveTab('sample')}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'sample' ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-purple)] shadow-sm' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Sample Portraits</span>
                </button>
              </div>

              {/* UPLOAD TAB */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <label className="relative border-2 border-dashed border-[var(--border-color)] hover:border-[var(--accent-purple)] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[var(--bg-secondary)]/40 transition-colors group">
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <div className="p-4 rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 animate-bounce" />
                    </div>
                    <div className="text-center">
                      <p className="font-heading font-bold text-sm text-[var(--text-primary)]">
                        Drag and drop your selfie here, or <span className="text-[var(--accent-purple)]">browse</span>
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        High resolution JPG or PNG under well-lit conditions works best.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* CAMERA TAB */}
              {activeTab === 'camera' && (
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  {cameraError ? (
                    <div className="p-6 text-center text-rose-400 space-y-3">
                      <AlertCircle className="w-10 h-10 mx-auto text-rose-500" />
                      <p className="text-xs font-semibold">{cameraError}</p>
                    </div>
                  ) : (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                      
                      {/* Oval Face Silhouette Bounding Box Guide Overlay */}
                      <div className="absolute inset-0 border-[40px] border-slate-950/60 flex items-center justify-center pointer-events-none">
                        <div className="w-56 h-72 border-2 border-dashed border-cyan-400 rounded-[50%] shadow-[0_0_20px_#06B6D4] flex items-center justify-center">
                          <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded">
                            ALIGN FACE HERE
                          </span>
                        </div>
                      </div>

                      {/* Floating Check Tooltips */}
                      <div className="absolute top-4 left-4 glass-card px-3 py-1 text-[11px] font-semibold text-emerald-400 bg-slate-900/80 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Good lighting detected ✓</span>
                      </div>
                      <div className="absolute top-4 right-4 glass-card px-3 py-1 text-[11px] font-semibold text-emerald-400 bg-slate-900/80 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>No sunglasses detected ✓</span>
                      </div>

                      {/* Snap Button */}
                      <button
                        onClick={capturePhoto}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-heading font-bold text-xs shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Capture Frame</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* SAMPLE PORTRAITS TAB */}
              {activeTab === 'sample' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SAMPLE_PORTRAITS.map((portrait) => (
                    <div
                      key={portrait.id}
                      onClick={() => handleSampleSelect(portrait.url)}
                      className={`glass-card p-3 cursor-pointer border rounded-2xl transition-all ${
                        previewUrl === portrait.url ? 'border-[var(--accent-purple)] ring-2 ring-[var(--accent-purple)]/30' : 'border-[var(--border-color)] hover:border-[var(--accent-purple)]/50'
                      }`}
                    >
                      <img src={portrait.url} alt={portrait.name} className="w-full aspect-square object-cover rounded-xl mb-2" />
                      <div className="font-heading font-bold text-xs text-[var(--text-primary)] leading-tight">{portrait.name}</div>
                      <div className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">{portrait.type}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* PREVIEW SELECTED IMAGE BOX */}
              {previewUrl && (
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                  <img src={previewUrl} alt="Selected Preview" className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[var(--text-primary)]">Image Selected for Vision Telemetry</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Ready for 128-point neural extraction.</div>
                  </div>
                  <button 
                    onClick={() => { setSelectedImage(null); setPreviewUrl(null); }}
                    className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg text-xs"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        {!isScanning && (
          <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]">
              Cancel
            </button>
            <button
              disabled={!selectedImage}
              onClick={triggerScanProcess}
              className={`px-8 py-3 rounded-xl font-heading font-bold text-xs text-white flex items-center gap-2 transition-all ${
                selectedImage 
                  ? 'bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] shadow-lg shadow-purple-500/30 hover:scale-[1.02]' 
                  : 'bg-slate-400 opacity-50 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Begin AI Vision Scan</span>
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};
