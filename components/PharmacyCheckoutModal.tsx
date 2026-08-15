'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, Truck, CreditCard, User, Phone, MapPin, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, PharmacyOrder, PaymentMethod, DeliveryDistrict } from '../types';
import { generateQRCodeDataURIAsync } from '../utils/qrCodeGenerator';

interface PharmacyCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const PharmacyCheckoutModal: React.FC<PharmacyCheckoutModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDistrict, setDeliveryDistrict] = useState<DeliveryDistrict>('Kathmandu Valley Express');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Fonepay QR');
  const [completedOrder, setCompletedOrder] = useState<PharmacyOrder | null>(null);

  if (!isOpen || !product) return null;

  // Extract raw numerical price integer from e.g. "Rs. 950"
  const rawPriceNum = parseInt(product.priceNpr.replace(/[^0-9]/g, ''), 10) || 750;
  const totalPriceNprNum = rawPriceNum * quantity;
  const totalPriceNprStr = `Rs. ${totalPriceNprNum.toLocaleString()}`;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !phone.trim() || !deliveryAddress.trim()) return;

    const orderId = `NYORIA-PHARM-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderUrl = `https://nyoria.skin/pharmacy/order/${orderId}`;
    
    let qrDataUrl = '';
    try {
      qrDataUrl = await generateQRCodeDataURIAsync(orderUrl, 250);
    } catch (err) {}

    const newOrder: PharmacyOrder = {
      orderId,
      productName: product.name,
      brand: product.brand,
      quantity,
      unitPriceNpr: product.priceNpr,
      totalPriceNpr: totalPriceNprStr,
      recipientName: recipientName.trim(),
      phone: phone.trim(),
      deliveryDistrict,
      deliveryAddress: deliveryAddress.trim(),
      paymentMethod,
      qrCodeUrl: qrDataUrl,
      createdTimestamp: new Date().toLocaleString(),
      orderStatus: deliveryDistrict === 'Local Pharmacy Pick-up' ? 'Ready for Pick-up' : 'Confirmed & Dispatched'
    };

    setCompletedOrder(newOrder);
  };

  const handleReset = () => {
    setCompletedOrder(null);
    setQuantity(1);
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

        {/* ORDER CONFIRMATION & PAYMENT PASS STATE */}
        {completedOrder ? (
          <div className="space-y-6 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Order Dispatched & Receipt Issued
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
                Pharmacy Receipt & QR Pass
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Confirmation SMS & order receipt sent to <strong className="text-[var(--text-primary)]">{completedOrder.phone}</strong>.
              </p>
            </div>

            {/* Printable Receipt Pass Card with Embedded Standard ISO QR */}
            <div className="p-6 rounded-2xl glass-card border border-emerald-500/40 bg-slate-950/90 text-left space-y-4 shadow-2xl text-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                <span className="text-emerald-400 font-bold">{completedOrder.orderId}</span>
                <span className="text-slate-400">{completedOrder.createdTimestamp}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-28 h-28 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center shadow-lg">
                  <img src={completedOrder.qrCodeUrl} alt="Pharmacy QR Code Pass" className="w-full h-full object-contain" />
                </div>

                <div className="space-y-1.5 text-xs flex-1">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Purchased Formulation</span>
                    <strong className="text-base text-white font-heading block leading-tight">{completedOrder.productName}</strong>
                    <span className="text-violet-400 font-bold">{completedOrder.brand}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 block">Quantity</span>
                      <strong className="text-white">{completedOrder.quantity} Unit(s)</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Amount</span>
                      <strong className="text-emerald-400 text-sm font-bold">{completedOrder.totalPriceNpr}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-800">
                <div>
                  <span className="text-slate-400 block">Recipient</span>
                  <strong className="text-white">{completedOrder.recipientName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Gateway</span>
                  <strong className="text-amber-400">{completedOrder.paymentMethod}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 block">Delivery Location / Method:</span>
                <strong className="text-cyan-300 block">{completedOrder.deliveryDistrict}</strong>
                <p className="text-slate-300 text-[11px] mt-0.5">{completedOrder.deliveryAddress}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NEPALI PHARMACY VERIFIED
                </span>
                <span>STATUS: {completedOrder.orderStatus.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-heading font-bold text-xs shadow-lg hover:bg-emerald-500 transition-all"
              >
                Done & Return to Products
              </button>
            </div>
          </div>
        ) : (

          /* CHECKOUT FORM STATE */
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--border-color)]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)]">
                  Pharmacy Product Checkout
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Order dermatologist-prescribed Nepalese formulations for home delivery or pharmacy pick-up.
                </p>
              </div>
            </div>

            {/* Product Summary Box */}
            <div className="p-4 rounded-2xl glass-card border border-[var(--border-color)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">{product.brand}</span>
                  <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] line-clamp-1">{product.name}</h4>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">{product.priceNpr} / unit</div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-[var(--bg-secondary)] px-3 py-1.5 rounded-xl border border-[var(--border-color)]">
                <span className="text-xs font-mono text-[var(--text-muted)]">Qty:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-transparent text-sm font-bold text-[var(--text-primary)] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n} className="bg-slate-900 text-white">{n}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4 text-left">
              {/* Delivery District / Method */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-violet-400" />
                  <span>Select Delivery District / Pick-up Option:</span>
                </label>
                <select
                  value={deliveryDistrict}
                  onChange={(e) => setDeliveryDistrict(e.target.value as DeliveryDistrict)}
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="Kathmandu Valley Express">Kathmandu Valley Express (Same Day Delivery)</option>
                  <option value="Pokhara">Pokhara District Courier</option>
                  <option value="Chitwan">Chitwan District Courier</option>
                  <option value="Dharan">Dharan / Eastern Nepal Courier</option>
                  <option value="Butwal">Butwal District Courier</option>
                  <option value="Biratnagar">Biratnagar District Courier</option>
                  <option value="Local Pharmacy Pick-up">Local Pharmacy Counter Pick-up</option>
                </select>
              </div>

              {/* Payment Gateway Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-violet-400" />
                  <span>Select Payment Gateway:</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Fonepay QR', 'eSewa', 'Khalti', 'Cash on Delivery (COD)'] as PaymentMethod[]).map((pm) => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setPaymentMethod(pm)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        paymentMethod === pm
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-md ring-1 ring-emerald-500/40'
                          : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-violet-400" />
                    <span>Recipient Full Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
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

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  <span>Delivery Address / Landmark:</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. House No. 42, Golfutar Main Road, Kathmandu"
                  className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
            </div>

            {/* Total Footer & Order CTA */}
            <div className="pt-4 border-t border-[var(--border-color)] space-y-3">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-[var(--text-secondary)]">Total Order Amount ({quantity} item):</span>
                <span className="text-emerald-400 font-heading text-lg">{totalPriceNprStr}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-heading font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Purchase & Generate Payment Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </motion.div>
    </div>
  );
};
