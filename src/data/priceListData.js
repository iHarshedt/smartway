/**
 * Official Smart Way Solutions - Solar EPC Price Catalog
 * Effective Date: 01-10-2026
 * 
 * Includes:
 * 1. DCR MSP STRING WITH 580 WP (PM Surya Ghar Subsidy Eligible)
 * 2. MICRO MSP 560 WP MODULE (Enphase Micro Inverter, Subsidy Eligible)
 * 3. nDCR TOPCon MSP STRING WITH 600 WP (Non-DCR, No Subsidy)
 * 4. DCR MSP MYSINE HYBRID WITH 580 WP (Battery Storage, Subsidy Eligible)
 * 5. nDCR TOPCon MSP MYSINE HYBRID WITH 600 WP (Battery Storage, Non-DCR, No Subsidy)
 */

export const PRICE_LIST_DATE = '01-10-2026';

export const STRUCTURE_TYPES = [
  { id: 'shortrail', label: 'Sheetroof - Shortrail', short: 'Sheet Shortrail' },
  { id: 'rcc_ballast', label: 'RCC Ballast', short: 'RCC Ballast' },
  { id: 'l_angle_no_ballast', label: 'L- Angle Without Ballast', short: 'L-Angle No Ballast' },
  { id: 'above_rcc', label: 'Additional Work Above RCC', short: 'Above RCC Elevated' },
  { id: 'above_sheet', label: 'Additional Work Above Sheet Roof', short: 'Above Sheet Elevated' },
  { id: 'no_structure', label: 'Without Structure', short: 'Supply Only (No Struct)' },
];

