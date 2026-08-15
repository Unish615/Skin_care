import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Scan, Shield, Zap, Sparkles, ChevronRight, Award, Eye } from 'lucide-react';

interface HeroSectionProps {
  onOpenScanner: () => void;
  onHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenScanner, onHowItWorks }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated 3D-esque facial mesh grid canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    resize();
    window.addEventListener('resize', resize);

    // Face mesh node coordinates template
    const baseNodes = [
      { x: 0, y: -0.85, z: 0 },    // Forehead top
      { x: -0.4, y: -0.6, z: 0.2 }, // Forehead L
      { x: 0.4, y: -0.6, z: 0.2 },  // Forehead R
      { x: 0, y: -0.3, z: 0.5 },    // Nose bridge
      { x: 0, y: 0.1, z: 0.7 },     // Nose tip
      { x: -0.6, y: -0.1, z: 0.3 }, // Left cheek high
      { x: 0.6, y: -0.1, z: 0.3 },  // Right cheek high
      { x: -0.7, y: 0.2, z: 0.1 },  // Left cheek low
      { x: 0.7, y: 0.2, z: 0.1 },   // Right cheek low
      { x: -0.3, y: 0.3, z: 0.4 },  // Left nostril
      { x: 0.3, y: 0.3, z: 0.4 },   // Right nostril
      { x: 0, y: 0.5, z: 0.5 },     // Upper lip
      { x: 0, y: 0.7, z: 0.4 },     // Chin
      { x: -0.4, y: 0.85, z: 0.2 }, // Jaw L
      { x: 0.4, y: 0.85, z: 0.2 }   // Jaw R
    ];

    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
      [1, 5], [2, 6], [5, 7], [6, 8], [3, 5], [3, 6],
      [4, 9], [4, 10], [9, 11], [10, 11], [11, 12],
      [12, 13], [12, 14], [7, 13], [8, 14]
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.008;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.38;

      // Project nodes in 3D rotation
      const projectedNodes = baseNodes.map(node => {
        const rad = angle;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        // Y-axis rotation
        const rx = node.x * cos - node.z * sin;
        const rz = node.x * sin + node.z * cos;

        return {
          x: centerX + rx * scale,
          y: centerY + node.y * scale,
          z: rz
        };
      });

      // Draw mesh connections with glowing gradient
      ctx.lineWidth = 1.5;
      connections.forEach(([i, j]) => {
        const p1 = projectedNodes[i];
        const p2 = projectedNodes[j];
        
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        grad.addColorStop(0, 'rgba(124, 58, 237, 0.4)');
        grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'rgba(124, 58, 237, 0.4)');

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw nodes with glowing pulsing circles
      projectedNodes.forEach((p, idx) => {
        const alpha = 0.5 + Math.sin(angle * 3 + idx) * 0.4;
        ctx.fillStyle = idx % 2 === 0 ? `rgba(6, 182, 212, ${alpha})` : `rgba(124, 58, 237, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = '#06B6D4';
        ctx.shadowBlur = 10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const headlineWords = "Understand Your Skin With AI".split(" ");

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
      
      {/* Dynamic ambient gradient blurred background spheres */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[var(--accent-purple)]/30 text-xs font-semibold uppercase tracking-wider text-[var(--accent-purple)]"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>MedSpa Clinical AI Telemetry Platform</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          {/* Sequential word fade-up headline */}
          <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={word === "AI" ? "glow-text-purple inline-block ml-2" : "inline-block mr-3"}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-[var(--text-secondary)] font-normal max-w-2xl leading-relaxed"
          >
            An advanced, privacy-first computer vision analysis that decodes your skin's unique needs in seconds. Get clinical-grade clarity on oiliness, pores, hydration, and erythema.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-5 pt-2"
          >
            {/* Primary Glowing Button */}
            <button
              onClick={onOpenScanner}
              className="px-8 py-4 rounded-2xl font-heading font-bold text-base text-white bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group"
            >
              <Scan className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform duration-300" />
              <span>Analyze My Skin</span>
              <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary Rolling Underline Button */}
            <button
              onClick={onHowItWorks}
              className="rolling-underline px-4 py-3 text-base font-semibold flex items-center gap-2 text-[var(--text-primary)] cursor-pointer"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-[var(--accent-purple)]" />
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-6 border-t border-[var(--border-color)] grid grid-cols-3 gap-4 max-w-lg"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">100% Encrypted & Local Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Dermatologist Verified Logic</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 shrink-0" />
              <span className="text-xs font-medium text-[var(--text-secondary)]">Sub-Second Vision Processing</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visual Hero with 3D Face Mesh & Glowing Neon Laser Line */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md aspect-square rounded-3xl glass-panel p-6 overflow-hidden flex items-center justify-center border border-[var(--glass-border)] shadow-2xl"
          >
            {/* Interactive Canvas Mesh */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Glowing Vertical AI Laser Scanning Line */}
            <div className="laser-line" />

            {/* Floating Live Telemetry Badges */}
            <div className="absolute top-6 left-6 glass-card px-3 py-2 text-xs font-semibold flex items-center gap-2 text-[var(--text-primary)] shadow-lg float-node">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>T-Zone Sebum: 68 ug/cm²</span>
            </div>

            <div className="absolute bottom-8 right-6 glass-card px-3 py-2 text-xs font-semibold flex items-center gap-2 text-[var(--text-primary)] shadow-lg float-node" style={{ animationDelay: '1.5s' }}>
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Infraorbital Score: 68/100</span>
            </div>

            <div className="absolute bottom-20 left-6 glass-card px-3 py-2 text-xs font-semibold flex items-center gap-2 text-[var(--text-primary)] shadow-lg float-node" style={{ animationDelay: '0.8s' }}>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Texture Roughness: 0.08 µm</span>
            </div>

            {/* Overlay Grid aesthetic elements */}
            <div className="absolute top-3 right-3 text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase">
              SCAN_ZONE_AI: ONLINE
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
