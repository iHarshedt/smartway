import React, { useState, useRef, useMemo, useEffect } from 'react';
import { CUSTOMER_RECORDS } from '../data/customerData';

import './QuotationTab.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell
} from 'recharts';


// ─── PRICE LIST DATA ────────────────────────────────────────────
const PRICE_DATA = [
  {
    modules: 4,
    product: 'SPG System 2.32 Kw String Inverter',
    dcKw: 2.32,
    invKw: 2,
    phase: 1,
    maxPrice: 185200,
    offer: 10000,
    offers: [10000, 10000, 10000, 10000, 10000, 10000],
    subsidy: 60000,
    panelCapacity: 580,
    structurePrices: [185200, 193900, 188500, 191200, 202600, 212400]
  },
  {
    modules: 5,
    product: 'SPG System 2.9 Kw String Inverter',
    dcKw: 2.90,
    invKw: 3,
    phase: 1,
    maxPrice: 210500,
    offer: 10000,
    offers: [10000, 10000, 10000, 10000, 10000, 10000],
    subsidy: 76200,
    panelCapacity: 580,
    structurePrices: [210500, 222000, 214800, 218700, 230600, 241500]
  },
  {
    modules: 6,
    product: 'SPG System 3.48 Kw String Inverter',
    dcKw: 3.48,
    invKw: 3,
    phase: 1,
    maxPrice: 234200,
    offer: 15000,
    offers: [15000, 15000, 15000, 15000, 15000, 15000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [234200, 247400, 238200, 243500, 253800, 264700]
  },
  {
    modules: 6,
    product: 'SPG System 3.48 Kw String Inverter',
    dcKw: 3.48,
    invKw: 5,
    phase: 1,
    maxPrice: 250200,
    offer: 15000,
    offers: [15000, 15000, 15000, 15000, 15000, 15000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [250200, 263600, 254500, 259700, 269800, 280700]
  },
  {
    modules: 6,
    product: 'SPG System 3.48 Kw String Inverter',
    dcKw: 3.48,
    invKw: 5,
    phase: 3,
    maxPrice: 276800,
    offer: 15000,
    offers: [15000, 15000, 15000, 15000, 15000, 15000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [276800, 290200, 283000, 286200, 296400, 307300]
  },
  {
    modules: 7,
    product: 'SPG System 4.06 Kw String Inverter',
    dcKw: 4.06,
    invKw: 4,
    phase: 1,
    maxPrice: 269300,
    offer: 18000,
    offers: [18000, 18000, 18000, 18000, 18000, 18000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [269300, 284800, 274500, 280200, 299800, 308500]
  },
  {
    modules: 8,
    product: 'SPG System 4.64 Kw String Inverter',
    dcKw: 4.64,
    invKw: 4,
    phase: 1,
    maxPrice: 289700,
    offer: 18000,
    offers: [18000, 18000, 18000, 18000, 18000, 18000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [289700, 307200, 324200, 302000, 320200, 328900]
  },
  {
    modules: 9,
    product: 'SPG System 5.22 Kw String Inverter',
    dcKw: 5.22,
    invKw: 5,
    phase: 1,
    maxPrice: 334200,
    offer: 30000,
    offers: [30000, 30000, 30000, 30000, 30000, 30000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [334200, 354100, 340100, 348200, 364700, 373400]
  },
  {
    modules: 9,
    product: 'SPG System 5.22 Kw String Inverter',
    dcKw: 5.22,
    invKw: 5,
    phase: 3,
    maxPrice: 360600,
    offer: 30000,
    offers: [30000, 30000, 30000, 30000, 30000, 30000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [360600, 380400, 366400, 374500, 391100, 399800]
  },
  {
    modules: 11,
    product: 'SPG System 6.38 Kw String Inverter',
    dcKw: 6.38,
    invKw: 6,
    phase: 3,
    maxPrice: 412700,
    offer: 30000,
    offers: [30000, 30000, 30000, 30000, 30000, 30000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [412700, 436800, 419300, 429600, 443200, 454000]
  },
  {
    modules: 14,
    product: 'SPG System 8.12 Kw String Inverter',
    dcKw: 8.12,
    invKw: 8,
    phase: 3,
    maxPrice: 505600,
    offer: 35000,
    offers: [35000, 35000, 35000, 35000, 35000, 35000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [505600, 536200, 516900, 527000, 544800, 557800]
  },
  {
    modules: 17,
    product: 'SPG System 9.86 Kw String Inverter',
    dcKw: 9.86,
    invKw: 10,
    phase: 3,
    maxPrice: 588300,
    offer: 40000,
    offers: [40000, 40000, 40000, 40000, 40000, 40000],
    subsidy: 78000,
    panelCapacity: 580,
    structurePrices: [588300, 625400, 597200, 614300, 631900, 648200]
  },
  // Hybrid Systems with MySine Hybrid (DCR 580/585 Wp - 01-10-2026)
  { modules: 4, dcKw: 2.32, invKw: 5, phase: 1, maxPrice: 447200, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 65760, panelCapacity: 585, isHybrid: true, battery: 5, product: 'SPG System 2.32 Kw MySine Hybrid System', structurePrices: [447200, 457800, 449800, 452800, Math.round(447200 * 1.095), Math.round(447200 * 1.125)] },
  { modules: 6, dcKw: 3.48, invKw: 5, phase: 1, maxPrice: 489200, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 78000, panelCapacity: 585, isHybrid: true, battery: 5, product: 'SPG System 3.48 Kw MySine Hybrid System', structurePrices: [489200, 505000, 492500, 497500, Math.round(489200 * 1.095), Math.round(489200 * 1.125)] },
  { modules: 9, dcKw: 5.22, invKw: 5, phase: 1, maxPrice: 554800, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 78000, panelCapacity: 585, isHybrid: true, battery: 5, product: 'SPG System 5.22 Kw MySine Hybrid System', structurePrices: [554800, 579800, 559800, 567800, Math.round(554800 * 1.095), Math.round(554800 * 1.125)] },
  { modules: 9, dcKw: 5.22, invKw: 5, phase: 1, maxPrice: 733000, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 78000, panelCapacity: 585, isHybrid: true, battery: 10, product: 'SPG System 5.22 Kw MySine Hybrid System', structurePrices: [733000, 758000, 738000, 746000, Math.round(733000 * 1.095), Math.round(733000 * 1.125)] },
  // Hybrid Systems with MySine Hybrid (nDCR 600 Wp - 01-10-2026)
  { modules: 9, dcKw: 5.40, invKw: 5, phase: 1, maxPrice: 504300, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 5, product: 'SPG System 5.4 Kw MySine Hybrid System', structurePrices: [504300, 528300, 508800, 516300, Math.round(504300 * 1.095), Math.round(504300 * 1.125)] },
  { modules: 9, dcKw: 5.40, invKw: 5, phase: 1, maxPrice: 681500, offer: 30000, offers: [30000, 30000, 30000, 30000, 30000, 30000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 10, product: 'SPG System 5.4 Kw MySine Hybrid System', structurePrices: [681500, 705500, 686000, 694000, Math.round(681500 * 1.095), Math.round(681500 * 1.125)] },
  { modules: 12, dcKw: 7.20, invKw: 10, phase: 3, maxPrice: 877300, offer: 40000, offers: [40000, 40000, 40000, 40000, 40000, 40000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 10, product: 'SPG System 7.2 Kw MySine Hybrid System', structurePrices: [877300, 910300, 882800, 894300, Math.round(877300 * 1.095), Math.round(877300 * 1.125)] },
  { modules: 17, dcKw: 10.20, invKw: 10, phase: 3, maxPrice: 1024600, offer: 50000, offers: [50000, 50000, 50000, 50000, 50000, 50000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 10, product: 'SPG System 10.2 Kw MySine Hybrid System', structurePrices: [1024600, 1071100, 1036100, 1048600, Math.round(1024600 * 1.095), Math.round(1024600 * 1.125)] },
  { modules: 17, dcKw: 10.20, invKw: 10, phase: 3, maxPrice: 1141300, offer: 50000, offers: [50000, 50000, 50000, 50000, 50000, 50000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 15, product: 'SPG System 10.2 Kw MySine Hybrid System', structurePrices: [1141300, 1187800, 1152800, 1165300, Math.round(1141300 * 1.095), Math.round(1141300 * 1.125)] },
  { modules: 17, dcKw: 10.20, invKw: 10, phase: 3, maxPrice: 1252700, offer: 50000, offers: [50000, 50000, 50000, 50000, 50000, 50000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 20, product: 'SPG System 10.2 Kw MySine Hybrid System', structurePrices: [1252700, 1298700, 1264200, 1276700, Math.round(1252700 * 1.095), Math.round(1252700 * 1.125)] },
  { modules: 20, dcKw: 12.00, invKw: 10, phase: 3, maxPrice: 1334400, offer: 70000, offers: [70000, 70000, 70000, 70000, 70000, 70000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 20, product: 'SPG System 12 Kw MySine Hybrid System', structurePrices: [1334400, 1388400, 1346400, 1362400, Math.round(1334400 * 1.095), Math.round(1334400 * 1.125)] },
  { modules: 24, dcKw: 14.40, invKw: 15, phase: 3, maxPrice: 1782000, offer: 90000, offers: [90000, 90000, 90000, 90000, 90000, 90000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 30, product: 'SPG System 14.4 Kw MySine Hybrid System', structurePrices: [1782000, 1847500, 1796500, 1816000, Math.round(1782000 * 1.095), Math.round(1782000 * 1.125)] },
  { modules: 24, dcKw: 14.40, invKw: 15, phase: 3, maxPrice: 2017400, offer: 90000, offers: [90000, 90000, 90000, 90000, 90000, 90000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 40, product: 'SPG System 14.4 Kw MySine Hybrid System', structurePrices: [2017400, 2082400, 2031400, 2050900, Math.round(2017400 * 1.095), Math.round(2017400 * 1.125)] },
  { modules: 34, dcKw: 20.40, invKw: 20, phase: 3, maxPrice: 1832100, offer: 120000, offers: [120000, 120000, 120000, 120000, 120000, 120000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 20, product: 'SPG System 20.4 Kw MySine Hybrid System', structurePrices: [1832100, 1924100, 1852100, 1879600, Math.round(1832100 * 1.095), Math.round(1832100 * 1.125)] },
  { modules: 34, dcKw: 20.40, invKw: 20, phase: 3, maxPrice: 2060600, offer: 120000, offers: [120000, 120000, 120000, 120000, 120000, 120000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 30, product: 'SPG System 20.4 Kw MySine Hybrid System', structurePrices: [2060600, 2152100, 2080600, 2108100, Math.round(2060600 * 1.095), Math.round(2060600 * 1.125)] },
  { modules: 34, dcKw: 20.40, invKw: 20, phase: 3, maxPrice: 2297800, offer: 120000, offers: [120000, 120000, 120000, 120000, 120000, 120000], subsidy: 0, panelCapacity: 600, isHybrid: true, battery: 40, product: 'SPG System 20.4 Kw MySine Hybrid System', structurePrices: [2297800, 2389800, 2317800, 2345300, Math.round(2297800 * 1.095), Math.round(2297800 * 1.125)] },
];

const CI_PRICE_DATA = [
  {
    modules: 20,
    product: 'SPG-10kW/12 kWp',
    dcKw: 12.0,
    inv1: 10,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 525203, offerPrice: 514313 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 493992, offerPrice: 483102 },
      'TABLE TYPE STRUCTURE': { maxPrice: 541364, offerPrice: 530474 },
      'WITHOUT STRUCTURE': { maxPrice: 487567, offerPrice: 476677 }
    }
  },
  {
    modules: 25,
    product: 'SPG-15kW/15 kWp',
    dcKw: 15.0,
    inv1: 15,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 647868, offerPrice: 634800 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 610406, offerPrice: 597338 },
      'TABLE TYPE STRUCTURE': { maxPrice: 672370, offerPrice: 659302 },
      'WITHOUT STRUCTURE': { maxPrice: 601803, offerPrice: 588735 }
    }
  },
  {
    modules: 34,
    product: 'SPG-20kW/20.4 kWp',
    dcKw: 20.4,
    inv1: 20,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 820945, offerPrice: 805699 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 769400, offerPrice: 754154 },
      'TABLE TYPE STRUCTURE': { maxPrice: 845521, offerPrice: 830275 },
      'WITHOUT STRUCTURE': { maxPrice: 758837, offerPrice: 743591 }
    }
  },
  {
    modules: 42,
    product: 'SPG-20kW/25.2 kWp',
    dcKw: 25.2,
    inv1: 20,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 977199, offerPrice: 959775 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 915108, offerPrice: 897684 },
      'TABLE TYPE STRUCTURE': { maxPrice: 1016168, offerPrice: 998744 },
      'WITHOUT STRUCTURE': { maxPrice: 902367, offerPrice: 884943 }
    }
  },
  {
    modules: 50,
    product: 'SPG-30kW/30 kWp',
    dcKw: 30.0,
    inv1: 30,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 1146630, offerPrice: 1127028 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 1070073, offerPrice: 1050471 },
      'TABLE TYPE STRUCTURE': { maxPrice: 1189645, offerPrice: 1170043 },
      'WITHOUT STRUCTURE': { maxPrice: 1055154, offerPrice: 1035552 }
    }
  },
  {
    modules: 64,
    product: 'SPG-30kW/38.4 kWp',
    dcKw: 38.4,
    inv1: 30,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 1410246, offerPrice: 1388466 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 1311722, offerPrice: 1289942 },
      'TABLE TYPE STRUCTURE': { maxPrice: 1471587, offerPrice: 1449807 },
      'WITHOUT STRUCTURE': { maxPrice: 1293318, offerPrice: 1271538 }
    }
  },
  {
    modules: 67,
    product: 'SPG-40kW/40.2 kWp',
    dcKw: 40.2,
    inv1: 40,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 1487341, offerPrice: 1465561 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 1383869, offerPrice: 1362089 },
      'TABLE TYPE STRUCTURE': { maxPrice: 1542100, offerPrice: 1520320 },
      'WITHOUT STRUCTURE': { maxPrice: 1364267, offerPrice: 1342487 }
    }
  },
  {
    modules: 84,
    product: 'SPG-50kW/50.4 kWp',
    dcKw: 50.4,
    inv1: 50,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 1915807, offerPrice: 1867873 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 1773683, offerPrice: 1729773 },
      'WITHOUT STRUCTURE': { maxPrice: 1734152, offerPrice: 1690242 }
    }
  },
  {
    modules: 100,
    product: 'SPG-60kW/60 kWp',
    dcKw: 60.0,
    inv1: 60,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 2245519, offerPrice: 2188775 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 2074069, offerPrice: 2022212 },
      'WITHOUT STRUCTURE': { maxPrice: 2042597, offerPrice: 1990740 }
    }
  },
  {
    modules: 109,
    product: 'SPG-50kW/65.4 kWp',
    dcKw: 65.4,
    inv1: 50,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 2397502, offerPrice: 2337322 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 2211218, offerPrice: 2156314 },
      'WITHOUT STRUCTURE': { maxPrice: 2177677, offerPrice: 2122773 }
    }
  },
  {
    modules: 126,
    product: 'SPG-60kW/75.6 kWp',
    dcKw: 75.6,
    inv1: 60,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 2742213, offerPrice: 2673207 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 2529476, offerPrice: 2466547 },
      'WITHOUT STRUCTURE': { maxPrice: 2488421, offerPrice: 2425491 }
    }
  },
  {
    modules: 134,
    product: 'SPG-60kW/80.4 kWp',
    dcKw: 80.4,
    inv1: 60,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 2899584, offerPrice: 2826617 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 2667731, offerPrice: 2601335 },
      'WITHOUT STRUCTURE': { maxPrice: 2628418, offerPrice: 2562022 }
    }
  },
  {
    modules: 134,
    product: 'SPG-80kW/80.4 kWp',
    dcKw: 80.4,
    inv1: 80,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 2993727, offerPrice: 2918171 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 2762353, offerPrice: 2693381 },
      'WITHOUT STRUCTURE': { maxPrice: 2722496, offerPrice: 2653524 }
    }
  },
  {
    modules: 167,
    product: 'SPG-80kW/100.2 kWp',
    dcKw: 100.2,
    inv1: 80,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 3631994, offerPrice: 3540575 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 3355420, offerPrice: 3271854 },
      'WITHOUT STRUCTURE': { maxPrice: 3307504, offerPrice: 3223938 }
    }
  },
  {
    modules: 167,
    product: 'SPG-100kW/100.2 kWp',
    dcKw: 100.2,
    inv1: 100,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 3700111, offerPrice: 3606699 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 3410763, offerPrice: 3325537 },
      'WITHOUT STRUCTURE': { maxPrice: 3362956, offerPrice: 3277730 }
    }
  },
  {
    modules: 184,
    product: 'SPG-80kW/110.4 kWp',
    dcKw: 110.4,
    inv1: 80,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 3985630, offerPrice: 3885789 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 3673034, offerPrice: 3582017 },
      'WITHOUT STRUCTURE': { maxPrice: 3621633, offerPrice: 3530616 }
    }
  },
  {
    modules: 200,
    product: 'SPG-100kW/120 kWp',
    dcKw: 120.0,
    inv1: 100,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 4362277, offerPrice: 4248345 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 4009947, offerPrice: 3906368 },
      'WITHOUT STRUCTURE': { maxPrice: 3954626, offerPrice: 3851047 }
    }
  },
  {
    modules: 209,
    product: 'SPG-100kW/125.4 kWp',
    dcKw: 125.4,
    inv1: 100,
    inv2: 0,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 4537232, offerPrice: 4419560 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 4169335, offerPrice: 4062421 },
      'WITHOUT STRUCTURE': { maxPrice: 4112053, offerPrice: 4005139 }
    }
  },
  {
    modules: 250,
    product: 'SPG-120kW/150 kWp',
    dcKw: 150.0,
    inv1: 60,
    inv2: 60,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 5547974, offerPrice: 5405585 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 5113306, offerPrice: 4983198 },
      'WITHOUT STRUCTURE': { maxPrice: 5047802, offerPrice: 4917694 }
    }
  },
  {
    modules: 284,
    product: 'SPG-130kW/170.4 kWp',
    dcKw: 170.4,
    inv1: 80,
    inv2: 50,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 6270576, offerPrice: 6112838 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 5773335, offerPrice: 5629552 },
      'WITHOUT STRUCTURE': { maxPrice: 5700535, offerPrice: 5556752 }
    }
  },
  {
    modules: 300,
    product: 'SPG-140kW/180 kWp',
    dcKw: 180.0,
    inv1: 80,
    inv2: 60,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 6650525, offerPrice: 6473582 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 6126287, offerPrice: 5964893 },
      'WITHOUT STRUCTURE': { maxPrice: 6046572, offerPrice: 5885179 }
    }
  },
  {
    modules: 334,
    product: 'SPG-160kW/200.4 kWp',
    dcKw: 200.4,
    inv1: 80,
    inv2: 80,
    phase: 3,
    panelCapacity: 600,
    structures: {
      'RCC BALLAST': { maxPrice: 7321190, offerPrice: 7136565 },
      'SHEET ROOF - SHORTRAIL': { maxPrice: 6732200, offerPrice: 6564132 },
      'WITHOUT STRUCTURE': { maxPrice: 6644753, offerPrice: 6476685 }
    }
  }
];

