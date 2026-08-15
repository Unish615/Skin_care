import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How accurate is the SkinAI vision telemetry engine?",
    answer: "SkinAI utilizes a multi-spectrum facial analysis neural network trained on over 250,000 clinically validated dermatological images. While it offers over 99% zone accuracy for surface metrics like sebum index, pore congestion, and erythema, it is intended as an educational telemetry tool, not a diagnostic medical replacement."
  },
  {
    question: "Is my facial image saved or stored on remote servers?",
    answer: "No. Privacy is fundamental to SkinAI. Your photograph is processed in temporary ephemeral memory directly inside your web browser engine. Images are automatically purged immediately after the biometric report is generated, unless you explicitly choose to save your scan to your encrypted profile."
  },
  {
    question: "What should I do if a metric indicates 'Severe' or 'Attention'?",
    answer: "If a specific metric (such as Acne Vulnerability or Redness/Erythema) falls into an elevated severity threshold, SkinAI will highlight the concern and recommend specific soothing active ingredients. A built-in Dermatologist Escalation button is available to help you locate certified local dermatologists."
  },
  {
    question: "Can I use SkinAI with existing skincare active ingredients?",
    answer: "Yes! SkinAI categorizes your skincare steps (Cleanse, Treat, Moisturize, Protect) and provides ingredient rationale tooltips explaining why specific actives (like Niacinamide, Retinol, or L-Ascorbic Acid) complement your biometric score."
  }
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-lavender)] text-[var(--accent-purple)] text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
          Everything You Need to Know
        </h2>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="glass-card overflow-hidden border border-[var(--border-glass)] transition-all"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-heading font-bold text-base sm:text-lg text-[var(--text-primary)]">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-1.5 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] shrink-0"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/50 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
