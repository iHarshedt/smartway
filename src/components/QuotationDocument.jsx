import React from 'react';
import { 
  Sun, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Award, 
  Sparkles, 
  Building2, 
  Battery 
} from 'lucide-react';
import { formatINR } from '../data/priceListData';

export default function QuotationDocument({ quotation }) {
  if (!quotation) return null;

  const {
    quoteNumber,
    date,
    validUntil,
    customer,
    system,
    financials,
    generation
  } = quotation;

  return (
    <div 
      id="printable-quotation-content"
      className="bg-white text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] w-full max-w-[840px] mx-auto p-8 sm:p-10 shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-6 print:max-w-none"
    >
      {/* ========================================================= */}
      {/* HEADER SECTION: BRANDING & CONTACT INFO */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-800 gap-4">
        <div className="flex items-center gap-3.5">
          <img 
            src="/logo-512.png" 
            alt="Smart Way Solar" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain p-1 rounded-2xl bg-white border border-slate-200 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-['Outfit',sans-serif]">
                SMART WAY
              </h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30">
                SOLAR SOLUTIONS
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              Kerala Approved Rooftop Solar EPC Partner • MNRE Channel Partner
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Opp Malabar Gold &amp; Diamonds, Keethipadi, Nilambur, Malappuram - 679329
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right text-[11px] text-slate-600 space-y-0.5 shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl w-full sm:w-auto border border-slate-200 sm:border-none">
          <div className="flex sm:justify-end items-center gap-1.5 text-slate-900 font-bold">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>+91 94950 00000 / 04931 220000</span>
          </div>
          <div className="flex sm:justify-end items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>smartwaysolutions@gmail.com</span>
          </div>
          <div className="text-[10px] text-slate-500 pt-0.5 font-medium">
            GSTIN: <span className="font-mono font-bold text-slate-700">32AABCU9603R1ZX</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* QUOTATION TITLE & METADATA BAR */}
      {/* ========================================================= */}
      <div className="my-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
            OFFICIAL EPC PROPOSAL
          </span>
          <h2 className="text-base sm:text-lg font-bold">
            Solar Photovoltaic Power Plant Quotation
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block uppercase">Quote No:</span>
            <span className="font-mono font-bold text-amber-300">{quoteNumber}</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block uppercase">Date:</span>
            <span className="font-bold">{date}</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="text-[10px] text-slate-300 block uppercase">Valid Until:</span>
            <span className="font-bold text-slate-200">{validUntil}</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CLIENT & SITE INFORMATION */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-200 text-slate-900 font-bold">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span className="uppercase text-[11px] tracking-wider">Client &amp; Site Details</span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900">{customer.name || 'Valued Customer'}</div>
            {customer.phone && (
              <div className="text-slate-600 flex items-center gap-1">
                <span className="font-medium">Phone:</span> {customer.phone}
              </div>
            )}
            {customer.address && (
              <div className="text-slate-600 flex items-start gap-1">
                <span className="font-medium shrink-0">Site Address:</span> 
                <span>{customer.address}</span>
              </div>
            )}
            <div className="flex items-center gap-4 pt-1 text-[11px]">
              {customer.ksebSection && (
                <div className="bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded font-semibold border border-amber-500/20">
                  Section: {customer.ksebSection}
                </div>
              )}
              {customer.consumerNo && (
                <div className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono font-bold">
                  KSEB Cons: {customer.consumerNo}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-900 font-bold">
            <div className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              <span className="uppercase text-[11px] tracking-wider">Proposed System Summary</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {system.categoryBadge || 'KSEB On-Grid'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">DC Plant Capacity</span>
              <span className="text-sm font-black text-slate-900">{system.dcCapacityKW} kWp</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">PV Modules Count</span>
              <span className="text-sm font-black text-slate-900">{system.modulesCount} Nos.</span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Inverter Rating &amp; Phase</span>
              <span className="text-xs font-bold text-slate-800 truncate" title={system.inverterKW + ' kW (' + system.phase + ')'}>
                {system.inverterKW === 'Enphase' ? 'Enphase Micro' : `${system.inverterKW} kW`} ({system.phase})
              </span>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Mounting Structure</span>
              <span className="text-xs font-bold text-slate-800 truncate" title={system.structureLabel}>
                {system.structureLabel}
              </span>
            </div>
          </div>
          {system.batteryKWh && (
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-900 p-2 rounded-xl border border-purple-200 text-[11px] font-semibold">
              <Battery className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>Storage: {system.batteryKWh} kWh Lithium Battery (8 Yrs Warranty)</span>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TECHNICAL SPECIFICATIONS & BILL OF MATERIALS (BOM) */}
      {/* ========================================================= */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Technical Specifications &amp; Standard BOM (Bill of Materials)</span>
          </h3>
          <span className="text-[10px] font-semibold text-slate-500">Tier-1 Approved Components</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] font-bold border-b border-slate-200">
                <th className="py-2.5 px-3 text-left w-12">#</th>
                <th className="py-2.5 px-3 text-left">Equipment / Description</th>
                <th className="py-2.5 px-3 text-left">Make / Specification</th>
                <th className="py-2.5 px-3 text-center w-20">Qty</th>
                <th className="py-2.5 px-3 text-right w-36">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">01</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Solar PV Modules
                  <div className="text-[10px] text-slate-500 font-normal">High efficiency mono-crystalline / TOPCon panels</div>
                </td>
                <td className="py-2.5 px-3">{system.moduleType}</td>
                <td className="py-2.5 px-3 text-center font-bold">{system.modulesCount} Nos</td>
                <td className="py-2.5 px-3 text-right font-medium text-emerald-700">{system.moduleWarranty}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">02</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Solar Inverter
                  <div className="text-[10px] text-slate-500 font-normal">High conversion efficiency with Wi-Fi monitoring</div>
                </td>
                <td className="py-2.5 px-3">{system.inverterType} ({system.phase})</td>
                <td className="py-2.5 px-3 text-center font-bold">{system.inverterKW === 'Enphase' ? `${system.modulesCount} Nos` : '1 Set'}</td>
                <td className="py-2.5 px-3 text-right font-medium text-emerald-700">{system.inverterWarranty}</td>
              </tr>
              {system.batteryKWh && (
                <tr className="hover:bg-slate-50/50 bg-purple-50/30">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">03</td>
                  <td className="py-2.5 px-3 font-semibold text-purple-950">
                    Battery Storage Bank
                    <div className="text-[10px] text-purple-600 font-normal">Lithium Iron Phosphate (LFP) Deep Cycle Battery</div>
                  </td>
                  <td className="py-2.5 px-3">{system.batteryType} ({system.batteryKWh} kWh)</td>
                  <td className="py-2.5 px-3 text-center font-bold">1 Bank</td>
                  <td className="py-2.5 px-3 text-right font-medium text-purple-700">{system.batteryWarranty || '8 Years'}</td>
                </tr>
              )}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{system.batteryKWh ? '04' : '03'}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Mounting Structure
                  <div className="text-[10px] text-slate-500 font-normal">Engineered wind-load rated mounting kit</div>
                </td>
                <td className="py-2.5 px-3">{system.structureLabel} (Std BOM Compliant)</td>
                <td className="py-2.5 px-3 text-center font-bold">1 Set</td>
                <td className="py-2.5 px-3 text-right font-medium text-slate-600">5 Years (BOS)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{system.batteryKWh ? '05' : '04'}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Protection &amp; Distribution
                  <div className="text-[10px] text-slate-500 font-normal">ACDB, DCDB with Type-2 SPDs, MCB/Isolators</div>
                </td>
                <td className="py-2.5 px-3">IP65 Polycarbonate Enclosure with Surge Protection</td>
                <td className="py-2.5 px-3 text-center font-bold">1 Set</td>
                <td className="py-2.5 px-3 text-right font-medium text-slate-600">5 Years (BOS)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{system.batteryKWh ? '06' : '05'}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Solar Cabling &amp; Earthing Kit
                  <div className="text-[10px] text-slate-500 font-normal">UV-Resistant DC Cables, Copper Bonded Earth Electrodes</div>
                </td>
                <td className="py-2.5 px-3">Solar Grade XLPO 4/6 sq.mm + Maintenance-Free Earthing Pits</td>
                <td className="py-2.5 px-3 text-center font-bold">1 Lot</td>
                <td className="py-2.5 px-3 text-right font-medium text-slate-600">5 Years (BOS)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 px-3 font-mono text-slate-400 font-bold">{system.batteryKWh ? '07' : '06'}</td>
                <td className="py-2.5 px-3 font-semibold text-slate-900">
                  Operations &amp; Maintenance (O&amp;M)
                  <div className="text-[10px] text-slate-500 font-normal">Preventive cleaning, health-checks &amp; generation audits</div>
                </td>
                <td className="py-2.5 px-3">Bi-annual visits by Smart Way Certified Technicians</td>
                <td className="py-2.5 px-3 text-center font-bold">10 Visits</td>
                <td className="py-2.5 px-3 text-right font-medium text-emerald-700">Included (5 Years)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FINANCIAL COMMERCIAL BREAKDOWN & SUBSIDY CALCULATION */}
      {/* ========================================================= */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>Commercial Investment &amp; Direct DBT Subsidy Breakdown</span>
          </h3>
          <span className="text-[10px] font-bold text-slate-600">All Prices Include 8.9% GST</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
          <div className="p-4 space-y-2.5 text-xs">
            
            <div className="flex items-center justify-between text-slate-600">
              <span>Maximum Selling Price (Standard BOM Incl. 8.9% GST):</span>
              <span className="font-mono font-medium text-slate-800 line-through">
                {formatINR(financials.maxSellingPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between text-emerald-700 font-medium">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Way Special Promotional Offer:</span>
              </span>
              <span className="font-mono font-bold">
                - {formatINR(financials.specialOffer)}
              </span>
            </div>

            {financials.extraDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-medium">
                <span>Additional Festive / Executive Discount:</span>
                <span className="font-mono font-bold">
                  - {formatINR(financials.extraDiscount)}
                </span>
              </div>
            )}

            {financials.addons && financials.addons.length > 0 && (
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Add-on Works &amp; Statutory Approvals:
                </span>
                {financials.addons.map((add, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600 pl-2">
                    <span>+ {add.label}:</span>
                    <span className="font-mono font-semibold text-slate-800">{formatINR(add.amount)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t-2 border-slate-300 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-900">Total System Investment (A):</span>
              <span className="font-mono font-black text-slate-900 text-base">
                {formatINR(financials.totalPayable)}
              </span>
            </div>

            {/* PM Surya Ghar Subsidy Callout */}
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
              financials.subsidy > 0 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-950'
            }`}>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>PM Surya Ghar Muft Bijli Yojana Central Subsidy (B):</span>
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">
                  {financials.subsidy > 0 
                    ? 'Direct DBT credited to customer’s bank account within 30 days after KSEB commissioning'
                    : 'Non-DCR / Commercial category is not eligible for Central Government Subsidy'}
                </div>
              </div>
              <span className="font-mono font-black text-sm text-emerald-700 shrink-0">
                {financials.subsidy > 0 ? `- ${formatINR(financials.subsidy)}` : '₹0'}
              </span>
            </div>

            {/* NET EFFECTIVE COST TO CUSTOMER */}
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/20 to-amber-500/15 border-2 border-amber-500/40 rounded-xl p-3.5 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block">
                  NET EFFECTIVE CUSTOMER INVESTMENT (A - B)
                </span>
                <span className="text-[10px] text-amber-800">
                  Actual out-of-pocket investment after receiving Direct Benefit Transfer (DBT)
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-950 block">
                  {formatINR(financials.netEffectiveCost)}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ESTIMATED GENERATION & SAVINGS ROI */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">Est. Daily Output</span>
          <span className="text-base font-black text-slate-900 mt-0.5 block">{generation.dailyUnits} Units</span>
          <span className="text-[9px] text-slate-400">~4 Units/kW/Day</span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">Monthly Units</span>
          <span className="text-base font-black text-slate-900 mt-0.5 block">{generation.monthlyUnits} Units</span>
          <span className="text-[9px] text-slate-400">Kerala Solar Yield</span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">Annual Savings</span>
          <span className="text-base font-black text-emerald-700 mt-0.5 block">{formatINR(generation.annualSavings)}</span>
          <span className="text-[9px] text-slate-400">Based on KSEB Tariffs</span>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
          <span className="text-[10px] font-bold text-slate-500 block uppercase">Payback Period</span>
          <span className="text-base font-black text-amber-600 mt-0.5 block">{generation.paybackYears} Years</span>
          <span className="text-[9px] text-slate-400">Rapid ROI</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* STANDARD TERMS & CONDITIONS (FROM OFFICIAL PRICE LIST) */}
      {/* ========================================================= */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] text-slate-600 space-y-1.5">
        <span className="font-bold uppercase tracking-wider text-slate-800 block mb-1">
          Standard Terms &amp; Conditions (Price List 01-10-2026):
        </span>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc list-inside">
          <li>10 years Product Warranty and 25/30 years linear Power output warranty for PV modules.</li>
          <li>Inverter standard warranty: 8 years for string/hybrid, 15 years for Enphase Micro.</li>
          <li>Period O&amp;M visit: Twice a year routine inspection for the first five years.</li>
          <li>Sheet roof structure considered is aluminum Short Rail.</li>
          <li>Net meter and KSEB/CEIG charges are extra as per board regulations.</li>
          <li>System price based on Standard Bill of Materials (BOM).</li>
          <li>Additional structure work under customer scope in L-Angle without ballast structure.</li>
          <li>PM Surya Ghar subsidy is eligible only for Domestic Customers (LT 1A) using DCR modules.</li>
        </ul>
      </div>

    </div>
  );
}
