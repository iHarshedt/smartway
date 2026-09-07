import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, Copy, Check, User, Phone, MapPin, Zap, ShieldCheck, Table as TableIcon } from 'lucide-react';
import { CUSTOMER_RECORDS, GOOGLE_SHEET_URL } from '../data/customerData';

export default function KSEBBillView({ onSelectCustomer }) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');

  // Map 48 authentic customers from the Google Sheet
  const customers = useMemo(() => {
    return CUSTOMER_RECORDS.map(c => ({
      id: c.id,
      name: c.customerName,
      consumerNo: c.consumerNo,
      section: c.section,
      circle: c.circle,
      district: c.district,
      phone: c.phone,
      tariff: c.tariff === 'commercial' ? 'LT-7A Commercial' : 'LT-1A Domestic',
      phase: c.capacityKW > 4 ? '3PH' : '1PH',
      loadKW: Math.max(1, Math.round(c.capacityKW)),
      solarKW: c.capacityKW,
      salesEngineer: c.salesEngineer,
      ksebStatus: c.ksebStatus,
      paymentMethod: c.paymentMethod,
      totalAmount: c.totalAmount
    }));
  }, []);

  // Distinct sections
  const sections = useMemo(() => {
    const set = new Set();
    customers.forEach(c => {
      if (c.section) set.add(c.section);
    });
    return Array.from(set).sort();
  }, [customers]);

  const filtered = useMemo(() => {
    return customers.filter(c => {
      const matchesSection = selectedSection === 'all' || c.section.toUpperCase() === selectedSection.toUpperCase();
      if (!query.trim()) return matchesSection;
      const q = query.toLowerCase();
      const matchesQuery = 
        c.name.toLowerCase().includes(q) || 
        c.consumerNo.includes(q) ||
        c.phone.includes(q) ||
        c.section.toLowerCase().includes(q) ||
        (c.salesEngineer && c.salesEngineer.toLowerCase().includes(q));
      
      return matchesSection && matchesQuery;
    });
  }, [customers, query, selectedSection]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const openKSEBPortal = (consumerNo) => {
    navigator.clipboard.writeText(consumerNo).catch(() => {});
    window.open('https://old.kseb.in/billview/', '_blank', 'noopener,noreferrer');
    setCopied(`kseb-${consumerNo}`);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-amber-400" />
              KSEB Consumer Portal &amp; Bill Lookup
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {customers.length} Google Sheet Consumers
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Search verified 13-digit consumer numbers from the master sheet and auto-copy to the official KSEB Bill View portal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition border border-slate-700"
          >
            <TableIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Master Sheet</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => window.open('https://old.kseb.in/billview/', '_blank', 'noopener,noreferrer')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-md w-fit"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Official KSEB Portal</span>
          </button>
        </div>
      </div>

      {/* Search & Section Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, 13-digit consumer number, phone, section or sales engineer..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400 transition"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedSection}
            onChange={e => setSelectedSection(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold text-white outline-none focus:border-amber-400 transition"
          >
            <option value="all">All KSEB Sections ({sections.length})</option>
            {sections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
            No customers found matching "{query}"
          </div>
        ) : (
          filtered.map(c => (
            <div 
              key={c.id}
              className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {c.section || 'KSEB Section'}
                    </span>
                    {c.ksebStatus && (
                      <span className="text-[9px] font-semibold text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                        {c.ksebStatus}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{c.name}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Section: {c.section} {c.circle ? `• Circle: ${c.circle}` : ''}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-slate-400 block">Solar Plant</span>
                  <span className="text-xs font-black text-emerald-400">{c.solarKW} kW On-Grid</span>
                  {c.salesEngineer && (
                    <span className="text-[10px] text-slate-500 block mt-0.5">Eng: {c.salesEngineer}</span>
                  )}
                </div>
              </div>

              {/* Consumer No Bar */}
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">13-Digit Consumer No</span>
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      {c.consumerNo || 'Pending from KSEB'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {c.consumerNo && (
                    <button
                      onClick={() => copyToClipboard(c.consumerNo, c.consumerNo)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                      title="Copy Consumer Number"
                    >
                      {copied === c.consumerNo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  {onSelectCustomer && (
                    <button
                      onClick={() => onSelectCustomer(c)}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
                      title="Calculate solar net-metering bill for this customer"
                    >
                      Simulate
                    </button>
                  )}
                  {c.consumerNo && (
                    <button
                      onClick={() => openKSEBPortal(c.consumerNo)}
                      className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      Fetch Bill
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
                <span className="flex items-center gap-1 text-[11px]">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {c.phone || 'N/A'}
                </span>
                <span className="text-[11px] font-semibold text-slate-300">
                  {c.phase} | Load: {c.loadKW} kW | {c.paymentMethod || 'CASH'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
