import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BentoGrid } from './components/BentoGrid';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { AnalysisResults } from './components/AnalysisResults';
import { RoutineHub } from './components/RoutineHub';
import { ProductCarousel } from './components/ProductCarousel';
import { SkinJourney } from './components/SkinJourney';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { PrivacyConsentModal } from './components/PrivacyConsentModal';
import { ScannerModal } from './components/ScannerModal';
import { DermatologistModal } from './components/DermatologistModal';
import { SkinAIChat } from './components/SkinAIChat';
import { INITIAL_ANALYSIS_MOCK } from './data/skincareData';
import { AnalysisResult } from './types';

export function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isDermModalOpen, setIsDermModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(INITIAL_ANALYSIS_MOCK);

  const handleStartScanFlow = () => {
    setIsConsentModalOpen(true);
  };

  const handleConsentAccept = () => {
    setIsConsentModalOpen(false);
    setIsScannerModalOpen(true);
  };

  const handleAnalysisComplete = (newResult: AnalysisResult) => {
    setAnalysisResult(newResult);
    setIsScannerModalOpen(false);
    
    // Auto-scroll smoothly to analysis results section
    setTimeout(() => {
      const resultsEl = document.getElementById('results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
        setActiveSection('results');
      }
    }, 300);
  };

  const handleHowItWorksScroll = () => {
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400 selection:bg-purple-500 selection:text-white">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenScanner={handleStartScanFlow}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Content Sections */}
        <main>
          <HeroSection
            onOpenScanner={handleStartScanFlow}
            onHowItWorks={handleHowItWorksScroll}
          />

          <BentoGrid />

          <BeforeAfterSlider />

          <AnalysisResults
            result={analysisResult}
            onOpenDermModal={() => setIsDermModalOpen(true)}
          />

          <RoutineHub />

          <ProductCarousel />

          <SkinJourney />

          <FAQAccordion />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating AI Chat Assistant */}
        <SkinAIChat />

        {/* Modal Dialogs */}
        <PrivacyConsentModal
          isOpen={isConsentModalOpen}
          onClose={() => setIsConsentModalOpen(false)}
          onAccept={handleConsentAccept}
        />

        <ScannerModal
          isOpen={isScannerModalOpen}
          onClose={() => setIsScannerModalOpen(false)}
          onAnalysisComplete={handleAnalysisComplete}
        />

        <DermatologistModal
          isOpen={isDermModalOpen}
          onClose={() => setIsDermModalOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}

export default App;
