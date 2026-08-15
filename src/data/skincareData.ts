import { AnalysisResult, Dermatologist, Product, RoutineStep } from '../types';

export const SAMPLE_PORTRAITS = [
  {
    id: 'portrait-1',
    name: 'Sample Profile A (Combination)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    type: 'Combination Skin'
  },
  {
    id: 'portrait-2',
    name: 'Sample Profile B (Sensitive/Redness)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    type: 'Sensitive & Reactive'
  },
  {
    id: 'portrait-3',
    name: 'Sample Profile C (Blemish-Prone)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    type: 'Blemish & Pore Congestion'
  }
];

export const INITIAL_ANALYSIS_MOCK: AnalysisResult = {
  id: 'scan-88492',
  overallScore: 84,
  timestamp: 'Just now',
  imageSrc: SAMPLE_PORTRAITS[0].url,
  facialSummary: 'High epidermal clarity with localized sebum elevation in the T-Zone and mild epidermal dehydration around the infraorbital area.',
  severityFlag: false,
  dermatologistAdvice: 'Your skin boundary is overall resilient. Focus on lipid barrier stabilization and gentle BHA micro-exfoliation for the T-Zone.',
  metrics: [
    {
      id: 'Oiliness',
      name: 'T-Zone Oiliness',
      score: 62,
      status: 'Attention',
      description: 'Sebum activity elevated by +18% in Forehead and Nose zones.',
      color: '#7C3AED',
      activeZones: ['forehead', 'nose', 'tZone'],
      metricUnit: 'Sebum Index',
      displayValue: '68 ug/cm²'
    },
    {
      id: 'Dryness',
      name: 'Epidermal Dryness',
      score: 78,
      status: 'Balanced',
      description: 'Cheeks demonstrate optimal transepidermal water retention.',
      color: '#3B82F6',
      activeZones: ['cheeks'],
      metricUnit: 'TEWL Index',
      displayValue: '12.4 g/m²/h'
    },
    {
      id: 'Acne',
      name: 'Acne Vulnerability',
      score: 86,
      status: 'Safe',
      description: 'Minimal active comedonal lesions detected.',
      color: '#10B981',
      activeZones: ['cheeks', 'chin'],
      metricUnit: 'Lesion Density',
      displayValue: 'Low Risk'
    },
    {
      id: 'Blackheads',
      name: 'Pore Congestion',
      score: 65,
      status: 'Attention',
      description: 'Micro-comedones identified surrounding nasal alae.',
      color: '#F59E0B',
      activeZones: ['nose', 'tZone'],
      metricUnit: 'Congestion Ratio',
      displayValue: 'Moderate'
    },
    {
      id: 'Pores',
      name: 'Pore Structural Size',
      score: 72,
      status: 'Balanced',
      description: 'Pore diameter average within normal aesthetic range.',
      color: '#8B5CF6',
      activeZones: ['nose', 'cheeks'],
      metricUnit: 'Avg Diameter',
      displayValue: '0.14 mm'
    },
    {
      id: 'Redness',
      name: 'Erythema & Redness',
      score: 88,
      status: 'Safe',
      description: 'Micro-capillary dilatation is negligible.',
      color: '#10B981',
      activeZones: ['cheeks', 'chin'],
      metricUnit: 'Hemoglobin Map',
      displayValue: 'Minimal'
    },
    {
      id: 'Hyperpigmentation',
      name: 'Melanin Uniformity',
      score: 91,
      status: 'Safe',
      description: 'Even skin tone distribution across forehead and malar regions.',
      color: '#10B981',
      activeZones: ['forehead', 'cheeks'],
      metricUnit: 'Melanin Index',
      displayValue: '91% Uniform'
    },
    {
      id: 'Texture',
      name: 'Surface Smoothness',
      score: 82,
      status: 'Balanced',
      description: 'Micro-relief topography shows smooth keratinized surface.',
      color: '#06B6D4',
      activeZones: ['forehead', 'cheeks', 'chin'],
      metricUnit: 'Roughness Ra',
      displayValue: '0.08 µm'
    },
    {
      id: 'Under-Eye',
      name: 'Infraorbital Vascularity',
      score: 68,
      status: 'Attention',
      description: 'Slight dark circles and mild fluid accumulation detected.',
      color: '#EC4899',
      activeZones: ['underEye'],
      metricUnit: 'Dark Circle Index',
      displayValue: 'Mild Shadowing'
    }
  ]
};