const MICRO_PRICE_DATA = [
  {
    modules: 4,
    product: 'SPG System 2.24 Kw Micro Inverter',
    dcKw: 2.24,
    invKw: 2.24,
    phase: 1,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 57600,
    structures: {
      'Without Structure': { maxPrice: 258000, offer: 8000, offerPrice: 250000 },
      'Additional Work Above RCC': { maxPrice: 275500, offer: 8000, offerPrice: 267500 },
      'Additional Work Above Sheet Roof': { maxPrice: 285500, offer: 8000, offerPrice: 277500 },
      'RCC Ballast': { maxPrice: 267000, offer: 8000, offerPrice: 259000 },
      'Sheetroof - Shortrail': { maxPrice: 261000, offer: 8000, offerPrice: 253000 },
      'L- Angle Without Ballast': { maxPrice: 264000, offer: 8000, offerPrice: 256000 }
    }
  },
  {
    modules: 6,
    product: 'SPG System 3.36 Kw Micro Inverter',
    dcKw: 3.36,
    invKw: 3.36,
    phase: 1,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 75840,
    structures: {
      'Without Structure': { maxPrice: 330000, offer: 10000, offerPrice: 320000 },
      'Additional Work Above RCC': { maxPrice: 349000, offer: 10000, offerPrice: 339000 },
      'Additional Work Above Sheet Roof': { maxPrice: 359500, offer: 10000, offerPrice: 349500 },
      'RCC Ballast': { maxPrice: 342000, offer: 10000, offerPrice: 332000 },
      'Sheetroof - Shortrail': { maxPrice: 334000, offer: 10000, offerPrice: 324000 },
      'L- Angle Without Ballast': { maxPrice: 338500, offer: 10000, offerPrice: 328500 }
    }
  },
  {
    modules: 9,
    product: 'SPG System 5.04 Kw Micro Inverter',
    dcKw: 5.04,
    invKw: 5.04,
    phase: 1,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 78000,
    structures: {
      'Without Structure': { maxPrice: 491000, offer: 15000, offerPrice: 476000 },
      'Additional Work Above RCC': { maxPrice: 521500, offer: 15000, offerPrice: 506500 },
      'Additional Work Above Sheet Roof': { maxPrice: 530000, offer: 15000, offerPrice: 515000 },
      'RCC Ballast': { maxPrice: 509000, offer: 15000, offerPrice: 494000 },
      'Sheetroof - Shortrail': { maxPrice: 496000, offer: 15000, offerPrice: 481000 },
      'L- Angle Without Ballast': { maxPrice: 505000, offer: 15000, offerPrice: 490000 }
    }
  },
  {
    modules: 9,
    product: 'SPG System 5.04 Kw Micro Inverter',
    dcKw: 5.04,
    invKw: 5.04,
    phase: 3,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 78000,
    structures: {
      'Without Structure': { maxPrice: 502000, offer: 15000, offerPrice: 487000 },
      'Additional Work Above RCC': { maxPrice: 532000, offer: 15000, offerPrice: 517000 },
      'Additional Work Above Sheet Roof': { maxPrice: 541000, offer: 15000, offerPrice: 526000 },
      'RCC Ballast': { maxPrice: 520500, offer: 15000, offerPrice: 505500 },
      'Sheetroof - Shortrail': { maxPrice: 507000, offer: 15000, offerPrice: 492000 },
      'L- Angle Without Ballast': { maxPrice: 515000, offer: 15000, offerPrice: 500000 }
    }
  },
  {
    modules: 14,
    product: 'SPG System 7.84 Kw Micro Inverter',
    dcKw: 7.84,
    invKw: 7.84,
    phase: 3,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 78000,
    structures: {
      'Without Structure': { maxPrice: 703000, offer: 20000, offerPrice: 683000 },
      'Additional Work Above RCC': { maxPrice: 742500, offer: 20000, offerPrice: 722500 },
      'Additional Work Above Sheet Roof': { maxPrice: 745000, offer: 20000, offerPrice: 725000 },
      'RCC Ballast': { maxPrice: 730500, offer: 20000, offerPrice: 710500 },
      'Sheetroof - Shortrail': { maxPrice: 711000, offer: 20000, offerPrice: 691000 },
      'L- Angle Without Ballast': { maxPrice: 724500, offer: 20000, offerPrice: 704500 }
    }
  },
  {
    modules: 18,
    product: 'SPG System 10.08 Kw Micro Inverter',
    dcKw: 10.08,
    invKw: 10.08,
    phase: 3,
    panelCapacity: 560,
    isMicro: true,
    subsidy: 78000,
    structures: {
      'Without Structure': { maxPrice: 843000, offer: 20000, offerPrice: 823000 },
      'Additional Work Above RCC': { maxPrice: 886000, offer: 20000, offerPrice: 866000 },
      'Additional Work Above Sheet Roof': { maxPrice: 895000, offer: 20000, offerPrice: 875000 },
      'RCC Ballast': { maxPrice: 876000, offer: 20000, offerPrice: 856000 },
      'Sheetroof - Shortrail': { maxPrice: 852000, offer: 20000, offerPrice: 832000 },
      'L- Angle Without Ballast': { maxPrice: 870000, offer: 20000, offerPrice: 850000 }
    }
  }
];

