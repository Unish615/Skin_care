'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, CheckCircle, Building2, ShieldCheck, Download, Award } from 'lucide-react';
import { MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { AppointmentBooking, Dermatologist } from '../types';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClinic?: Dermatologist | null;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  selectedClinic
}) => {
  const defaultClinic = selectedClinic || MOCK_DERMATOLOGISTS[0];

  const [clinicId, setClinicId] = useState(defaultClinic.id);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-08-18');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('Morning (10:00 AM - 12:30 PM)');
  const [skinConcern, setSkinConcern] = useState('');
  const [bookingPass, setBookingPass] = useState<AppointmentBooking | null>(null);

  if (!isOpen) return null;

  const currentClinic = MOCK_DERMATOLOGISTS.find(d => d.id === clinicId) || defaultClinic;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) return;

    const newBooking: AppointmentBooking = {
      id: `NYORIA-APP-${Math.floor(100000 + Math.random() * 900000)}`,
      clinicName: currentClinic.clinic,
      doctorName: currentClinic.name,
      patientName: patientName.trim(),
      phone: phone.trim(),
      preferredDate,
      preferredTimeSlot,
      skinConcern: skinConcern.trim() || 'General Dermatological Evaluation & Skin Profile Review',
      createdTimestamp: new Date().toLocaleString()
    };

    setBookingPass(newBooking);
  };

  const handleReset = () => {
    setBookingPass(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative rounded-3xl max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        {/* BOOKING CONFIRMATION PASS STATE */}
        {bookingPass ? (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Appointment Confirmed
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
                Clinical Pass Generated
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Your appointment pass has been issued and confirmed via SMS to <strong className="text-[var(--text-primary)]">{bookingPass.phone}</strong>.
              </p>
            </div>

            {/* Printable Pass Card */}
            <div className="p-6 rounded-2xl glass-card border border-violet-500/40 bg-slate-950/90 text-left space-y-4 shadow-2xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-violet-400 font-bold">{bookingPass.id}</span>
                <span className="text-slate-400">{bookingPass.createdTimestamp}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs text-slate-400 uppercase block">Patient Name</span>
                  <strong className="text-lg text-white font-heading">{bookingPass.patientName}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block">Center / Hospital</span>
                    <strong className="text-violet-300">{bookingPass.clinicName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Consultant Unit</span>
                    <strong className="text-cyan-300">{bookingPass.doctorName}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-400 block">Appointment Date</span>
                    <strong className="text-emerald-400">{bookingPass.preferredDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Time Slot</span>
                    <strong className="text-amber-400">{bookingPass.preferredTimeSlot}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <span className="text-slate-400 block">Skin Concern Notes:</span>
                  <p className="italic text-slate-200 mt-0.5">{bookingPass.skinConcern}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED NEPAL CLINIC
                </span>
                <span>STATUS: CONFIRMED</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-violet-600 text-white font-heading font-bold text-xs shadow-lg hover:bg-violet-500 transition-all"
              >
                Done & Return to Site
              </button>
            </div>
          </div>
        ) : (

          /* BOOKING FORM STATE */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                  Book Dermatologist Appointment
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Schedule an in-person clinical evaluation with verified skin specialists in Nepal.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-left">
              {/* Clinic Selection */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>Select Clinical Center / Specialist:</span>
                </label>
                <select
                  value={clinicId}
                  onChange={(e) => setClinicId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  {MOCK_DERMATOLOGISTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.address}
                    </option>
                  ))}
                </select>
              </div>

              {/* Patient Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-violet-400" />
                    <span>Patient Full Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Unish Gautam"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-violet-400" />
                    <span>Mobile Phone Number:</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-violet-400" />
                    <span>Preferred Date:</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-400" />
                    <span>Preferred Time Slot:</span>
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    <option value="Morning (10:00 AM - 12:30 PM)">Morning (10:00 AM - 12:30 PM)</option>
                    <option value="Afternoon (02:00 PM - 04:30 PM)">Afternoon (02:00 PM - 04:30 PM)</option>
                    <option value="Evening (05:00 PM - 07:00 PM)">Evening (05:00 PM - 07:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Skin Concern Notes */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-violet-400" />
                  <span>Brief Skin Concern Notes (Optional):</span>
                </label>
                <textarea
                  rows={2}
                  value={skinConcern}
                  onChange={(e) => setSkinConcern(e.target.value)}
                  placeholder="e.g. Persistent acne on chin, facial redness, or consultation for Nyoria report..."
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl font-heading font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirm & Generate Appointment Pass</span>
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
};
