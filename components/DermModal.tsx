'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { Dermatologist } from '../types';
import { BookAppointmentModal } from './BookAppointmentModal';
import { X, MapPin, Phone, Star, Calendar } from 'lucide-react';

interface DermModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DermModal: React.FC<DermModalProps> = ({ isOpen, onClose }) => {
  const [selectedClinic, setSelectedClinic] = useState<Dermatologist | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!isOpen) return null;

  const handleBook = (derm: Dermatologist) => {
    setSelectedClinic(derm);
    setIsBookingOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative max-h-[90vh] flex flex-col justify-between overflow-hidden rounded-3xl"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                Verified Clinical Reference Centers in Nepal
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Public directory of senior consultants & cutaneous hospitals. Book in-person appointments.
              </p>
            </div>
            <button onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 overflow-y-auto flex-1 space-y-4">
            {MOCK_DERMATOLOGISTS.map((derm) => (
              <div key={derm.id} className="p-5 rounded-2xl glass-card border border-[var(--border-color)] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">{derm.name}</h4>
                    <span className="text-xs font-semibold text-violet-400 block">{derm.specialty}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{derm.rating}</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-[var(--text-primary)]">{derm.clinic}</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <span>{derm.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <span>{derm.phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleBook(derm)}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-heading font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>📅 Book Doctor Appointment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] text-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
            >
              Close Directory
            </button>
          </div>

          <BookAppointmentModal
            isOpen={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            selectedClinic={selectedClinic}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