const NON_DCR_PRICE_DATA = [
  {
    modules: 9,
    product: 'SPG System 5.4 Kw String Inverter',
    dcKw: 5.40,
    invKw: 5,
    phase: 1,
    panelCapacity: 600,
    isNonDcr: true,
    isMicro: false,
    subsidy: 0,
    structures: {
      'Without Structure': { maxPrice: 272900, offer: 15000, offerPrice: 257900 },
      'RCC Ballast': { maxPrice: 292400, offer: 15000, offerPrice: 277400 },
      'Sheetroof - Shortrail': { maxPrice: 279000, offer: 15000, offerPrice: 264000 },
      'L- Angle Without Ballast': { maxPrice: 286500, offer: 15000, offerPrice: 271500 },
      'Additional Work Above RCC': { maxPrice: 303400, offer: 15000, offerPrice: 288400 },
      'Additional Work Above Sheet Roof': { maxPrice: 314300, offer: 15000, offerPrice: 299300 }
    }
  },
  {
    modules: 9,
    product: 'SPG System 5.4 Kw String Inverter',
    dcKw: 5.40,
    invKw: 5,
    phase: 3,
    panelCapacity: 600,
    isNonDcr: true,
    isMicro: false,
    subsidy: 0,
    structures: {
      'Without Structure': { maxPrice: 305200, offer: 15000, offerPrice: 290200 },
      'RCC Ballast': { maxPrice: 324500, offer: 15000, offerPrice: 309500 },
      'Sheetroof - Shortrail': { maxPrice: 311100, offer: 15000, offerPrice: 296100 },
      'L- Angle Without Ballast': { maxPrice: 318600, offer: 15000, offerPrice: 303600 },
      'Additional Work Above RCC': { maxPrice: 335600, offer: 15000, offerPrice: 320600 },
      'Additional Work Above Sheet Roof': { maxPrice: 346500, offer: 15000, offerPrice: 331500 }
    }
  },
  {
    modules: 10,
    product: 'SPG System 6 Kw String Inverter',
    dcKw: 6.00,
    invKw: 6,
    phase: 3,
    panelCapacity: 600,
    isNonDcr: true,
    isMicro: false,
    subsidy: 0,
    structures: {
      'Without Structure': { maxPrice: 330900, offer: 15000, offerPrice: 315900 },
      'RCC Ballast': { maxPrice: 352600, offer: 15000, offerPrice: 337600 },
      'Sheetroof - Shortrail': { maxPrice: 337000, offer: 15000, offerPrice: 322000 },
      'L- Angle Without Ballast': { maxPrice: 346000, offer: 15000, offerPrice: 331000 },
      'Additional Work Above RCC': { maxPrice: 361400, offer: 15000, offerPrice: 346400 },
      'Additional Work Above Sheet Roof': { maxPrice: 372300, offer: 15000, offerPrice: 357300 }
    }
  },
  {
    modules: 14,
    product: 'SPG System 8.4 Kw String Inverter',
    dcKw: 8.40,
    invKw: 8,
    phase: 3,
    panelCapacity: 600,
    isNonDcr: true,
    isMicro: false,
    subsidy: 0,
    structures: {
      'Without Structure': { maxPrice: 431200, offer: 30000, offerPrice: 401200 },
      'RCC Ballast': { maxPrice: 460600, offer: 30000, offerPrice: 430600 },
      'Sheetroof - Shortrail': { maxPrice: 438800, offer: 30000, offerPrice: 408800 },
      'L- Angle Without Ballast': { maxPrice: 451500, offer: 30000, offerPrice: 421500 },
      'Additional Work Above RCC': { maxPrice: 470400, offer: 30000, offerPrice: 440400 },
      'Additional Work Above Sheet Roof': { maxPrice: 483500, offer: 30000, offerPrice: 453500 }
    }
  },
  {
    modules: 17,
    product: 'SPG System 10.2 Kw String Inverter',
    dcKw: 10.20,
    invKw: 10,
    phase: 3,
    panelCapacity: 600,
    isNonDcr: true,
    isMicro: false,
    subsidy: 0,
    structures: {
      'Without Structure': { maxPrice: 500900, offer: 35000, offerPrice: 465900 },
      'RCC Ballast': { maxPrice: 536500, offer: 35000, offerPrice: 501500 },
      'Sheetroof - Shortrail': { maxPrice: 509700, offer: 35000, offerPrice: 474700 },
      'L- Angle Without Ballast': { maxPrice: 525400, offer: 35000, offerPrice: 490400 },
      'Additional Work Above RCC': { maxPrice: 544500, offer: 35000, offerPrice: 509500 },
      'Additional Work Above Sheet Roof': { maxPrice: 560800, offer: 35000, offerPrice: 525800 }
    }
  }
];

const calcRegistration = (invKw) => {
  const kw = Number(invKw) || 0;
  return Math.round(0.8 * kw * 1000 + 0.2 * kw * 1000 * 1.18);
};
const getAmcFee = (dcKw) => {
  const kw = Number(dcKw) || 0;
  if (kw <= 3) return 2498;
  if (kw <= 5) return 2998;
  if (kw <= 8) return 4499;
  if (kw <= 10) return 4999;
  if (kw <= 15) return 5999;
  if (kw <= 20) return 6999;
  return Math.round(7000 + (kw - 20) * 200);
};


const fmt = (n) => '₹ ' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtShort = (n) => n.toLocaleString('en-IN');