export const SYSTEM_CATEGORIES = [
  {
    id: 'dcr_string_580',
    title: 'DCR String Inverter (580 Wp)',
    badge: 'PM Surya Ghar Subsidy',
    badgeColor: 'emerald',
    description: 'DCR Monocrystalline 580-595 Wp Modules with Tier-1 String Inverter',
    moduleType: 'DCR Monocrystalline Tier-1 (580Wp - 595Wp)',
    inverterType: 'GoodWe / Solis / Growatt / Sofar / Solax Approved Make',
    moduleWarranty: '10 Years Product & 30 Years Linear Power Output',
    inverterWarranty: '8 Years Comprehensive Manufacturer Warranty',
    bosWarranty: '5 Years Comprehensive BOS Warranty',
    omTerms: 'Twice a year free O&M visits for the first 5 years',
    batteryType: 'None (Grid-Tied On-Grid)',
    isSubsidyEligible: true,
    gstRate: 8.9,
    notes: [
      'Modules supplied in the range of 580Wp to 595Wp depending on availability.',
      'Inverters: GoodWe / Solis / Growatt / Sofar / Solax or any other approved make based on availability.',
      'For String Inverter systems, standard inverter warranty is 8 years.',
      'Period O&M visit: Twice a year for the first 5 years.',
      'Sheet roof structure considered is Short Rail.',
      'BOS 5 year warranty. Net meter and KSEB/CEIG charges extra.',
      'System price based on Standard BOM.',
      'Additional structure work under customer scope in L-Angle without ballast structure.',
      'Subsidy applicable only for Domestic Customers (LT 1A).'
    ]
  },
  {
    id: 'micro_enphase_560',
    title: 'Enphase Micro Inverter (560 Wp)',
    badge: 'Premium Micro & Subsidy',
    badgeColor: 'blue',
    description: 'Enphase Per-Panel Micro Inverters with 560 Wp Modules for Maximum Efficiency',
    moduleType: 'DCR Tier-1 Mono PERC (555Wp - 565Wp)',
    inverterType: 'Enphase Energy IQ Micro Inverters (Per-Module Optimization)',
    moduleWarranty: '10 Years Product & 25 Years Linear Power Output',
    inverterWarranty: '15 Years Standard Enphase Inverter Warranty',
    bosWarranty: '5 Years Comprehensive BOS Warranty',
    omTerms: 'Twice a year free O&M visits for the first 5 years',
    batteryType: 'None (Grid-Tied Micro Inverter)',
    isSubsidyEligible: true,
    gstRate: 8.9,
    notes: [
      '2 Nos. of CTs are provided as standard in all varieties. Additional CTs extra.',
      'For solar modules: 10 years Product Warranty and 25 years linear Power output warranty.',
      'For Enphase Micro Inverter systems, Std Inverter Warranty is for 15 years.',
      'Modules supplied in the range of 555Wp to 565Wp depending on availability.',
      'Chemical Anchoring if required is at additional cost.',
      'Period O&M visit: Twice a year for the first 5 years.',
      'BOS 5 year warranty. Net meter and KSEB/CEIG charges extra.',
      'System price based on Standard BOM.',
      'Subsidy applicable for Domestic Customers (LT 1A).'
    ]
  },
  {
    id: 'ndcr_topcon_string_600',
    title: 'nDCR TOPCon String (600 Wp)',
    badge: 'Ultra High Output - Non-DCR',
    badgeColor: 'amber',
    description: 'Next-Gen G12R TOPCon 600 Wp High Efficiency Modules for Maximum Generation',
    moduleType: 'nDCR G12R TOPCon (590Wp - 610Wp) Ultra High Efficiency',
    inverterType: 'GoodWe / Solis / Growatt / Sofar / Solax Approved Make',
    moduleWarranty: '10 Years Product & 30 Years Linear Power Output',
    inverterWarranty: '8 Years Comprehensive Manufacturer Warranty',
    bosWarranty: '5 Years Comprehensive BOS Warranty',
    omTerms: 'Twice a year free O&M visits for the first 5 years',
    batteryType: 'None (Grid-Tied On-Grid)',
    isSubsidyEligible: false,
    gstRate: 8.9,
    notes: [
      'Modules with nDCR G12R TOPCon supplied in the range of 590Wp to 610Wp.',
      'This price is based on non-DCR modules and is NOT eligible for the subsidy.',
      'Inverters: GoodWe / Solis / Growatt / Sofar / Solax or any other approved make.',
      'For String Inverter systems, standard inverter warranty is 8 years.',
      'Period O&M visit: Twice a year for the first 5 years.',
      'BOS 5 year warranty. Net meter and KSEB/CEIG charges extra.',
      'Sheet roof structure considered is Short Rail.'
    ]
  },
  {
    id: 'dcr_mysine_hybrid_580',
    title: 'DCR MySine Hybrid (580 Wp + Battery)',
    badge: 'Hybrid Backup & Subsidy',
    badgeColor: 'purple',
    description: 'DCR Solar Modules + Intelligent Hybrid Inverter + Lithium Battery Storage',
    moduleType: 'DCR Monocrystalline Tier-1 (580Wp - 595Wp)',
    inverterType: 'Feston / Solax / Approved Make Hybrid Bi-Directional Inverter',
    batteryType: 'Deye / Taco / Approved Make LFP Lithium Battery',
    moduleWarranty: '10 Years Product & 30 Years Linear Power Output',
    inverterWarranty: '8 Years Comprehensive Inverter Warranty',
    batteryWarranty: '8 Years Battery Storage Warranty',
    bosWarranty: '5 Years Comprehensive BOS Warranty',
    omTerms: 'Twice a year free O&M visits for the first 5 years',
    isSubsidyEligible: true,
    gstRate: 8.9,
    notes: [
      'Solar Modules supplied in the range of 580Wp to 595Wp.',
      'Inverters: Feston / Solax / approved make based on availability.',
      'Battery: Deye, Taco, or approved make LFP battery storage.',
      'For Hybrid Inverter & Battery Warranty is 8 years.',
      'Period O&M visit: Twice a year for the first 5 years.',
      'BOS 5 year warranty. Net meter and KSEB/CEIG charges extra.',
      'Subsidy applicable for Domestic Customers (LT 1A).'
    ]
  },
  {
    id: 'ndcr_mysine_hybrid_600',
    title: 'nDCR TOPCon MySine Hybrid (600 Wp + Battery)',
    badge: 'Heavy Duty Hybrid - Non-DCR',
    badgeColor: 'rose',
    description: 'High Capacity TOPCon 600 Wp + Industrial Grade Battery Storage (Up to 40 kWh)',
    moduleType: 'nDCR G12R TOPCon (590Wp - 610Wp) Ultra High Efficiency',
    inverterType: 'Feston / Solax / Approved Make Hybrid Bi-Directional Inverter',
    batteryType: 'Deye / Taco / Approved Make LFP Lithium Battery',
    moduleWarranty: '10 Years Product & 30 Years Linear Power Output',
    inverterWarranty: '8 Years Comprehensive Inverter Warranty',
    batteryWarranty: '8 Years Battery Storage Warranty',
    bosWarranty: '5 Years Comprehensive BOS Warranty',
    omTerms: 'Twice a year free O&M visits for the first 5 years',
    isSubsidyEligible: false,
    gstRate: 8.9,
    notes: [
      'Modules with nDCR G12R TOPCon supplied in range 590Wp to 610Wp.',
      'This price is based on non-DCR modules and is NOT eligible for the subsidy.',
      'Inverters: Feston / Solax / approved make based on availability.',
      'Battery: Deye, Taco, or approved make LFP battery storage.',
      'For Hybrid Inverter & Battery Warranty is 8 years.',
      'Period O&M visit: Twice a year for the first 5 years.',
      'BOS 5 year warranty. Net meter and KSEB/CEIG charges extra.'
    ]
  }
];

