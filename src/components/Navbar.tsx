import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, ShieldCheck, Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenScanner: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScanner,
  activeSection,
  setActiveSection
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'features', label: 'AI Features' },
    { id: 'results', label: 'Analysis Results' },
    { id: 'routine', label: 'Personalized Routine' },
    { id: 'journey', label: 'Skin Journey' }
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-[var(--text-primary)]">
                Skin<span className="glow-text-purple">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] border border-[var(--accent-purple)]/20">
                Clinical v2.4
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium hidden sm:block">
              Privacy-First Biometric Telemetry
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)]/50 p-1.5 rounded-full border border-[var(--border-color)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-purple)] shadow-sm font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]/50'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Mode"
            className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--accent-lavender)]/50 transition-all duration-300 focus:outline-none"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-700" />
            ) : (
              <Sun className="w-5 h-5 text-amber-300" />
            )}
          </button>

          {/* Primary CTA Scan Button */}
          <button
            onClick={onOpenScanner}
            className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#06B6D4] shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>Analyze My Skin</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left px-4 py-3 rounded-lg font-medium text-sm text-[var(--text-primary)] hover:bg-[var(--accent-lavender)]/30 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>HIPAA Compliant & Privacy Preserved</span>
          </div>
        </div>
      )}
    </header>
  );
};
