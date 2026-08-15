import { AnalysisResult, Dermatologist, Product, RoutineStep, SkinMetric, SkinType } from '../types';

export const SAMPLE_PORTRAITS = [
  {
    id: 'portrait-1',
    name: 'Cellular Scan Profile A (Combination)',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    type: 'Combination Sebum/Hydration Deficit',
    skinType: 'Combination & Pigmentation' as SkinType
  },
  {
    id: 'portrait-2',
    name: 'Cellular Scan Profile B (Erythema/Vascular)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    type: 'Vascular Hypersensitivity',
    skinType: 'Sensitive & Erythema' as SkinType
  },
  {
    id: 'portrait-3',
    name: 'Cellular Scan Profile C (Inflammation)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    type: 'Papules & Follicular Blockages',
    skinType: 'Oily & Acne-Prone' as SkinType
  }
];

export const TWENTY_EXACT_SKIN_METRICS: SkinMetric[] = [
  // ----------------------------------------------------
  // VECTOR 1: Epidermal Dynamics & Water/Oil (Metrics 1 to 5)
  // ----------------------------------------------------
  {
    id: 'metric1_stratumHydration',
    metricNumber: 1,
    vectorGroup: 'Epidermal Dynamics & Water/Oil',
    name: '1. Stratum Corneum Hydration (Water Retention)',
    score: 65,
    status: 'Attention',
    description: 'Surface water saturation percentage.',
    color: '#F59E0B',
    activeZone: 'uZone',
    metricUnit: 'Hydration Level',
    displayValue: '42% Saturation',
    contextualDetectionText: 'Nyoria Micro-Detection: Dermal water retention shows a deep moisture deficit with surface hydration holding at 42%.'
  },
  {
    id: 'metric2_dermalWater',
    metricNumber: 2,
    vectorGroup: 'Epidermal Dynamics & Water/Oil',
    name: '2. Deep Dermal Water Content (Hydration Reservoir)',
    score: 78,
    status: 'Balanced',
    description: 'Sub-surface internal skin water levels.',
    color: '#3B82F6',
    activeZone: 'cheeks',
    metricUnit: 'Reservoir Index',
    displayValue: '78% Preserved',
    contextualDetectionText: 'Nyoria Micro-Detection: Internal dermal water reservoirs in papillary layer are 78% preserved.'
  },
  {
    id: 'metric3_tewl',
    metricNumber: 3,
    vectorGroup: 'Epidermal Dynamics & Water/Oil',
    name: '3. Trans-Epidermal Water Loss (TEWL)',
    score: 82,
    status: 'Balanced',
    description: 'Moisture barrier evaporation and dehydration index.',
    color: '#10B981',
    activeZone: 'uZone',
    metricUnit: 'TEWL Index',
    displayValue: '12.4 g/m²/h',
    contextualDetectionText: 'Nyoria Micro-Detection: Barrier evaporation rate is steady at 12.4 g/m²/h, protecting against climate dryness.'
  },
  {
    id: 'metric4_tZoneSebum',
    metricNumber: 4,
    vectorGroup: 'Epidermal Dynamics & Water/Oil',
    name: '4. T-Zone Sebum Density (Oiliness)',
    score: 72,
    status: 'Attention',
    description: 'Active lipid mapping across the forehead and nasal bridge.',
    color: '#8B5CF6',
    activeZone: 'forehead',
    metricUnit: 'Sebum Index',
    displayValue: '72 ug/cm²',
    contextualDetectionText: 'Nyoria Micro-Detection: High localized sebum production identified across central forehead and nasal bridge.'
  },
  {
    id: 'metric5_uZoneSebum',
    metricNumber: 5,
    vectorGroup: 'Epidermal Dynamics & Water/Oil',
    name: '5. U-Zone Sebum Balance (Dryness)',
    score: 84,
    status: 'Optimal',
    description: 'Lateral cheek and jawline lipid evaluation.',
    color: '#3B82F6',
    activeZone: 'cheeks',
    metricUnit: 'Cheek Lipid Ratio',
    displayValue: '84% Balanced',
    contextualDetectionText: 'Nyoria Micro-Detection: Lateral cheek and jawline lipids maintain smooth protective oil barrier.'
  },

  // ----------------------------------------------------
  // VECTOR 2: Acne & Follicular Health (Metrics 6 to 10)
  // ----------------------------------------------------
  {
    id: 'metric6_acnePimples',
    metricNumber: 6,
    vectorGroup: 'Acne & Follicular Health',
    name: '6. Acne Vulnerability (Active Pimples)',
    score: 88,
    status: 'Optimal',
    description: 'Count and severity of active inflammatory red pimples.',
    color: '#10B981',
    activeZone: 'chin',
    metricUnit: 'Pimple Count',
    displayValue: '1 Active Focal Point',
    contextualDetectionText: 'Nyoria Micro-Detection: Minimal active red inflammatory pimples detected. Low papular density on lower chin.'
  },
  {
    id: 'metric7_cysticAcne',
    metricNumber: 7,
    vectorGroup: 'Acne & Follicular Health',
    name: '7. Deep Cystic Acne Congestion',
    score: 94,
    status: 'Optimal',
    description: 'Sub-dermal nodular acne formation tracking.',
    color: '#10B981',
    activeZone: 'cheeks',
    metricUnit: 'Cystic Index',
    displayValue: 'Zero Sub-Dermal Cysts',
    contextualDetectionText: 'Nyoria Micro-Detection: Zero deep sub-dermal cystic congestion or painful nodular lesions detected.'
  },
  {
    id: 'metric8_openComedones',
    metricNumber: 8,
    vectorGroup: 'Acne & Follicular Health',
    name: '8. Open Comedones (Blackheads)',
    score: 68,
    status: 'Attention',
    description: 'Melanin-oxidized micro-keratin plugs concentrated on nose and cheeks.',
    color: '#F59E0B',
    activeZone: 'nose',
    metricUnit: 'Comedone Density',
    displayValue: 'Moderate Density',
    contextualDetectionText: 'Nyoria Micro-Detection: Concentrated blackhead keratin plugs along nasal alar creases.'
  },
  {
    id: 'metric9_closedComedones',
    metricNumber: 9,
    vectorGroup: 'Acne & Follicular Health',
    name: '9. Closed Comedones (Whiteheads)',
    score: 75,
    status: 'Balanced',
    description: 'Sub-surface sebaceous retention dots.',
    color: '#8B5CF6',
    activeZone: 'chin',
    metricUnit: 'Retention Dots',
    displayValue: 'Mild Occlusion',
    contextualDetectionText: 'Nyoria Micro-Detection: Scattered whitehead micro-retention dots along lower labial groove.'
  },
  {
    id: 'metric10_poreVolume',
    metricNumber: 10,
    vectorGroup: 'Acne & Follicular Health',
    name: '10. Follicular Pore Volume (Open Pores)',
    score: 64,
    status: 'Attention',
    description: 'Stretched or dilated micro-pore index.',
    color: '#F59E0B',
    activeZone: 'nose',
    metricUnit: 'Pore Dilation',
    displayValue: '0.16 mm Radius',
    contextualDetectionText: 'Nyoria Micro-Detection: Nasal and medial cheek pores exhibit 0.16 mm dilation from sebum outflow pressure.'
  },

  // ----------------------------------------------------
  // VECTOR 3: Pigmentation & Vascular Integrity (Metrics 11 to 15)
  // ----------------------------------------------------
  {
    id: 'metric11_erythema',
    metricNumber: 11,
    vectorGroup: 'Pigmentation & Vascular Integrity',
    name: '11. Localized Erythema (Redness)',
    score: 86,
    status: 'Optimal',
    description: 'Dermal micro-vascular redness concentration.',
    color: '#10B981',
    activeZone: 'cheeks',
    metricUnit: 'Erythema Index',
    displayValue: 'Low Redness',
    contextualDetectionText: 'Nyoria Micro-Detection: Dermal vascular redness concentration is minimal across bilateral cheek planes.'
  },
  {
    id: 'metric12_melasmaMelanin',
    metricNumber: 12,
    vectorGroup: 'Pigmentation & Vascular Integrity',
    name: '12. Melasma & Superficial Melanin',
    score: 80,
    status: 'Balanced',
    description: 'Dermal pigmentation and dark patches.',
    color: '#8B5CF6',
    activeZone: 'forehead',
    metricUnit: 'Melanin Uniformity',
    displayValue: '80% Uniform',
    contextualDetectionText: 'Nyoria Micro-Detection: Light epidermal melanin concentration over upper forehead zone.'
  },
  {
    id: 'metric13_pihSpots',
    metricNumber: 13,
    vectorGroup: 'Pigmentation & Vascular Integrity',
    name: '13. Post-Inflammatory Hyperpigmentation (PIH)',
    score: 74,
    status: 'Balanced',
    description: 'Dark spot remnants left behind by old acne.',
    color: '#8B5CF6',
    activeZone: 'cheeks',
    metricUnit: 'PIH Spot Count',
    displayValue: 'Localized Dark Spots',
    contextualDetectionText: 'Nyoria Micro-Detection: Post-inflammatory dark spot remnants identified on mid-cheek areas.'
  },
  {
    id: 'metric14_uvDamage',
    metricNumber: 14,
    vectorGroup: 'Pigmentation & Vascular Integrity',
    name: '14. UV Photo-Damage Index',
    score: 85,
    status: 'Optimal',
    description: 'Deep solar radiation damage footprints.',
    color: '#10B981',
    activeZone: 'forehead',
    metricUnit: 'Solar Damage Index',
    displayValue: 'Minimal UV Stain',
    contextualDetectionText: 'Nyoria Micro-Detection: Sub-surface UV radiation damage footprints remain minimal.'
  },
  {
    id: 'metric15_capillaryIndex',
    metricNumber: 15,
    vectorGroup: 'Pigmentation & Vascular Integrity',
    name: '15. Capillary Dilatation Index',
    score: 88,
    status: 'Optimal',
    description: 'Telangiectasia and hyper-sensitive vessel mapping.',
    color: '#10B981',
    activeZone: 'nose',
    metricUnit: 'Vessel Dilatation',
    displayValue: 'Intact Vessels',
    contextualDetectionText: 'Nyoria Micro-Detection: Micro-capillary dilation and telangiectasias are intact without visible broken vessels.'
  },

  // ----------------------------------------------------
  // VECTOR 4: Tissue Texture & Structural Integrity (Metrics 16 to 20)
  // ----------------------------------------------------
  {
    id: 'metric16_atrophicScars',
    metricNumber: 16,
    vectorGroup: 'Tissue Texture & Structural Integrity',
    name: '16. Post-Acne Atrophic Scars',
    score: 86,
    status: 'Optimal',
    description: 'Structural icepick, boxcar, and rolling scar depths from past pimples.',
    color: '#10B981',
    activeZone: 'cheeks',
    metricUnit: 'Scar Depth Index',
    displayValue: 'Minimal Scars',
    contextualDetectionText: 'Nyoria Micro-Detection: Dermal topography reveals smooth skin texture without deep icepick indentations.'
  },
  {
    id: 'metric17_microRoughness',
    metricNumber: 17,
    vectorGroup: 'Tissue Texture & Structural Integrity',
    name: '17. Epidermal Micro-Roughness (Flakiness)',
    score: 70,
    status: 'Balanced',
    description: 'Stratum corneum desquamation texture.',
    color: '#8B5CF6',
    activeZone: 'cheeks',
    metricUnit: 'Roughness Value',
    displayValue: '14.2 um',
    contextualDetectionText: 'Nyoria Micro-Detection: Surface micro-roughness displays mild desquamation variance.'
  },
  {
    id: 'metric18_periorbitalVolume',
    metricNumber: 18,
    vectorGroup: 'Tissue Texture & Structural Integrity',
    name: '18. Periorbital Volume Deficit (Dark Circles)',
    score: 66,
    status: 'Attention',
    description: 'Infraorbital hollows and under-eye shadow index.',
    color: '#EC4899',
    activeZone: 'underEye',
    metricUnit: 'Infraorbital Shadow',
    displayValue: 'Mild Under-Eye Hollows',
    contextualDetectionText: 'Nyoria Micro-Detection: Periorbital volume deficit and tear-trough vascular shadowing detected beneath lower eyelids.'
  },
  {
    id: 'metric19_fineLines',
    metricNumber: 19,
    vectorGroup: 'Tissue Texture & Structural Integrity',
    name: '19. Fine Lines Depth Score (Wrinkles)',
    score: 90,
    status: 'Optimal',
    description: 'Early expression wrinkling and crinkle dimensions.',
    color: '#10B981',
    activeZone: 'forehead',
    metricUnit: 'Wrinkle Depth',
    displayValue: '0.04 mm Depth',
    contextualDetectionText: 'Nyoria Micro-Detection: Superficial fine lines depth holds at 0.04 mm with strong elastic bounce-back.'
  },
  {
    id: 'metric20_dermalElasticity',
    metricNumber: 20,
    vectorGroup: 'Tissue Texture & Structural Integrity',
    name: '20. Dermal Elasticity Matrix (Skin Aging)',
    score: 92,
    status: 'Optimal',
    description: 'Structural collagen recoil and sagging assessment.',
    color: '#10B981',
    activeZone: 'cheeks',
    metricUnit: 'Cutometer Score',
    displayValue: '0.88 (High Recoil)',
    contextualDetectionText: 'Nyoria Micro-Detection: Collagen matrix recoil score registers 0.88 (High Firmness & Bounce).'
  }
];

