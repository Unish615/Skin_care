import React, { useEffect, useRef } from 'react';
import { FacialZone, MetricCategory } from '../types';

interface InteractiveFaceMapProps {
  imageSrc: string;
  activeMetricCategory: MetricCategory | null;
  activeZones: FacialZone[];
  onZoneClick?: (zone: FacialZone) => void;
}

export const InteractiveFaceMap: React.FC<InteractiveFaceMapProps> = ({
  imageSrc,
  activeMetricCategory,
  activeZones,
  onZoneClick
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let pulseAngle = 0;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseAngle += 0.05;

      const w = canvas.width;
      const h = canvas.height;

      // Draw original face image
      if (img.complete && img.naturalWidth !== 0) {
        ctx.drawImage(img, 0, 0, w, h);
      } else {
        // Fallback stylish vector face silhouette
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, w, h);
      }

      // Define coordinates for zones (normalized 0..1 relative to canvas size)
      const zoneCoordinates: Record<FacialZone, { x: number; y: number; rx: number; ry: number }> = {
        forehead: { x: 0.5, y: 0.28, rx: 0.28, ry: 0.1 },
        tZone: { x: 0.5, y: 0.38, rx: 0.12, ry: 0.22 },
        nose: { x: 0.5, y: 0.48, rx: 0.09, ry: 0.12 },
        cheeks: { x: 0.32, y: 0.54, rx: 0.15, ry: 0.12 }, // Drawn symmetric left and right
        chin: { x: 0.5, y: 0.78, rx: 0.14, ry: 0.08 },
        underEye: { x: 0.35, y: 0.41, rx: 0.1, ry: 0.05 } // Drawn symmetric
      };

      // Highlight active zones with pulsing glowing heatmaps
      if (activeZones.length > 0) {
        activeZones.forEach(zone => {
          const coord = zoneCoordinates[zone];
          if (!coord) return;

          const glowIntensity = Math.abs(Math.sin(pulseAngle)) * 12 + 10;
          ctx.shadowBlur = glowIntensity;

          // Color palette based on metric category
          let colorGlow = 'rgba(124, 58, 237, 0.4)';
          let colorBorder = '#7C3AED';

          if (activeMetricCategory === 'Oiliness' || activeMetricCategory === 'Pores') {
            colorGlow = 'rgba(6, 182, 212, 0.5)';
            colorBorder = '#06B6D4';
          } else if (activeMetricCategory === 'Acne' || activeMetricCategory === 'Blackheads') {
            colorGlow = 'rgba(244, 63, 94, 0.5)';
            colorBorder = '#F43F5E';
          } else if (activeMetricCategory === 'Redness') {
            colorGlow = 'rgba(239, 68, 68, 0.6)';
            colorBorder = '#EF4444';
          }

          ctx.shadowColor = colorBorder;

          // Helper to draw single zone ellipse
          const drawEllipse = (cx: number, cy: number, rx: number, ry: number) => {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(cx * w, cy * h, rx * w, ry * h, 0, 0, Math.PI * 2);
            ctx.fillStyle = colorGlow;
            ctx.fill();
            ctx.strokeStyle = colorBorder;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();
          };

          if (zone === 'cheeks') {
            drawEllipse(0.32, 0.54, 0.12, 0.12); // Left cheek
            drawEllipse(0.68, 0.54, 0.12, 0.12); // Right cheek
          } else if (zone === 'underEye') {
            drawEllipse(0.35, 0.42, 0.1, 0.04); // Left under eye
            drawEllipse(0.65, 0.42, 0.1, 0.04); // Right under eye
          } else {
            drawEllipse(coord.x, coord.y, coord.rx, coord.ry);
          }
        });
      }

      animId = requestAnimationFrame(render);
    };

    img.onload = () => {
      render();
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [imageSrc, activeMetricCategory, activeZones]);

  return (
    <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass-panel border border-[var(--glass-border)] shadow-2xl">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={600} 
        className="w-full h-full object-cover"
      />
      
      {/* Legend Badge */}
      <div className="absolute top-4 left-4 glass-card px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2 shadow-md">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-purple)] animate-ping" />
        <span>
          {activeMetricCategory 
            ? `Active Zone Overlay: ${activeMetricCategory}`
            : 'Hover any Metric Card to highlight zone'}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/80 bg-slate-900/80 px-2 py-1 rounded backdrop-blur-md">
        VISION_HEATMAP // REALTIME
      </div>
    </div>
  );
};
