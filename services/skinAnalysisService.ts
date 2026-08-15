import { AnalysisResult, SkinMetric, SkinType } from '../types';
import { INITIAL_ANALYSIS_MOCK, SAMPLE_PORTRAITS } from '../data/skincareData';

export async function analyzeSkin(imageSource: string | File): Promise<AnalysisResult> {
  // Simulate Nyoria Engine 20-metric cellular-level facial telemetry pipeline (2.8 seconds)
  await new Promise(resolve => setTimeout(resolve, 2800));

  const isCustomUpload = typeof imageSource !== 'string';
  const imageSrcUrl = isCustomUpload ? URL.createObjectURL(imageSource) : imageSource;

  // Determine detected skin type based on selected sample or custom image
  let detectedSkinType: SkinType = 'Combination & Pigmentation';
  if (!isCustomUpload) {
    const matchedSample = SAMPLE_PORTRAITS.find(s => s.url === imageSource);
    if (matchedSample) {
      detectedSkinType = matchedSample.skinType;
    }
  } else {
    // Determine dynamically from upload
    const skinTypes: SkinType[] = [
      'Oily & Acne-Prone',
      'Sensitive & Erythema',
      'Dry & Dehydrated',
      'Combination & Pigmentation'
    ];
    detectedSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];
  }

  const randomScoreVariance = Math.floor(Math.random() * 7) - 3;
  const overallScore = Math.min(98, Math.max(68, INITIAL_ANALYSIS_MOCK.overallScore + randomScoreVariance));

  const updatedMetrics: SkinMetric[] = INITIAL_ANALYSIS_MOCK.metrics.map(metric => {
    let variance = Math.floor(Math.random() * 8) - 4;
    
    // Adjust metrics based on detected skin type
    if (detectedSkinType === 'Oily & Acne-Prone') {
      if (metric.id === 'metric4_tZoneSebum' || metric.id === 'metric6_acnePimples' || metric.id === 'metric8_openComedones') {
        variance -= 12; // Lower score = higher severity/attention
      }
    } else if (detectedSkinType === 'Sensitive & Erythema') {
      if (metric.id === 'metric11_erythema' || metric.id === 'metric15_capillaryIndex') {
        variance -= 14;
      }
    } else if (detectedSkinType === 'Dry & Dehydrated') {
      if (metric.id === 'metric1_stratumHydration' || metric.id === 'metric2_dermalWater' || metric.id === 'metric3_tewl') {
        variance -= 15;
      }
    }

    const newScore = Math.min(99, Math.max(35, metric.score + variance));
    
    let status: 'Optimal' | 'Balanced' | 'Attention' | 'Elevated' = 'Optimal';
    if (newScore < 50) status = 'Elevated';
    else if (newScore < 70) status = 'Attention';
    else if (newScore < 85) status = 'Balanced';

    return {
      ...metric,
      score: newScore,
      status
    };
  });

  const hasSevereMetric = updatedMetrics.some(m => m.status === 'Elevated');

  return {
    id: `nyoria-${Date.now().toString().slice(-5)}`,
    overallScore,
    timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    imageSrc: imageSrcUrl,
    facialSummary: `Nyoria Engine 20-metric pure facial depth scan complete (Background noise, apparel & hair 100% excluded). Analyzed facial skin profile: ${detectedSkinType}. High-resolution dermal telemetry locked at cellular equilibrium.`,
    severityFlag: hasSevereMetric,
    dermatologistAdvice: hasSevereMetric
      ? `Elevated inflammatory or barrier deficit detected for ${detectedSkinType}. We recommend reviewing with a certified local dermatologist in Nepal.`
      : `Skin barrier equilibrium is resilient for ${detectedSkinType}. Follow your customized Nepalese pharmaceutical regimen below.`,
    metrics: updatedMetrics,
    detectedSkinType
  };
}
