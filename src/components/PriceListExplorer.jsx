import React, { useState, useMemo } from 'react';
import { 
  SYSTEM_CATEGORIES, 
  SOLAR_PRICE_CATALOG, 
  STRUCTURE_TYPES, 
  formatINR,
  PRICE_LIST_DATE 
} from '../data/priceListData';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  Layers, 
  Calendar,
  Award,
  ShieldCheck,
  Battery
} from 'lucide-react';

export default function PriceListExplorer({ onSelectForQuote }) {
  const [selectedCategory, setSelectedCategory] = useState('dcr_string_580');
  const [selectedPhase, setSelectedPhase] = useState('all');
  const [selectedStructure, setSelectedStructure] = useState('all');
  const [searchKW, setSearchKW] = useState('');

  const currentCategoryMeta = useMemo(() => {
    return SYSTEM_CATEGORIES.find(c => c.id === selectedCategory) || SYSTEM_CATEGORIES[0];
  }, [selectedCategory]);

  const items = useMemo(() => {
    const list = SOLAR_PRICE_CATALOG[selectedCategory] || [];
    return list.filter(item => {
      if (selectedPhase !== 'all' && item.phase !== selectedPhase) return false;
      if (searchKW) {
        const kwStr = item.dcCapacityKW.toString();
        const modStr = item.modulesCount.toString();
        if (!kwStr.includes(searchKW) && !modStr.includes(searchKW)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedPhase, searchKW]);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-2 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {SYSTEM_CATEGORIES.map(cat => {
            const isSelected = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[var(--app-accent)] text-white shadow-md'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <span>{cat.title}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black ${
                  isSelected 
                    ? 'bg-black/25 text-white' 
                    : cat.isSubsidyEligible 
                      ? 'bg-emerald-500/15 text-emerald-400' 
                      : 'bg-amber-500/15 text-amber-400'
                }`}>
                  {cat.isSubsidyEligible ? 'Subsidy' : 'Non-DCR'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Overview Card */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--app-border)]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                {currentCategoryMeta.title}
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                currentCategoryMeta.isSubsidyEligible 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {currentCategoryMeta.badge}
              </span>
            </div>
            <p className="text-xs text-[var(--app-text-secondary)] mt-1">
              {currentCategoryMeta.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs shrink-0">
            <div className="bg-[var(--app-surface-subtle)] px-3 py-1.5 rounded-xl border border-[var(--app-border)]">
              <span className="text-[10px] text-[var(--app-text-muted)] block">Price List Date</span>
              <span className="font-bold text-[var(--app-text-primary)] font-mono">{PRICE_LIST_DATE}</span>
            </div>
            <div className="bg-[var(--app-surface-subtle)] px-3 py-1.5 rounded-xl border border-[var(--app-border)]">
              <span className="text-[10px] text-[var(--app-text-muted)] block">GST Status</span>
              <span className="font-bold text-emerald-400">8.9% Included</span>
            </div>
          </div>
        </div>

        {/* Specifications Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="bg-[var(--app-surface-subtle)] p-2.5 rounded-xl border border-[var(--app-border-subtle)]">
            <span className="text-[10px] text-[var(--app-text-muted)] block">Module Type</span>
            <span className="font-semibold text-[var(--app-text-primary)] text-[11px] block truncate" title={currentCategoryMeta.moduleType}>
              {currentCategoryMeta.moduleType}
            </span>
          </div>

          <div className="bg-[var(--app-surface-subtle)] p-2.5 rounded-xl border border-[var(--app-border-subtle)]">
            <span className="text-[10px] text-[var(--app-text-muted)] block">Inverter &amp; Warranty</span>
            <span className="font-semibold text-[var(--app-text-primary)] text-[11px] block truncate" title={currentCategoryMeta.inverterWarranty}>
              {currentCategoryMeta.inverterWarranty}
            </span>
          </div>

          <div className="bg-[var(--app-surface-subtle)] p-2.5 rounded-xl border border-[var(--app-border-subtle)]">
            <span className="text-[10px] text-[var(--app-text-muted)] block">O&amp;M Maintenance</span>
            <span className="font-semibold text-[var(--app-text-primary)] text-[11px] block truncate">
              {currentCategoryMeta.omTerms}
            </span>
          </div>

          <div className="bg-[var(--app-surface-subtle)] p-2.5 rounded-xl border border-[var(--app-border-subtle)]">
            <span className="text-[10px] text-[var(--app-text-muted)] block">Central Subsidy</span>
            <span className={`font-bold text-[11px] block ${currentCategoryMeta.isSubsidyEligible ? 'text-emerald-400' : 'text-amber-400'}`}>
              {currentCategoryMeta.isSubsidyEligible ? 'Eligible (Up to ₹78,000)' : 'Not Eligible (Non-DCR)'}
            </span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--app-surface)] border border-[var(--app-border)] p-3 rounded-2xl text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--app-text-muted)]" />
            <input 
              type="text"
              placeholder="Search kW or panels..."
              value={searchKW}
              onChange={(e) => setSearchKW(e.target.value)}
              className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[var(--app-text-primary)] focus:outline-none focus:border-[var(--app-accent)]"
            />
          </div>

          {/* Phase Filter */}
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-2.5 py-1.5 text-xs text-[var(--app-text-primary)] focus:outline-none focus:border-[var(--app-accent)] cursor-pointer"
          >
            <option value="all">All Phases</option>
            <option value="1 Phase">1 Phase</option>
            <option value="3 Phase">3 Phase</option>
          </select>
        </div>

        {/* Structure View Selector */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-[var(--app-text-muted)] uppercase shrink-0">Structure:</span>
          <select
            value={selectedStructure}
            onChange={(e) => setSelectedStructure(e.target.value)}
            className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-2.5 py-1.5 text-xs text-[var(--app-text-primary)] focus:outline-none focus:border-[var(--app-accent)] cursor-pointer"
          >
            <option value="all">All Structures (Compare)</option>
            {STRUCTURE_TYPES.map(st => (
              <option key={st.id} value={st.id}>{st.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Table / Cards Grid */}
      <div className="space-y-4">
        {items.map((item, idx) => {
          return (
            <div 
              key={idx}
              className="bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl p-4 sm:p-5 transition hover:border-[var(--app-border-hover)]"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--app-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center font-black text-sm text-[var(--app-accent)]">
                    {item.dcCapacityKW}
                    <span className="text-[9px] font-normal">kW</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[var(--app-text-primary)]">
                        {item.systemName || `SPG System ${item.dcCapacityKW} kW ${item.inverterMake}`}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] text-[var(--app-text-secondary)]">
                        {item.phase}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--app-text-muted)] flex items-center gap-2 mt-0.5">
                      <span>{item.modulesCount} Solar Panels</span>
                      <span>•</span>
                      <span>Inverter: {item.inverterKW === 'Enphase' ? 'Enphase Modular' : `${item.inverterKW} kW`}</span>
                      {item.batteryKWh && (
                        <>
                          <span>•</span>
                          <span className="text-purple-400 font-semibold flex items-center gap-1">
                            <Battery className="w-3 h-3" />
                            {item.batteryKWh} kWh Battery
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subsidy Info */}
                <div className="flex items-center gap-3">
                  {item.subsidy > 0 ? (
                    <div className="text-right">
                      <span className="text-[10px] text-[var(--app-text-muted)] block font-semibold">Central Subsidy</span>
                      <span className="text-xs font-bold text-[var(--app-sage)]">
                        {formatINR(item.subsidy)} DBT
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-[var(--app-text-muted)] bg-[var(--app-surface-subtle)] px-2 py-1 rounded-lg">
                      No Subsidy
                    </span>
                  )}
                </div>
              </div>

              {/* Structure Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                {Object.entries(item.prices).map(([structId, priceObj]) => {
                  if (selectedStructure !== 'all' && selectedStructure !== structId) {
                    return null;
                  }
                  const structMeta = STRUCTURE_TYPES.find(s => s.id === structId);
                  const structLabel = structMeta ? structMeta.label : structId;
                  const netCost = priceObj.sellingPrice - (item.subsidy || 0);

                  return (
                    <div 
                      key={structId}
                      className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] hover:border-[var(--app-accent-border)] rounded-xl p-3 flex flex-col justify-between transition group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs pb-1 border-b border-[var(--app-border-subtle)]">
                          <span className="font-bold text-[var(--app-text-primary)] truncate max-w-[170px]" title={structLabel}>
                            {structLabel}
                          </span>
                          <span className="text-[10px] text-[var(--app-sage)] font-bold">
                            Save {formatINR(priceObj.specialOffer)}
                          </span>
                        </div>

                        <div className="pt-2 space-y-1 text-xs">
                          <div className="flex justify-between text-[11px] text-[var(--app-text-muted)]">
                            <span>Maximum Selling Price:</span>
                            <span className="font-mono line-through">{formatINR(priceObj.maxPrice)}</span>
                          </div>

                          <div className="flex justify-between text-xs">
                            <span className="text-[var(--app-text-secondary)] font-medium">Selling Price (Incl 8.9% GST):</span>
                            <span className="font-bold text-[var(--app-text-primary)] font-mono">
                              {formatINR(priceObj.sellingPrice)}
                            </span>
                          </div>

                          {item.subsidy > 0 && (
                            <div className="flex justify-between text-[11px] text-[var(--app-sage)]">
                              <span>Less DBT Subsidy:</span>
                              <span className="font-mono font-bold">- {formatINR(item.subsidy)}</span>
                            </div>
                          )}

                          <div className="pt-1.5 border-t border-[var(--app-border-subtle)] flex justify-between items-baseline">
                            <span className="text-[10px] font-black uppercase text-[var(--app-ochre)]">
                              Net Investment:
                            </span>
                            <span className="text-sm font-black text-[var(--app-accent)] font-mono">
                              {formatINR(netCost)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectForQuote({
                          categoryId: selectedCategory,
                          capacityKW: item.dcCapacityKW,
                          phase: item.phase,
                          inverterKW: item.inverterKW,
                          batteryKWh: item.batteryKWh || null,
                          structureId: structId
                        })}
                        className="mt-3 w-full py-1.5 px-2 bg-[var(--app-surface)] hover:bg-[var(--app-accent)] text-[var(--app-text-primary)] hover:text-white rounded-lg text-[11px] font-bold border border-[var(--app-border)] hover:border-transparent transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Create Quotation</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {items.length === 0 && (
          <div className="text-center py-12 bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl text-[var(--app-text-muted)]">
            <p className="font-medium text-sm">No solar systems match your filter criteria.</p>
            <p className="text-xs mt-1">Try clearing filters or changing phase.</p>
          </div>
        )}
      </div>
    </div>
  );
}
