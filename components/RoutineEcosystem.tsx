'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getDynamicRoutineSteps, RECOMMENDED_PRODUCTS } from '../data/skincareData';
import { RoutineStep, Product, SkinType, ProductCategorySection } from '../types';
import { Card3DTilt } from './Card3DTilt';
import { PharmacyCheckoutModal } from './PharmacyCheckoutModal';
import { Sun, Moon, Info, Sparkles, Star, MapPin, X, Layers, ShoppingBag } from 'lucide-react';

interface RoutineEcosystemProps {
  skinType?: SkinType;
}

export const RoutineEcosystem: React.FC<RoutineEcosystemProps> = ({ skinType = 'Combination & Pigmentation' }) => {
  const [activeTiming, setActiveTiming] = useState<'morning' | 'night'>('morning');
  const [activeProductTab, setActiveProductTab] = useState<ProductCategorySection | 'All'>('All');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const dynamicRoutine = getDynamicRoutineSteps(skinType);
  const steps = activeTiming === 'morning' ? dynamicRoutine.morning : dynamicRoutine.evening;
  const [selectedStep, setSelectedStep] = useState<RoutineStep | null>(steps[0]);

  // Product categories for the section tabs
  const categoryTabs: (ProductCategorySection | 'All')[] = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'];

  // Filter products by selected section tab
  const filteredProducts = activeProductTab === 'All'
    ? RECOMMENDED_PRODUCTS
    : RECOMMENDED_PRODUCTS.filter(p => p.categorySection === activeProductTab);

  const handleOpenCheckout = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedProductModal(null);
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  return (
    <section 
      id="routine" 
      className={`py-24 transition-colors duration-700 relative overflow-hidden ${
        activeTiming === 'morning' 
          ? 'bg-gradient-to-b from-amber-500/10 via-[var(--bg-secondary)] to-[var(--bg-primary)]' 
          : 'bg-gradient-to-b from-indigo-950/40 via-slate-950 to-[var(--bg-primary)]'
      }`}
    >
      {activeTiming === 'night' && (
        <div className="absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nyoria Diagnostic Regimen for: {skinType}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Skin-Type Adaptive <span className="glow-text-violet">Regimen & Formulations</span>
          </h2>
          <p className="text-base text-[var(--text-secondary)]">
            Chronologically calibrated active ingredient steps tailored specifically to your detected skin profile: <strong className="text-violet-400 font-bold">{skinType}</strong>.
          </p>

          {/* 3D Morning/Night Switcher */}
          <div className="pt-6 flex justify-center">
            <div className="relative p-1.5 rounded-full bg-slate-900/80 border border-white/10 shadow-2xl flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTiming('morning');
                  setSelectedStep(dynamicRoutine.morning[0]);
                }}
                className={`relative z-10 px-8 py-3 rounded-full font-heading font-bold text-sm flex items-center gap-2 transition-all duration-500 ${
                  activeTiming === 'morning' ? 'text-slate-900 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>☀️ Morning Routine</span>
              </button>

              <button
                onClick={() => {
                  setActiveTiming('night');
                  setSelectedStep(dynamicRoutine.evening[0]);
                }}
                className={`relative z-10 px-8 py-3 rounded-full font-heading font-bold text-sm flex items-center gap-2 transition-all duration-500 ${
                  activeTiming === 'night' ? 'text-white font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-300" />
                <span>🌙 Night Routine</span>
              </button>

              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`absolute top-1.5 bottom-1.5 rounded-full ${
                  activeTiming === 'morning' 
                    ? 'left-1.5 w-[50%] bg-gradient-to-r from-amber-400 to-amber-200 shadow-[0_0_20px_#F59E0B]' 
                    : 'left-[49.5%] w-[49%] bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_0_20px_#8B5CF6]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Routine Steps & Active Ingredient Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step) => {
              const isSelected = selectedStep?.id === step.id;
              return (
                <Card3DTilt
                  key={step.id}
                  onClick={() => setSelectedStep(step)}
                  className={`glass-card p-6 border transition-all duration-300 ${
                    isSelected 
                      ? 'border-violet-500 ring-2 ring-violet-500/40 bg-[var(--bg-surface-elevated)] shadow-xl' 
                      : 'border-[var(--border-glass)] hover:border-violet-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 font-heading font-extrabold text-xs flex items-center justify-center">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md">
                      {step.category}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[var(--text-primary)] mb-2">
                    {step.title}
                  </h3>

                  <div className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-lg w-fit mb-3">
                    Active: {step.activeIngredient}
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {step.usageInstructions}
                  </p>
                </Card3DTilt>
              );
            })}
          </div>

          <div className="lg:col-span-4 sticky top-28">
            <div className="glass-panel p-6 border border-[var(--glass-border)] shadow-2xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[var(--border-color)] text-violet-400">
                <Info className="w-5 h-5" />
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider">
                  Active Ingredient Clinical Rationale
                </h4>
              </div>

              {selectedStep ? (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[var(--text-primary)]">
                    Target Step: {selectedStep.title}
                  </div>
                  <div className="text-xs font-semibold text-violet-400 bg-violet-500/10 p-2.5 rounded-xl border border-violet-500/20">
                    Formulated Active: {selectedStep.activeIngredient}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    <strong className="text-[var(--text-primary)] block mb-1">Nyoria Engine Rationale for {skinType}:</strong>
                    {selectedStep.whySelected}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[var(--text-muted)]">Select any step to inspect active ingredient logic.</div>
              )}
            </div>
          </div>

        </div>

        {/* ORGANIZED NEPALI PHARMACEUTICAL FORMULATIONS BY CATEGORY SECTION WITH CHECKOUT CTA */}
        <div className="space-y-8 pt-8 border-t border-[var(--border-color)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Formulations Categorized by Section & Online Ordering</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
                Nepali Pharmaceutical Formulations Store
              </h3>
            </div>

            {/* Category Section Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap bg-[var(--bg-secondary)]/60 p-1.5 rounded-2xl border border-[var(--border-color)]">
              {categoryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProductTab(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeProductTab === tab
                      ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab === 'All' ? 'All Sections' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <Card3DTilt
                key={prod.id}
                onClick={() => setSelectedProductModal(prod)}
                className="glass-card p-5 border border-[var(--border-glass)] shadow-xl flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold">
                      {prod.brand}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                      {prod.priceNpr}
                    </div>

                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-violet-600/90 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider">
                      {prod.categorySection}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{prod.rating}</span>
                    </div>

                    <span className="text-[9px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                      {prod.suitableSkinTypes.includes(skinType) ? '✓ Match for ' + skinType.split(' ')[0] : 'Pharmaceutical'}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] line-clamp-2 mb-2">
                    {prod.name}
                  </h4>
                </div>

                {/* BUY / ORDER NOW CTA BUTTON */}
                <div className="mt-4 pt-3 border-t border-[var(--border-color)] space-y-2">
                  <button
                    onClick={(e) => handleOpenCheckout(prod, e)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white text-xs font-heading font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>🛒 Buy / Order Now</span>
                  </button>

                  <div className="w-full text-center text-[10px] text-emerald-400 font-semibold flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Nepal Delivery & Pharmacy Pick-up</span>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

      </div>

      {/* Product Detail Modal Dialog */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative rounded-3xl"
          >
            <button onClick={() => setSelectedProductModal(null)} className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 mb-6">
              <img src={selectedProductModal.image} alt={selectedProductModal.name} className="w-24 h-24 rounded-2xl object-cover" />
              <div>
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">{selectedProductModal.brand} • {selectedProductModal.categorySection}</span>
                <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] leading-tight mt-0.5">
                  {selectedProductModal.name}
                </h3>
                <div className="text-lg font-bold text-emerald-400 mt-1">{selectedProductModal.priceNpr}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <strong className="text-[var(--text-primary)] block mb-1">Key Active Ingredients:</strong>
                <div className="flex gap-1.5 flex-wrap">
                  {selectedProductModal.activeIngredients.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 font-semibold border border-violet-500/20">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[var(--text-primary)] block mb-1">Description & Clinical Usage:</strong>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {selectedProductModal.description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={(e) => handleOpenCheckout(selectedProductModal, e)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white text-sm font-heading font-bold flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>🛒 Proceed to Buy & Checkout ({selectedProductModal.priceNpr})</span>
              </button>

              <div className="w-full py-2 rounded-xl text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>📍 Available at local clinical pharmacies across Nepal</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pharmacy Checkout Modal */}
      <PharmacyCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={checkoutProduct}
      />
    </section>
  );
};