export const INITIAL_ANALYSIS_MOCK: AnalysisResult = {
  id: 'nyoria-88492',
  overallScore: 84,
  timestamp: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  imageSrc: SAMPLE_PORTRAITS[0].url,
  facialSummary: 'Nyoria Engine 20-metric cellular scan detects Combination Skin with high localized T-zone sebum flow & active pimple clusters alongside surface hydration holding at 42%.',
  severityFlag: false,
  dermatologistAdvice: 'Lipid barrier equilibrium is resilient. Focus on T-zone sebum regulation and daily photoprotection using local Nepali pharmaceutical formulations.',
  metrics: TWENTY_EXACT_SKIN_METRICS,
  detectedSkinType: 'Combination & Pigmentation'
};

// ALL NEPALI PHARMACEUTICAL PRODUCTS TAGGED BY CATEGORY SECTION & SKIN TYPE
export const RECOMMENDED_PRODUCTS: Product[] = [
  // --- CLEANSERS ---
  {
    id: 'prod-cleanser-1',
    name: 'Cipla Saslic DS 2% Salicylic Foaming Wash',
    brand: 'Cipla Pharmaceuticals',
    category: 'Cleanser',
    categorySection: 'Cleansers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Salicylic Acid 2%', 'Foaming Base'],
    rating: 4.9,
    reviewCount: 420,
    priceNpr: 'Rs. 680',
    fragranceFree: true,
    sensitiveFriendly: false,
    description: 'Dermatologist-prescribed BHA cleanser in Nepal for follicular acne and sebum control.',
    targetMetrics: ['metric6_acnePimples', 'metric8_openComedones'],
    suitableSkinTypes: ['Oily & Acne-Prone', 'Combination & Pigmentation']
  },
  {
    id: 'prod-cleanser-2',
    name: 'Cetaphil Gentle Skin Cleanser',
    brand: 'Galderma Nepal',
    category: 'Cleanser',
    categorySection: 'Cleansers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Cetyl Alcohol', 'Stearyl Alcohol', 'Niacinamide'],
    rating: 4.9,
    reviewCount: 510,
    priceNpr: 'Rs. 890',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Soap-free ultra-mild soothing cleanser ideal for reactive erythema and barrier repair.',
    targetMetrics: ['metric11_erythema', 'metric3_tewl'],
    suitableSkinTypes: ['Sensitive & Erythema', 'Dry & Dehydrated']
  },

  // --- SERUMS & TREATMENTS ---
  {
    id: 'prod-serum-1',
    name: 'Clindamycin 1% & Nicotinamide 4% Gel',
    brand: 'Cipla / Dermawear Nepal',
    category: 'Treatment',
    categorySection: 'Serums',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Clindamycin Phosphate 1%', 'Nicotinamide 4%'],
    rating: 4.8,
    reviewCount: 380,
    priceNpr: 'Rs. 420',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Topical anti-acne gel formulation available at Nepalese pharmacies over-the-counter.',
    targetMetrics: ['metric6_acnePimples', 'metric7_cysticAcne'],
    suitableSkinTypes: ['Oily & Acne-Prone']
  },
  {
    id: 'prod-serum-2',
    name: 'Dermawear Niacinamide 5% + Zinc 1% Barrier Serum',
    brand: 'Dermawear Nepal',
    category: 'Serum',
    categorySection: 'Serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['5% Niacinamide', '1% Zinc PCA'],
    rating: 4.9,
    reviewCount: 340,
    priceNpr: 'Rs. 750',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Regulates T-zone lipid flux, clears PIH dark spots, and reduces follicular pore dilation.',
    targetMetrics: ['metric4_tZoneSebum', 'metric13_pihSpots'],
    suitableSkinTypes: ['Combination & Pigmentation', 'Oily & Acne-Prone']
  },
  {
    id: 'prod-serum-3',
    name: 'Aziderm 10% Azelaic Acid Erythema Gel',
    brand: 'Micro Labs Nepal',
    category: 'Treatment',
    categorySection: 'Serums',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['10% Azelaic Acid', 'Calming Base'],
    rating: 4.8,
    reviewCount: 290,
    priceNpr: 'Rs. 580',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Clinical azelaic acid gel targeting facial redness, telangiectasia, and post-acne dark marks.',
    targetMetrics: ['metric11_erythema', 'metric13_pihSpots'],
    suitableSkinTypes: ['Sensitive & Erythema', 'Combination & Pigmentation']
  },

  // --- MOISTURIZERS ---
  {
    id: 'prod-moisturizer-1',
    name: 'Sebamed Clear Face Care Gel (pH 5.5)',
    brand: 'Sebamed Clinical',
    category: 'Moisturizer',
    categorySection: 'Moisturizers',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Aloe Barbadensis', 'Hyaluronic Acid', 'Panthenol'],
    rating: 4.8,
    reviewCount: 290,
    priceNpr: 'Rs. 1,100',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'pH 5.5 balanced water-gel moisturizer for sensitive and acne-prone skin.',
    targetMetrics: ['metric1_stratumHydration', 'metric3_tewl'],
    suitableSkinTypes: ['Sensitive & Erythema', 'Oily & Acne-Prone']
  },
  {
    id: 'prod-moisturizer-2',
    name: 'Cetaphil Daily Hydrating Lotion with Hyaluronic Acid',
    brand: 'Galderma Nepal',
    category: 'Moisturizer',
    categorySection: 'Moisturizers',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Hyaluronic Acid', 'Glycerin', 'Ceramide Complex'],
    rating: 4.9,
    reviewCount: 410,
    priceNpr: 'Rs. 1,350',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Intense 24-hour hydration reservoir lotion replenishing stratum corneum water loss.',
    targetMetrics: ['metric1_stratumHydration', 'metric2_dermalWater'],
    suitableSkinTypes: ['Dry & Dehydrated', 'Combination & Pigmentation']
  },

  // --- SUNSCREENS ---
  {
    id: 'prod-sunscreen-1',
    name: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
    brand: 'Fixderma Nepal',
    category: 'Sunscreen',
    categorySection: 'Sunscreens',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    activeIngredients: ['Octinoxate', 'Titanium Dioxide', 'Vitamin E'],
    rating: 4.9,
    reviewCount: 680,
    priceNpr: 'Rs. 950',
    fragranceFree: true,
    sensitiveFriendly: true,
    description: 'Lightweight gel sunscreen widely prescribed across dermatological clinics in Nepal.',
    targetMetrics: ['metric14_uvDamage', 'metric12_melasmaMelanin'],
    suitableSkinTypes: ['Oily & Acne-Prone', 'Combination & Pigmentation', 'Dry & Dehydrated', 'Sensitive & Erythema']
  }
];

