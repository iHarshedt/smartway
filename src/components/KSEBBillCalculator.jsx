import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sun, 
  Zap, 
  Layers, 
  TrendingDown, 
  DollarSign, 
  RotateCcw, 
  Printer, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  Activity,
  Sparkles,
  Award,
  Building2,
  Home
} from 'lucide-react';

export default function KSEBBillCalculator({ initialCustomer, onCustomerSelect }) {
  // Category & Tariff Setup
  const [category, setCategory] = useState(initialCustomer?.tariff?.includes('commercial') ? 'commercial_lt7a' : 'domestic');
  const [billingPeriod, setBillingPeriod] = useState(initialCustomer?.tariff?.includes('commercial') ? 'monthly' : 'bimonthly');
  const [connectedLoadKW, setConnectedLoadKW] = useState(
    initialCustomer?.loadKW || (initialCustomer?.capacityKW ? Math.max(1, Math.round(initialCustomer.capacityKW)) : 3)
  );
  
  // Form State matching Official Kerala KSEB Bill Layout (Bilingual Malayalam + English)
  const [phase, setPhase] = useState(
    initialCustomer?.phase || ((initialCustomer?.capacityKW > 4 || initialCustomer?.loadKW > 4) ? '3PH' : '1PH')
  );
  const [meterOwner, setMeterOwner] = useState('kseb');
  const [previousBankBalance, setPreviousBankBalance] = useState(0);
  const [hasSolar, setHasSolar] = useState(true);

  // Sync if initialCustomer updates
  useEffect(() => {
    if (initialCustomer) {
      if (initialCustomer.tariff) {
        setCategory(initialCustomer.tariff.includes('commercial') ? 'commercial_lt7a' : 'domestic');
        setBillingPeriod(initialCustomer.tariff.includes('commercial') ? 'monthly' : 'bimonthly');
      }
      if (initialCustomer.capacityKW || initialCustomer.loadKW) {
        setConnectedLoadKW(initialCustomer.loadKW || Math.max(1, Math.round(initialCustomer.capacityKW)));
      }
      if (initialCustomer.phase) {
        setPhase(initialCustomer.phase);
      } else if (initialCustomer.capacityKW > 4) {
        setPhase('3PH');
      }
    }
  }, [initialCustomer]);
  
  // Mode Switcher: 'units' vs 'readings'
  const [inputMode, setInputMode] = useState('units'); // 'units' or 'readings'

  // Direct Units Input State (Split into Normal, Off-Peak, Peak)
  const [importNL, setImportNL] = useState(80);
  const [importOP, setImportOP] = useState(40);
  const [importP, setImportP] = useState(30);

  const [exportNL, setExportNL] = useState(200);
  const [exportOP, setExportOP] = useState(100);
  const [exportP, setExportP] = useState(50);

  // Meter Reading Inputs State for Import (Curr & Prev)
  const [importNL_Curr, setImportNL_Curr] = useState(880);
  const [importNL_Prev, setImportNL_Prev] = useState(800);
  const [importOP_Curr, setImportOP_Curr] = useState(440);
  const [importOP_Prev, setImportOP_Prev] = useState(400);
  const [importP_Curr, setImportP_Curr] = useState(330);
  const [importP_Prev, setImportP_Prev] = useState(300);

  // Meter Reading Inputs State for Export (Curr & Prev)
  const [exportNL_Curr, setExportNL_Curr] = useState(1400);
  const [exportNL_Prev, setExportNL_Prev] = useState(1200);
  const [exportOP_Curr, setExportOP_Curr] = useState(700);
  const [exportOP_Prev, setExportOP_Prev] = useState(600);
  const [exportP_Curr, setExportP_Curr] = useState(350);
  const [exportP_Prev, setExportP_Prev] = useState(300);

  // Computed Effective Units for Import (NL, OP, P & Total)
  const importNL_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(importNL_Curr) || 0) - (parseFloat(importNL_Prev) || 0));
    return Math.max(0, parseFloat(importNL) || 0);
  }, [inputMode, importNL, importNL_Curr, importNL_Prev]);

  const importOP_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(importOP_Curr) || 0) - (parseFloat(importOP_Prev) || 0));
    return Math.max(0, parseFloat(importOP) || 0);
  }, [inputMode, importOP, importOP_Curr, importOP_Prev]);

  const importP_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(importP_Curr) || 0) - (parseFloat(importP_Prev) || 0));
    return Math.max(0, parseFloat(importP) || 0);
  }, [inputMode, importP, importP_Curr, importP_Prev]);

  const importUnits = useMemo(() => importNL_Units + importOP_Units + importP_Units, [importNL_Units, importOP_Units, importP_Units]);

  // Computed Effective Units for Export (NL, OP, P & Total)
  const exportNL_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(exportNL_Curr) || 0) - (parseFloat(exportNL_Prev) || 0));
    return Math.max(0, parseFloat(exportNL) || 0);
  }, [inputMode, exportNL, exportNL_Curr, exportNL_Prev]);

  const exportOP_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(exportOP_Curr) || 0) - (parseFloat(exportOP_Prev) || 0));
    return Math.max(0, parseFloat(exportOP) || 0);
  }, [inputMode, exportOP, exportOP_Curr, exportOP_Prev]);

  const exportP_Units = useMemo(() => {
    if (inputMode === 'readings') return Math.max(0, (parseFloat(exportP_Curr) || 0) - (parseFloat(exportP_Prev) || 0));
    return Math.max(0, parseFloat(exportP) || 0);
  }, [inputMode, exportP, exportP_Curr, exportP_Prev]);

  const exportUnits = useMemo(() => exportNL_Units + exportOP_Units + exportP_Units, [exportNL_Units, exportOP_Units, exportP_Units]);

  // APPC Rate for excess solar export banking settlement (₹ / unit w.e.f 2025/2026)
  const appcRate = 3.22;

  // Preset scenarios for fast sales demonstration
  const applyPreset = (type) => {
    if (type === 'res_standard') {
      setCategory('domestic');
      setBillingPeriod('bimonthly');
      setPhase('1PH');
      setConnectedLoadKW(3);
      setMeterOwner('kseb');
      setPreviousBankBalance(0);
      setInputMode('units');
      setImportNL(110);
      setImportOP(50);
      setImportP(40);
      setExportNL(220);
      setExportOP(120);
      setExportP(60);
    } else if (type === 'res_high') {
      setCategory('domestic');
      setBillingPeriod('bimonthly');
      setPhase('3PH');
      setConnectedLoadKW(7);
      setMeterOwner('consumer');
      setPreviousBankBalance(40);
      setInputMode('units');
      setImportNL(320);
      setImportOP(140);
      setImportP(90);
      setExportNL(500);
      setExportOP(250);
      setExportP(150);
    } else if (type === 'comm') {
      setCategory('commercial_lt7a');
      setBillingPeriod('monthly');
      setPhase('3PH');
      setConnectedLoadKW(10);
      setMeterOwner('kseb');
      setPreviousBankBalance(0);
      setInputMode('units');
      setImportNL(450);
      setImportOP(200);
      setImportP(150);
      setExportNL(600);
      setExportOP(300);
      setExportP(100);
    }
  };

  // Compute KSEB Bill for given unit consumption
  const calculateKSEBBill = (units, tariffCategory, phaseType, loadKW, isBimonthlyPeriod, isKsebMeter) => {
    let energyCharges = 0;
    let fixedCharges = 0;
    let slabBreakdown = [];

    const totalUnits = Math.max(0, parseFloat(units) || 0);
    const load = Math.max(1, parseFloat(loadKW) || 1);

    if (tariffCategory === 'domestic') {
      // LT-1A Domestic Tariff (Official KSEB Rates w.e.f 01.04.2025/2026)
      const factor = isBimonthlyPeriod ? 2 : 1;
      const maxTelescopic = 250 * factor; // 250 monthly / 500 bi-monthly

      // Exact KSEB Table-1 Fixed Charge Schedule
      const monthlyUnits = totalUnits / factor;
      let monthlyFixedRate = 50;
      if (monthlyUnits <= 50) monthlyFixedRate = phaseType === '1PH' ? 50 : 130;
      else if (monthlyUnits <= 100) monthlyFixedRate = phaseType === '1PH' ? 85 : 175;
      else if (monthlyUnits <= 150) monthlyFixedRate = phaseType === '1PH' ? 105 : 205;
      else if (monthlyUnits <= 200) monthlyFixedRate = phaseType === '1PH' ? 140 : 215;
      else if (monthlyUnits <= 250) monthlyFixedRate = phaseType === '1PH' ? 160 : 235;
      else if (monthlyUnits <= 300) monthlyFixedRate = phaseType === '1PH' ? 220 : 240;
      else if (monthlyUnits <= 350) monthlyFixedRate = phaseType === '1PH' ? 240 : 250;
      else if (monthlyUnits <= 400) monthlyFixedRate = phaseType === '1PH' ? 260 : 260;
      else if (monthlyUnits <= 500) monthlyFixedRate = phaseType === '1PH' ? 285 : 285;
      else monthlyFixedRate = phaseType === '1PH' ? 310 : 310;

      fixedCharges = monthlyFixedRate * factor;

      if (totalUnits <= maxTelescopic) {
        // Telescopic Slabs (up to 250 units/mo or 500 units/bimonthly)
        let rem = totalUnits;
        const b1 = 50 * factor;
        const s1 = Math.min(rem, b1);
        if (s1 > 0) {
          const cost = s1 * 3.35;
          energyCharges += cost;
          slabBreakdown.push({ slab: `First ${b1} units (0 - ${b1})`, units: s1, rate: 3.35, cost });
          rem -= s1;
        }
        const b2 = 50 * factor;
        const s2 = Math.min(rem, b2);
        if (s2 > 0) {
          const cost = s2 * 4.25;
          energyCharges += cost;
          slabBreakdown.push({ slab: `${b1 + 1} - ${b1 + b2} units`, units: s2, rate: 4.25, cost });
          rem -= s2;
        }
        const b3 = 50 * factor;
        const s3 = Math.min(rem, b3);
        if (s3 > 0) {
          const cost = s3 * 5.35;
          energyCharges += cost;
          slabBreakdown.push({ slab: `${b1 + b2 + 1} - ${b1 + b2 + b3} units`, units: s3, rate: 5.35, cost });
          rem -= s3;
        }
        const b4 = 50 * factor;
        const s4 = Math.min(rem, b4);
        if (s4 > 0) {
          const cost = s4 * 7.20;
          energyCharges += cost;
          slabBreakdown.push({ slab: `${b1 + b2 + b3 + 1} - ${b1 + b2 + b3 + b4} units`, units: s4, rate: 7.20, cost });
          rem -= s4;
        }
        const s5 = rem;
        if (s5 > 0) {
          const cost = s5 * 8.50;
          energyCharges += cost;
          slabBreakdown.push({ slab: `${b1 + b2 + b3 + b4 + 1} - ${maxTelescopic} units`, units: s5, rate: 8.50, cost });
        }
      } else {
        // Non-Telescopic Slabs (> 250 units/mo or > 500 units/bimonthly - ONE rate applies to ALL units)
        let rate = 6.75;
        if (totalUnits <= 300 * factor) rate = 6.75;
        else if (totalUnits <= 350 * factor) rate = 7.60;
        else if (totalUnits <= 400 * factor) rate = 7.95;
        else if (totalUnits <= 500 * factor) rate = 8.25;
        else rate = 9.20;

        energyCharges = totalUnits * rate;
        slabBreakdown.push({ slab: `All ${totalUnits} units (Non-Telescopic @ ₹${rate}/u)`, units: totalUnits, rate, cost: energyCharges });
      }
    } else if (tariffCategory === 'commercial_lt7a') {
      fixedCharges = load * (isBimonthlyPeriod ? 280 : 140);
      let rate = 6.05;
      if (totalUnits > 500) rate = 8.60;
      else if (totalUnits > 300) rate = 7.70;
      else if (totalUnits > 100) rate = 7.05;

      energyCharges = totalUnits * rate;
      slabBreakdown.push({ slab: `Commercial LT-7A (${totalUnits} units)`, units: totalUnits, rate, cost: energyCharges });
    } else {
      fixedCharges = load * (isBimonthlyPeriod ? 160 : 80);
      const rate = 5.85;
      energyCharges = totalUnits * rate;
      slabBreakdown.push({ slab: `Institutional LT-6A (${totalUnits} units)`, units: totalUnits, rate, cost: energyCharges });
    }

    const duty = energyCharges * 0.10; // Electricity Duty 10%
    const meterRent = isKsebMeter ? (phaseType === '1PH' ? (isBimonthlyPeriod ? 12 : 6) : (isBimonthlyPeriod ? 30 : 15)) : 0;
    const fuelSurcharge = totalUnits * 0.10; // Fuel surcharge approx 10 paise/unit
    const totalBill = Math.round(energyCharges + fixedCharges + duty + meterRent + fuelSurcharge);

    return {
      energyCharges: Math.round(energyCharges),
      fixedCharges: Math.round(fixedCharges),
      duty: Math.round(duty),
      meterRent,
      fuelSurcharge: Math.round(fuelSurcharge),
      totalBill,
      slabBreakdown
    };
  };

  const isBimonthly = billingPeriod === 'bimonthly';
  const prevBank = parseFloat(previousBankBalance) || 0;

  // 1. Without Solar Baseline Bill
  const baselineBill = useMemo(() => {
    return calculateKSEBBill(importUnits, category, phase, connectedLoadKW, isBimonthly, meterOwner === 'kseb');
  }, [importUnits, category, phase, connectedLoadKW, isBimonthly, meterOwner]);

  // 2. Net Billed Units: Math.max(0, Import - (Export + Previous Bank Balance))
  const netBilledUnits = useMemo(() => {
    if (!hasSolar) return importUnits;
    return Math.max(0, importUnits - (exportUnits + prevBank));
  }, [hasSolar, importUnits, exportUnits, prevBank]);

  // 3. Excess Banked Units Formula: (Export - Import) + Previous Bank Balance
  const excessBankedUnits = useMemo(() => {
    if (!hasSolar) return 0;
    return Math.max(0, (exportUnits - importUnits) + prevBank);
  }, [hasSolar, importUnits, exportUnits, prevBank]);

  // 4. Net Metered KSEB Bill
  const solarNetBill = useMemo(() => {
    if (!hasSolar) return baselineBill;
    return calculateKSEBBill(netBilledUnits, category, phase, connectedLoadKW, isBimonthly, meterOwner === 'kseb');
  }, [hasSolar, netBilledUnits, category, phase, connectedLoadKW, isBimonthly, meterOwner, baselineBill]);

  // 5. Financial Benefits
  const billSavings = Math.max(0, baselineBill.totalBill - solarNetBill.totalBill);
  const excessBankingIncome = Math.round(excessBankedUnits * appcRate);
  const totalFinancialBenefit = billSavings + excessBankingIncome;
  const percentageSaved = baselineBill.totalBill > 0 ? Math.round((billSavings / baselineBill.totalBill) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header Bar with Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              KSEB Solar Net-Metering Bill Calculator
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                Official 2025/2026 Tariff (LT-1A & LT-7A)
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Calculate exact Kerala electricity bills with solar import, export, and previous bank roll-over units
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 hidden md:inline">Quick Presets:</span>
          <button
            onClick={() => applyPreset('res_standard')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
            title="Typical 3kW Single-Phase Home"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            3kW Home (1-Phase)
          </button>
          <button
            onClick={() => applyPreset('res_high')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
            title="High Consumption 3-Phase Home"
          >
            <Home className="w-3.5 h-3.5 text-emerald-400" />
            7kW Home (3-Phase)
          </button>
          <button
            onClick={() => applyPreset('comm')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
            title="Commercial Enterprise LT-7A"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            10kW Commercial
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* Customer Simulation Banner */}
      {initialCustomer && (
        <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs backdrop-blur-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-200">
              Simulating for <strong className="text-amber-400">{initialCustomer.customerName || initialCustomer.name}</strong> ({initialCustomer.capacityKW || initialCustomer.solarKW || initialCustomer.loadKW} kW)
            </span>
          </div>
          {initialCustomer.consumerNo && (
            <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              KSEB Consumer: {initialCustomer.consumerNo}
            </span>
          )}
        </div>
      )}

      {/* 2-COLUMN SIDE-BY-SIDE GRID LAYOUT (LEFT: INPUT FORM | RIGHT: CALCULATION SUMMARY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT SIDE (lg:col-span-6): FORM INPUTS */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              KSEB Connection & Meter Readings Input
            </h2>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCategory('domestic')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                  category === 'domestic' 
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Domestic (LT-1A)
              </button>
              <button
                type="button"
                onClick={() => setCategory('commercial_lt7a')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                  category === 'commercial_lt7a' 
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                Commercial (LT-7A)
              </button>
            </div>
          </div>

          {/* UNIFIED CONTAINER FOR ALL INPUT ROWS */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
            
            {/* Row: Billing Cycle & Connected Load */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-slate-800/60">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Billing Period / <span className="text-slate-400 font-normal">ബില്ലിംഗ് കാലാവധി</span>
                </label>
                <select
                  value={billingPeriod}
                  onChange={e => setBillingPeriod(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white outline-none focus:border-amber-400 transition"
                >
                  <option value="bimonthly">Bi-Monthly (2 Months / ദ്വൈമാസികം)</option>
                  <option value="monthly">Monthly (1 Month / പ്രതിമാസം)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Connected Load / <span className="text-slate-400 font-normal">കണക്റ്റഡ് ലോഡ്</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={connectedLoadKW}
                    onChange={e => setConnectedLoadKW(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white outline-none focus:border-amber-400 transition"
                  />
                  <span className="absolute right-3 top-1.5 text-xs font-bold text-slate-400">kW</span>
                </div>
              </div>
            </div>

            {/* Row 1: Phase Type */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 py-0.5">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-300">
                Phase Type <span className="text-slate-400 font-normal">/ ഫേസ് തരം</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={phase}
                  onChange={e => setPhase(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:border-amber-400 transition"
                >
                  <option value="1PH">Single Phase / സിംഗിൾ ഫേസ്</option>
                  <option value="3PH">Three Phase / ത്രീ ഫേസ്</option>
                </select>
              </div>
            </div>

            {/* Row 2: Meter Owner */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 py-0.5 border-t border-slate-800/60 pt-2">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-300">
                Meter Owner <span className="text-slate-400 font-normal">/ മീറ്റർ ഉടമ</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={meterOwner}
                  onChange={e => setMeterOwner(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:border-amber-400 transition"
                >
                  <option value="kseb">KSEB / കെഎസ്ഇബി (Rent Applies)</option>
                  <option value="consumer">Consumer / ഉപഭോക്താവ് (Owned)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Previous Bank Balance */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 py-0.5 border-t border-slate-800/60 pt-2">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-300">
                Previous Bank Balance <span className="text-slate-400 font-normal">/ മുൻ ബാങ്ക് ബാലൻസ്</span>
              </label>
              <div className="sm:col-span-6 relative">
                <input
                  type="number"
                  min="0"
                  value={previousBankBalance}
                  onChange={e => setPreviousBankBalance(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:border-amber-400 transition"
                  placeholder="0"
                />
                <span className="absolute right-3 top-1.5 text-xs font-bold text-slate-400">Units</span>
              </div>
            </div>

            {/* INPUT MODE TOGGLE ROW */}
            <div className="py-2.5 border-t border-slate-800/60 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold transition ${inputMode === 'units' ? 'text-amber-400 font-extrabold' : 'text-slate-400'}`}>
                  Units / യൂണിറ്റ്
                </span>

                <button
                  type="button"
                  onClick={() => setInputMode(prev => prev === 'units' ? 'readings' : 'units')}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
                    inputMode === 'readings' ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      inputMode === 'readings' ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>

                <span className={`text-xs font-bold transition ${inputMode === 'readings' ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}`}>
                  Meter Reading / മീറ്റർ റീഡിംഗ്
                </span>
              </div>

              <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {inputMode === 'readings' ? 'Subtracted: (Curr - Prev)' : 'Direct Unit Entry'}
              </span>
            </div>

            {/* METRIC READINGS / UNITS FIELDS */}
            <div className="space-y-3 pt-1 border-t border-slate-800/60">
              
              {/* === SECTION 1: IMPORTED FROM GRID [I] === */}
              <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Imported from Grid [I] <span className="text-slate-400 font-normal">/ ഗ്രിഡിൽ നിന്നുള്ള ഇംപോർട്ട്</span>
                  </span>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    Total: {importUnits} Units
                  </span>
                </div>

                {/* Import NL */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-1">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Normal (NL 06:00-18:00) <span className="text-slate-400 font-normal">/ നോർമൽ</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-amber-400 font-bold ml-1">({importNL_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={importNL_Curr}
                          onChange={e => setImportNL_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={importNL_Prev}
                          onChange={e => setImportNL_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={importNL}
                        onChange={e => setImportNL(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </div>

                {/* Import OP */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-0.5">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Off-Peak (OP 22:00-06:00) <span className="text-slate-400 font-normal">/ ഓഫ്-പീക്ക്</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-amber-400 font-bold ml-1">({importOP_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={importOP_Curr}
                          onChange={e => setImportOP_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={importOP_Prev}
                          onChange={e => setImportOP_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={importOP}
                        onChange={e => setImportOP(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </div>

                {/* Import P */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-0.5">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Peak (P 18:00-22:00) <span className="text-slate-400 font-normal">/ പീക്ക്</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-amber-400 font-bold ml-1">({importP_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={importP_Curr}
                          onChange={e => setImportP_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={importP_Prev}
                          onChange={e => setImportP_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={importP}
                        onChange={e => setImportP(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* === SECTION 2: EXPORTED TO GRID [E] === */}
              <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Exported to Grid [E] <span className="text-slate-400 font-normal">/ ഗ്രിഡിലേക്ക് അയച്ചത്</span>
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Total: {exportUnits} Units
                  </span>
                </div>

                {/* Export NL */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-1">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Normal (NL) <span className="text-slate-400 font-normal">/ നോർമൽ</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-emerald-400 font-bold ml-1">({exportNL_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={exportNL_Curr}
                          onChange={e => setExportNL_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={exportNL_Prev}
                          onChange={e => setExportNL_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={exportNL}
                        onChange={e => setExportNL(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                      />
                    )}
                  </div>
                </div>

                {/* Export OP */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-0.5">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Off-Peak (OP) <span className="text-slate-400 font-normal">/ ഓഫ്-പീക്ക്</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-emerald-400 font-bold ml-1">({exportOP_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={exportOP_Curr}
                          onChange={e => setExportOP_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={exportOP_Prev}
                          onChange={e => setExportOP_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={exportOP}
                        onChange={e => setExportOP(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                      />
                    )}
                  </div>
                </div>

                {/* Export P */}
                <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 pt-0.5">
                  <label className="sm:col-span-6 text-[11px] font-semibold text-slate-300 pl-1">
                    Peak (P) <span className="text-slate-400 font-normal">/ പീക്ക്</span>
                    {inputMode === 'readings' && <span className="text-[10px] text-emerald-400 font-bold ml-1">({exportP_Units} U)</span>}
                  </label>
                  <div className="sm:col-span-6">
                    {inputMode === 'readings' ? (
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="number"
                          placeholder="Curr"
                          value={exportP_Curr}
                          onChange={e => setExportP_Curr(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                        <input
                          type="number"
                          placeholder="Prev"
                          value={exportP_Prev}
                          onChange={e => setExportP_Prev(e.target.value)}
                          className="w-1/2 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                        />
                      </div>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={exportP}
                        onChange={e => setExportP(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-emerald-400"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* === SECTION 3: NET CONSUMED (I - E) === */}
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 py-1 pt-2">
                <div className="sm:col-span-6 text-xs font-bold text-slate-300">
                  Net Consumed <span className="text-slate-400 font-normal">/ നെറ്റ് ഉപഭോഗം</span> <span className="text-[10px] text-amber-400 font-mono">(I - E)</span>
                </div>

                <div className="sm:col-span-6">
                  <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-black flex items-center justify-between">
                    <span className={importUnits - exportUnits > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                      {importUnits - exportUnits} Units
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">({importUnits} - {exportUnits})</span>
                  </div>
                </div>
              </div>

              {/* === SECTION 4: NET CONSUMED AFTER BANK === */}
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 py-1 border-t border-slate-800/60 pt-2">
                <div className="sm:col-span-6 text-xs font-bold text-slate-300">
                  Net Consumed After Bank <span className="text-slate-400 font-normal">/ ബാങ്കിന് ശേഷം നെറ്റ് ഉപഭോഗം</span>
                  <span className="block text-[10px] text-slate-400 font-medium">(Net Consumed - Previous Bank)</span>
                </div>

                <div className="sm:col-span-6">
                  <div className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-black flex items-center justify-between">
                    <span className={(importUnits - exportUnits - prevBank) > 0 ? 'text-amber-400 font-black' : 'text-emerald-400 font-black'}>
                      {(importUnits - exportUnits - prevBank)} Units
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">({(importUnits - exportUnits)} - {prevBank})</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE (lg:col-span-6): CALCULATION BREAKDOWN & SAVINGS */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl font-bold text-sm">
                <Activity className="w-4 h-4" />
              </span>
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Energy Charge & KSEB Bill Calculation
              </h2>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full uppercase">
              {category === 'domestic' ? 'Domestic LT-1A' : 'Commercial LT-7A'}
            </span>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Total Energy Charge
              </span>
              <div className="text-2xl font-black text-amber-400 tracking-tight">
                ₹{solarNetBill.energyCharges.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 block font-medium">
                Base Consumption Cost ({netBilledUnits} Units)
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl shadow-lg space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-900/80 block">
                Net Bill Payable
              </span>
              <div className="text-3xl font-black tracking-tight text-slate-950">
                ₹{solarNetBill.totalBill.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-900/90 block font-bold">
                {billingPeriod === 'bimonthly' ? 'Bi-Monthly' : 'Monthly'} Total with Tax & Duty
              </span>
            </div>
          </div>

          {/* Step-by-Step Slab Table */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Slab-wise Energy Charge Breakdown
              </h3>
              <span className="text-[9px] font-extrabold px-2 py-0.5 bg-slate-800 text-amber-400 border border-slate-700 rounded">
                {netBilledUnits <= (isBimonthly ? 500 : 250) ? 'Telescopic Slabs' : 'Non-Telescopic Rate'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[9px]">
                    <th className="py-2">Slab Range</th>
                    <th className="py-2">Units</th>
                    <th className="py-2">Rate</th>
                    <th className="py-2 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                  {solarNetBill.slabBreakdown.length > 0 ? (
                    solarNetBill.slabBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-1.5 font-semibold text-slate-200 text-[11px]">{item.slab}</td>
                        <td className="py-1.5 text-[11px] text-slate-300">{item.units} u</td>
                        <td className="py-1.5 font-bold text-amber-400 text-[11px]">₹{item.rate}</td>
                        <td className="py-1.5 text-right font-black text-white text-[11px]">₹{Math.round(item.cost).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-3 text-center text-xs text-emerald-400 font-bold">
                        Zero Energy Charge (Fully offset by Solar Generation & Banked Units)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Component Charges Breakdown */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-400 block">Fixed</span>
              <strong className="text-slate-200 font-extrabold text-xs">₹{solarNetBill.fixedCharges}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-400 block">10% Duty</span>
              <strong className="text-slate-200 font-extrabold text-xs">₹{solarNetBill.duty}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-400 block">Meter Rent</span>
              <strong className="text-slate-200 font-extrabold text-xs">₹{solarNetBill.meterRent}</strong>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <span className="font-semibold text-slate-400 block">Surcharge</span>
              <strong className="text-slate-200 font-extrabold text-xs">₹{solarNetBill.fuelSurcharge}</strong>
            </div>
          </div>

          {/* Solar Savings & Banking Overview Card */}
          {hasSolar && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Without Solar vs With Solar Savings:
                </span>
                <strong className="font-extrabold text-emerald-400 text-sm">
                  ₹{billSavings.toLocaleString()} ({percentageSaved}%)
                </strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-emerald-500/20 text-[11px]">
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[10px]">Without Solar Bill:</span>
                  <span className="font-bold text-slate-200">₹{baselineBill.totalBill.toLocaleString()}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-400 block text-[10px]">Solar Net Bill:</span>
                  <span className="font-bold text-emerald-400">₹{solarNetBill.totalBill.toLocaleString()}</span>
                </div>
              </div>

              {excessBankedUnits > 0 && (
                <div className="flex justify-between items-center text-[11px] pt-2 border-t border-emerald-500/20">
                  <div>
                    <span className="font-bold text-emerald-300 block">Excess Solar Bank Credit:</span>
                    <span className="text-[10px] text-slate-400">Settled at APPC rate @ ₹{appcRate}/unit</span>
                  </div>
                  <div className="text-right">
                    <strong className="font-black text-emerald-400 text-xs">+{excessBankedUnits} Units</strong>
                    <span className="block text-[10px] font-bold text-emerald-300">(₹{excessBankingIncome.toLocaleString()})</span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Official KSEB Tariff 2026 Reference Table Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-400" />
          Kerala Electricity Tariff 2025/2026 Official Reference Guide (LT-I Domestic)
        </h3>
        
        <div className="text-xs text-slate-400 leading-relaxed">
          Up to 250 units/month (500 bi-monthly) is calculated via <strong>telescopic slabs</strong>. Above 250 units/month (500 bi-monthly) becomes <strong>non-telescopic</strong> where ONE uniform slab rate applies across your total consumption units.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[9px]">
                <th className="py-2.5">Monthly Units Band</th>
                <th className="py-2.5">Bi-Monthly Units Band</th>
                <th className="py-2.5">Tariff Type</th>
                <th className="py-2.5 text-right">Tariff Rate (₹/Unit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              <tr><td className="py-1.5">First 50 units</td><td>0 – 100 units</td><td>Telescopic</td><td className="py-1.5 text-right font-bold text-amber-400">₹3.35 / u</td></tr>
              <tr><td className="py-1.5">51 – 100 units</td><td>101 – 200 units</td><td>Telescopic</td><td className="py-1.5 text-right font-bold text-amber-400">₹4.25 / u</td></tr>
              <tr><td className="py-1.5">101 – 150 units</td><td>201 – 300 units</td><td>Telescopic</td><td className="py-1.5 text-right font-bold text-amber-400">₹5.35 / u</td></tr>
              <tr><td className="py-1.5">151 – 200 units</td><td>301 – 400 units</td><td>Telescopic</td><td className="py-1.5 text-right font-bold text-amber-400">₹7.20 / u</td></tr>
              <tr><td className="py-1.5">201 – 250 units</td><td>401 – 500 units</td><td>Telescopic</td><td className="py-1.5 text-right font-bold text-amber-400">₹8.50 / u</td></tr>
              <tr className="bg-rose-500/10 font-bold text-[10px] text-rose-400">
                <td colSpan="4" className="py-2 px-1">Non-Telescopic (&gt;250 Units / Month or &gt;500 Units / Bi-monthly):</td>
              </tr>
              <tr><td className="py-1.5">251 – 300 units</td><td>501 – 600 units</td><td>Non-Telescopic</td><td className="py-1.5 text-right font-bold text-rose-400">₹6.75 (All units)</td></tr>
              <tr><td className="py-1.5">301 – 350 units</td><td>601 – 700 units</td><td>Non-Telescopic</td><td className="py-1.5 text-right font-bold text-rose-400">₹7.60 (All units)</td></tr>
              <tr><td className="py-1.5">351 – 400 units</td><td>701 – 800 units</td><td>Non-Telescopic</td><td className="py-1.5 text-right font-bold text-rose-400">₹7.95 (All units)</td></tr>
              <tr><td className="py-1.5">401 – 500 units</td><td>801 – 1000 units</td><td>Non-Telescopic</td><td className="py-1.5 text-right font-bold text-rose-400">₹8.25 (All units)</td></tr>
              <tr><td className="py-1.5">Above 500 units</td><td>Above 1000 units</td><td>Non-Telescopic</td><td className="py-1.5 text-right font-bold text-rose-400">₹9.20 (All units)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
