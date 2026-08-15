'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Scan, ChevronRight, ShieldCheck, Zap, Activity } from 'lucide-react';

interface HeroSectionProps {
  onOpenScanner: () => void;
  onHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenScanner, onHowItWorks }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    const baseParticles = [
      { x: 0, y: -0.8, z: 0 },
      { x: -0.35, y: -0.6, z: 0.2 }, { x: 0.35, y: -0.6, z: 0.2 },
      { x: -0.5, y: -0.3, z: 0.3 },  { x: 0.5, y: -0.3, z: 0.3 },
      { x: 0, y: -0.25, z: 0.6 },
      { x: 0, y: 0.1, z: 0.75 },
      { x: -0.6, y: 0.05, z: 0.25 }, { x: 0.6, y: 0.05, z: 0.25 },
      { x: -0.65, y: 0.35, z: 0.1 }, { x: 0.65, y: 0.35, z: 0.1 },
      { x: -0.3, y: 0.35, z: 0.45 }, { x: 0.3, y: 0.35, z: 0.45 },
      { x: 0, y: 0.5, z: 0.5 },
      { x: 0, y: 0.75, z: 0.4 },
      { x: -0.4, y: 0.85, z: 0.2 }, { x: 0.4, y: 0.85, z: 0.2 }
    ];

    const connections = [
      [0, 1], [0, 2], [1, 5], [2, 5], [5, 6],
      [1, 3], [2, 4], [3, 7], [4, 8], [6, 7], [6, 8],
      [6, 11], [6, 12], [11, 13], [12, 13], [13, 14],
      [14, 15], [14, 16], [7, 15], [8, 16]
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.006;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.36;

      const targetMouseX = (mousePos.x / window.innerWidth - 0.5) * 0.4;
      const targetMouseY = (mousePos.y / window.innerHeight - 0.5) * 0.4;

      const projected = baseParticles.map((p, idx) => {
        const rad = angle + targetMouseX;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const rx = p.x * cos - p.z * sin + targetMouseX * 0.5;
        const ry = p.y + targetMouseY * 0.3;
        const rz = p.x * sin + p.z * cos;

        return {
          x: centerX + rx * scale,
          y: centerY + ry * scale,
          z: rz,
          idx
        };
      });

      ctx.lineWidth = 1.2;
      connections.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'rgba(139, 92, 246, 0.4)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      projected.forEach((p) => {
        const glow = Math.sin(angle * 3 + p.idx) * 3 + 5;
        ctx.shadowColor = p.idx % 2 === 0 ? '#38BDF8' : '#A855F7';
        ctx.shadowBlur = glow;

        ctx.fillStyle = p.idx % 2 === 0 ? '#38BDF8' : '#A855F7';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  const headlineWords = "Understand Your Skin With Nyoria Intelligence".split(" ");

  return (
    <section 
      id="hero" 
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="relative min-h-[92vh] flex items-center justify-center pt-10 pb-20 overflow-hidden"
    >
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-violet-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-violet-500/30 text-xs font-semibold uppercase tracking-wider text-violet-400"
          >
            <Activity className="w-4 h-4 text-violet-400" />
            <span>Nyoria Molecular Diagnostic Protocol V2.4</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={word === "Nyoria" || word === "Intelligence" ? "glow-text-violet inline-block ml-2" : "inline-block mr-3"}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed"
          >
            An advanced, privacy-first diagnostic breakthrough engineered under the Nyoria brand. Decodes cellular oil-water balance, barrier deficit, and vascular erythema in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            <button
              onClick={onOpenScanner}
              className="px-8 py-4 rounded-2xl font-heading font-bold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group"
            >
              <Scan className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Analyze My Skin</span>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onHowItWorks}
              className="rolling-underline px-4 py-3 text-base font-semibold flex items-center gap-2 text-[var(--text-primary)] cursor-pointer"
            >
              <span>How Nyoria Works</span>
              <ChevronRight className="w-4 h-4 text-violet-400" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-6 border-t border-[var(--border-color)] grid grid-cols-3 gap-4 max-w-lg"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">100% Encrypted Ephemeral RAM</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-400 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Nyoria Cellular Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Sub-Second Diagnostic Processing</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md aspect-square rounded-3xl glass-panel p-6 overflow-hidden flex items-center justify-center border border-[var(--glass-border)] shadow-2xl"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            <div className="laser-line" />

            <div className="absolute top-6 left-6 glass-card px-3.5 py-2 text-xs font-semibold flex items-center gap-2 text-[var(--text-primary)] shadow-lg animate-float-slow">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>T-Zone Sebum: 72 ug/cm²</span>
            </div>

            <div className="absolute bottom-8 right-6 glass-card px-3.5 py-2 text-xs font-semibold flex items-center gap-2 text-[var(--text-primary)] shadow-lg animate-float-slow" style={{ animationDelay: '1.5s' }}>
              <Activity className="w-4 h-4 text-violet-400" />
              <span>Nyoria Index: 84/100</span>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-400 bg-slate-900/80 px-2 py-1 rounded">
              NYORIA_MESH // ACTIVE
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
