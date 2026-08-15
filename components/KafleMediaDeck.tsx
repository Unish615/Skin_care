'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc, Upload, RefreshCw } from 'lucide-react';

export const KafleMediaDeck: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackName, setTrackName] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Stop previous playback
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create object URL for uploaded video/audio file
    const fileUrl = URL.createObjectURL(file);
    const audio = new Audio(fileUrl);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    setTrackName(file.name);
    
    // Auto-play uploaded track safely inside user gesture event handler
    audio.play().then(() => setIsPlaying(true)).catch(err => console.warn('Audio play error:', err));
  };

  const togglePlay = () => {
    if (!audioRef.current) {
      // Trigger file selector if no media is loaded yet
      fileInputRef.current?.click();
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.warn('Audio play error:', err));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <div className="glass-panel p-3.5 sm:p-4 bg-slate-950/90 border border-violet-500/40 shadow-2xl rounded-2xl flex items-center gap-3 backdrop-blur-xl text-white">
        
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="video/*,audio/*"
          className="hidden"
        />

        {/* Disc Icon */}
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg ${isPlaying ? 'animate-spin [animation-duration:6s]' : ''}`}>
          <Disc className="w-5 h-5" />
        </div>

        {/* Track Details */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Music className="w-3 h-3 animate-pulse" />
            <span>Nyoria Media Deck</span>
          </div>
          <div className="font-heading font-extrabold text-xs text-white max-w-[170px] truncate">
            {trackName ? trackName : 'No Track Loaded'}
          </div>
          <div className="text-[9px] text-slate-400">
            {trackName ? 'Extracted Audio Track' : 'Upload Video/Audio File'}
          </div>
        </div>

        {/* Playback & Upload Controls */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
          {!trackName ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-heading font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Video/Audio</span>
            </button>
          ) : (
            <>
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-violet-600/80 hover:bg-violet-600 text-white transition-transform active:scale-95 shadow-md flex items-center gap-1 text-xs font-bold"
                title={isPlaying ? "Pause Track" : "Play Track"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="hidden sm:inline">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-slate-300 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-slate-400 hover:text-white transition-colors"
                title="Replace Media File"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

      </div>
    </motion.div>
  );
};
