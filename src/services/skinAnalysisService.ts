import { AnalysisResult, SkinMetric } from '../types';
import { INITIAL_ANALYSIS_MOCK } from '../data/skincareData';

/**
 * Service representing the AI computer vision telemetry pipeline.
 * Cleanly decoupled so that `analyzeSkin` can easily swap out mock telemetry logic 
 * with a production REST endpoint: `POST /api/v1/skin-analyze`.
 */
export async function analyzeSkin(imageSource: string | File): Promise<AnalysisResult> {
  // Simulate network latency & neural network processing (2.8 seconds)
  await new Promise(resolve => setTimeout(resolve, 2800));

  // Determine if file or URL
  const isCustomUpload = typeof imageSource !== 'string';
  const imageSrcUrl = isCustomUpload ? URL.createObjectURL(imageSource) : imageSource;

  // Generate slight random variations to simulate live AI image processing
  const randomScoreVariance = Math.floor(Math.random() * 7) - 3;
  const overallScore = Math.min(98, Math.max(68, INITIAL_ANALYSIS_MOCK.overallScore + randomScoreVariance));

  const updatedMetrics: SkinMetric[] = INITIAL_ANALYSIS_MOCK.metrics.map(metric => {
    const variance = Math.floor(Math.random() * 8) - 4;
    const newScore = Math.min(99, Math.max(50, metric.score + variance));
    
    let status: 'Safe' | 'Balanced' | 'Attention' | 'Severe' = 'Safe';
    if (newScore < 60) status = 'Severe';
    else if (newScore < 75) status = 'Attention';
    else if (newScore < 85) status = 'Balanced';

    return {
      ...metric,
      score: newScore,
      status
    };
  });

  // Check if any metric is severe to trigger dermatologist escalation flag
  const hasSevereMetric = updatedMetrics.some(m => m.status === 'Severe');

  return {
    id: `scan-${Date.now().toString().slice(-5)}`,
    overallScore,
    timestamp: 'Just now',
    imageSrc: imageSrcUrl,
    facialSummary: isCustomUpload 
      ? 'Custom vision scan complete. Facial telemetry detects localized T-zone sebum flow and high cheek hydration stability.'
      : INITIAL_ANALYSIS_MOCK.facialSummary,
    severityFlag: hasSevereMetric,
    dermatologistAdvice: hasSevereMetric
      ? 'Elevated erythema or pore congestion detected. We recommend reviewing with a certified dermatologist.'
      : INITIAL_ANALYSIS_MOCK.dermatologistAdvice,
    metrics: updatedMetrics
  };
}
