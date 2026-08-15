import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RECOMMENDED_PRODUCTS } from '../data/skincareData';
import { Product } from '../types';
import { Filter, Star, Check, Sparkles, X, ChevronRight, ShoppingBag } from 'lucide-react';

export const ProductCarousel: React.FC = () => {
  const [products] = useState<Product[]>(RECOMMENDED_PRODUCTS);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter states
  const [fragranceFreeOnly, setFragranceFreeOnly] = useState(false);
  const [sensitiveOnly, setSensitiveOnly] = useState(false);
  const [selectedPriceTier, setSelectedPriceTier] = useState<string | null>(null);

  const filteredProducts = products.filter(p => {
    if (fragranceFreeOnly && !p.fragranceFree) return false;
    if (sensitiveOnly && !p.sensitiveFriendly) return false;
    if (selectedPriceTier && p.priceTier !== selectedPriceTier) return false;
    return true;
  });

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-cyan)] text-[var(--accent-cyan-bright)] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clean Medical Formulation</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              Recommended <span className="glow-text-purple">Formulations</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Clinically verified non-comedogenic formulations matching your active ingredient needs.
            </p>
          </div>

          {/* Filter Drawer Toggle Button */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="px-5 py-2.5 rounded-xl glass-card border border-[var(--border-color)] text-xs font-heading font-bold text-[var(--text-primary)] flex items-center gap-2 hover:border-[var(--accent-purple)] transition-colors shadow-sm"
          >
            <Filter className="w-4 h-4 text-[var(--accent-purple)]" />
            <span>Filter Formulation Criteria</span>
            {(fragranceFreeOnly || sensitiveOnly || selectedPriceTier) && (
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>
        </div>

        {/* Filter Expandable Drawer */}
        <AnimatePresence>
          {filterDrawerOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl glass-panel border border-[var(--glass-border)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-semibold">
                
                {/* Toggle 1 */}
                <div className="space-y-2">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider block text-[10px]">Dermatology Filters</span>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={fragranceFreeOnly}
                      onChange={(e) => setFragranceFreeOnly(e.target.checked)}
                      className="w-4 h-4 accent-[var(--accent-purple)] rounded"
                    />
                    <span>100% Fragrance-Free Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-[var(--text-primary)]">
                    <input
                      type="checkbox"
                      checked={sensitiveOnly}
                      onChange={(e) => setSensitiveOnly(e.target.checked)}
                      className="w-4 h-4 accent-[var(--accent-purple)] rounded"
                    />
                    <span>Sensitive Skin Tested</span>
                  </label>
                </div>

                {/* Price Tier Filter */}
                <div className="space-y-2">
                  <span className="text-[var(--text-muted)] uppercase tracking-wider block text-[10px]">Price Tier</span>
                  <div className="flex gap-2">
                    {['$', '$$', '$$$', '$$$$'].map(tier => (
                      <button
                        key={tier}
                        onClick={() => setSelectedPriceTier(selectedPriceTier === tier ? null : tier)}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          selectedPriceTier === tier 
                            ? 'bg-[var(--accent-purple)] text-white border-[var(--accent-purple)]' 
                            : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear */}
                <div className="flex items-end justify-end">
                  <button
                    onClick={() => {
                      setFragranceFreeOnly(false);
                      setSensitiveOnly(false);
                      setSelectedPriceTier(null);
                    }}
                    className="text-xs text-[var(--accent-purple)] hover:underline font-bold"
                  >
                    Reset Filters
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Horizontal Swiping Tray */}
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-80 shrink-0 snap-start glass-card p-5 rounded-3xl border border-[var(--border-glass)] shadow-xl flex flex-col justify-between group hover:border-[var(--accent-purple)] transition-all duration-300"
            >
              <div>
                {/* Product Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                    {product.brand}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold">
                    {product.price}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[var(--text-muted)] font-normal">({product.reviewCount} reviews)</span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-base text-[var(--text-primary)] line-clamp-2 mb-2">
                  {product.name}
                </h3>

                {/* Ingredient Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {product.activeIngredients.slice(0, 2).map((ing, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[var(--accent-lavender)] text-[var(--accent-purple)]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full py-2.5 rounded-xl glass-card border border-[var(--border-color)] text-xs font-heading font-bold text-[var(--text-primary)] hover:bg-[var(--accent-purple)] hover:text-white hover:border-[var(--accent-purple)] transition-all flex items-center justify-center gap-2"
              >
                <span>View Formulation Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg glass-panel p-6 sm:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--glass-border)] shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 mb-6">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
              <div>
                <span className="text-xs font-bold text-[var(--accent-purple)] uppercase">{selectedProduct.brand}</span>
                <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] leading-tight mt-0.5">
                  {selectedProduct.name}
                </h3>
                <div className="text-lg font-bold text-[var(--text-primary)] mt-1">{selectedProduct.price}</div>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            <div className="space-y-3 mb-6 border-t border-[var(--border-color)] pt-4">
              <div className="text-xs font-bold text-[var(--text-primary)]">Key Active Ingredients</div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.activeIngredients.map((ing, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg text-xs font-semibold bg-[var(--accent-lavender)] text-[var(--accent-purple)]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Added ${selectedProduct.name} to cart.`);
                setSelectedProduct(null);
              }}
              className="w-full py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Formulation to Cart</span>
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
