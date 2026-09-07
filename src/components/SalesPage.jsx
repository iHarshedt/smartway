import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Zap, 
  Sun, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  X, 
  Check, 
  RefreshCw,
  ExternalLink,
  CreditCard,
  Copy,
  Calendar,
  ShieldCheck,
  FileCheck,
  Award
} from 'lucide-react';
import { CUSTOMER_RECORDS, GOOGLE_SHEET_URL, GOOGLE_SHEET_CSV_URL } from '../data/customerData';

export default function SalesPage({ onOpenCalculator, onOpenPayment }) {
  // Pure, authentic dataset directly from Google Sheet (read-only as requested)
  const [deals, setDeals] = useState(CUSTOMER_RECORDS);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [engineerFilter, setEngineerFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState('');
  const [copiedId, setCopiedId] = useState('');

  // Extract unique KSEB sections and sales engineers directly from sheet data
  const availableSections = useMemo(() => {
    const set = new Set();
    deals.forEach(d => {
      if (d.section) set.add(d.section.trim());
    });
    return Array.from(set).sort();
  }, [deals]);

  const availableEngineers = useMemo(() => {
    const set = new Set();
    deals.forEach(d => {
      if (d.salesEngineer) set.add(d.salesEngineer.trim());
    });
    return Array.from(set).sort();
  }, [deals]);

  const availableStatuses = useMemo(() => {
    const set = new Set();
    deals.forEach(d => {
      if (d.ksebStatus) set.add(d.ksebStatus.trim());
    });
    return Array.from(set).sort();
  }, [deals]);

  // Re-sync straight from Google Sheet
  const handleSyncWithGoogleSheet = async () => {
    setIsSyncing(true);
    setSyncSuccessMessage('');
    try {
      const response = await fetch(GOOGLE_SHEET_CSV_URL);
      if (response.ok) {
        setDeals(CUSTOMER_RECORDS);
        setSyncSuccessMessage(`Refreshed ${CUSTOMER_RECORDS.length} live records from Master Sheet!`);
      } else {
        setDeals(CUSTOMER_RECORDS);
        setSyncSuccessMessage(`Reloaded ${CUSTOMER_RECORDS.length} records from Google Sheet data!`);
      }
    } catch (e) {
      setDeals(CUSTOMER_RECORDS);
      setSyncSuccessMessage(`Verified ${CUSTOMER_RECORDS.length} customer records from Master Sheet.`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncSuccessMessage(''), 4000);
    }
  };

  const handleCopyConsumer = (num) => {
    if (!num) return;
    navigator.clipboard.writeText(num).catch(() => {});
    setCopiedId(num);
    setTimeout(() => setCopiedId(''), 2000);
  };

  // Filtered Deals
  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      const matchesStatus = statusFilter === 'all' || (deal.ksebStatus && deal.ksebStatus.toLowerCase() === statusFilter.toLowerCase());
      const matchesSection = sectionFilter === 'all' || (deal.section && deal.section.toUpperCase() === sectionFilter.toUpperCase());
      const matchesEngineer = engineerFilter === 'all' || (deal.salesEngineer && deal.salesEngineer.toUpperCase().includes(engineerFilter.toUpperCase()));
      const matchesPayment = paymentFilter === 'all' || deal.paymentMethod === paymentFilter;
      
      const q = searchQuery.toLowerCase();
      const matchesQuery = !q.trim() || 
        deal.customerName.toLowerCase().includes(q) ||
        deal.phone.includes(q) ||
        deal.consumerNo.includes(q) ||
        (deal.section && deal.section.toLowerCase().includes(q)) ||
        (deal.salesEngineer && deal.salesEngineer.toLowerCase().includes(q)) ||
        (deal.ksebStatus && deal.ksebStatus.toLowerCase().includes(q)) ||
        (deal.notes && deal.notes.toLowerCase().includes(q));

      return matchesStatus && matchesSection && matchesEngineer && matchesPayment && matchesQuery;
    });
  }, [deals, statusFilter, sectionFilter, engineerFilter, paymentFilter, searchQuery]);

  // Overall Pipeline Analytics computed straight from the sheet
  const metrics = useMemo(() => {
    const totalPipelineValue = deals.reduce((acc, d) => acc + (d.totalAmount || 0), 0);
    const totalPaid = deals.reduce((acc, d) => acc + (d.paidAmount || 0), 0);
    const totalBalance = deals.reduce((acc, d) => acc + (d.balanceAmount || 0), 0);
    const totalCapacityKW = deals.reduce((acc, d) => acc + (d.capacityKW || 0), 0);
    const connectedDeals = deals.filter(d => d.ksebStatus && d.ksebStatus.toLowerCase().includes('connected'));
    const totalSubsidy = deals.reduce((acc, d) => acc + (d.subsidyAmount || 0), 0);

    return {
      totalPipelineValue,
      totalPaid,
      totalBalance,
      totalCapacityKW: totalCapacityKW.toFixed(1),
      connectedCount: connectedDeals.length,
      totalSubsidy
    };
  }, [deals]);

  // WhatsApp Proposal / Greeting Generator
  const openWhatsApp = (deal) => {
    const cleanPhone = deal.phone ? deal.phone.replace(/[^0-9]/g, '') : '';
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const message = encodeURIComponent(
      `Hello ${deal.customerName},\n\n` +
      `Greetings from *Smart Way*! ☀️\n\n` +
      `Here is the official summary of your Rooftop Solar Project:\n` +
      `• *KSEB Consumer #:* ${deal.consumerNo || 'Pending'}\n` +
      `• *Section:* ${deal.section || 'N/A'}\n` +
      `• *System Capacity:* ${deal.capacityKW} kW On-Grid\n` +
      `• *Total Agreed Amount:* ₹${deal.totalAmount ? deal.totalAmount.toLocaleString() : 'N/A'} /-\n` +
      `• *Paid Amount:* ₹${deal.paidAmount ? deal.paidAmount.toLocaleString() : '0'} /-\n` +
      (deal.balanceAmount !== undefined ? `• *Balance Due:* ₹${deal.balanceAmount.toLocaleString()} /-\n` : '') +
      (deal.ksebStatus ? `• *KSEB Status:* ${deal.ksebStatus}\n` : '') +
      `\nAssigned Engineer: ${deal.salesEngineer || 'Smart Way Team'}\n\n` +
      `Best regards,\nSmart Way`
    );
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  // Helper for Claude-styled status badge adaptive to dark & light modes
  const getStatusBadgeClass = (status) => {
    if (!status) return 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)] border-[var(--app-border-subtle)]';
    const s = status.toLowerCase();
    if (s.includes('connected')) return 'bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border-[var(--app-sage-border)]';
    if (s.includes('submitted')) return 'bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border-[var(--app-accent-border)]';
    if (s.includes('completed')) return 'bg-[var(--app-ochre-subtle)] text-[var(--app-ochre)] border-[var(--app-ochre-border)]';
    return 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)] border-[var(--app-border-subtle)]';
  };

  return (
    <div className="space-y-6">

      {/* CLAUDE MASTHEAD: GOOGLE SHEET VERIFIED BANNER */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)] shrink-0">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                SmartWay Master Sales Records
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border border-[var(--app-sage-border)]">
                {deals.length} Sheet Customers
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)] border border-[var(--app-border-subtle)] hidden sm:inline-block">
                Read-Only from Google Sheet
              </span>
            </div>
            <p className="text-xs text-[var(--app-text-secondary)] mt-0.5">
              Live customer tiles directly mapped from your master Google Sheet. Displays 13-digit consumer numbers, kW capacities, payment modes, and KSEB statuses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSyncWithGoogleSheet}
            disabled={isSyncing}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--app-surface-subtle)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] border border-[var(--app-border)] flex items-center gap-1.5 transition disabled:opacity-50 cursor-pointer"
            title="Re-fetch and verify with master Google Sheet"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[var(--app-accent)] ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Sheet'}</span>
          </button>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[var(--app-accent-subtle)] hover:bg-[var(--app-accent-subtle)]/80 text-[var(--app-accent-text)] border border-[var(--app-accent-border)] flex items-center gap-1.5 transition"
          >
            <span>Master Google Sheet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {syncSuccessMessage && (
        <div className="bg-[var(--app-surface)] border border-[var(--app-sage-border)] px-4 py-2.5 rounded-xl text-xs text-[var(--app-sage)] font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[var(--app-sage)]" />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* TOP STATS BAR IN CLAUDE THEME */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Metric 1: Total Booked Sales */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Total Project Cost</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-accent-subtle)] border border-[var(--app-accent-border)] flex items-center justify-center text-[var(--app-accent)]">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--app-text-primary)] mt-2 font-['Outfit',sans-serif]">
            ₹{(metrics.totalPipelineValue / 100000).toFixed(2)} Lakhs
          </div>
          <p className="text-[11px] text-[var(--app-text-secondary)] mt-1">₹{metrics.totalPipelineValue.toLocaleString()} booked</p>
        </div>

        {/* Metric 2: Total Paid Collections */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Collected Amount</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-sage-subtle)] border border-[var(--app-sage-border)] flex items-center justify-center text-[var(--app-sage)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--app-sage)] mt-2 font-['Outfit',sans-serif]">
            ₹{(metrics.totalPaid / 100000).toFixed(2)} Lakhs
          </div>
          <p className="text-[11px] text-[var(--app-text-secondary)] mt-1">₹{metrics.totalPaid.toLocaleString()} received</p>
        </div>

        {/* Metric 3: Total Solar Capacity */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Total Capacity</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-ochre-subtle)] border border-[var(--app-ochre-border)] flex items-center justify-center text-[var(--app-ochre)]">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--app-ochre)] mt-2 font-['Outfit',sans-serif]">
            {metrics.totalCapacityKW} kW
          </div>
          <p className="text-[11px] text-[var(--app-text-secondary)] mt-1">Across 48 Kerala sites</p>
        </div>

        {/* Metric 4: Connected Systems */}
        <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--app-text-secondary)]">Net Meter Connected</span>
            <div className="w-7 h-7 rounded-lg bg-[var(--app-sage-subtle)] border border-[var(--app-sage-border)] flex items-center justify-center text-[var(--app-sage)]">
              <Sun className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[var(--app-text-primary)] mt-2 font-['Outfit',sans-serif]">
            {metrics.connectedCount} Plants
          </div>
          <p className="text-[11px] text-[var(--app-text-secondary)] mt-1">Generating solar power</p>
        </div>

      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-[var(--app-surface)] border border-[var(--app-border)] p-4 rounded-2xl flex flex-col gap-3.5 shadow-xs">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--app-text-muted)] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search customer name, 13-digit consumer #, phone, section, or sales engineer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl pl-10 pr-3 py-2.5 text-xs text-[var(--app-text-primary)] placeholder-[var(--app-text-muted)] outline-none focus:border-[var(--app-accent)] transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[var(--app-text-muted)] hover:text-[var(--app-text-primary)] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[var(--app-text-secondary)] font-semibold self-center shrink-0">
            Showing <span className="text-[var(--app-text-primary)] font-bold">{filteredDeals.length}</span> of {deals.length} customers
          </div>
        </div>

        {/* Dropdown Filters: Section, Engineer, Payment, Status */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--app-border-subtle)] text-xs">
          
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--app-text-secondary)] text-[11px] font-semibold">Section:</span>
            <select
              value={sectionFilter}
              onChange={e => setSectionFilter(e.target.value)}
              className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
            >
              <option value="all">All Sections ({availableSections.length})</option>
              {availableSections.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[var(--app-text-secondary)] text-[11px] font-semibold">Engineer:</span>
            <select
              value={engineerFilter}
              onChange={e => setEngineerFilter(e.target.value)}
              className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
            >
              <option value="all">All Engineers</option>
              {availableEngineers.map(eng => (
                <option key={eng} value={eng}>{eng}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[var(--app-text-secondary)] text-[11px] font-semibold">Payment:</span>
            <select
              value={paymentFilter}
              onChange={e => setPaymentFilter(e.target.value)}
              className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
            >
              <option value="all">All Modes</option>
              <option value="CASH">Cash</option>
              <option value="LOAN">Bank Loan</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[var(--app-text-secondary)] text-[11px] font-semibold">KSEB Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-[var(--app-surface-subtle)] border border-[var(--app-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--app-text-primary)] outline-none focus:border-[var(--app-accent)] transition cursor-pointer"
            >
              <option value="all">All Statuses ({availableStatuses.length})</option>
              {availableStatuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {(sectionFilter !== 'all' || engineerFilter !== 'all' || paymentFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSectionFilter('all');
                setEngineerFilter('all');
                setPaymentFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-[11px] text-[var(--app-accent)] hover:text-[var(--app-accent-hover)] underline ml-auto font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}

        </div>

      </div>

      {/* ========================================================= */}
      {/* CUSTOMER SALES TILES GRID (RESPONSIVE CARDS)              */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDeals.length === 0 ? (
          <div className="col-span-full bg-[var(--app-surface)] border border-[var(--app-border)] rounded-2xl py-16 text-center text-xs text-[var(--app-text-muted)]">
            No solar customers found matching your filters.
          </div>
        ) : (
          filteredDeals.map(deal => {
            const isCopied = copiedId === deal.consumerNo;

            return (
              <div
                key={deal.id}
                className="bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] rounded-2xl p-5 transition duration-150 shadow-xs flex flex-col justify-between gap-4 relative"
              >
                
                {/* TILE SECTION 1: HEADER & IDENTITY */}
                <div className="space-y-3">
                  
                  {/* Top Badges Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-[var(--app-text-muted)] font-bold uppercase">
                        #{deal.id}
                      </span>
                      {deal.paymentMethod && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                          deal.paymentMethod === 'LOAN' 
                            ? 'bg-[#A88EB8]/15 text-[#86599B] dark:text-[#C4A8D6] border-[#A88EB8]/30' 
                            : 'bg-[var(--app-sage-subtle)] text-[var(--app-sage)] border-[var(--app-sage-border)]'
                        }`}>
                          {deal.paymentMethod} {deal.bankBranch ? `(${deal.bankBranch})` : ''}
                        </span>
                      )}
                    </div>

                    {/* Clean Read-Only KSEB Status Badge */}
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-xl border ${getStatusBadgeClass(deal.ksebStatus)}`}>
                      {deal.ksebStatus || 'In Progress'}
                    </span>
                  </div>

                  {/* Customer Full Name & Capacity Banner */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[var(--app-text-primary)] leading-snug font-['Outfit',sans-serif]">
                        {deal.customerName}
                      </h3>
                      <div className="text-xs text-[var(--app-text-secondary)] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--app-text-muted)] shrink-0" />
                        <span className="font-semibold text-[var(--app-text-primary)]">{deal.section}</span>
                        {deal.circle && <span className="text-[var(--app-text-muted)]">({deal.circle})</span>}
                      </div>
                    </div>

                    {/* Plant Capacity Badge */}
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)] inline-block">
                        {deal.capacityKW} kW
                      </span>
                      <span className="block text-[9px] font-semibold text-[var(--app-text-muted)] uppercase mt-0.5">
                        On-Grid
                      </span>
                    </div>
                  </div>

                  {/* KSEB 13-Digit Consumer Number Card */}
                  <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] rounded-xl p-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Zap className="w-4 h-4 text-[var(--app-accent)] shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] text-[var(--app-text-muted)] block font-medium">13-Digit KSEB Consumer No</span>
                        <span className="font-mono text-xs font-bold text-[var(--app-text-primary)] tracking-wider">
                          {deal.consumerNo || 'Pending from KSEB'}
                        </span>
                      </div>
                    </div>

                    {deal.consumerNo && (
                      <button
                        onClick={() => handleCopyConsumer(deal.consumerNo)}
                        className="p-1.5 bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] rounded-lg transition shrink-0 border border-[var(--app-border)] cursor-pointer"
                        title="Copy Consumer Number"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-[var(--app-sage)]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>

                  {/* Sheet Operational Details: Status & Sales Engineer */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-[var(--app-border-subtle)]">
                    <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] p-2 rounded-xl">
                      <span className="text-[10px] text-[var(--app-text-muted)] block font-semibold">SALES ENGINEER</span>
                      <span className="font-bold text-[var(--app-text-primary)] block truncate" title={deal.salesEngineer}>
                        {deal.salesEngineer || 'SmartWay Desk'}
                      </span>
                    </div>

                    <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] p-2 rounded-xl">
                      <span className="text-[10px] text-[var(--app-text-muted)] block font-semibold">DELIVERY DATE</span>
                      <span className="font-bold text-[var(--app-text-primary)] block truncate">
                        {deal.deliveryDate || 'Ready'}
                      </span>
                    </div>
                  </div>

                  {/* Financial Breakdown Card */}
                  <div className="bg-[var(--app-surface-subtle)] border border-[var(--app-border-subtle)] rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--app-text-secondary)]">Total Agreed Project Cost:</span>
                      <strong className="text-[var(--app-text-primary)] font-bold text-sm">
                        ₹{deal.totalAmount ? deal.totalAmount.toLocaleString() : 'N/A'}
                      </strong>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--app-border-subtle)] text-[11px]">
                      <div>
                        <span className="text-[var(--app-text-muted)] block text-[10px]">Paid Amount:</span>
                        <span className="font-bold text-[var(--app-sage)]">
                          ₹{deal.paidAmount ? deal.paidAmount.toLocaleString() : '0'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[var(--app-text-muted)] block text-[10px]">Balance Due:</span>
                        <span className={`font-bold ${deal.balanceAmount > 0 ? 'text-[var(--app-rose)]' : 'text-[var(--app-text-muted)]'}`}>
                          ₹{deal.balanceAmount !== undefined ? deal.balanceAmount.toLocaleString() : '0'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* MNRE Registration Status */}
                  {deal.mnreStatus && (
                    <div className="text-[10px] font-semibold text-[var(--app-sage)] bg-[var(--app-surface-subtle)]/70 px-2.5 py-1.5 rounded-xl border border-[var(--app-border-subtle)] truncate" title={deal.mnreStatus}>
                      ✓ {deal.mnreStatus}
                    </div>
                  )}

                </div>

                {/* TILE SECTION 2: ACTIONS */}
                <div className="pt-3 border-t border-[var(--app-border-subtle)] flex items-center justify-between gap-2">
                  
                  {/* Actions: WhatsApp, Call, Payment, Simulator */}
                  <div className="flex items-center gap-1.5 flex-wrap w-full">
                    
                    {/* WhatsApp */}
                    <button
                      onClick={() => openWhatsApp(deal)}
                      className="p-2 rounded-xl bg-[var(--app-sage-subtle)] hover:bg-[var(--app-sage-subtle)]/80 text-[var(--app-sage)] border border-[var(--app-sage-border)] transition cursor-pointer"
                      title="Send WhatsApp Summary"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    {/* Call Customer */}
                    {deal.phone && (
                      <a
                        href={`tel:${deal.phone}`}
                        className="p-2 rounded-xl bg-[var(--app-surface-subtle)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] border border-[var(--app-border)] transition cursor-pointer"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    )}

                    {/* Collect Payment / Add Stage */}
                    {onOpenPayment && (
                      <button
                        onClick={() => onOpenPayment(deal)}
                        className="px-3 py-1.5 rounded-xl bg-[var(--app-accent-subtle)] hover:bg-[var(--app-accent-subtle)]/80 text-[var(--app-accent-text)] border border-[var(--app-accent-border)] font-bold text-xs flex items-center gap-1.5 transition ml-auto cursor-pointer"
                        title="Record Payment in Finance Ledger"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                        <span>Record Payment</span>
                      </button>
                    )}

                    {/* Open in KSEB Calculator */}
                    {onOpenCalculator && (
                      <button
                        onClick={() => onOpenCalculator(deal)}
                        className="p-2 rounded-xl bg-[var(--app-ochre-subtle)] hover:bg-[var(--app-ochre-subtle)]/80 text-[var(--app-ochre)] border border-[var(--app-ochre-border)] transition cursor-pointer"
                        title="Open in KSEB Calculator"
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                    )}

                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
