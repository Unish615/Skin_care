'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { getDynamicRoutineSteps, RECOMMENDED_PRODUCTS, MOCK_DERMATOLOGISTS } from '../data/skincareData';
import { generateQRCodeDataURIAsync, getNetworkBaseUrl } from '../utils/qrCodeGenerator';
import { Download, FileText, User, QrCode } from 'lucide-react';

interface PDFReportGeneratorProps {
  result: AnalysisResult;
}

export const PDFReportGenerator: React.FC<PDFReportGeneratorProps> = ({ result }) => {
  const [patientName, setPatientName] = useState('');
  const [qrDataUri, setQrDataUri] = useState<string>('');

  const displayName = patientName.trim() || 'ANONYMOUS CLINICAL PATIENT';

  // Construct dynamic report URL containing real-time query parameters
  const queryParams = new URLSearchParams({
    name: displayName,
    score: result.overallScore.toString(),
    type: result.detectedSkinType
  }).toString();

  const reportUrl = `${getNetworkBaseUrl()}/report/${result.id}?${queryParams}`;

  useEffect(() => {
    // Save real-time report data to localStorage so scanning opens exact dynamic report
    if (typeof window !== 'undefined') {
      const payloadToSave = {
        result,
        patientName: displayName,
        timestamp: new Date().toLocaleString()
      };
      try {
        localStorage.setItem(`nyoria_report_${result.id}`, JSON.stringify(payloadToSave));
        localStorage.setItem('nyoria_latest_report', JSON.stringify(payloadToSave));
      } catch (err) {}
    }

    generateQRCodeDataURIAsync(reportUrl, 300).then(uri => {
      setQrDataUri(uri);
    });
  }, [reportUrl, result, displayName]);

  const handlePrintPDF = () => {
    const printWindow = window.open('', '_blank', 'width=950,height=850,resizable=yes,scrollbars=yes');
    if (!printWindow) return;

    const dynamicRoutine = getDynamicRoutineSteps(result.detectedSkinType || 'Dry & Dehydrated');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>NYORIA SKIN INTELLIGENCE - MOLECULAR DIAGNOSTIC REPORT - ${displayName.toUpperCase()}</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; font-family: 'Helvetica Neue', Arial, sans-serif; color: #090D1A; }
              .page-break { page-break-before: always; }
            }
            body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #090D1A; margin: 0; padding: 30px; background: #fff; }
            .header { border-bottom: 2px solid #8B5CF6; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-size: 24px; font-weight: 800; color: #8B5CF6; letter-spacing: -0.5px; }
            .subtitle { font-size: 11px; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
            .patient-banner { margin-top: 10px; padding: 8px 12px; background: #F3F3FF; border-left: 4px solid #8B5CF6; border-radius: 4px; font-size: 13px; font-weight: 700; color: #0F172A; }
            .patient-name-highlight { color: #6D28D9; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 800; }
            .header-qr-box { display: flex; align-items: center; gap: 12px; background: #F8FAFC; padding: 8px 12px; border-radius: 8px; border: 1px solid #E2E8F0; }
            .header-qr-img { width: 80px; height: 80px; border-radius: 4px; }
            .meta { font-size: 11.5px; color: #475569; text-align: right; }
            .score-box { background: #F3F3FF; border: 1px solid #DDD6FE; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 25px; }
            .score-val { font-size: 48px; font-weight: 800; color: #8B5CF6; line-height: 1; }
            .score-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #4C1D95; margin-top: 5px; }
            .section-title { font-size: 15px; font-weight: 700; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-top: 22px; margin-bottom: 12px; color: #0F172A; }
            .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
            .metric-card { border: 1px solid #E2E8F0; border-radius: 6px; padding: 8px 10px; font-size: 11px; }
            .metric-name { font-weight: 700; color: #1E293B; }
            .metric-val { font-weight: 800; color: #8B5CF6; float: right; }
            .metric-desc { font-size: 9.5px; color: #64748B; margin-top: 2px; }
            .routine-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 10.5px; }
            .routine-table th { background: #F8FAFC; text-align: left; padding: 6px 8px; border-bottom: 2px solid #E2E8F0; font-weight: 700; }
            .routine-table td { padding: 6px 8px; border-bottom: 1px solid #F1F5F9; }
            .nepali-badge { background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; font-size: 9.5px; padding: 2px 6px; border-radius: 4px; font-weight: 600; }
            .footer-note { border-top: 1px solid #E2E8F0; padding-top: 15px; font-size: 9.5px; color: #94A3B8; text-align: center; margin-top: 25px; display: flex; justify-content: space-between; align-items: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">NYORIA SKIN INTELLIGENCE</div>
              <div class="subtitle">Molecular Diagnostic Report (20 Parameters)</div>
              <div class="patient-banner">
                PATIENT / CLIENT: <span class="patient-name-highlight">${displayName}</span> (SKIN TYPE: ${result.detectedSkinType || 'Dry & Dehydrated'})
              </div>
            </div>
            
            <div class="header-qr-box">
              <img src="${qrDataUri}" alt="Report QR Code" class="header-qr-img" />
              <div class="meta">
                <strong>Report ID:</strong> ${result.id}<br/>
                <strong>Date:</strong> ${result.timestamp}<br/>
                <strong>Engine:</strong> Nyoria Protocol V2.4<br/>
                <span style="color:#7C3AED; font-weight:700">Scan QR to View Softcopy</span>
              </div>
            </div>
          </div>

          <div class="score-box">
            <div class="score-val">${result.overallScore} / 100</div>
            <div class="score-label">Nyoria Cellular Health Index Score for ${displayName}</div>
          </div>

          <div class="section-title">I. 20 Micro-Depth Granular Biometric Skin Parameters</div>
          <div class="metrics-grid">
            ${result.metrics.map(m => `
              <div class="metric-card">
                <span class="metric-val">${m.score}%</span>
                <div class="metric-name">${m.name}</div>
                <div class="metric-desc">${m.contextualDetectionText}</div>
              </div>
            `).join('')}
          </div>

          <div class="section-title">II. Calibrated Regimen for ${result.detectedSkinType || 'Dry & Dehydrated'} (Morning & Evening)</div>
          <table class="routine-table">
            <thead>
              <tr>
                <th>Step</th>
                <th>Category</th>
                <th>Pharmaceutical Formulation</th>
                <th>Active Ingredient</th>
                <th>Clinical Rationale</th>
              </tr>
            </thead>
            <tbody>
              ${dynamicRoutine.morning.map(s => `
                <tr>
                  <td><strong>AM 0${s.stepNumber}</strong></td>
                  <td>${s.category}</td>
                  <td><strong>${s.productName}</strong></td>
                  <td>${s.activeIngredient}</td>
                  <td>${s.whySelected}</td>
                </tr>
              `).join('')}
              ${dynamicRoutine.evening.map(s => `
                <tr>
                  <td><strong>PM 0${s.stepNumber}</strong></td>
                  <td>${s.category}</td>
                  <td><strong>${s.productName}</strong></td>
                  <td>${s.activeIngredient}</td>
                  <td>${s.whySelected}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="section-title">III. Prescribed Nepali Pharmaceutical Formulations</div>
          <table class="routine-table">
            <thead>
              <tr>
                <th>Brand / Product</th>
                <th>Est. Price (NPR)</th>
                <th>Key Active Ingredients</th>
                <th>Pharmacy Availability</th>
              </tr>
            </thead>
            <tbody>
              ${RECOMMENDED_PRODUCTS.map(p => `
                <tr>
                  <td><strong>${p.name}</strong><br/><span style="color:#64748B">${p.brand} (${p.categorySection})</span></td>
                  <td><strong>${p.priceNpr}</strong></td>
                  <td>${p.activeIngredients.join(', ')}</td>
                  <td><span class="nepali-badge">📍 Available in Pharmacies Across Nepal</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="section-title">IV. Verified Clinical Reference Centers in Nepal</div>
          <table class="routine-table">
            <thead>
              <tr>
                <th>Center / Hospital Name</th>
                <th>Specialty & Department</th>
                <th>Location Address</th>
                <th>Contact Line</th>
              </tr>
            </thead>
            <tbody>
              ${MOCK_DERMATOLOGISTS.map(d => `
                <tr>
                  <td><strong>${d.name}</strong></td>
                  <td>${d.specialty}</td>
                  <td>${d.address}</td>
                  <td>${d.phone}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer-note">
            <div>
              <strong>Clinical Report QR:</strong> Scan QR code with any camera app to view complete digital softcopy report on phone.
            </div>
            <div>
              Formulated for <strong>${displayName}</strong> by Nyoria Diagnostic Protocol.
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="p-8 rounded-3xl glass-panel border border-[var(--glass-border)] shadow-2xl bg-[var(--bg-surface-elevated)] text-center space-y-6 max-w-4xl mx-auto">
      <div className="w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center mx-auto">
        <FileText className="w-6 h-6" />
      </div>
      
      <div>
        <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
          Clinical PDF Diagnostic Export & Real-Time QR Pass
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-xl mx-auto">
          Compile a complete medical report. Scanning the QR code opens your live real-time softcopy report document directly on your smartphone screen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center max-w-2xl mx-auto text-left">
        {/* Patient Name Input Field (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-violet-400" />
              <span>Patient / Client Full Name:</span>
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter Patient Name (e.g. Unish Gautam)..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm font-medium transition-all shadow-inner"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 space-y-1">
            <strong className="block text-violet-200">⚡ Real-Time Dynamic QR Pass:</strong>
            <p className="leading-relaxed">
              Scanning this QR code with any smartphone camera opens your live real-time report for <strong className="text-cyan-300 font-bold">{displayName}</strong> ({result.overallScore}/100 - {result.detectedSkinType}) on your phone screen!
            </p>
          </div>
        </div>

        {/* Dynamic Scannable ISO-Compliant Black & White QR Code Card */}
        <div className="md:col-span-5 p-5 rounded-3xl bg-slate-900 border border-violet-500/40 flex flex-col items-center justify-center text-center space-y-3 shadow-2xl">
          <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-xl flex items-center justify-center border-2 border-white">
            {qrDataUri ? (
              <img src={qrDataUri} alt="Report Diagnostic Data QR Pass" className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-slate-200 animate-pulse rounded-lg" />
            )}
          </div>
          <div className="text-[11px] font-mono text-violet-300 font-bold flex items-center gap-1.5 uppercase tracking-wider">
            <QrCode className="w-4 h-4 text-violet-400" />
            <span>SCAN FOR REAL-TIME REPORT</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrintPDF}
        className="px-8 py-4 rounded-2xl font-heading font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 shadow-xl shadow-violet-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mx-auto group"
      >
        <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
        <span>📥 Download / Save Real-Time Softcopy Report (PDF)</span>
      </button>
    </div>
  );
};