export const ROUTINE_STEPS_MORNING: RoutineStep[] = [
  {
    id: 'm-1',
    stepNumber: 1,
    title: 'Purifying Gentle Gel Cleanser',
    category: 'Cleanse',
    productName: 'Luminary Bio-Balance Cleanser',
    activeIngredient: '2% Niacinamide + Zinc PCA',
    whySelected: 'Targeted T-Zone oiliness (62/100 score) without stripping natural lipid barrier.',
    targetMetricId: 'Oiliness',
    timing: 'Morning',
    usageInstructions: 'Massage 1 pump onto damp face for 60 seconds with lukewarm water.'
  },
  {
    id: 'm-2',
    stepNumber: 2,
    title: 'Hydration Telemetry Antioxidant Serum',
    category: 'Treat',
    productName: 'Aura C+ Ferulic Radiance Elixir',
    activeIngredient: '15% L-Ascorbic Acid + 1% Vitamin E',
    whySelected: 'Protects against urban oxidation and preserves high Melanin Uniformity (91/100 score).',
    targetMetricId: 'Hyperpigmentation',
    timing: 'Morning',
    usageInstructions: 'Apply 3-4 drops evenly onto face and neck before moisturizer.'
  },
  {
    id: 'm-3',
    stepNumber: 3,
    title: 'Ceramide Water Gel Matrix',
    category: 'Moisturize',
    productName: 'Hydro-Lock Peptide Emulsion',
    activeIngredient: '5 Multi-Weight Hyaluronic Acids + Phytosphingosine',
    whySelected: 'Maintains optimal hydration for cheeks while balancing infraorbital under-eye area.',
    targetMetricId: 'Dryness',
    timing: 'Morning',
    usageInstructions: 'Press gently into skin until fully absorbed.'
  },
  {
    id: 'm-4',
    stepNumber: 4,
    title: 'Invisible Shield Fluid SPF 50+',
    category: 'Protect',
    productName: 'Sol-Defense Invisible Mineral Fluid',
    activeIngredient: '12% Non-Nano Zinc Oxide + Ectoin',
    whySelected: 'Essential broad-spectrum protection to prevent collagen degradation and erythema flare-ups.',
    targetMetricId: 'Redness',
    timing: 'Morning',
    usageInstructions: 'Apply two finger lengths 15 minutes before UV exposure.'
  }
];

export const ROUTINE_STEPS_EVENING: RoutineStep[] = [
  {
    id: 'e-1',
    stepNumber: 1,
    title: 'Double-Cleanse Lipid Melt Balm',
    category: 'Cleanse',
    productName: 'Squalane & Chamomile Melt Cleanser',
    activeIngredient: 'Plant Squalane + Bisabolol',
    whySelected: 'Dissolves waterproof sunscreen and sebum plugs in nose pores (65/100 score).',
    targetMetricId: 'Blackheads',
    timing: 'Evening',
    usageInstructions: 'Apply dry to face, emulsify with water, rinse thoroughly.'
  },
  {
    id: 'e-2',
    stepNumber: 2,
    title: 'Micro-Encapsulated Retinoid Serum',
    category: 'Treat',
    productName: 'Cellular Renewal 0.3% Retinol Complex',
    activeIngredient: '0.3% Encapsulated Retinol + Granactive Retinoid',
    whySelected: 'Refines surface texture (82/100) and accelerates cellular turnover in congestion zones.',
    targetMetricId: 'Texture',
    timing: 'Evening',
    usageInstructions: 'Use 2-3 nights per week initially. Avoid eye contours.'
  },
  {
    id: 'e-3',
    stepNumber: 3,
    title: 'Infraorbital De-Puffing Eye Cream',
    category: 'Treat',
    productName: 'Bio-Peptide Caffeine Under-Eye Complex',
    activeIngredient: '5% Green Tea Caffeine + Haloxyl',
    whySelected: 'Formulated specifically to improve infraorbital vascularity (68/100 score).',
    targetMetricId: 'Under-Eye',
    timing: 'Evening',
    usageInstructions: 'Tap lightly along the orbital bone using your ring finger.'
  },
  {
    id: 'e-4',
    stepNumber: 4,
    title: 'Lipid Barrier Recovery Cream',
    category: 'Moisturize',
    productName: 'Barrier Restorative Night Mask',
    activeIngredient: 'Ceramide NP/AP/EOP + Colloidal Oatmeal',
    whySelected: 'Seals moisture and heals micro-inflammation during nocturnal skin regeneration cycle.',
    targetMetricId: 'Dryness',
    timing: 'Evening',
    usageInstructions: 'Warm a pearl-sized amount between palms and pat over face.'
  }
];

