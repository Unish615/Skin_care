export type FacialZone = 
  | 'forehead' 
  | 'cheeks' 
  | 'nose' 
  | 'chin' 
  | 'underEye' 
  | 'tZone' 
  | 'uZone' 
  | 'periorbital' 
  | 'jawline';

export type HealthVectorGroup = 
  | 'Epidermal Dynamics & Water/Oil'
  | 'Acne & Follicular Health'
  | 'Pigmentation & Vascular Integrity'
  | 'Tissue Texture & Structural Integrity';

export type SkinType = 
  | 'Oily & Acne-Prone'
  | 'Sensitive & Erythema'
  | 'Dry & Dehydrated'
  | 'Combination & Pigmentation';

export type Metric20ExactCategory = 
  | 'metric1_stratumHydration'
  | 'metric2_dermalWater'
  | 'metric3_tewl'
  | 'metric4_tZoneSebum'
  | 'metric5_uZoneSebum'
  | 'metric6_acnePimples'
  | 'metric7_cysticAcne'
  | 'metric8_openComedones'
  | 'metric9_closedComedones'
  | 'metric10_poreVolume'
  | 'metric11_erythema'
  | 'metric12_melasmaMelanin'
  | 'metric13_pihSpots'
  | 'metric14_uvDamage'
  | 'metric15_capillaryIndex'
  | 'metric16_atrophicScars'
  | 'metric17_microRoughness'
  | 'metric18_periorbitalVolume'
  | 'metric19_fineLines'
  | 'metric20_dermalElasticity';

export interface SkinMetric {
  id: Metric20ExactCategory;
  metricNumber: number;
  vectorGroup: HealthVectorGroup;
  name: string;
  score: number;
  status: 'Optimal' | 'Balanced' | 'Attention' | 'Elevated';
  description: string;
  color: string;
  activeZone: FacialZone;
  metricUnit: string;
  displayValue: string;
  contextualDetectionText: string;
}

export interface AnalysisResult {
  id: string;
  overallScore: number;
  timestamp: string;
  metrics: SkinMetric[];
  facialSummary: string;
  severityFlag: boolean;
  imageSrc: string;
  dermatologistAdvice: string;
  detectedSkinType: SkinType;
}

export interface RoutineStep {
  id: string;
  stepNumber: number;
  title: string;
  category: 'Cleanse' | 'Treat' | 'Moisturize' | 'Protect';
  productName: string;
  activeIngredient: string;
  whySelected: string;
  targetMetricId: Metric20ExactCategory;
  timing: 'Morning' | 'Evening' | 'Both';
  usageInstructions: string;
}

export type ProductCategorySection = 'Cleansers' | 'Serums' | 'Moisturizers' | 'Sunscreens';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySection: ProductCategorySection;
  image: string;
  activeIngredients: string[];
  rating: number;
  reviewCount: number;
  priceNpr: string;
  fragranceFree: boolean;
  sensitiveFriendly: boolean;
  description: string;
  targetMetrics: Metric20ExactCategory[];
  suitableSkinTypes: SkinType[];
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
}

export interface AppointmentBooking {
  id: string;
  clinicName: string;
  doctorName: string;
  patientName: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  skinConcern: string;
  createdTimestamp: string;
}

export type PaymentMethod = 'Fonepay QR' | 'eSewa' | 'Khalti' | 'Cash on Delivery (COD)';
export type DeliveryDistrict = 'Kathmandu Valley Express' | 'Pokhara' | 'Chitwan' | 'Dharan' | 'Butwal' | 'Biratnagar' | 'Local Pharmacy Pick-up';

export interface PharmacyOrder {
  orderId: string;
  productName: string;
  brand: string;
  quantity: number;
  unitPriceNpr: string;
  totalPriceNpr: string;
  recipientName: string;
  phone: string;
  deliveryDistrict: DeliveryDistrict;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  qrCodeUrl: string;
  createdTimestamp: string;
  orderStatus: 'Confirmed & Dispatched' | 'Ready for Pick-up';
}
