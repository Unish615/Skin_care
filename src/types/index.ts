export type FacialZone = 'forehead' | 'cheeks' | 'nose' | 'chin' | 'underEye' | 'tZone';

export type MetricCategory = 
  | 'Oiliness' 
  | 'Dryness' 
  | 'Acne' 
  | 'Blackheads' 
  | 'Pores' 
  | 'Redness' 
  | 'Hyperpigmentation' 
  | 'Texture' 
  | 'Under-Eye';

export interface SkinMetric {
  id: MetricCategory;
  name: string;
  score: number; // 0 (poor) - 100 (optimal)
  status: 'Safe' | 'Balanced' | 'Attention' | 'Severe';
  description: string;
  color: string;
  activeZones: FacialZone[];
  metricUnit: string;
  displayValue: string;
}

export interface AnalysisResult {
  id: string;
  overallScore: number;
  timestamp: string;
  metrics: SkinMetric[];
  facialSummary: string;
  severityFlag: boolean; // Triggers Derm Escalation if true
  imageSrc: string;
  dermatologistAdvice: string;
}

export interface RoutineStep {
  id: string;
  stepNumber: number;
  title: string;
  category: 'Cleanse' | 'Treat' | 'Moisturize' | 'Protect';
  productName: string;
  activeIngredient: string;
  whySelected: string;
  targetMetricId: MetricCategory;
  timing: 'Morning' | 'Evening' | 'Both';
  usageInstructions: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  activeIngredients: string[];
  rating: number;
  reviewCount: number;
  priceTier: '$' | '$$' | '$$$' | '$$$$';
  price: string;
  fragranceFree: boolean;
  sensitiveFriendly: boolean;
  description: string;
  targetMetrics: MetricCategory[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  quickPrompts?: string[];
}

export interface Dermatologist {
  id: string;
  name: string;
  clinic: string;
  specialty: string;
  address: string;
  zipCode: string;
  phone: string;
  rating: number;
  distance: string;
}
