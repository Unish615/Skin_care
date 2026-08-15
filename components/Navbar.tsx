'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Activity, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenScanner: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScanner,
  activeSection,
  setActiveSection
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'results', label: '20-Metric Dashboard' },
    { id: 'routine', label: 'Formulations & Routine' },
    { id: 'dermatologists', label: 'Dermatologists Directory' }
  ];

  const handleNav = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Nyoria Skin Intelligence */}
        <div onClick={() => handleNav('hero')} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
                Nyoria <span className="glow-text-violet">Skin Intelligence</span>
              </span>
            </div>
            <p className="text-[10px] text-violet-400 font-semibold tracking-wider uppercase">
              Powered by the Nyoria Engine
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)]/50 p-1.5 rounded-full border border-[var(--border-color)]">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeSection === link.id
                  ? 'bg-[var(--bg-surface-elevated)] text-violet-400 shadow-sm font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-violet-500/10 transition-colors"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-slate-700" /> : <Sun className="w-5 h-5 text-amber-300" />}
          </button>

          {/* Scan CTA Button */}
          <button
            onClick={onOpenScanner}
            className="px-5 py-2.5 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-200" />
            <span>Launch Nyoria Scan</span>
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-[var(--text-primary)]">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => handleNav(link.id)} className="text-left px-4 py-3 rounded-lg font-medium text-sm text-[var(--text-primary)]">
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