export const MOCK_DERMATOLOGISTS: Dermatologist[] = [
  {
    id: 'derm-1',
    name: 'DI Skin Hospital (DISHARK)',
    clinic: 'DISHARK Dermal Clinical Unit',
    specialty: 'Senior Cutaneous & Laser Surgery Center',
    address: 'Golfutar Main Road, Kathmandu, Nepal',
    zipCode: '44600',
    phone: '+977-1-4371900',
    rating: 5.0
  },
  {
    id: 'derm-2',
    name: 'Nepal Skin Hospital',
    clinic: 'Nepal Skin Hospital & Research Center',
    specialty: 'Acne Vulgaris & Barrier Rehabilitation Specialist',
    address: 'New Baneshwor, Kathmandu, Nepal',
    zipCode: '44600',
    phone: '+977-1-4780481',
    rating: 4.9
  },
  {
    id: 'derm-3',
    name: 'Kathmandu Medical College Dermal Unit',
    clinic: 'KMC Academic Department of Dermatology',
    specialty: 'Clinical Dermatology & Cutaneous Medicine',
    address: 'Sinamangal, Kathmandu, Nepal',
    zipCode: '44600',
    phone: '+977-1-4469064',
    rating: 4.9
  }
];

export const MOCK_JOURNEY_DATA = [
  { month: 'Month 1', score: 71, sebum: 84, hydration: 62, clarity: 68 },
  { month: 'Month 2', score: 76, sebum: 78, hydration: 70, clarity: 74 },
  { month: 'Month 3', score: 84, sebum: 72, hydration: 78, clarity: 86 }
];

