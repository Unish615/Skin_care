import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { UserCheck, MapPin, Phone, Star, Search, X, Calendar } from 'lucide-react';

interface DermatologistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DermatologistModal: React.FC<DermatologistModalProps> = ({ isOpen, onClose }) => {
  const [zipInput, setZipInput] = useState('90210');
  const [derms] = useState(MOCK_DERMATOLOGISTS);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
              Board-Certified Dermatologist Network
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              Locate trusted clinical specialists for in-person skin evaluation.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value)}
            placeholder="Enter Zip Code or City (e.g. 90210)"
            className="w-full pl-11 pr-24 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-purple)]"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-[var(--accent-purple)] text-white text-xs font-bold font-heading">
            Search
          </button>
        </div>

        {/* List */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1">
          {derms.map((derm) => (
            <div
              key={derm.id}
              className="p-5 rounded-2xl glass-card border border-[var(--border-color)] space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                    {derm.name}
                  </h4>
                  <div className="text-xs text-[var(--accent-purple)] font-semibold mt-0.5">
                    {derm.specialty}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{derm.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  <span>{derm.address} ({derm.distance})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                  <span>{derm.phone}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[var(--border-color)]">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">
                  Accepts Major Insurance & Private Pay
                </span>
                <button 
                  onClick={() => alert(`Appointment request routed to ${derm.name} clinic.`)}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-lavender)] text-[var(--accent-purple)] font-heading font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};
