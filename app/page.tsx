'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BentoGrid } from '../components/BentoGrid';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PhotoUploader } from '../components/PhotoUploader';
import { SkinDashboard } from '../components/SkinDashboard';
import { RoutineEcosystem } from '../components/RoutineEcosystem';
import { DermDirectory } from '../components/DermDirectory';
import { SkinJourney } from '../components/SkinJourney';
import { FAQAccordion } from '../components/FAQAccordion';
import { Footer } from '../components/Footer';
import { NyoriaAssistantPanel } from '../components/NyoriaAssistantPanel';
import { DermModal } from '../components/DermModal';
import { MedicalDisclaimer } from '../components/MedicalDisclaimer';
import { DisclaimerGateModal } from '../components/DisclaimerGateModal';
import { INITIAL_ANALYSIS_MOCK } from '../data/skincareData';
import { AnalysisResult } from '../types';

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState(false);
  const [isDermModalOpen, setIsDermModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(INITIAL_ANALYSIS_MOCK);

  const handleDisclaimerEnter = () => {
    setShowModal(false);
  };

  const handleOpenScanner = () => {
    setIsPhotoUploaderOpen(true);
  };

  const handleAnalysisComplete = (newResult: AnalysisResult) => {
    setAnalysisResult(newResult);
    setIsPhotoUploaderOpen(false);

    setTimeout(() => {
      const el = document.getElementById('results');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection('results');
      }
    }, 300);
  };

  const handleHowItWorksScroll = () => {
    const el = document.getElementById('features');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative pb-16">
      
      {/* Disclaimer Entry Gateway Overlay */}
      <DisclaimerGateModal
        isOpen={showModal}
        onEnter={handleDisclaimerEnter}
      />

      {/* Navigation Bar */}
      <Navbar
        onOpenScanner={handleOpenScanner}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main>
        <HeroSection
          onOpenScanner={handleOpenScanner}
          onHowItWorks={handleHowItWorksScroll}
        />

        <BentoGrid />

        <BeforeAfterSlider />

        <SkinDashboard
          result={analysisResult}
          onOpenDermModal={() => setIsDermModalOpen(true)}
        />

        <RoutineEcosystem skinType={analysisResult.detectedSkinType} />

        <DermDirectory />

        <SkinJourney />

        <FAQAccordion />
      </main>

      {/* Footer */}
      <Footer />

      {/* Nyoria Assistant Panel */}
      <NyoriaAssistantPanel />

      {/* Sticky Clinical Safeguard Banner */}
      <MedicalDisclaimer />

      {/* Photo Scanner Modal */}
      <PhotoUploader
        isOpen={isPhotoUploaderOpen}
        onClose={() => setIsPhotoUploaderOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

      {/* Certified Dermatologist Locator Modal */}
      <DermModal
        isOpen={isDermModalOpen}
        onClose={() => setIsDermModalOpen(false)}
      />

    </div>
  );
}