// Helper to get tailored dynamic routine steps based on skin type
export function getDynamicRoutineSteps(skinType: SkinType): { morning: RoutineStep[]; evening: RoutineStep[] } {
  switch (skinType) {
    case 'Oily & Acne-Prone':
      return {
        morning: [
          {
            id: 'm-1',
            stepNumber: 1,
            title: 'Cipla Saslic DS 2% Salicylic Cleanser',
            category: 'Cleanse',
            productName: 'Cipla Saslic DS Foaming Wash',
            activeIngredient: '2% Salicylic Acid (BHA)',
            whySelected: 'Targeted T-Zone sebum control & pore unclogging for active pimples.',
            targetMetricId: 'metric4_tZoneSebum',
            timing: 'Morning',
            usageInstructions: 'Massage on damp face for 60s. Rinse with lukewarm water.'
          },
          {
            id: 'm-2',
            stepNumber: 2,
            title: 'Dermawear Niacinamide 5% Barrier Serum',
            category: 'Treat',
            productName: 'Dermawear Niacinamide 5% Serum',
            activeIngredient: '5% Niacinamide + 1% Zinc PCA',
            whySelected: 'Suppresses excessive oil secretion & minimizes pore volume.',
            targetMetricId: 'metric4_tZoneSebum',
            timing: 'Morning',
            usageInstructions: 'Apply 3-4 drops over face before moisturizing.'
          },
          {
            id: 'm-3',
            stepNumber: 3,
            title: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            category: 'Protect',
            productName: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            activeIngredient: 'Octinoxate + Titanium Dioxide',
            whySelected: 'Non-comedogenic broad-spectrum sun protection gel.',
            targetMetricId: 'metric14_uvDamage',
            timing: 'Morning',
            usageInstructions: 'Apply evenly 15 mins before stepping outside.'
          }
        ],
        evening: [
          {
            id: 'e-1',
            stepNumber: 1,
            title: 'Cipla Saslic DS 2% Salicylic Cleanser',
            category: 'Cleanse',
            productName: 'Cipla Saslic DS Foaming Wash',
            activeIngredient: '2% Salicylic Acid (BHA)',
            whySelected: 'Clears accumulated diurnal sebum & pollution micro-particles.',
            targetMetricId: 'metric8_openComedones',
            timing: 'Evening',
            usageInstructions: 'Cleanse thoroughly to prevent nocturnal whitehead formation.'
          },
          {
            id: 'e-2',
            stepNumber: 2,
            title: 'Clindamycin 1% & Nicotinamide 4% Gel',
            category: 'Treat',
            productName: 'Clindac-A Gel / Dermawear Gel',
            activeIngredient: 'Clindamycin 1% + Nicotinamide 4%',
            whySelected: 'Direct spot treatment for active red pimples & inflammatory lesions.',
            targetMetricId: 'metric6_acnePimples',
            timing: 'Evening',
            usageInstructions: 'Dab thin layer over active focal acne points.'
          },
          {
            id: 'e-3',
            stepNumber: 3,
            title: 'Sebamed Clear Face Care Gel (pH 5.5)',
            category: 'Moisturize',
            productName: 'Sebamed Clear Face Gel',
            activeIngredient: 'Aloe Vera + Hyaluronic Acid',
            whySelected: 'Oil-free nocturnal barrier hydration without clogging pores.',
            targetMetricId: 'metric1_stratumHydration',
            timing: 'Evening',
            usageInstructions: 'Smooth gently over face as nocturnal moisture seal.'
          }
        ]
      };

    case 'Sensitive & Erythema':
      return {
        morning: [
          {
            id: 'm-1',
            stepNumber: 1,
            title: 'Cetaphil Gentle Skin Cleanser',
            category: 'Cleanse',
            productName: 'Cetaphil Gentle Cleansing Lotion',
            activeIngredient: 'Cetyl Alcohol + Glycerin',
            whySelected: 'Ultra-gentle non-foaming wash preserving lipid layer.',
            targetMetricId: 'metric11_erythema',
            timing: 'Morning',
            usageInstructions: 'Rinse with cool water or wipe off gently with cotton pad.'
          },
          {
            id: 'm-2',
            stepNumber: 2,
            title: 'Aziderm 10% Azelaic Acid Erythema Gel',
            category: 'Treat',
            productName: 'Aziderm 10% Gel',
            activeIngredient: '10% Azelaic Acid',
            whySelected: 'Reduces micro-vascular redness & soothes reactive cheeks.',
            targetMetricId: 'metric11_erythema',
            timing: 'Morning',
            usageInstructions: 'Apply pea-sized amount to areas of facial redness.'
          },
          {
            id: 'm-3',
            stepNumber: 3,
            title: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            category: 'Protect',
            productName: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            activeIngredient: 'Titanium Dioxide + Vitamin E',
            whySelected: 'Soothes dermal vascularity under Nepal solar radiation.',
            targetMetricId: 'metric14_uvDamage',
            timing: 'Morning',
            usageInstructions: 'Apply generously to face and neck.'
          }
        ],
        evening: [
          {
            id: 'e-1',
            stepNumber: 1,
            title: 'Cetaphil Gentle Skin Cleanser',
            category: 'Cleanse',
            productName: 'Cetaphil Gentle Cleansing Lotion',
            activeIngredient: 'Soap-Free Gentle Lotion',
            whySelected: 'Calms nighttime flushing and clears environmental dust.',
            targetMetricId: 'metric11_erythema',
            timing: 'Evening',
            usageInstructions: 'Cleanse softly without scrubbing.'
          },
          {
            id: 'e-2',
            stepNumber: 2,
            title: 'Sebamed Clear Face Care Gel (pH 5.5)',
            category: 'Moisturize',
            productName: 'Sebamed Clear Face Gel',
            activeIngredient: 'Allantoin + Hyaluronic Acid',
            whySelected: 'pH 5.5 balanced calming moisture barrier seal.',
            targetMetricId: 'metric3_tewl',
            timing: 'Evening',
            usageInstructions: 'Apply evenly as bedtime moisture shield.'
          }
        ]
      };

    case 'Dry & Dehydrated':
      return {
        morning: [
          {
            id: 'm-1',
            stepNumber: 1,
            title: 'Cetaphil Gentle Skin Cleanser',
            category: 'Cleanse',
            productName: 'Cetaphil Gentle Wash',
            activeIngredient: 'Glycerin + Panthenol',
            whySelected: 'Hydrating wash that prevents stratum corneum moisture loss.',
            targetMetricId: 'metric1_stratumHydration',
            timing: 'Morning',
            usageInstructions: 'Wash with lukewarm water.'
          },
          {
            id: 'm-2',
            stepNumber: 2,
            title: 'Cetaphil Daily Hydrating Lotion',
            category: 'Moisturize',
            productName: 'Cetaphil Daily Hydrating Lotion',
            activeIngredient: 'Hyaluronic Acid + Ceramides',
            whySelected: 'Locks 78% dermal water reservoir to prevent flakiness.',
            targetMetricId: 'metric2_dermalWater',
            timing: 'Morning',
            usageInstructions: 'Massage thoroughly into dry areas.'
          },
          {
            id: 'm-3',
            stepNumber: 3,
            title: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            category: 'Protect',
            productName: 'Fixderma Shadow Sunscreen Gel',
            activeIngredient: 'Broad-Spectrum SPF 50+',
            whySelected: 'Moisturizing UV protection for dry high-altitude climates.',
            targetMetricId: 'metric14_uvDamage',
            timing: 'Morning',
            usageInstructions: 'Apply 15 mins prior to outdoor exposure.'
          }
        ],
        evening: [
          {
            id: 'e-1',
            stepNumber: 1,
            title: 'Cetaphil Gentle Skin Cleanser',
            category: 'Cleanse',
            productName: 'Cetaphil Gentle Wash',
            activeIngredient: 'Panthenol + Glycerin',
            whySelected: 'Gentle nocturnal cleanse retaining natural skin oils.',
            targetMetricId: 'metric1_stratumHydration',
            timing: 'Evening',
            usageInstructions: 'Massage over face gently.'
          },
          {
            id: 'e-2',
            stepNumber: 2,
            title: 'Cetaphil Daily Hydrating Lotion',
            category: 'Moisturize',
            productName: 'Cetaphil Intense Hydrating Cream',
            activeIngredient: 'Ceramide Complex + Hyaluronic Acid',
            whySelected: 'Overnight deep hydration replenishment matrix.',
            targetMetricId: 'metric2_dermalWater',
            timing: 'Evening',
            usageInstructions: 'Smooth thick layer over face overnight.'
          }
        ]
      };

    default: // Combination & Pigmentation
      return {
        morning: [
          {
            id: 'm-1',
            stepNumber: 1,
            title: 'Cipla Saslic DS 2% Salicylic Cleanser',
            category: 'Cleanse',
            productName: 'Cipla Saslic DS Wash',
            activeIngredient: '2% Salicylic Acid',
            whySelected: 'Balances T-zone oiliness while keeping cheeks hydrated.',
            targetMetricId: 'metric4_tZoneSebum',
            timing: 'Morning',
            usageInstructions: 'Focus wash on forehead and nasal bridge.'
          },
          {
            id: 'm-2',
            stepNumber: 2,
            title: 'Dermawear Niacinamide 5% Barrier Serum',
            category: 'Treat',
            productName: 'Dermawear Niacinamide 5% Serum',
            activeIngredient: '5% Niacinamide + Zinc',
            whySelected: 'Fades post-acne dark marks (PIH) & evens skin tone.',
            targetMetricId: 'metric13_pihSpots',
            timing: 'Morning',
            usageInstructions: 'Apply 4 drops to forehead and cheeks.'
          },
          {
            id: 'm-3',
            stepNumber: 3,
            title: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            category: 'Protect',
            productName: 'Fixderma Shadow SPF 50+ Sunscreen Gel',
            activeIngredient: 'Octinoxate + Titanium Dioxide',
            whySelected: 'Prevents UV-induced melasma & dark spot darkening.',
            targetMetricId: 'metric14_uvDamage',
            timing: 'Morning',
            usageInstructions: 'Apply daily before stepping into sunlight.'
          }
        ],
        evening: [
          {
            id: 'e-1',
            stepNumber: 1,
            title: 'Cetaphil Gentle Skin Cleanser',
            category: 'Cleanse',
            productName: 'Cetaphil Gentle Cleansing Lotion',
            activeIngredient: 'Glycerin + Niacinamide',
            whySelected: 'Soft evening wash preserving U-zone lipid equilibrium.',
            targetMetricId: 'metric5_uZoneSebum',
            timing: 'Evening',
            usageInstructions: 'Cleanse smoothly over face.'
          },
          {
            id: 'e-2',
            stepNumber: 2,
            title: 'Aziderm 10% Azelaic Acid Erythema Gel',
            category: 'Treat',
            productName: 'Aziderm 10% Gel',
            activeIngredient: '10% Azelaic Acid',
            whySelected: 'Targets stubborn hyperpigmentation & smooths micro-texture.',
            targetMetricId: 'metric13_pihSpots',
            timing: 'Evening',
            usageInstructions: 'Apply thin layer to dark spots at night.'
          },
          {
            id: 'e-3',
            stepNumber: 3,
            title: 'Sebamed Clear Face Care Gel (pH 5.5)',
            category: 'Moisturize',
            productName: 'Sebamed Clear Face Gel',
            activeIngredient: 'Aloe Barbadensis + Hyaluronic Acid',
            whySelected: 'Non-greasy moisture barrier seal for combination skin.',
            targetMetricId: 'metric1_stratumHydration',
            timing: 'Evening',
            usageInstructions: 'Pat gently across face at bedtime.'
          }
        ]
      };
  }
}
