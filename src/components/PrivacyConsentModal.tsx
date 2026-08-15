import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Trash2, CheckCircle, X } from 'lucide-react';

interface PrivacyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const PrivacyConsentModal: React.FC<PrivacyConsentModalProps> = ({
  isOpen,
  onClose,
  onAccept
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
              Privacy & Biometric Consent
            </h3>
            <p className="text-xs text-emerald-500 font-semibold uppercase tracking-wider">
              HIPAA & GDPR Ephemeral Processing Standard
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <Lock className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Local Memory Processing:</strong> Your camera feed and photos stay in ephemeral browser RAM. No images are sent to external storage buckets without your express command.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <Trash2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[var(--text-primary)]">Automatic Purging:</strong> Once your skin health report is compiled, the raw image buffer is immediately wiped from memory.
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent-purple)] cursor-pointer transition-colors mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 accent-[var(--accent-purple)] rounded"
          />
          <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
            I understand and consent to temporary computer vision image processing.
          </span>
        </label>

        {/* Action Button */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl text-sm font-semibold text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={!agreed}
            onClick={onAccept}
            className={`w-2/3 py-3 rounded-xl font-heading font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 ${
              agreed
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-lg shadow-purple-500/25 hover:scale-[1.02]'
                : 'bg-slate-400 cursor-not-allowed opacity-50'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Launch AI Scanner</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