// ─── ICONS ──────────────────────────────────────────────────────
const IconDoc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const IconList = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);
const IconPDF = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 13h1a2 2 0 0 1 0 4H9v-4z" />
    <line x1="13" y1="13" x2="13" y2="17" />
    <line x1="13" y1="15" x2="15" y2="15" />
    <line x1="16" y1="13" x2="18" y2="13" />
    <line x1="16" y1="15" x2="18" y2="15" />
    <line x1="16" y1="17" x2="18" y2="17" />
  </svg>
);
const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const getBomRows = (selected) => {
  if (selected.isNonDcr) {
    return [
      { id: 1, desc: `Solar PV Module: ${selected.panelCapacity || 600} WP nDCR G12R TOPCon Bifacial (590–610 Wp)`, qty: selected.modules, make: 'Tata Power Solar / Approved', uom: 'nos', bold: true },
      { id: 2, desc: `Structure: ${selected.structure || 'Without Structure'}`, qty: 1, make: 'TPS Approved', uom: 'set' },
      { id: 3, desc: `Inverter — ${selected.invKw} kW Three Phase String Inverter (8-Yr Warranty)`, qty: 1, make: 'GoodWe / Solis / Growatt / Sofar / Solax', uom: 'nos', bold: true },
      { id: 4, desc: 'AC Distribution Box & DC Distribution Box', qty: 1, make: 'TPS Approved Vendors / Eligant / Eqv.', uom: 'set' },
      { id: 5, desc: 'Solar DC Cable 4 SQMM', qty: 25, make: 'Siechem / KEI / TPS Approved Vendor', uom: 'm' },
      { id: 6, desc: 'AC Cable', qty: 15, make: 'Siechem / KEI / TPS Approved Vendor', uom: 'm' },
      { id: 7, desc: 'Earthing Kit', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
      { id: 8, desc: 'Lightning Arrester', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
      { id: 9, desc: 'MC-4 Cable Couplers (Male & Female Pairs)', qty: 1, make: 'Bizlink / Multi-Contact / Eqv.', uom: 'set' },
      { id: 10, desc: 'Installation & Wi-Fi Monitoring Kit', qty: 1, make: 'Tata Power Solar / Inverter OEM', uom: 'set' },
    ];
  }
  if (selected.isMicro) {
    return [
      { id: 1, desc: `Solar PV Module: ${selected.panelCapacity || 560} WP DCR Mono PERC Bifacial`, qty: selected.modules, make: 'Tata Power Solar / Approved', uom: 'nos', bold: true },
      { id: 2, desc: `Structure: ${selected.structure || 'Without Structure'}`, qty: 1, make: 'TPS Approved', uom: 'set' },
      { id: 3, desc: `Inverter — Enphase Micro Inverter System (${selected.phase === 3 ? 'Three' : 'Single'} Phase)`, qty: selected.modules, make: 'Enphase Energy (15-Yr Warranty)', uom: 'nos', bold: true },
      { id: 4, desc: 'Current Transformer (CT) — 2 Nos Standard', qty: 2, make: 'Enphase', uom: 'nos', bold: true },
      { id: 5, desc: 'AC Distribution Box & Enphase Envoy/Gateway Kit', qty: 1, make: 'Enphase / TPS Approved', uom: 'set' },
      { id: 6, desc: 'Solar DC Cable & AC Trunk Cable', qty: 25, make: 'Siechem / KEI / Enphase', uom: 'm' },
      { id: 7, desc: 'Earthing Kit', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
      { id: 8, desc: 'Lightning Arrester', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
      { id: 9, desc: 'MC-4 Cable Couplers & Accessories', qty: 1, make: 'Bizlink / Multi-Contact / Eqv.', uom: 'set' },
      { id: 10, desc: 'Installation & Monitoring Kit', qty: 1, make: 'Tata Power Solar / Enphase', uom: 'set' },
    ];
  }
  return [
    { id: 1, desc: selected.isHybrid ? `Solar PV Module: ${selected.panelCapacity || 585} WP Bifacial Modules` : `Solar PV Module: ${selected.panelCapacity || 580} WP DCR Mono PERC Bifacial`, qty: selected.modules, make: 'Tata Power Solar / Approved', uom: 'nos', bold: true },
    { id: 2, desc: selected.isCi ? `${selected.structure} Structure` : selected.structure ? `${selected.structure} Structure` : 'L-Angle Without Ballast (if needed)', qty: 1, make: 'TPS Approved', uom: 'set' },
    { id: 3, desc: selected.isCi ? `Inverter — ${selected.inv2 ? `${selected.inv1}kW + ${selected.inv2}kW` : `${selected.inv1}kW`} (3-Phase)` : selected.isHybrid ? `Inverter — ${selected.invKw} kW MySine Hybrid Inverter (${selected.phase === 3 ? 'Three' : 'Single'} Phase)` : `Inverter — ${selected.invKw ? `${selected.invKw} kW ` : ''}${selected.phase === 3 ? 'Three' : 'Single'} Phase String Inverter`, qty: 1, make: selected.isCi ? 'Goodwe / Sofar Only' : selected.isHybrid ? 'MySine Hybrid' : 'GoodWe / Solis / Growatt / Sofar / Solax / Approved', uom: 'nos', bold: true },
    ...(selected.isHybrid ? [{ id: '3B', desc: `${selected.battery} kWh Lithium-ion Battery Storage System`, qty: 1, make: 'MySine / Approved Vendor', uom: 'set', bold: true }] : []),
    { id: 4, desc: 'AC Distribution Box', qty: 1, make: 'TPS Approved Vendors / Eligant / Eqv.', uom: 'set' },
    { id: 5, desc: 'Solar DC Cable 4 SQMM', qty: 25, make: 'Siechem / KEI / TPS Approved Vendor', uom: 'm' },
    { id: 6, desc: 'AC Cable', qty: 15, make: 'Siechem / KEI / TPS Approved Vendor', uom: 'm' },
    { id: 7, desc: 'Earthing Kit', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
    { id: 8, desc: 'Lightning Arrester', qty: 1, make: 'TPS Approved Vendors', uom: 'set' },
    { id: 9, desc: 'MC-4 Cable Couplers (Male & Female Pairs)', qty: 1, make: 'Bizlink / Multi-Contact / Eqv.', uom: 'set' },
    { id: 10, desc: 'Installation Kit (Comm. Cable etc.)', qty: 1, make: 'Tata Power Solar', uom: 'set' },
  ];
};

// ─── PRICE LIST TABLE DATA ───────────────────────────────────────
const PL_STRUCTURES = [
  'Without Structure', 'RCC Ballast', 'Sheetroof - Shortrail',
  'L-Angle Without Ballast', 'Additional Work Above RCC', 'Additional Work Above Sheet Roof',
];
const DOMESTIC_STRUCTURE_MULTIPLIERS = {
  'Without Structure': 1.0,
  'RCC Ballast': 1.054,
  'Sheetroof - Shortrail': 1.015,
  'L-Angle Without Ballast': 1.040,
  'Additional Work Above RCC': 1.095,
  'Additional Work Above Sheet Roof': 1.125,
};
const PL_OFFSETS = [0, 9583, 2703, 6068, 19637, 26756]; // price additions per structure for 4-mod; scaled
const getPriceListRows = () => {
  const rows = [];
  PRICE_DATA.forEach(p => {
    if (p.isHybrid) return;
    const structurePrices = p.structurePrices;
    PL_STRUCTURES.forEach((struct, si) => {
      const mp = structurePrices[si];
      const off = Array.isArray(p.offers) ? p.offers[si] : p.offer;
      rows.push({ ...p, structure: struct, maxPrice: mp, offerPrice: mp - off, isWithout: si === 0 });
    });
  });
  return rows;
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────
export default function QuotationGenerator({ leads = [], customers = [], initialCustomer = null }) {
  const [subTab, setSubTab] = useState('generate_new');
  const [selectedIdx, setSelectedIdx] = useState(3);
  const [paymentType, setPaymentType] = useState('cash');
  const [customer, setCustomer] = useState({
    name: initialCustomer?.customerName || initialCustomer?.name || '',
    phone: initialCustomer?.phone || '',
    place: initialCustomer?.address || initialCustomer?.place || initialCustomer?.section || '',
    salesEngineer: initialCustomer?.salesEngineer || 'Harshed illikkal',
    salesEngineerPhone: initialCustomer?.salesEngineerPhone || '9946236101',
    ksebBiMonthlyBill: initialCustomer?.ksebBiMonthlyBill || '',
    ksebSection: initialCustomer?.section || initialCustomer?.ksebSection || '',
    companyName: 'SMART WAY SOLAR SOLUTIONS'
  });
  const [structureCostRaw, setStructureCostRaw] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [applyDiscount, setApplyDiscount] = useState(true);
  const [includeSubsidy, setIncludeSubsidy] = useState(true);
  const [includeAmc, setIncludeAmc] = useState(false);
  const [quoteType, setQuoteType] = useState('domestic'); // 'domestic', 'non_dcr', 'micro', or 'ci'
  const [ciStructure, setCiStructure] = useState('RCC BALLAST');
  const [domesticStructure, setDomesticStructure] = useState('Without Structure');
  const [microStructure, setMicroStructure] = useState('Without Structure');
  const [nonDcrStructure, setNonDcrStructure] = useState('Without Structure');

  useEffect(() => {
    if (initialCustomer) {
      setCustomer(prev => ({
        ...prev,
        name: (initialCustomer.customerName || initialCustomer.name || '').toUpperCase(),
        phone: initialCustomer.phone || '',
        place: (initialCustomer.address || initialCustomer.place || initialCustomer.section || '').toUpperCase(),
        salesEngineer: (initialCustomer.salesEngineer || prev.salesEngineer || 'Harshed illikkal').toUpperCase(),
        salesEngineerPhone: initialCustomer.salesEngineerPhone || prev.salesEngineerPhone || '9946236101',
        ksebBiMonthlyBill: initialCustomer.ksebBiMonthlyBill || '',
        ksebSection: (initialCustomer.section || initialCustomer.ksebSection || '').toUpperCase()
      }));

      const cap = parseFloat(initialCustomer.capacityKW || initialCustomer.solarKW || initialCustomer.capacity);
      if (cap && !isNaN(cap)) {
        const foundIdx = PRICE_DATA.findIndex(p => Math.abs(p.dcKw - cap) < 0.2);
        if (foundIdx !== -1) {
          setSelectedIdx(foundIdx);
        }
      }
    }
  }, [initialCustomer]);

  const getKsebFees = (invKw, pType) => ({
    feasibility: 1000,
    registration: calcRegistration(invKw),
    agreement: pType === 'loan' ? 400 : 200,
  });

  const docRef = useRef(null);

  const combinedData = useMemo(() => {
    const dataSource = (customers && customers.length > 0) ? customers : (CUSTOMER_RECORDS || []);
    const l = (leads || []).map(x => ({
      ...x,
      _type: 'Lead',
      name: String(x.name || x.customerName || x.__C || ''),
      phone: String(x.phone || x.__D || ''),
      place: String(x.place || x.address || x.section || x.__E || ''),
      salesEngineer: x.salesEngineer || x["Sales Engineer's Name"] || (x.__H && isNaN(parseFloat(x.__H)) ? x.__H : '') || x.__REASSIGN || '',
      salesEngineerPhone: x.salesEngineerPhone || x["Sales Engineer's Phone"] || '',
      section: x.section || x.ksebSection || '',
      capacityKW: x.capacityKW || x.solarKW || ''
    }));
    const c = dataSource.map(x => ({
      ...x,
      _type: 'Customer',
      name: String(x.name || x.customerName || x['Customer Name'] || x.__A || ''),
      phone: String(x.phone || x['Phone'] || x.__B || ''),
      place: String(x.place || x.address || x['Address'] || x.section || x.__C || ''),
      salesEngineer: x.salesEngineer || x["Sales Engineer's Name"] || (x.__H && isNaN(parseFloat(x.__H)) ? x.__H : '') || x.__REASSIGN || '',
      salesEngineerPhone: x.salesEngineerPhone || x["Sales Engineer's Phone"] || '',
      section: x.section || x.ksebSection || '',
      capacityKW: x.capacityKW || x.solarKW || ''
    }));
    return [...l, ...c];
  }, [leads, customers]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return combinedData.filter(x =>
      x.name.toLowerCase().includes(q) ||
      x.phone.includes(q) ||
      x.place.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [combinedData, searchQuery]);

  const selectResult = (res) => {
    setCustomer(prev => ({
      ...prev,
      name: String(res.name || res.customerName || '').toUpperCase(),
      phone: res.phone || '',
      place: String(res.place || res.address || '').toUpperCase(),
      salesEngineer: res.salesEngineer ? String(res.salesEngineer).toUpperCase() : prev.salesEngineer,
      salesEngineerPhone: res.salesEngineerPhone ? String(res.salesEngineerPhone) : prev.salesEngineerPhone,
      ksebBiMonthlyBill: res.ksebBiMonthlyBill || prev.ksebBiMonthlyBill || '',
      ksebSection: (res.ksebSection || res.section || res.Section || '').toUpperCase()
    }));
    if (res.capacityKW) {
      const cap = parseFloat(res.capacityKW);
      if (cap && !isNaN(cap)) {
        const foundIdx = PRICE_DATA.findIndex(p => Math.abs(p.dcKw - cap) < 0.2);
        if (foundIdx !== -1) {
          setSelectedIdx(foundIdx);
        }
      }
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const selected = useMemo(() => {
    if (quoteType === 'non_dcr') {
      const raw = NON_DCR_PRICE_DATA[selectedIdx] || NON_DCR_PRICE_DATA[0];
      const available = Object.keys(raw.structures);
      const structKey = raw.structures[nonDcrStructure] ? nonDcrStructure : available[0];
      const structData = raw.structures[structKey];
      const maxPrice = structData.maxPrice;
      const offer = structData.offer;
      const offerPrice = structData.offerPrice;
      return {
        ...raw,
        isMicro: true,
        isNonDcr: true,
        maxPrice,
        offer,
        offerPrice,
        subsidy: 0,
        invKw: raw.invKw,
        structure: structKey,
      };
    } else if (quoteType === 'micro') {
      const raw = MICRO_PRICE_DATA[selectedIdx] || MICRO_PRICE_DATA[0];
      const available = Object.keys(raw.structures);
      const structKey = raw.structures[microStructure] ? microStructure : available[0];
      const structData = raw.structures[structKey];
      const maxPrice = structData.maxPrice;
      const offer = structData.offer;
      const offerPrice = structData.offerPrice;
      return {
        ...raw,
        isMicro: true,
        maxPrice,
        offer,
        offerPrice,
        invKw: raw.invKw,
        structure: structKey,
      };
    } else if (quoteType === 'ci') {
      const raw = CI_PRICE_DATA[selectedIdx] || CI_PRICE_DATA[0];
      const available = Object.keys(raw.structures);
      const structKey = raw.structures[ciStructure] ? ciStructure : available[0];
      const structData = raw.structures[structKey];
      const maxPrice = structData.maxPrice;
      const offerPrice = structData.offerPrice;
      const offer = maxPrice - offerPrice;
      const invKw = raw.inv2 ? (raw.inv1 + raw.inv2) : raw.inv1;
      return {
        ...raw,
        isCi: true,
        maxPrice,
        offer,
        offerPrice,
        subsidy: 0,
        invKw,
        structure: structKey,
      };
    } else {
      const raw = PRICE_DATA[selectedIdx] || PRICE_DATA[0];
      // Map structure name to index in structurePrices array (matches PL_STRUCTURES order)
      const STRUCT_INDEX = {
        'Without Structure': 0,
        'RCC Ballast': 1,
        'Sheetroof - Shortrail': 2,
        'L-Angle Without Ballast': 3,
        'L- Angle Without Ballast': 3,
        'Additional Work Above RCC': 4,
        'Additional Work Above Sheet Roof': 5,
      };
      const structIdx = STRUCT_INDEX[domesticStructure] ?? 0;
      const maxPrice = (raw.structurePrices && raw.structurePrices[structIdx] != null)
        ? raw.structurePrices[structIdx]
        : Math.round(raw.maxPrice * (DOMESTIC_STRUCTURE_MULTIPLIERS[domesticStructure] || 1.0));
      const offer = Array.isArray(raw.offers) ? raw.offers[structIdx] : raw.offer;
      return {
        ...raw,
        maxPrice,
        offer,
        structure: domesticStructure,
      };
    }
  }, [quoteType, selectedIdx, ciStructure, domesticStructure, microStructure, nonDcrStructure]);

  const ksebFees = getKsebFees(selected.invKw, paymentType);
  const structureCost = parseInt(structureCostRaw.replace(/[^0-9]/g, ''), 10) || 0;
  const discountAmount = applyDiscount ? selected.offer : 0;
  const subsidyAmount = includeSubsidy ? selected.subsidy : 0;
  const totalSystemCost = selected.maxPrice - discountAmount;
  const ksebTotal = ksebFees.feasibility + ksebFees.registration + ksebFees.agreement;
  const totalProjectCost = totalSystemCost + ksebTotal + structureCost;
  const endCustomerPrice = totalProjectCost - subsidyAmount;

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const handleClear = () => {
    setCustomer({
      name: '',
      phone: '',
      place: '',
      salesEngineer: 'Harshed illikkal',
      salesEngineerPhone: '9946236101',
      ksebBiMonthlyBill: '',
      ksebSection: '',
      companyName: 'SMART WAY SOLAR SOLUTIONS'
    });
    setPaymentType('cash');
    setStructureCostRaw('');
    setSelectedIdx(quoteType === 'ci' || quoteType === 'micro' || quoteType === 'non_dcr' ? 0 : 3);
    setSearchQuery('');
    setApplyDiscount(true);
    setIncludeSubsidy(true);
    setIncludeAmc(false);
    setCiStructure('RCC BALLAST');
    setDomesticStructure('Without Structure');
    setMicroStructure('Without Structure');
    setNonDcrStructure('Without Structure');
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfQuality, setPdfQuality] = useState('balanced');
  const [exportError, setExportError] = useState('');

  const handlePrint = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setExportError('');
    
    try {
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      // Let the disabled export button and loading state finish rendering
      // before html2canvas clones the quotation DOM.
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const root = docRef.current || document.querySelector('.quotation-wrapper');
      const pages = root?.querySelectorAll(subTab === 'latest' ? '.quotation-page' : '.page') || [];
      const quality = { compact: { scale: 1.25, jpeg: 0.8 }, balanced: { scale: 1.5, jpeg: 0.9 }, print: { scale: 2, jpeg: 0.95 } }[pdfQuality];
      await document.fonts.ready;
      // html2canvas can capture images that have already loaded even when
      // decode() rejects for a cached or optional image. Do not abort the
      // complete export because of one noncritical image.
      await Promise.all(Array.from(pages).flatMap(page => Array.from(page.querySelectorAll('img')).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      })));
      
      if (pages.length === 0) {
        throw new Error('No quotation pages are available to export.');
      }
      
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const canvas = await html2canvas(page, {
          scale: quality.scale,
          useCORS: true,
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/jpeg', quality.jpeg);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        const sheetHeight = pdf.internal.pageSize.getHeight();
        for (let offset = 0; offset < pdfHeight - 0.5; offset += sheetHeight) {
          if (i > 0 || offset > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, -offset, pdfWidth, pdfHeight);
        }
        canvas.width = 0;
        canvas.height = 0;
      }
      
      const recipient = customer.name || 'Customer';
      const comp = (customer.companyName || 'SmartWay').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`${comp}_Detailed_Proposal_${recipient.replace(/[^a-zA-Z0-9_-]/g, '_')}_${selected.dcKw}kW.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
      setExportError('PDF could not be generated. Check that all preview images have loaded, then try again.');
    }
    setIsGeneratingPdf(false);
  };

  const uniqueCapacities = useMemo(() => {
    if (quoteType === 'non_dcr') {
      return NON_DCR_PRICE_DATA.map((p, i) => ({
        idx: i,
        label: `${p.dcKw} kW (${p.phase}Ph) Non-DCR`,
        sub: `${p.modules} Mod · 600Wp · String (${p.phase}Ph)`,
        dcKw: p.dcKw,
        phase: p.phase
      }));
    } else if (quoteType === 'micro') {
      return MICRO_PRICE_DATA.map((p, i) => ({
        idx: i,
        label: `${p.dcKw} kW Micro`,
        sub: `${p.modules} Mod · Enphase · ${p.phase}Ph`,
        dcKw: p.dcKw,
        phase: p.phase
      }));
    } else if (quoteType === 'ci') {
      return CI_PRICE_DATA.map((p, i) => ({
        idx: i,
        label: `${p.dcKw} kWp`,
        sub: `${p.modules} Mod · ${p.inv2 ? `${p.inv1}kW+${p.inv2}kW` : `${p.inv1}kW`} Inverter`,
        dcKw: p.dcKw,
        phase: p.phase
      }));
    } else {
      return PRICE_DATA.map((p, i) => ({
        idx: i,
        label: `${p.dcKw}${p.isHybrid ? ' HYB' : ''}`,
        sub: p.isHybrid ? `${p.battery}kWh · ${p.phase}Ph` : `${p.modules} Mod · ${p.invKw ? `${p.invKw}kW · ` : ''}${p.phase}Ph`,
        dcKw: p.dcKw,
        phase: p.phase
      }));
    }
  }, [quoteType]);

  return (
    <div className="quotation-wrapper">
      <div className="q-shell">
        <header className="q-workspace-header q-editor-only">
          <div><span className="q-eyebrow">{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'} / SALES WORKSPACE</span><h1>Quotation studio<span>.</span></h1><p>Configure the system. Review the numbers. Send your proposal.</p></div>
          <span className="q-workspace-badge">Live preview · A4 export</span>
        </header>

        {/* ── TAB BAR ── */}
        <div className="q-tabbar">
          <button className={`q-tab ${subTab === 'generate_new' ? 'active' : ''}`} onClick={() => setSubTab('generate_new')}>
            <IconDoc /> Detailed proposal
          </button>
          <button className={`q-tab ${subTab === 'pricelist' ? 'active' : ''}`} onClick={() => setSubTab('pricelist')}>
            <IconList /> Price List
          </button>
          <label className="q-quality">PDF quality<select value={pdfQuality} onChange={e => setPdfQuality(e.target.value)} disabled={isGeneratingPdf}><option value="compact">Compact · sharing</option><option value="balanced">Balanced · recommended</option><option value="print">High · printing</option></select></label>
          <button className="q-pdf-btn" onClick={handlePrint} disabled={isGeneratingPdf} style={{ marginLeft: 'auto', background: '#059669', opacity: isGeneratingPdf ? 0.7 : 1, cursor: isGeneratingPdf ? 'not-allowed' : 'pointer' }}>
            {isGeneratingPdf ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 14, height: 14, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Generating...
              </span>
            ) : (
              <>
                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, marginRight: 8 }} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
                Download PDF
              </>
            )}
          </button>
        </div>
        {exportError && <p className="q-export-error q-editor-only" role="alert">{exportError}</p>}

        {/* ── CONTENT ── */}
        <div className="q-content">
          <div className="doc" ref={docRef}>
            {['latest', 'generate_new', 'generate'].includes(subTab) && (
              <section className="q-summary q-editor-only" aria-label="Quotation summary">
                <div><span>Selected system</span><strong>{selected.dcKw} <small>kWp</small></strong><p>{selected.modules} panels · {selected.invKw} kW inverter · {selected.phase}-phase</p></div>
                <div><span>Project total</span><strong>₹{totalProjectCost.toLocaleString('en-IN')}</strong><p>System + KSEB fees + additional work</p></div>
                <div className="q-summary-net"><span>Net after selected subsidy</span><strong>₹{endCustomerPrice.toLocaleString('en-IN')}</strong><p>{subsidyAmount ? `₹${subsidyAmount.toLocaleString('en-IN')} subsidy shown separately` : 'No subsidy deducted'}</p></div>
              </section>
            )}

            {/* ════════════════════════════════════════
                CAPACITY SELECTOR (always visible on generate tabs)
            ════════════════════════════════════════ */}
            {(subTab === 'generate' || subTab === 'generate_new' || subTab === 'latest') && (
              <div className="capacity-selector-card">
                <div className="cs-label">
                  <IconZap />
                  01 / System configuration <span>Choose a system and mounting option</span>
                </div>

                <div className="q-system-types" style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => { setQuoteType('domestic'); setSelectedIdx(3); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: quoteType === 'domestic' ? '#0d1f38' : '#fff',
                      color: quoteType === 'domestic' ? '#fff' : '#64748b'
                    }}
                  >
                    Domestic On-grid / Hybrid
                  </button>
                  <button
                    onClick={() => { setQuoteType('non_dcr'); setSelectedIdx(0); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: quoteType === 'non_dcr' ? '#0d1f38' : '#fff',
                      color: quoteType === 'non_dcr' ? '#fff' : '#64748b'
                    }}
                  >
                    Non DCR
                  </button>
                  <button
                    onClick={() => { setQuoteType('micro'); setSelectedIdx(0); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: quoteType === 'micro' ? '#0d1f38' : '#fff',
                      color: quoteType === 'micro' ? '#fff' : '#64748b'
                    }}
                  >
                    Micro Inverter (Enphase)
                  </button>
                  <button
                    onClick={() => { setQuoteType('ci'); setSelectedIdx(0); }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid #e2e8f0',
                      fontSize: 12,
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: quoteType === 'ci' ? '#0d1f38' : '#fff',
                      color: quoteType === 'ci' ? '#fff' : '#64748b'
                    }}
                  >
                    Commercial & Industrial (C&I)
                  </button>
                </div>

                {(subTab === 'generate_new' || subTab === 'latest') && (
                  <div style={{ marginBottom: 20, position: 'relative' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', background: '#f8fafc', padding: '10px 15px', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                      <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, color: '#64748b' }} fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                      <input
                        type="text"
                        placeholder="Search Lead or Customer by Name, Phone or Place..."
                        aria-label="Search leads and customers"
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true); }}
                        onFocus={() => setShowSearchResults(true)}
                        style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, width: '100%', color: '#0f172a' }}
                      />
                    </div>
                    {showSearchResults && searchResults.length > 0 && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', zIndex: 1000, marginTop: 5, overflow: 'hidden' }}>
                        {searchResults.map((res, i) => (
                          <button
                            key={i}
                            onClick={() => selectResult(res)}
                            style={{ width: '100%', textAlign: 'left', padding: '10px 15px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: i === searchResults.length - 1 ? 'none' : '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={e => e.currentTarget.style.background = 'none'}
                          >
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 800, color: '#0d1f38' }}>{res.name}</div>
                              <div style={{ fontSize: 11, fontWeight: 500, color: '#64748b' }}>{res.phone} · {res.place}</div>
                            </div>
                            <span style={{ fontSize: 9, fontWeight: 900, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 6, background: res._type === 'Lead' ? '#fef3c7' : '#dcfce7', color: res._type === 'Lead' ? '#92400e' : '#166534' }}>{res._type}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <fieldset className="q-capacity-options">
                  <legend>System capacity & inverter</legend>
                  <div className="q-capacity-grid">
                    {uniqueCapacities.map(c => (
                      <button
                        type="button"
                        key={c.idx}
                        className="q-capacity-button"
                        aria-pressed={selectedIdx === c.idx}
                        onClick={() => setSelectedIdx(c.idx)}
                      >
                        <strong>{c.dcKw} kWp{c.label.includes('HYB') ? ' · Hybrid' : ''}</strong>
                        <span>{c.sub}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>
                {/* Customer Details & Payment Type */}
                <div className="q-settings-grid">
                  <h2 className="q-group-heading">02 / Customer details<span>Search above to fill from an existing lead or customer.</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Company Name</label>
                    <input
                      type="text"
                      value={customer.companyName || ''}
                      aria-label="Company name"
                      onChange={e => setCustomer(p => ({ ...p, companyName: e.target.value.toUpperCase() }))}
                      placeholder="SMART WAY SOLAR SOLUTIONS"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 170 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Customer Name</label>
                    <input
                      type="text"
                      value={customer.name}
                      aria-label="Customer name"
                      onChange={e => setCustomer(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                      placeholder="CUSTOMER NAME"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 160 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</label>
                    <input
                      type="text"
                      value={customer.phone}
                      aria-label="Customer phone"
                      onChange={e => setCustomer(p => ({ ...p, phone: e.target.value }))}
                      placeholder="Phone Number"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 130 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Place</label>
                    <input
                      type="text"
                      value={customer.place}
                      aria-label="Place"
                      onChange={e => setCustomer(p => ({ ...p, place: e.target.value.toUpperCase() }))}
                      placeholder="PLACE"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 120 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Who Prepared (Sales Rep)</label>
                    <input
                      type="text"
                      value={customer.salesEngineer || ''}
                      onChange={e => setCustomer(p => ({ ...p, salesEngineer: e.target.value.toUpperCase() }))}
                      placeholder="e.g. HARSHED ILLIKKAL"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 150 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Footer Phone (Contact)</label>
                    <input
                      type="text"
                      value={customer.salesEngineerPhone || ''}
                      onChange={e => setCustomer(p => ({ ...p, salesEngineerPhone: e.target.value }))}
                      placeholder="e.g. 9946236101"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 130 }}
                    />
                  </div>

                  <h2 className="q-group-heading">03 / Pricing & inclusions<span>Review these selections against the site requirements before sharing.</span></h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Payment Type</label>
                    <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
                      <button
                        onClick={() => setPaymentType('cash')}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: paymentType === 'cash' ? '#0d1f38' : '#f8fafc', color: paymentType === 'cash' ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >Cash</button>
                      <button
                        onClick={() => setPaymentType('loan')}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: paymentType === 'loan' ? '#1e40af' : '#f8fafc', color: paymentType === 'loan' ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >Loan</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Discount / Offer</label>
                    <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
                      <button
                        onClick={() => setApplyDiscount(true)}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: applyDiscount ? '#059669' : '#f8fafc', color: applyDiscount ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >Apply Offer</button>
                      <button
                        onClick={() => setApplyDiscount(false)}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: !applyDiscount ? '#ef4444' : '#f8fafc', color: !applyDiscount ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >No Offer</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subsidy</label>
                    <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1.5px solid #e2e8f0' }}>
                      <button
                        onClick={() => setIncludeSubsidy(true)}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: includeSubsidy ? '#059669' : '#f8fafc', color: includeSubsidy ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >With Subsidy</button>
                      <button
                        onClick={() => setIncludeSubsidy(false)}
                        style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, background: !includeSubsidy ? '#ef4444' : '#f8fafc', color: !includeSubsidy ? '#fff' : '#64748b', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      >Without Subsidy</button>
                    </div>
                  </div>


                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Structure Type</label>
                    <select
                      value={quoteType === 'non_dcr' ? nonDcrStructure : quoteType === 'micro' ? microStructure : quoteType === 'ci' ? ciStructure : domesticStructure}
                      onChange={e => {
                        if (quoteType === 'non_dcr') {
                          setNonDcrStructure(e.target.value);
                        } else if (quoteType === 'micro') {
                          setMicroStructure(e.target.value);
                        } else if (quoteType === 'ci') {
                          setCiStructure(e.target.value);
                        } else {
                          setDomesticStructure(e.target.value);
                        }
                      }}
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', background: '#fff', height: 31, minWidth: 160 }}
                    >
                      {quoteType === 'non_dcr' || quoteType === 'micro' ? (
                        ['Without Structure', 'Additional Work Above RCC', 'Additional Work Above Sheet Roof', 'RCC Ballast', 'Sheetroof - Shortrail', 'L- Angle Without Ballast'].map(struct => (
                          <option key={struct} value={struct}>{struct}</option>
                        ))
                      ) : quoteType === 'ci' ? (
                        Object.keys(CI_PRICE_DATA[selectedIdx]?.structures || {}).map(struct => (
                          <option key={struct} value={struct}>{struct}</option>
                        ))
                      ) : (
                        PL_STRUCTURES.map(struct => (
                          <option key={struct} value={struct}>{struct}</option>
                        ))
                      )}
                    </select>
                  </div>
                  {/* Structure Cost */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Structure Cost (₹) <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>optional</span></label>
                    <input
                      type="text"
                      value={structureCostRaw}
                      onChange={e => setStructureCostRaw(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="e.g. 25000"
                      autoComplete="off"
                      style={{ border: '1.5px solid #e2e8f0', borderRadius: 8, padding: '6px 10px', fontSize: 12, fontWeight: 600, outline: 'none', minWidth: 120 }}
                    />
                  </div>
                  {/* Actions */}
                  <div className="q-settings-actions" style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginLeft: 'auto' }}>
                    <button
                      onClick={handleClear}
                      style={{ padding: '6px 16px', fontSize: 11, fontWeight: 700, background: '#fee2e2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { e.target.style.background = '#dc2626'; e.target.style.color = '#fff'; }}
                      onMouseLeave={e => { e.target.style.background = '#fee2e2'; e.target.style.color = '#dc2626'; }}
                    >✕ Clear</button>
                    <button
                      onClick={handlePrint}
                      disabled={isGeneratingPdf}
                      style={{ padding: '6px 20px', fontSize: 12, fontWeight: 800, background: '#059669', color: '#fff', border: '1.5px solid #047857', borderRadius: 8, cursor: isGeneratingPdf ? 'not-allowed' : 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 14px -4px rgba(5, 150, 105, 0.4)', opacity: isGeneratingPdf ? 0.7 : 1 }}
                      onMouseEnter={e => { if (!isGeneratingPdf) e.target.style.background = '#047857'; }}
                      onMouseLeave={e => { if (!isGeneratingPdf) e.target.style.background = '#059669'; }}
                    >
                      {isGeneratingPdf ? (
                        <>
                          <div style={{ width: 14, height: 14, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                          Wait...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
                          Generate PDF
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════
                PREMIUM PROPOSAL (generate_new) — 4 PAGES
            ════════════════════════════════════════ */}
            {subTab === 'generate_new' && (
              <>
                {/* PAGE 1: PREMIUM FULL-BLEED COVER */}
                <div className="page p1-page">

                  {/* Full-bleed Background Photo */}
                  <div className="p1-bg">
                    <img src="/solar frontpage.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="p1-overlay"></div>

                  {/* Top Bar */}
                  <div className="p1-topbar">
                    <img src="/transp.png" alt="Solartech" className="p1-topbar-logo" />
                    <div className="p1-proposal-badge">
                      SW / {new Date().getFullYear()} / {String(selectedIdx + 1).padStart(4, '0')}
                    </div>
                  </div>

                  {/* Center Headline */}
                  <div className="p1-center">
                    <div className="p1-eyebrow">SOLAR ENERGY PROPOSAL</div>
                    <h1 className="p1-headline">
                      Powering Your<br />
                      <span className="p1-headline-glow">Future</span><br />
                      with Clean Energy
                    </h1>
                    <div className="p1-system-chip">
                      <span className="p1-chip-dot"></span>
                      {selected.isHybrid ? `HYBRID (${selected.battery}kWh)` : 'ONGRID'} · {selected.dcKw} kW · {today}
                    </div>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="p1-bottom">
                    <div className="p1-client-block">
                      <div className="p1-info-label">PREPARED FOR</div>
                      <div className="p1-client-name">{customer.name || 'Customer Name'}</div>
                      {(customer.place || customer.phone) && (
                        <div className="p1-client-sub">{customer.place}{customer.place && customer.phone ? ' · ' : ''}{customer.phone}</div>
                      )}
                    </div>

                    <div className="p1-divider-v"></div>
                    <div className="p1-company-block">
                      <div className="p1-info-label">PREPARED BY</div>
                      <div className="p1-company-name">{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'}</div>
                      {customer.salesEngineer && (
                        <div style={{ fontSize: 11, color: '#f8fafc', fontWeight: 700, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Rep: {customer.salesEngineer} {customer.salesEngineerPhone ? `· ${customer.salesEngineerPhone}` : ''}
                        </div>
                      )}
                      <div className="p1-company-addr">Nilambur, Malappuram, Kerala</div>
                    </div>
                    <div className="p1-divider-v"></div>

                    <div className="p1-meta-block">
                      <div className="p1-info-label">DATE</div>
                      <div className="p1-meta-val">{today}</div>
                      <div className="p1-info-label" style={{ marginTop: '10px' }}>TIME</div>
                      <div className="p1-meta-val">{new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Header strip at bottom-most */}
                  <div className="p1-header-strip">
                    <img src="/tatapower transp.png" alt="Tata Power Solaroof" className="p1-header-img" />
                  </div>

                </div>

                {/* PAGE 2: ACTUAL QUOTATION */}
                <div className="page p3-page" style={{ backgroundColor: '#0F172A', color: '#F8FAFC', width: '794px', minHeight: '1122px', height: '1122px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                  <div className="p3-header" style={{ paddingBottom: 12 }}>
                    <div className="p3-header-text">
                      <p className="p3-subtitle">FINANCIAL SUMMARY</p>
                      <h2 className="p3-title">Project <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Quotation</span></h2>
                    </div>
                    <img src="/transp.png" alt="Solartech" className="p3-logo-premium" />
                  </div>

                  <div className="p3-content" style={{ padding: '0 60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B', marginBottom: 4 }}>{selected.dcKw} kW {selected.isHybrid ? 'Hybrid' : 'Ongrid'} System</div>
                      <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>{customer.name ? `Prepared for: ${customer.name}` : 'Detailed Pricing Breakdown'}</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px 16px', color: '#F1F5F9', fontWeight: 600 }}>
                              Estimated Price <br /><span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>({selected.structure || 'Without Structure'})</span>
                            </td>
                            <td style={{ textAlign: 'right', padding: '12px 16px', color: '#F8FAFC', fontWeight: 700, fontSize: 14 }}>{fmt(selected.maxPrice)}</td>
                          </tr>
                          {applyDiscount && (
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(16, 185, 129, 0.05)' }}>
                              <td style={{ padding: '12px 16px', color: '#F1F5F9', fontWeight: 600 }}>
                                Special Offer <br /><span style={{ fontSize: '11px', color: '#10B981', fontWeight: 500 }}>(Discount)</span>
                              </td>
                              <td style={{ textAlign: 'right', padding: '12px 16px', color: '#10B981', fontWeight: 800, fontSize: 14 }}>– {fmt(selected.offer)}</td>
                            </tr>
                          )}
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                            <td style={{ padding: '12px 16px', color: '#3B82F6', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total System Cost</td>
                            <td style={{ textAlign: 'right', padding: '12px 16px', color: '#3B82F6', fontWeight: 800, fontSize: 15 }}>{fmt(totalSystemCost)}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px 16px', color: '#CBD5E1', fontWeight: 500 }}>Feasibility (KSEB)</td>
                            <td style={{ textAlign: 'right', padding: '12px 16px', color: '#CBD5E1', fontWeight: 600 }}>{fmt(ksebFees.feasibility)}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px 16px', color: '#CBD5E1', fontWeight: 500 }}>
                              Registration Fee (KSEB)
                            </td>
                            <td style={{ textAlign: 'right', padding: '12px 16px', color: '#CBD5E1', fontWeight: 600 }}>{fmt(ksebFees.registration)}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '12px 16px', color: '#CBD5E1', fontWeight: 500 }}>
                              Agreement (KSEB)
                              {paymentType === 'loan' && (
                                <span style={{ fontSize: 11, color: '#3B82F6', fontWeight: 600, marginLeft: 8 }}>(KSEB, Loan)</span>
                              )}
                            </td>
                            <td style={{ textAlign: 'right', padding: '12px 16px', color: '#CBD5E1', fontWeight: 600 }}>{fmt(ksebFees.agreement)}</td>
                          </tr>
                          {structureCost > 0 ? (
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(245, 158, 11, 0.05)' }}>
                              <td style={{ padding: '12px 16px', color: '#F1F5F9', fontWeight: 600 }}>Structure Cost</td>
                              <td style={{ textAlign: 'right', padding: '12px 16px', color: '#F59E0B', fontWeight: 700 }}>{fmt(structureCost)}</td>
                            </tr>
                          ) : (
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <td style={{ padding: '12px 16px', color: '#CBD5E1', fontWeight: 500 }}>Structure Cost</td>
                              <td style={{ textAlign: 'right', padding: '12px 16px', color: '#94A3B8', fontSize: 11, fontStyle: 'italic', fontWeight: 500 }}>
                                Depends on type of roof &amp; site conditions
                              </td>
                            </tr>
                          )}
                          <tr style={{ borderBottom: (includeSubsidy && selected.subsidy > 0) ? '1px solid rgba(255,255,255,0.05)' : 'none', background: 'rgba(16, 185, 129, 0.1)' }}>
                            <td style={{ padding: '16px 16px', color: '#10B981', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              ✦ Total Project Cost
                            </td>
                            <td style={{ textAlign: 'right', padding: '16px 16px', color: '#10B981', fontWeight: 900, fontSize: 20, whiteSpace: 'nowrap' }}>{fmt(totalProjectCost)}</td>
                          </tr>
                          {includeSubsidy && selected.subsidy > 0 && (
                            <tr style={{ borderBottom: 'none', background: 'rgba(239, 68, 68, 0.05)' }}>
                              <td style={{ padding: '12px 16px', color: '#F1F5F9', fontWeight: 600 }}>
                                Available Subsidy <br /><span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 500 }}>(PM Surya Ghar)</span>
                              </td>
                              <td style={{ textAlign: 'right', padding: '12px 16px', color: '#EF4444', fontWeight: 800, fontSize: 14 }}>– {fmt(selected.subsidy)}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
 
                    {structureCost === 0 && (!selected.structure || selected.structure === 'Without Structure') && (
                      <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #F59E0B', borderRadius: 8 }}>
                        <p style={{ margin: 0, fontSize: 12, color: '#FCD34D', fontWeight: 500, lineHeight: 1.5 }}>
                          <strong style={{ color: '#F59E0B' }}>Structure Note:</strong> Structure fabrication and mounting costs depend on the specific roof type and site elevation, finalized upon physical site inspection. Hard rock drilling (for earth pit), if required, is additional based on ground conditions.
                        </p>
                      </div>
                    )}

                  </div>

                  <div className="p3-footer-premium">
                    <div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Proposal For</div>
                      <div style={{ fontSize: 16, color: '#F1F5F9', fontWeight: 700 }}>{customer.name || 'Valued Customer'}</div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginTop: 2 }}>
                        Prepared by: <span style={{ color: '#F59E0B' }}>{customer.salesEngineer || 'Harshed illikkal'}</span> &nbsp;·&nbsp; 📞 <span style={{ color: '#38BDF8' }}>{customer.salesEngineerPhone || '9946236101'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#CBD5E1', fontWeight: 800 }}>{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em' }}>PAGE 02 / 04</span>
                    </div>
                  </div>
                </div>

                
{/* PAGE 3: BILL OF MATERIALS */}
                <div className="page p3-page" style={{ backgroundColor: '#0F172A', color: '#F8FAFC', width: '794px', minHeight: '1122px', height: '1122px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                  <div className="p3-header" style={{ paddingBottom: 20 }}>
                    <div className="p3-header-text">
                      <p className="p3-subtitle">TECHNICAL SPECIFICATION</p>
                      <h2 className="p3-title">Bill of <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Materials</span></h2>
                    </div>
                    <img src="/transp.png" alt="Solartech" className="p3-logo-premium" />
                  </div>

                  <div className="p3-content" style={{ padding: '0 60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: 32 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B', marginBottom: 6 }}>{selected.dcKw} kW {selected.isHybrid ? 'Hybrid' : 'Ongrid'} String Inverter System</div>
                      <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>{selected.modules} × {selected.panelCapacity || 580} WP High-Efficiency Bifacial Modules</div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                            <th style={{ textAlign: 'center', padding: '16px 12px', color: '#94A3B8', textTransform: 'uppercase', width: '40px', fontWeight: 800, letterSpacing: '0.05em' }}>#</th>
                            <th style={{ textAlign: 'left', padding: '16px 12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Description of Supply Items</th>
                            <th style={{ textAlign: 'center', padding: '16px 12px', color: '#94A3B8', textTransform: 'uppercase', width: '60px', fontWeight: 800, letterSpacing: '0.05em' }}>Qty</th>
                            <th style={{ textAlign: 'left', padding: '16px 12px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Make / Vendor</th>
                            <th style={{ textAlign: 'center', padding: '16px 12px', color: '#94A3B8', textTransform: 'uppercase', width: '60px', fontWeight: 800, letterSpacing: '0.05em' }}>UoM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getBomRows(selected).map((item, idx) => (
                            <tr key={item.id} style={{ borderBottom: idx === 9 ? 'none' : '1px solid rgba(255,255,255,0.05)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                              <td style={{ textAlign: 'center', padding: '18px 12px', color: '#64748B', fontWeight: 700, fontSize: 13 }}>{String(item.id).padStart(2, '0')}</td>
                              <td style={{ padding: '18px 12px', color: '#F1F5F9', fontSize: 13, lineHeight: 1.4 }}>{item.bold ? <strong style={{ color: '#14B8A6', fontWeight: 800 }}>{item.desc}</strong> : item.desc}</td>
                              <td style={{ textAlign: 'center', padding: '18px 12px', fontWeight: 900, color: '#F59E0B', fontSize: 14 }}>{item.qty}</td>
                              <td style={{ padding: '18px 12px', color: '#CBD5E1', fontSize: 12, fontWeight: 500 }}>{item.make}</td>
                              <td style={{ textAlign: 'center', padding: '18px 12px' }}>
                                <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: 6, fontSize: 10, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase' }}>{item.uom}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p3-footer-premium">
                    <div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Proposal For</div>
                      <div style={{ fontSize: 16, color: '#F1F5F9', fontWeight: 700 }}>{customer.name || 'Valued Customer'}</div>
                      <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginTop: 2 }}>
                        Prepared by: <span style={{ color: '#F59E0B' }}>{customer.salesEngineer || 'Harshed illikkal'}</span> &nbsp;·&nbsp; 📞 <span style={{ color: '#38BDF8' }}>{customer.salesEngineerPhone || '9946236101'}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                      <span style={{ fontSize: 11, color: '#CBD5E1', fontWeight: 800 }}>{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em' }}>PAGE 03 / 04</span>
                    </div>
                  </div>
                </div>

                
                {/* PAGE 4: GUARANTEES, SCOPE & ENVIRONMENTAL IMPACT */}
                <div className="page p3-page" style={{ backgroundColor: '#0F172A', color: '#F8FAFC', width: '794px', minHeight: '1122px', height: '1122px', display: 'flex', flexDirection: 'column', margin: '0 auto' }}>
                  {(() => {
                    const kw = selected.dcKw;
                    const monthlyGen = Math.round(kw * 5.0 * 0.8 * 30);
                    const annualGen = monthlyGen * 12;
                    const co2 = (annualGen * 0.7) / 1000;
                    const trees = Math.round(co2 * 45);

                    return (
                      <>
                        <div className="p3-header" style={{ paddingBottom: 16 }}>
                          <div className="p3-header-text">
                            <p className="p3-subtitle">SMART WAY SOLAR EXCELLENCE</p>
                            <h2 className="p3-title">Guarantees &amp; <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Scope</span></h2>
                          </div>
                          <img src="/transp.png" alt="logo" className="p3-logo-premium" />
                        </div>

                        <div className="p3-content" style={{ padding: '0 60px', flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                          
                          {/* 1. WARRANTY & GUARANTEE CARDS */}
                          <div>
                            <div style={{ fontSize: 10, color: '#F59E0B', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                              Comprehensive Tier-1 Warranties
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                                <div style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>30 <span style={{ fontSize: 12, fontWeight: 700 }}>Yrs</span></div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#F1F5F9', marginTop: 6 }}>Solar PV Modules</div>
                                <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>Linear Performance Guarantee</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                                <div style={{ fontSize: 26, fontWeight: 900, color: '#10B981', lineHeight: 1 }}>8 <span style={{ fontSize: 12, fontWeight: 700 }}>Yrs</span></div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#F1F5F9', marginTop: 6 }}>Grid Inverter</div>
                                <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>Replacement Warranty</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                                <div style={{ fontSize: 26, fontWeight: 900, color: '#38BDF8', lineHeight: 1 }}>5 <span style={{ fontSize: 12, fontWeight: 700 }}>Yrs</span></div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#F1F5F9', marginTop: 6 }}>BOS &amp; Structure</div>
                                <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>Balance of System Warranty</div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                                <div style={{ fontSize: 26, fontWeight: 900, color: '#A855F7', lineHeight: 1 }}>24/7</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#F1F5F9', marginTop: 6 }}>Cloud Telemetry</div>
                                <div style={{ fontSize: 9, color: '#94A3B8', marginTop: 2 }}>Smart Real-time Monitoring</div>
                              </div>
                            </div>
                          </div>

                          {/* 2. TURNKEY SCOPE OF DELIVERY */}
                          <div>
                            <div style={{ fontSize: 10, color: '#38BDF8', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                              Turnkey EPC Deliverables Included
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 20 }}>📐</span>
                                <div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>Civil &amp; Roof Engineering</div>
                                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, lineHeight: 1.4 }}>Site shadow analysis, customized hot-dip galvanized mounting structure &amp; SS-304 fastener assembly.</div>
                                </div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 20 }}>⚡</span>
                                <div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>KSEB Net-Meter Synchronization</div>
                                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, lineHeight: 1.4 }}>Complete online documentation, feasibility registration, KSEB inspection and net-meter commissioning.</div>
                                </div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 20 }}>🛡️</span>
                                <div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>Dedicated Safety &amp; Protection</div>
                                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, lineHeight: 1.4 }}>3-tier chemical earthing pits with copper bonded rods, Class-II SPD surge arresters &amp; lightning protection.</div>
                                </div>
                              </div>
                              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                <span style={{ fontSize: 20 }}>📱</span>
                                <div>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>Smart Wi-Fi Cloud Monitoring</div>
                                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2, lineHeight: 1.4 }}>Real-time mobile app tracking daily solar yield, grid export units and monthly electricity savings.</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3. ENVIRONMENTAL CONTRIBUTION */}
                          <div>
                            <div style={{ fontSize: 10, color: '#10B981', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                              Your Clean Energy &amp; Environmental Contribution
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                              <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                                <div style={{ fontSize: 28, marginBottom: 4 }}>🌿</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#10B981' }}>{trees} Trees</div>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>Equivalent Trees Planted / Year</div>
                              </div>
                              <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                                <div style={{ fontSize: 28, marginBottom: 4 }}>☁️</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8' }}>{co2.toFixed(1)} Tons</div>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>CO2 Avoided Every Year</div>
                              </div>
                              <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 12, padding: '16px', textAlign: 'center' }}>
                                <div style={{ fontSize: 28, marginBottom: 4 }}>⚡</div>
                                <div style={{ fontSize: 20, fontWeight: 800, color: '#F59E0B' }}>{annualGen.toLocaleString('en-IN')} kWh</div>
                                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>Annual Clean Solar Generation</div>
                              </div>
                            </div>
                          </div>

                          {/* 4. COMPANY & DIRECT SUPPORT CONTACT */}
                          <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Authorised EPC Partner</div>
                              <div style={{ fontSize: 16, color: '#F1F5F9', fontWeight: 900, marginTop: 2 }}>{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'}</div>
                              <div style={{ fontSize: 11, color: '#CBD5E1', marginTop: 4 }}>Nilambur, Malappuram Dist, Kerala &nbsp;·&nbsp; smartwaysolar@gmail.com</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sales &amp; Engineering Desk</div>
                              <div style={{ fontSize: 14, color: '#F59E0B', fontWeight: 800, marginTop: 2 }}>{customer.salesEngineer || 'Harshed illikkal'}</div>
                              <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 800, marginTop: 2 }}>📞 {customer.salesEngineerPhone || '9946236101'}</div>
                            </div>
                          </div>

                        </div>

                        <div className="p3-footer-premium">
                          <div>
                            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Proposal For</div>
                            <div style={{ fontSize: 16, color: '#F1F5F9', fontWeight: 700 }}>{customer.name || 'Valued Customer'}</div>
                            <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600, marginTop: 2 }}>
                              Prepared by: <span style={{ color: '#F59E0B' }}>{customer.salesEngineer || 'Harshed illikkal'}</span> &nbsp;·&nbsp; 📞 <span style={{ color: '#38BDF8' }}>{customer.salesEngineerPhone || '9946236101'}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                            <span style={{ fontSize: 11, color: '#CBD5E1', fontWeight: 800 }}>{customer.companyName || 'SMART WAY SOLAR SOLUTIONS'}</span>
                            <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em' }}>PAGE 04 / 04</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
</>
            )}

            {subTab === 'pricelist' && (
              <div className="page p3-page" style={{ backgroundColor: '#0F172A', color: '#F8FAFC', width: '794px', minHeight: '1122px', height: 'auto', display: 'flex', flexDirection: 'column', margin: '0 auto', overflow: 'visible', borderRadius: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 30px -5px rgba(15,39,68,0.12)' }}>
                <div className="p3-header" style={{ paddingBottom: 20 }}>
                  <div className="p3-header-text">
                    <p className="p3-subtitle">SYSTEM CONFIGURATION & PRICING</p>
                    <h2 className="p3-title">Investment<br /><span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Summary</span></h2>
                  </div>
                  <img src="/transp.png" alt="Solartech" className="p3-logo-premium" />
                </div>

                <div className="p3-content" style={{ paddingTop: 10 }}>
                  <div className="p3-card" style={{ padding: 24, background: 'rgba(255,255,255,0.03)', overflow: 'visible' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                      <div>
                        <p style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 4px' }}>
                          EFFECTIVE DATE: {quoteType === 'micro' ? '07-08-2026' : quoteType === 'ci' ? '27-07-2026' : '07-08-2026'}
                        </p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <button
                            onClick={() => { setQuoteType('domestic'); setSelectedIdx(3); }}
                            style={{
                              padding: '4px 10px',
                              fontSize: 10,
                              fontWeight: 800,
                              background: quoteType === 'domestic' ? '#F59E0B' : 'rgba(255,255,255,0.05)',
                              color: quoteType === 'domestic' ? '#0F172A' : '#94A3B8',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >Domestic</button>
                          <button
                            onClick={() => { setQuoteType('non_dcr'); setSelectedIdx(0); }}
                            style={{
                              padding: '4px 10px',
                              fontSize: 10,
                              fontWeight: 800,
                              background: quoteType === 'non_dcr' ? '#F59E0B' : 'rgba(255,255,255,0.05)',
                              color: quoteType === 'non_dcr' ? '#0F172A' : '#94A3B8',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >Non DCR</button>
                          <button
                            onClick={() => { setQuoteType('micro'); setSelectedIdx(0); }}
                            style={{
                              padding: '4px 10px',
                              fontSize: 10,
                              fontWeight: 800,
                              background: quoteType === 'micro' ? '#F59E0B' : 'rgba(255,255,255,0.05)',
                              color: quoteType === 'micro' ? '#0F172A' : '#94A3B8',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >Micro Inverter (Enphase)</button>
                          <button
                            onClick={() => { setQuoteType('ci'); setSelectedIdx(0); }}
                            style={{
                              padding: '4px 10px',
                              fontSize: 10,
                              fontWeight: 800,
                              background: quoteType === 'ci' ? '#F59E0B' : 'rgba(255,255,255,0.05)',
                              color: quoteType === 'ci' ? '#0F172A' : '#94A3B8',
                              border: 'none',
                              borderRadius: 4,
                              cursor: 'pointer'
                            }}
                          >C&I (Commercial & Industrial)</button>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span style={{ fontSize: 10, color: '#F59E0B', fontWeight: 700, border: '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px' }}>GST INCLUDED</span>
                        {quoteType === 'non_dcr' ? (
                          <span style={{ fontSize: 10, color: '#EF4444', fontWeight: 700, border: '1px solid #EF4444', padding: '2px 8px', borderRadius: '4px' }}>NO SUBSIDY FOR NON-DCR</span>
                        ) : quoteType !== 'ci' ? (
                          <span style={{ fontSize: 10, color: '#3B82F6', fontWeight: 700, border: '1px solid #3B82F6', padding: '2px 8px', borderRadius: '4px' }}>PM SURYA GHAR SUBSIDY</span>
                        ) : null}
                      </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                      <thead>
                        {quoteType === 'non_dcr' || quoteType === 'micro' ? (
                          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>System ({quoteType === 'non_dcr' ? '600 Wp Non-DCR' : '560 Wp DCR'})</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Phase</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Structure</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Max Price (8.9% GST)</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#EF4444', textTransform: 'uppercase' }}>Special Offer</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#F8FAFC', textTransform: 'uppercase' }}>Offer Price (8.9% GST)</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#3B82F6', textTransform: 'uppercase' }}>Subsidy</th>
                          </tr>
                        ) : quoteType === 'ci' ? (
                          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>System (580 Wp DCR)</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Inverter</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Structure</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Max Price (8.9% GST)</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Offer Price (8.9% GST)</th>
                          </tr>
                        ) : (
                          <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>System</th>
                            <th style={{ textAlign: 'left', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Structure</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Max Price</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#94A3B8', textTransform: 'uppercase' }}>Offer</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#F59E0B', textTransform: 'uppercase' }}>Net Price</th>
                            <th style={{ textAlign: 'right', padding: '12px 8px', color: '#3B82F6', textTransform: 'uppercase' }}>Subsidy</th>
                          </tr>
                        )}
                      </thead>
                      <tbody>
                        {quoteType === 'non_dcr' ? (
                          NON_DCR_PRICE_DATA.map((p, pi) => {
                            const isSelectedSystem = pi === selectedIdx;
                            const availableStructs = Object.keys(p.structures);
                            
                            return availableStructs.map((struct, si) => {
                              const structData = p.structures[struct];
                              const mp = structData.maxPrice;
                              const offer = structData.offer;
                              const op = structData.offerPrice;
                              const isSelectedRow = isSelectedSystem && struct === nonDcrStructure;

                              return (
                                <tr key={`${pi}-${struct}`} style={{
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  backgroundColor: isSelectedRow ? 'rgba(245, 158, 11, 0.08)' : 'transparent'
                                }}>
                                  <td style={{ padding: '8px 8px', fontWeight: 600 }}>
                                    {si === 0 ? `${p.dcKw} kW (${p.modules} Mod)` : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>
                                    {si === 0 ? `${p.phase} Phase` : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>{struct}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#64748B' }}>₹{mp.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#EF4444' }}>-₹{offer.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 700, color: '#F8FAFC' }}>₹{op.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#94A3B8', fontWeight: 600 }}>₹0 (No Subsidy)</td>
                                </tr>
                              );
                            });
                          })
                        ) : quoteType === 'micro' ? (
                          MICRO_PRICE_DATA.map((p, pi) => {
                            const isSelectedSystem = pi === selectedIdx;
                            const availableStructs = Object.keys(p.structures);
                            
                            return availableStructs.map((struct, si) => {
                              const structData = p.structures[struct];
                              const mp = structData.maxPrice;
                              const offer = structData.offer;
                              const op = structData.offerPrice;
                              const isSelectedRow = isSelectedSystem && struct === microStructure;

                              return (
                                <tr key={`${pi}-${struct}`} style={{
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  backgroundColor: isSelectedRow ? 'rgba(245, 158, 11, 0.08)' : 'transparent'
                                }}>
                                  <td style={{ padding: '8px 8px', fontWeight: 600 }}>
                                    {si === 0 ? `${p.dcKw} kW (${p.modules} Mod)` : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>
                                    {si === 0 ? `${p.phase} Phase` : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>{struct}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#64748B' }}>₹{mp.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#EF4444' }}>-₹{offer.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 700, color: '#F8FAFC' }}>₹{op.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#3B82F6', fontWeight: 600 }}>₹{p.subsidy.toLocaleString()}</td>
                                </tr>
                              );
                            });
                          })
                        ) : quoteType === 'ci' ? (
                          CI_PRICE_DATA.map((p, pi) => {
                            const isSelectedSystem = pi === selectedIdx;
                            const availableStructs = Object.keys(p.structures);
                            
                            return availableStructs.map((struct, si) => {
                              const structData = p.structures[struct];
                              const mp = structData.maxPrice;
                              const op = structData.offerPrice;
                              const isSelectedRow = isSelectedSystem && struct === ciStructure;

                              return (
                                <tr key={`${pi}-${struct}`} style={{
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  backgroundColor: isSelectedRow ? 'rgba(245, 158, 11, 0.08)' : 'transparent'
                                }}>
                                  <td style={{ padding: '8px 8px', fontWeight: 600 }}>
                                    {si === 0 ? `${p.dcKw} kWp (${p.modules} Mod)` : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>
                                    {si === 0 ? (p.inv2 ? `${p.inv1}kW+${p.inv2}kW` : `${p.inv1}kW`) : ''}
                                  </td>
                                  <td style={{ padding: '8px 8px', color: '#CBD5E1' }}>{struct}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', color: '#64748B' }}>₹{mp.toLocaleString()}</td>
                                  <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 700, color: '#F8FAFC' }}>₹{op.toLocaleString()}</td>
                                </tr>
                              );
                            });
                          })
                        ) : (
                          PRICE_DATA.map((p, pi) => {
                            if (p.isHybrid) return null;
                            const structurePrices = p.structurePrices;
                            const isSelectedSystem = pi === selectedIdx;

                            return PL_STRUCTURES.map((struct, si) => {
                              const mp = structurePrices[si];
                              const off = Array.isArray(p.offers) ? p.offers[si] : p.offer;
                              const isSelectedRow = isSelectedSystem && si === 0;

                              return (
                                <tr key={`${pi}-${si}`} style={{
                                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                                  backgroundColor: isSelectedRow ? 'rgba(245, 158, 11, 0.08)' : 'transparent'
                                }}>
                                  <td style={{ padding: '10px 8px', fontWeight: 600 }}>
                                    {si === 0 ? `${p.dcKw} kW (${p.modules} Mod)` : ''}
                                  </td>
                                  <td style={{ padding: '10px 8px', color: '#CBD5E1' }}>{struct}</td>
                                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#64748B' }}>₹{mp.toLocaleString()}</td>
                                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#EF4444' }}>-₹{off.toLocaleString()}</td>
                                  <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: '#F8FAFC' }}>₹{(mp - off).toLocaleString()}</td>
                                  <td style={{ padding: '10px 8px', textAlign: 'right', color: '#3B82F6', fontWeight: 600 }}>₹{p.subsidy.toLocaleString()}</td>
                                </tr>
                              );
                            });
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div style={{ padding: '20px 40px' }}>
                  <h4 style={{ fontSize: 12, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Terms & Conditions</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
                    {(quoteType === 'non_dcr' ? [
                      '10 years Product Warranty and 30 years linear Power output warranty on solar modules',
                      'Modules with nDCR G12R TOPCon shall be supplied in the wattage range of 590 Wp to 610 Wp, depending on availability',
                      'The product shall be sold at the offered price',
                      'The inverters shall be of any of the following makes: GoodWe / Solis / Growatt / Sofar / Solax / any other Approved make',
                      'This price is based on non-DCR modules and is NOT eligible for subsidy',
                      'For String Inverter systems, Standard Inverter Warranty is for 8 years',
                      'Period O&M visit — twice a year for the first five years',
                      'Sheet Roof Structure Considered is Short Rail',
                      'BOS 5 year warranty included',
                      'Net meter charges extra; KSEB / CEIG charges extra',
                      'System price based on Standard BOM and includes 8.9% GST',
                      'Additional structure work under customer scope in L-Angle Without Ballast structure',
                    ] : quoteType === 'micro' ? [
                      '2 Nos. of CTs are provided as standard in all varieties. Any additional CTs required must be purchased separately',
                      '10 years product warranty + 25 years linear power output warranty on solar modules',
                      'For Enphase Micro Inverter systems, Standard Inverter Warranty is 15 years. Additional warranty extension charges extra',
                      'Period O&M visit — twice a year for the first five years',
                      'Chemical Anchoring if required is at additional cost',
                      'Sheet Roof Structure: Short Rail considered as standard',
                      'BOS 5 year warranty included',
                      'Net meter charges extra; KSEB / CEIG charges extra',
                      'System price based on Standard BOM and includes 8.9% GST',
                      'Additional structure work under customer scope in L-Angle Without Ballast structure',
                      'Subsidy applicable for Domestic Customers (LT 1A)',
                    ] : quoteType === 'ci' ? [
                      '10 years product warranty + 25 years linear power output warranty on solar modules',
                      'Inverter Make available: Goodwe & Sofar only (Supply based on availability)',
                      'Period O&M visit — twice a year for the first five years',
                      'Sheet Roof Structure: Short Rail considered as standard',
                      'Walkway and safety line are mandatory for sheet roofs (at additional cost)',
                      'Above 38kWp, transportation and unloading are under dealer scope',
                      'CEIG approval charges and KSEB fee extra',
                      'System price based on Standard BOM and includes 8.9% GST',
                      'Structure price is approximate and may vary depending upon site conditions',
                      'Subsidy is NOT applicable for C&I Customers',
                    ] : [
                      'For solar modules - 10 years Product Warranty and 30 years linear Power output warranty',
                      'Modules shall be supplied in the range of 580Wp to 595Wp depending on availability',
                      'The product shall be sold at the offered price',
                      'The inverters shall be of any of the following makes depending upon availability at the time of delivery: GoodWe / Solis / Growatt / Sofar / Solax / any other Approved make',
                      'For String Inverter systems, Standard Inverter Warranty is for 8 years',
                      'Period O&M visit — twice a year for the first five years',
                      'Sheet Roof Structure Considered is Short Rail',
                      'BOS 5 year warranty included',
                      'Net meter charges extra; KSEB / CEIG charges extra',
                      'System price based on Standard BOM and includes 8.9% GST',
                      'Additional structure work under customer scope in L-Angle Without Ballast structure',
                      'Subsidy applicable only for Domestic Customers (LT 1A)',
                    ]).map((note, i) => (
                      <div key={i} style={{ fontSize: 9, color: '#94A3B8', display: 'flex', gap: 8 }}>
                        <span style={{ color: '#3B82F6' }}>•</span> {note}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="p3-footer-premium">
                  <div>
                    <div style={{ fontSize: 10, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Investment Portfolio</div>
                    <div style={{ fontSize: 18, color: '#F1F5F9', fontWeight: 700 }}>Solar Tech Excellence</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <img src="/transp.png" alt="logo" style={{ height: 28, background: 'rgba(255,255,255,0.07)', borderRadius: 6, padding: '4px 10px' }} />
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.1em' }}>PAGE 05 / 05</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