export const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Luminary Bio-Balance Niacinamide Cleanser',
    brand: 'SkinAI Clinical',
    category: 'Cleanser',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Niacinamide 2%', 'Zinc PCA', 'Green Tea Extract'],
    rating: 4.9,
    reviewCount: 328,
    priceTier: '$$',
    price: '$38.00',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'A ph-balanced non-stripping cleanser engineered to harmonize T-zone sebum flow.',
    targetMetrics: ['Oiliness', 'Pores']
  },
  {
    id: 'prod-2',
    name: 'Aura L-Ascorbic Acid Radiance Elixir',
    brand: 'SkinAI Clinical',
    category: 'Serum',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Vitamin C 15%', 'Ferulic Acid 1%', 'Hyaluronic Acid'],
    rating: 4.8,
    reviewCount: 512,
    priceTier: '$$$',
    price: '$72.00',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Stabilized clinical antioxidant serum providing 24-hour environmental photoprotection.',
    targetMetrics: ['Hyperpigmentation', 'Redness']
  },
  {
    id: 'prod-3',
    name: 'Hydro-Lock Multi-Peptide Emulsion',
    brand: 'DermaLux MedSpa',
    category: 'Moisturizer',
    image: 'https://images.unsplash.com/photo-1608248597261-83325803746f?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['5 Multi-HA Weights', 'Copper Tripeptide-1'],
    rating: 4.9,
    reviewCount: 410,
    priceTier: '$$$',
    price: '$64.00',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Lightweight water-gel matrix delivering instant epidermal plumpness and water barrier seal.',
    targetMetrics: ['Dryness', 'Texture']
  },
  {
    id: 'prod-4',
    name: 'Cellular Renewal 0.3% Retinol Complex',
    brand: 'SkinAI Clinical',
    category: 'Treatment',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Encapsulated Retinol 0.3%', 'Squalane', 'Bakuchiol'],
    rating: 4.7,
    reviewCount: 284,
    priceTier: '$$$$',
    price: '$88.00',
    fragranceFree: true,
    sensitiveFriendly: false,
    description: 'Slow-release retinoid system that accelerates turnover while buffering against redness.',
    targetMetrics: ['Blackheads', 'Texture', 'Pores']
  },
  {
    id: 'prod-5',
    name: 'Vascular Soothing Caffeine Eye Gel',
    brand: 'Apothecary Med',
    category: 'Eye Care',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Caffeine 5%', 'EGCG', 'Infra-Peptide-8'],
    rating: 4.6,
    reviewCount: 195,
    priceTier: '$$',
    price: '$42.00',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Drainage-stimulating caffeine hydrogel micro-emulsion targeting under-eye shadow density.',
    targetMetrics: ['Under-Eye', 'Redness']
  }
];

export const MOCK_DERMATOLOGISTS: Dermatologist[] = [
  {
    id: 'derm-1',
    name: 'Dr. Elena Rostova, MD, FAAD',
    clinic: 'Beverly Hills Dermatological Center',
    specialty: 'Clinical Dermatology & Phototherapy',
    address: '9400 Wilshire Blvd, Beverly Hills, CA',
    zipCode: '90212',
    phone: '(310) 555-0192',
    rating: 4.9,
    distance: '1.2 miles'
  },
  {
    id: 'derm-2',
    name: 'Dr. Marcus Vance, MD',
    clinic: 'Vance Skin & Laser Institute',
    specialty: 'Acne Vulgaris & Barrier Repair',
    address: '450 N Bedford Dr, Beverly Hills, CA',
    zipCode: '90210',
    phone: '(310) 555-0481',
    rating: 4.8,
    distance: '2.4 miles'
  },
  {
    id: 'derm-3',
    name: 'Dr. Sophia Chen, MD',
    clinic: 'Pacific MedSpa Aesthetic Skin',
    specialty: 'Cosmetic Dermatology & Pigmentation',
    address: '10880 Wilshire Blvd, Los Angeles, CA',
    zipCode: '90024',
    phone: '(310) 555-0733',
    rating: 5.0,
    distance: '3.1 miles'
  }
];

export const MOCK_JOURNEY_DATA = [
  { month: 'Month 1', score: 71, oiliness: 48, hydration: 62, clarity: 68 },
  { month: 'Month 2', score: 76, oiliness: 55, hydration: 70, clarity: 74 },
  { month: 'Month 3', score: 84, oiliness: 62, hydration: 78, clarity: 86 }
];