// Complete Price List Data indexed by Category
export const SOLAR_PRICE_CATALOG = {
  // ==========================================
  // 1. DCR MSP STRING WITH 580 WP
  // ==========================================
  dcr_string_580: [
    {
      dcCapacityKW: 2.32,
      modulesCount: 4,
      inverterKW: 2,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 60000,
      prices: {
        no_structure: { maxPrice: 185200, specialOffer: 10000, sellingPrice: 175200 },
        above_rcc: { maxPrice: 202600, specialOffer: 10000, sellingPrice: 192600 },
        above_sheet: { maxPrice: 212400, specialOffer: 10000, sellingPrice: 202400 },
        rcc_ballast: { maxPrice: 193900, specialOffer: 10000, sellingPrice: 183900 },
        shortrail: { maxPrice: 188500, specialOffer: 10000, sellingPrice: 178500 },
        l_angle_no_ballast: { maxPrice: 191200, specialOffer: 10000, sellingPrice: 181200 }
      }
    },
    {
      dcCapacityKW: 2.90,
      modulesCount: 5,
      inverterKW: 3,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 76200,
      prices: {
        no_structure: { maxPrice: 210500, specialOffer: 10000, sellingPrice: 200500 },
        above_rcc: { maxPrice: 230600, specialOffer: 10000, sellingPrice: 220600 },
        above_sheet: { maxPrice: 241500, specialOffer: 10000, sellingPrice: 231500 },
        rcc_ballast: { maxPrice: 222000, specialOffer: 10000, sellingPrice: 212000 },
        shortrail: { maxPrice: 214800, specialOffer: 10000, sellingPrice: 204800 },
        l_angle_no_ballast: { maxPrice: 218700, specialOffer: 10000, sellingPrice: 208700 }
      }
    },
    {
      dcCapacityKW: 3.48,
      modulesCount: 6,
      inverterKW: 3,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 234200, specialOffer: 15000, sellingPrice: 219200 },
        above_rcc: { maxPrice: 253800, specialOffer: 15000, sellingPrice: 238800 },
        above_sheet: { maxPrice: 264700, specialOffer: 15000, sellingPrice: 249700 },
        rcc_ballast: { maxPrice: 247400, specialOffer: 15000, sellingPrice: 232400 },
        shortrail: { maxPrice: 238200, specialOffer: 15000, sellingPrice: 223200 },
        l_angle_no_ballast: { maxPrice: 243500, specialOffer: 15000, sellingPrice: 228500 }
      }
    },
    {
      dcCapacityKW: 3.48,
      modulesCount: 6,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 250200, specialOffer: 15000, sellingPrice: 235200 },
        above_rcc: { maxPrice: 269800, specialOffer: 15000, sellingPrice: 254800 },
        above_sheet: { maxPrice: 280700, specialOffer: 15000, sellingPrice: 265700 },
        rcc_ballast: { maxPrice: 263600, specialOffer: 15000, sellingPrice: 248600 },
        shortrail: { maxPrice: 254500, specialOffer: 15000, sellingPrice: 239500 },
        l_angle_no_ballast: { maxPrice: 259700, specialOffer: 15000, sellingPrice: 244700 }
      }
    },
    {
      dcCapacityKW: 3.48,
      modulesCount: 6,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 276800, specialOffer: 15000, sellingPrice: 261800 },
        above_rcc: { maxPrice: 296400, specialOffer: 15000, sellingPrice: 281400 },
        above_sheet: { maxPrice: 307300, specialOffer: 15000, sellingPrice: 292300 },
        rcc_ballast: { maxPrice: 290200, specialOffer: 15000, sellingPrice: 275200 },
        shortrail: { maxPrice: 283000, specialOffer: 15000, sellingPrice: 268000 },
        l_angle_no_ballast: { maxPrice: 286200, specialOffer: 15000, sellingPrice: 271200 }
      }
    },
    {
      dcCapacityKW: 4.06,
      modulesCount: 7,
      inverterKW: 4,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 269300, specialOffer: 18000, sellingPrice: 251300 },
        above_rcc: { maxPrice: 299800, specialOffer: 18000, sellingPrice: 281800 },
        above_sheet: { maxPrice: 308500, specialOffer: 18000, sellingPrice: 290500 },
        rcc_ballast: { maxPrice: 284800, specialOffer: 18000, sellingPrice: 266800 },
        shortrail: { maxPrice: 274500, specialOffer: 18000, sellingPrice: 256500 },
        l_angle_no_ballast: { maxPrice: 280200, specialOffer: 18000, sellingPrice: 262200 }
      }
    },
    {
      dcCapacityKW: 4.64,
      modulesCount: 8,
      inverterKW: 4,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 289700, specialOffer: 18000, sellingPrice: 271700 },
        above_rcc: { maxPrice: 320200, specialOffer: 18000, sellingPrice: 302200 },
        above_sheet: { maxPrice: 328900, specialOffer: 18000, sellingPrice: 310900 },
        rcc_ballast: { maxPrice: 307200, specialOffer: 18000, sellingPrice: 289200 },
        shortrail: { maxPrice: 324200, specialOffer: 18000, sellingPrice: 306200 },
        l_angle_no_ballast: { maxPrice: 302000, specialOffer: 18000, sellingPrice: 284000 }
      }
    },
    {
      dcCapacityKW: 5.22,
      modulesCount: 9,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 334200, specialOffer: 30000, sellingPrice: 304200 },
        above_rcc: { maxPrice: 364700, specialOffer: 30000, sellingPrice: 334700 },
        above_sheet: { maxPrice: 373400, specialOffer: 30000, sellingPrice: 343400 },
        rcc_ballast: { maxPrice: 354100, specialOffer: 30000, sellingPrice: 324100 },
        shortrail: { maxPrice: 340100, specialOffer: 30000, sellingPrice: 310100 },
        l_angle_no_ballast: { maxPrice: 348200, specialOffer: 30000, sellingPrice: 318200 }
      }
    },
    {
      dcCapacityKW: 5.22,
      modulesCount: 9,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 360600, specialOffer: 30000, sellingPrice: 330600 },
        above_rcc: { maxPrice: 391100, specialOffer: 30000, sellingPrice: 361100 },
        above_sheet: { maxPrice: 399800, specialOffer: 30000, sellingPrice: 369800 },
        rcc_ballast: { maxPrice: 380400, specialOffer: 30000, sellingPrice: 350400 },
        shortrail: { maxPrice: 366400, specialOffer: 30000, sellingPrice: 336400 },
        l_angle_no_ballast: { maxPrice: 374500, specialOffer: 30000, sellingPrice: 344500 }
      }
    },
    {
      dcCapacityKW: 6.38,
      modulesCount: 11,
      inverterKW: 6,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 412700, specialOffer: 30000, sellingPrice: 382700 },
        above_rcc: { maxPrice: 443200, specialOffer: 30000, sellingPrice: 413200 },
        above_sheet: { maxPrice: 454000, specialOffer: 30000, sellingPrice: 424000 },
        rcc_ballast: { maxPrice: 436800, specialOffer: 30000, sellingPrice: 406800 },
        shortrail: { maxPrice: 419300, specialOffer: 30000, sellingPrice: 389300 },
        l_angle_no_ballast: { maxPrice: 429600, specialOffer: 30000, sellingPrice: 399600 }
      }
    },
    {
      dcCapacityKW: 8.12,
      modulesCount: 14,
      inverterKW: 8,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 505600, specialOffer: 35000, sellingPrice: 470600 },
        above_rcc: { maxPrice: 544800, specialOffer: 35000, sellingPrice: 509800 },
        above_sheet: { maxPrice: 557800, specialOffer: 35000, sellingPrice: 522800 },
        rcc_ballast: { maxPrice: 536200, specialOffer: 35000, sellingPrice: 501200 },
        shortrail: { maxPrice: 516900, specialOffer: 35000, sellingPrice: 481900 },
        l_angle_no_ballast: { maxPrice: 527000, specialOffer: 35000, sellingPrice: 492000 }
      }
    },
    {
      dcCapacityKW: 9.86,
      modulesCount: 17,
      inverterKW: 10,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 588300, specialOffer: 40000, sellingPrice: 548300 },
        above_rcc: { maxPrice: 631900, specialOffer: 40000, sellingPrice: 591900 },
        above_sheet: { maxPrice: 648200, specialOffer: 40000, sellingPrice: 608200 },
        rcc_ballast: { maxPrice: 625400, specialOffer: 40000, sellingPrice: 585400 },
        shortrail: { maxPrice: 597200, specialOffer: 40000, sellingPrice: 557200 },
        l_angle_no_ballast: { maxPrice: 614300, specialOffer: 40000, sellingPrice: 574300 }
      }
    }
  ],

  // ==========================================
  // 2. MICRO MSP 560 WP MODULE
  // ==========================================
  micro_enphase_560: [
    {
      dcCapacityKW: 2.24,
      modulesCount: 4,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '1 Phase',
      subsidy: 57600,
      prices: {
        no_structure: { maxPrice: 258000, specialOffer: 8000, sellingPrice: 250000 },
        shortrail: { maxPrice: 261000, specialOffer: 8000, sellingPrice: 253000 },
        rcc_ballast: { maxPrice: 267000, specialOffer: 8000, sellingPrice: 259000 },
        l_angle_no_ballast: { maxPrice: 264000, specialOffer: 8000, sellingPrice: 256000 },
        above_sheet: { maxPrice: 285500, specialOffer: 8000, sellingPrice: 277500 },
        above_rcc: { maxPrice: 275500, specialOffer: 8000, sellingPrice: 267500 }
      }
    },
    {
      dcCapacityKW: 3.36,
      modulesCount: 6,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '1 Phase',
      subsidy: 75840,
      prices: {
        no_structure: { maxPrice: 330000, specialOffer: 10000, sellingPrice: 320000 },
        shortrail: { maxPrice: 334000, specialOffer: 10000, sellingPrice: 324000 },
        rcc_ballast: { maxPrice: 342000, specialOffer: 10000, sellingPrice: 332000 },
        l_angle_no_ballast: { maxPrice: 338500, specialOffer: 10000, sellingPrice: 328500 },
        above_sheet: { maxPrice: 359500, specialOffer: 10000, sellingPrice: 349500 },
        above_rcc: { maxPrice: 349000, specialOffer: 10000, sellingPrice: 339000 }
      }
    },
    {
      dcCapacityKW: 5.04,
      modulesCount: 9,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 491000, specialOffer: 15000, sellingPrice: 476000 },
        shortrail: { maxPrice: 496000, specialOffer: 15000, sellingPrice: 481000 },
        rcc_ballast: { maxPrice: 509000, specialOffer: 15000, sellingPrice: 494000 },
        l_angle_no_ballast: { maxPrice: 505000, specialOffer: 15000, sellingPrice: 490000 },
        above_sheet: { maxPrice: 530000, specialOffer: 15000, sellingPrice: 515000 },
        above_rcc: { maxPrice: 521500, specialOffer: 15000, sellingPrice: 506500 }
      }
    },
    {
      dcCapacityKW: 5.04,
      modulesCount: 9,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 502000, specialOffer: 15000, sellingPrice: 487000 },
        shortrail: { maxPrice: 507000, specialOffer: 15000, sellingPrice: 492000 },
        rcc_ballast: { maxPrice: 520500, specialOffer: 15000, sellingPrice: 505500 },
        l_angle_no_ballast: { maxPrice: 515000, specialOffer: 15000, sellingPrice: 500000 },
        above_sheet: { maxPrice: 541000, specialOffer: 15000, sellingPrice: 526000 },
        above_rcc: { maxPrice: 532000, specialOffer: 15000, sellingPrice: 517000 }
      }
    },
    {
      dcCapacityKW: 7.84,
      modulesCount: 14,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 703000, specialOffer: 20000, sellingPrice: 683000 },
        shortrail: { maxPrice: 711000, specialOffer: 20000, sellingPrice: 691000 },
        rcc_ballast: { maxPrice: 730500, specialOffer: 20000, sellingPrice: 710500 },
        l_angle_no_ballast: { maxPrice: 724500, specialOffer: 20000, sellingPrice: 704500 },
        above_sheet: { maxPrice: 745000, specialOffer: 20000, sellingPrice: 725000 },
        above_rcc: { maxPrice: 742500, specialOffer: 20000, sellingPrice: 722500 }
      }
    },
    {
      dcCapacityKW: 10.08,
      modulesCount: 18,
      inverterKW: 'Enphase',
      inverterMake: 'Enphase Micro Inverters',
      phase: '3 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 843000, specialOffer: 20000, sellingPrice: 823000 },
        shortrail: { maxPrice: 852000, specialOffer: 20000, sellingPrice: 832000 },
        rcc_ballast: { maxPrice: 876000, specialOffer: 20000, sellingPrice: 856000 },
        l_angle_no_ballast: { maxPrice: 870000, specialOffer: 20000, sellingPrice: 850000 },
        above_sheet: { maxPrice: 895000, specialOffer: 20000, sellingPrice: 875000 },
        above_rcc: { maxPrice: 886000, specialOffer: 20000, sellingPrice: 866000 }
      }
    }
  ],

  // ==========================================
  // 3. nDCR TOPCon MSP STRING WITH 600 WP
  // ==========================================
  ndcr_topcon_string_600: [
    {
      dcCapacityKW: 5.40,
      modulesCount: 9,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '1 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 272900, specialOffer: 15000, sellingPrice: 257900 },
        rcc_ballast: { maxPrice: 292400, specialOffer: 15000, sellingPrice: 277400 },
        shortrail: { maxPrice: 279000, specialOffer: 15000, sellingPrice: 264000 },
        l_angle_no_ballast: { maxPrice: 286500, specialOffer: 15000, sellingPrice: 271500 },
        above_rcc: { maxPrice: 303400, specialOffer: 15000, sellingPrice: 288400 },
        above_sheet: { maxPrice: 314300, specialOffer: 15000, sellingPrice: 299300 }
      }
    },
    {
      dcCapacityKW: 5.40,
      modulesCount: 9,
      inverterKW: 5,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 305200, specialOffer: 15000, sellingPrice: 290200 },
        rcc_ballast: { maxPrice: 324500, specialOffer: 15000, sellingPrice: 309500 },
        shortrail: { maxPrice: 311100, specialOffer: 15000, sellingPrice: 296100 },
        l_angle_no_ballast: { maxPrice: 318600, specialOffer: 15000, sellingPrice: 303600 },
        above_rcc: { maxPrice: 335600, specialOffer: 15000, sellingPrice: 320600 },
        above_sheet: { maxPrice: 346500, specialOffer: 15000, sellingPrice: 331500 }
      }
    },
    {
      dcCapacityKW: 6.00,
      modulesCount: 10,
      inverterKW: 6,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 330900, specialOffer: 15000, sellingPrice: 315900 },
        rcc_ballast: { maxPrice: 352600, specialOffer: 15000, sellingPrice: 337600 },
        shortrail: { maxPrice: 337000, specialOffer: 15000, sellingPrice: 322000 },
        l_angle_no_ballast: { maxPrice: 346000, specialOffer: 15000, sellingPrice: 331000 },
        above_rcc: { maxPrice: 361400, specialOffer: 15000, sellingPrice: 346400 },
        above_sheet: { maxPrice: 372300, specialOffer: 15000, sellingPrice: 357300 }
      }
    },
    {
      dcCapacityKW: 8.40,
      modulesCount: 14,
      inverterKW: 8,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 431200, specialOffer: 30000, sellingPrice: 401200 },
        rcc_ballast: { maxPrice: 460600, specialOffer: 30000, sellingPrice: 430600 },
        shortrail: { maxPrice: 438800, specialOffer: 30000, sellingPrice: 408800 },
        l_angle_no_ballast: { maxPrice: 451500, specialOffer: 30000, sellingPrice: 421500 },
        above_rcc: { maxPrice: 470400, specialOffer: 30000, sellingPrice: 440400 },
        above_sheet: { maxPrice: 483500, specialOffer: 30000, sellingPrice: 453500 }
      }
    },
    {
      dcCapacityKW: 10.20,
      modulesCount: 17,
      inverterKW: 10,
      inverterMake: 'String Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 500900, specialOffer: 35000, sellingPrice: 465900 },
        rcc_ballast: { maxPrice: 536500, specialOffer: 35000, sellingPrice: 501500 },
        shortrail: { maxPrice: 509700, specialOffer: 35000, sellingPrice: 474700 },
        l_angle_no_ballast: { maxPrice: 525400, specialOffer: 35000, sellingPrice: 490400 },
        above_rcc: { maxPrice: 544500, specialOffer: 35000, sellingPrice: 509500 },
        above_sheet: { maxPrice: 560800, specialOffer: 35000, sellingPrice: 525800 }
      }
    }
  ],

  // ==========================================
  // 4. DCR MSP MYSINE HYBRID WITH 580 WP
  // ==========================================
  dcr_mysine_hybrid_580: [
    {
      systemName: '2.32 kWp Hybrid with 5 kW Inverter & 5 kWh Battery',
      dcCapacityKW: 2.32,
      modulesCount: 4,
      inverterKW: 5,
      batteryKWh: 5,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 65760,
      prices: {
        no_structure: { maxPrice: 447200, specialOffer: 30000, sellingPrice: 417200 },
        rcc_ballast: { maxPrice: 457800, specialOffer: 30000, sellingPrice: 427800 },
        shortrail: { maxPrice: 449800, specialOffer: 30000, sellingPrice: 419800 },
        l_angle_no_ballast: { maxPrice: 452800, specialOffer: 30000, sellingPrice: 422800 }
      }
    },
    {
      systemName: '3.48 kWp Hybrid with 5 kW Inverter & 5 kWh Battery',
      dcCapacityKW: 3.48,
      modulesCount: 6,
      inverterKW: 5,
      batteryKWh: 5,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 489200, specialOffer: 30000, sellingPrice: 459200 },
        rcc_ballast: { maxPrice: 505000, specialOffer: 30000, sellingPrice: 475000 },
        shortrail: { maxPrice: 492500, specialOffer: 30000, sellingPrice: 462500 },
        l_angle_no_ballast: { maxPrice: 497500, specialOffer: 30000, sellingPrice: 467500 }
      }
    },
    {
      systemName: '5.27 kWp Hybrid with 5 kW Inverter & 5 kWh Battery',
      dcCapacityKW: 5.22,
      modulesCount: 9,
      inverterKW: 5,
      batteryKWh: 5,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 554800, specialOffer: 30000, sellingPrice: 524800 },
        rcc_ballast: { maxPrice: 579800, specialOffer: 30000, sellingPrice: 549800 },
        shortrail: { maxPrice: 559800, specialOffer: 30000, sellingPrice: 529800 },
        l_angle_no_ballast: { maxPrice: 567800, specialOffer: 30000, sellingPrice: 537800 }
      }
    },
    {
      systemName: '5.27 kWp Hybrid with 5 kW Inverter & 10 kWh Battery',
      dcCapacityKW: 5.22,
      modulesCount: 9,
      inverterKW: 5,
      batteryKWh: 10,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 78000,
      prices: {
        no_structure: { maxPrice: 733000, specialOffer: 30000, sellingPrice: 703000 },
        rcc_ballast: { maxPrice: 758000, specialOffer: 30000, sellingPrice: 728000 },
        shortrail: { maxPrice: 738000, specialOffer: 30000, sellingPrice: 708000 },
        l_angle_no_ballast: { maxPrice: 746000, specialOffer: 30000, sellingPrice: 716000 }
      }
    }
  ],

  // ==========================================
  // 5. nDCR TOPCon MSP MYSINE HYBRID WITH 600 WP
  // ==========================================
  ndcr_mysine_hybrid_600: [
    {
      systemName: '5.40 kWp Hybrid (5 kW Inverter & 5 kWh Battery)',
      dcCapacityKW: 5.40,
      modulesCount: 9,
      inverterKW: 5,
      batteryKWh: 5,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 504300, specialOffer: 30000, sellingPrice: 474300 },
        rcc_ballast: { maxPrice: 528300, specialOffer: 30000, sellingPrice: 498300 },
        shortrail: { maxPrice: 508800, specialOffer: 30000, sellingPrice: 478800 },
        l_angle_no_ballast: { maxPrice: 516300, specialOffer: 30000, sellingPrice: 486300 }
      }
    },
    {
      systemName: '5.40 kWp Hybrid (5 kW Inverter & 10 kWh Battery)',
      dcCapacityKW: 5.40,
      modulesCount: 9,
      inverterKW: 5,
      batteryKWh: 10,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '1 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 681500, specialOffer: 30000, sellingPrice: 651500 },
        rcc_ballast: { maxPrice: 705500, specialOffer: 30000, sellingPrice: 675500 },
        shortrail: { maxPrice: 686000, specialOffer: 30000, sellingPrice: 656000 },
        l_angle_no_ballast: { maxPrice: 694000, specialOffer: 30000, sellingPrice: 664000 }
      }
    },
    {
      systemName: '7.20 kWp Hybrid (10 kW Inverter & 10 kWh Battery)',
      dcCapacityKW: 7.20,
      modulesCount: 12,
      inverterKW: 10,
      batteryKWh: 10,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 877300, specialOffer: 40000, sellingPrice: 837300 },
        rcc_ballast: { maxPrice: 910300, specialOffer: 40000, sellingPrice: 870300 },
        shortrail: { maxPrice: 882800, specialOffer: 40000, sellingPrice: 842800 },
        l_angle_no_ballast: { maxPrice: 894300, specialOffer: 40000, sellingPrice: 854300 }
      }
    },
    {
      systemName: '10.20 kWp Hybrid (10 kW Inverter & 10 kWh Battery)',
      dcCapacityKW: 10.20,
      modulesCount: 17,
      inverterKW: 10,
      batteryKWh: 10,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1024600, specialOffer: 50000, sellingPrice: 974600 },
        rcc_ballast: { maxPrice: 1071100, specialOffer: 50000, sellingPrice: 1021100 },
        shortrail: { maxPrice: 1036100, specialOffer: 50000, sellingPrice: 986100 },
        l_angle_no_ballast: { maxPrice: 1048600, specialOffer: 50000, sellingPrice: 998600 }
      }
    },
    {
      systemName: '10.20 kWp Hybrid (10 kW Inverter & 15 kWh Battery)',
      dcCapacityKW: 10.20,
      modulesCount: 17,
      inverterKW: 10,
      batteryKWh: 15,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1141300, specialOffer: 50000, sellingPrice: 1091300 },
        rcc_ballast: { maxPrice: 1187800, specialOffer: 50000, sellingPrice: 1137800 },
        shortrail: { maxPrice: 1152800, specialOffer: 50000, sellingPrice: 1102800 },
        l_angle_no_ballast: { maxPrice: 1165300, specialOffer: 50000, sellingPrice: 1115300 }
      }
    },
    {
      systemName: '10.20 kWp Hybrid (10 kW Inverter & 20 kWh Battery)',
      dcCapacityKW: 10.20,
      modulesCount: 17,
      inverterKW: 10,
      batteryKWh: 20,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1252700, specialOffer: 50000, sellingPrice: 1202700 },
        rcc_ballast: { maxPrice: 1298700, specialOffer: 50000, sellingPrice: 1248700 },
        shortrail: { maxPrice: 1264200, specialOffer: 50000, sellingPrice: 1214200 },
        l_angle_no_ballast: { maxPrice: 1276700, specialOffer: 50000, sellingPrice: 1226700 }
      }
    },
    {
      systemName: '12.00 kWp Hybrid (10 kW Inverter & 20 kWh Battery)',
      dcCapacityKW: 12.00,
      modulesCount: 20,
      inverterKW: 10,
      batteryKWh: 20,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1334400, specialOffer: 70000, sellingPrice: 1264400 },
        rcc_ballast: { maxPrice: 1388400, specialOffer: 70000, sellingPrice: 1318400 },
        shortrail: { maxPrice: 1346400, specialOffer: 70000, sellingPrice: 1276400 },
        l_angle_no_ballast: { maxPrice: 1362400, specialOffer: 70000, sellingPrice: 1292400 }
      }
    },
    {
      systemName: '14.40 kWp Hybrid (15 kW Inverter & 30 kWh Battery)',
      dcCapacityKW: 14.40,
      modulesCount: 24,
      inverterKW: 15,
      batteryKWh: 30,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1782000, specialOffer: 90000, sellingPrice: 1692000 },
        rcc_ballast: { maxPrice: 1847500, specialOffer: 90000, sellingPrice: 1757500 },
        shortrail: { maxPrice: 1796500, specialOffer: 90000, sellingPrice: 1706500 },
        l_angle_no_ballast: { maxPrice: 1816000, specialOffer: 90000, sellingPrice: 1726000 }
      }
    },
    {
      systemName: '14.40 kWp Hybrid (15 kW Inverter & 40 kWh Battery)',
      dcCapacityKW: 14.40,
      modulesCount: 24,
      inverterKW: 15,
      batteryKWh: 40,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 2017400, specialOffer: 90000, sellingPrice: 1927400 },
        rcc_ballast: { maxPrice: 2082400, specialOffer: 90000, sellingPrice: 1992400 },
        shortrail: { maxPrice: 2031400, specialOffer: 90000, sellingPrice: 1941400 },
        l_angle_no_ballast: { maxPrice: 2050900, specialOffer: 90000, sellingPrice: 1960900 }
      }
    },
    {
      systemName: '20.40 kWp Hybrid (20 kW Inverter & 20 kWh Battery)',
      dcCapacityKW: 20.40,
      modulesCount: 34,
      inverterKW: 20,
      batteryKWh: 20,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 1832100, specialOffer: 120000, sellingPrice: 1712100 },
        rcc_ballast: { maxPrice: 1924100, specialOffer: 120000, sellingPrice: 1804100 },
        shortrail: { maxPrice: 1852100, specialOffer: 120000, sellingPrice: 1732100 },
        l_angle_no_ballast: { maxPrice: 1879600, specialOffer: 120000, sellingPrice: 1759600 }
      }
    },
    {
      systemName: '20.40 kWp Hybrid (20 kW Inverter & 30 kWh Battery)',
      dcCapacityKW: 20.40,
      modulesCount: 34,
      inverterKW: 20,
      batteryKWh: 30,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 2060600, specialOffer: 120000, sellingPrice: 1940600 },
        rcc_ballast: { maxPrice: 2152100, specialOffer: 120000, sellingPrice: 2032100 },
        shortrail: { maxPrice: 2080600, specialOffer: 120000, sellingPrice: 1960600 },
        l_angle_no_ballast: { maxPrice: 2108100, specialOffer: 120000, sellingPrice: 1988100 }
      }
    },
    {
      systemName: '20.40 kWp Hybrid (20 kW Inverter & 40 kWh Battery)',
      dcCapacityKW: 20.40,
      modulesCount: 34,
      inverterKW: 20,
      batteryKWh: 40,
      inverterMake: 'MySine Hybrid Inverter',
      phase: '3 Phase',
      subsidy: 0,
      prices: {
        no_structure: { maxPrice: 2297800, specialOffer: 120000, sellingPrice: 2177800 },
        rcc_ballast: { maxPrice: 2389800, specialOffer: 120000, sellingPrice: 2269800 },
        shortrail: { maxPrice: 2317800, specialOffer: 120000, sellingPrice: 2197800 },
        l_angle_no_ballast: { maxPrice: 2345300, specialOffer: 120000, sellingPrice: 2225300 }
      }
    }
  ]
};

