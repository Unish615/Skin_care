'use client';

import React, { useState } from 'react';
import { MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { Dermatologist } from '../types';
import { BookAppointmentModal } from './BookAppointmentModal';
import { MapPin, Phone, Star, Award, Building2, Calendar } from 'lucide-react';

export const DermDirectory: React.FC = () => {
  const [selectedClinicBooking, setSelectedClinicBooking] = useState<Dermatologist | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBooking = (derm: Dermatologist) => {
    setSelectedClinicBooking(derm);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="dermatologists" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Clinical Reference & Booking Directory</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Verified Reference Centers & <span className="glow-text-violet">Dermatologists in Nepal</span>
        </h2>
        <p className="text-base text-[var(--text-secondary)]">
          Accredited senior consultants, clinical units, and dermatological institutions across Nepal. Schedule an in-person appointment directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_DERMATOLOGISTS.map((derm) => (
          <div
            key={derm.id}
            className="p-6 rounded-3xl glass-card border border-[var(--border-glass)] shadow-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{derm.rating}</span>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-lg text-[var(--text-primary)]">
                  {derm.name}
                </h4>
                <div className="text-xs font-semibold text-violet-400 mt-0.5">
                  {derm.specialty}
                </div>
              </div>

              <div className="text-xs font-bold text-[var(--text-primary)] pt-1">
                {derm.clinic}
              </div>

              <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{derm.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>{derm.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-color)]">
              <button
                onClick={() => handleOpenBooking(derm)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>📅 Book Doctor Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Appointment Booking Modal */}
      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedClinic={selectedClinicBooking}
      />
    </section>
  );
};
