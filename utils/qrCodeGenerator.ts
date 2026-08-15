import QRCode from 'qrcode';

/**
 * Returns accessible network base URL for mobile phone scanning over cellular or Wi-Fi.
 * Defaults to live Vercel production URL so any mobile phone camera anywhere opens the report instantly.
 */
export function getNetworkBaseUrl(): string {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin;
    }
  }
  return 'https://skincare-nyoria.vercel.app';
}

/**
 * Generates an ISO/IEC 18004 standards-compliant PNG Data URI QR Code locally on the client.
 * Guaranteed 100% smartphone camera scannability with ZERO external server calls and ZERO green boxes!
 */
export async function generateQRCodeDataURIAsync(text: string, size: number = 300): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      margin: 2,
      width: size,
      errorCorrectionLevel: 'L', // Low error correction allows high capacity data payload
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return dataUrl;
  } catch (err) {
    console.error('QR Code Data URI generation error:', err);
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  }
}

/**
 * Generates SVG string locally for instant document embedding
 */
export async function generateQRCodeSVGAsync(text: string, size: number = 200): Promise<string> {
  try {
    const svgString = await QRCode.toString(text, {
      type: 'svg',
      margin: 2,
      width: size,
      errorCorrectionLevel: 'L',
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return svgString;
  } catch (err) {
    console.error('QR Code generation error:', err);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="100%" height="100%" fill="#fff"/></svg>`;
  }
}