// Optional standard add-ons with default prices
export const STANDARD_ADDONS = [
  { id: 'net_meter', label: 'Net Meter & KSEB Testing Charges', amount: 3500, defaultSelected: true, note: 'Official KSEB Bi-directional meter fee' },
  { id: 'ceig_fee', label: 'CEIG Electrical Inspectorate Approvals', amount: 2000, defaultSelected: false, note: 'Mandatory for installations > 10 kW' },
  { id: 'chemical_anchoring', label: 'High-Strength Chemical Anchoring (RCC)', amount: 4500, defaultSelected: false, note: 'Special epoxy anchor for coastal/high-wind roofs' },
  { id: 'elevated_fab', label: 'Custom Elevated Fabrication Structure', amount: 18000, defaultSelected: false, note: 'Elevated walkway / tall roof clearance' },
  { id: 'extra_ct', label: 'Additional CT Sensor Kit', amount: 3500, defaultSelected: false, note: 'For zero export or multi-panel Enphase/Hybrid monitoring' },
];

// Helper to look up a price entry
export function findPriceItem(categoryId, dcCapacityKW, phase, batteryKWh = null, inverterKW = null) {
  const list = SOLAR_PRICE_CATALOG[categoryId];
  if (!list) return null;

  return list.find(item => {
    const matchCap = Math.abs(item.dcCapacityKW - dcCapacityKW) < 0.05;
    const matchPhase = !phase || item.phase === phase;
    const matchBattery = batteryKWh === null || item.batteryKWh === batteryKWh;
    const matchInverter = inverterKW === null || item.inverterKW === inverterKW;
    return matchCap && matchPhase && matchBattery && matchInverter;
  }) || list[0];
}

// Format Currency
export function formatINR(val) {
  if (val === undefined || val === null || isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}
