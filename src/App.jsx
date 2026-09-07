import React, { useState, useEffect } from 'react';
import KSEBBillCalculator from './components/KSEBBillCalculator';
import SalesPage from './components/SalesPage';
import KSEBBillView from './components/KSEBBillView';
import FinanceLedgerPage from './components/FinanceLedgerPage';
import { 
  TrendingUp, 
  Zap, 
  Search, 
  Sun, 
  Moon,
  ShieldCheck, 
  PhoneCall, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Receipt,
  DollarSign,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('sales'); // 'sales' | 'calculator' | 'lookup' | 'finance'
  const [financeSubTab, setFinanceSubTab] = useState('customers'); // 'customers' | 'daily' | 'monthly'
  const [selectedCustomerForCalc, setSelectedCustomerForCalc] = useState(null);
  const [selectedCustomerForPayment, setSelectedCustomerForPayment] = useState(null);
  
  // Theme state: 'dark' (Claude Dark) | 'light' (Claude Warm White)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('smartway_theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('smartway_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Navigate from Sales Page or Consumer Lookup directly into KSEB Calculator
  const handleOpenCalculatorWithDeal = (dealOrCustomer) => {
    setSelectedCustomerForCalc(dealOrCustomer);
    setActiveTab('calculator');
  };

  // Navigate directly into Finance & Receipts with customer pre-selected
  const handleOpenPaymentWithDeal = (dealOrCustomer) => {
    setSelectedCustomerForPayment(dealOrCustomer);
    setActiveTab('finance');
  };

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--app-text-primary)] selection:bg-[var(--app-accent)] selection:text-white flex flex-col font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200">
      
      {/* TOP NOTIFICATION / TRUST BANNER */}
      <div className="bg-[var(--app-surface)] border-b border-[var(--app-border)] px-4 py-1.5 text-center text-[11px] text-[var(--app-text-secondary)] font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[var(--app-sage)] animate-pulse"></span>
        <span>Kerala KSEB Net-Metering 2025/2026 Tariff Active</span>
        <span className="text-[var(--app-text-muted)]">•</span>
        <span className="text-[var(--app-accent)] font-semibold flex items-center gap-1">
          <Sparkles className="w-3 h-3 inline text-[var(--app-accent)]" />
          PM Surya Ghar Muft Bijli Yojana Subsidy up to ₹78,000 Direct DBT
        </span>
      </div>

      {/* MAIN TOP NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 bg-[var(--app-header-bg)] backdrop-blur-xl border-b border-[var(--app-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
            
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('sales')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#CC785C] to-[#B35F44] flex items-center justify-center text-white font-black shadow-md shadow-[#CC785C]/20">
                <Sun className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--app-text-primary)] font-['Outfit',sans-serif]">
                    SMARTWAY
                  </h1>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)]">
                    Solar CRM
                  </span>
                </div>
                <p className="text-[10px] text-[var(--app-text-secondary)] font-medium hidden sm:block">
                  Kerala Rooftop Solar EPC &amp; KSEB Net-Metering System
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center bg-[var(--app-surface-subtle)] border border-[var(--app-border)] p-1 rounded-2xl shadow-inner overflow-x-auto scrollbar-none">
              
              {/* Sales Page Tab */}
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition duration-150 relative whitespace-nowrap ${
                  activeTab === 'sales'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Sales</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'sales' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                }`}>
                  Master
                </span>
              </button>

              {/* Finance & Receipts Tab */}
              <button
                onClick={() => setActiveTab('finance')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap ${
                  activeTab === 'finance'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span>Finance &amp; Receipts</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'finance' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                }`}>
                  Ledger
                </span>
              </button>

              {/* KSEB Calculator Tab */}
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap ${
                  activeTab === 'calculator'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>KSEB Calculator</span>
                {selectedCustomerForCalc && (
                  <span className="w-2 h-2 rounded-full bg-[var(--app-sage)] animate-ping"></span>
                )}
              </button>

              {/* Consumer Lookup Tab */}
              <button
                onClick={() => setActiveTab('lookup')}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap ${
                  activeTab === 'lookup'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline">Consumer Lookup</span>
                <span className="md:hidden">Lookup</span>
              </button>

            </nav>

            {/* Quick Actions & Theme Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* THEME TOGGLE (DARK / WHITE MODE) */}
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] transition flex items-center gap-2 shadow-xs cursor-pointer"
                title={theme === 'dark' ? 'Switch to White / Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#D4A359]" />
                    <span className="text-xs font-bold hidden sm:inline">White Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#CC785C]" />
                    <span className="text-xs font-bold hidden sm:inline">Dark Mode</span>
                  </>
                )}
              </button>

              {/* Quick Helpline */}
              <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-[var(--app-border)]">
                <div className="text-right">
                  <span className="text-[10px] text-[var(--app-text-secondary)] block font-medium">Smart Way</span>
                  <span className="text-xs font-bold text-[var(--app-accent)]">+91 9946236101</span>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[var(--app-surface)] border border-[var(--app-border)] flex items-center justify-center text-[var(--app-sage)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* SUB-MENU FOR FINANCE */}
      {activeTab === 'finance' && (
        <div className="bg-[var(--app-surface-subtle)] border-b border-[var(--app-border)] px-4 py-2 sticky top-16 sm:top-18 z-30 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-[var(--app-text-muted)] uppercase tracking-wider mr-1 hidden sm:inline">
                Finance Views:
              </span>

              <button
                onClick={() => setFinanceSubTab('customers')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  financeSubTab === 'customers'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Customer Accounts &amp; Stages</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('daily')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  financeSubTab === 'daily'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Daily Ledger (Per Date)</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('monthly')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                  financeSubTab === 'monthly'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Monthly Summary (Per Month)</span>
              </button>
            </div>

            <div className="text-[11px] text-[var(--app-text-muted)] hidden md:flex items-center gap-1.5 font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-[var(--app-sage)]"></span>
              <span>Daily collection per date &amp; monthly tracking active</span>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
        {activeTab === 'sales' && (
          <SalesPage 
            onOpenCalculator={handleOpenCalculatorWithDeal} 
            onOpenPayment={handleOpenPaymentWithDeal}
          />
        )}

        {activeTab === 'finance' && (
          <FinanceLedgerPage 
            initialCustomerForPayment={selectedCustomerForPayment}
            activeSubSession={financeSubTab}
            onSubSessionChange={setFinanceSubTab}
          />
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-4">
            {selectedCustomerForCalc && (
              <div className="flex items-center justify-between bg-[var(--app-surface)] border border-[var(--app-border)] px-4 py-2.5 rounded-2xl text-xs">
                <div className="flex items-center gap-2 text-[var(--app-text-primary)]">
                  <span className="text-[var(--app-accent)] font-bold">Active Simulation:</span>
                  <span className="font-semibold">{selectedCustomerForCalc.customerName || selectedCustomerForCalc.name}</span>
                  <span className="text-[var(--app-text-secondary)]">({selectedCustomerForCalc.capacityKW || selectedCustomerForCalc.solarKW} kW)</span>
                </div>
                <button
                  onClick={() => setSelectedCustomerForCalc(null)}
                  className="text-xs text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] underline cursor-pointer"
                >
                  Clear &amp; Reset
                </button>
              </div>
            )}
            <KSEBBillCalculator initialCustomer={selectedCustomerForCalc} />
          </div>
        )}

        {activeTab === 'lookup' && (
          <KSEBBillView onSelectCustomer={handleOpenCalculatorWithDeal} />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--app-border)] py-6 px-4 bg-[var(--app-footer-bg)] text-center text-xs text-[var(--app-text-muted)] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[var(--app-accent)]" />
            <span className="font-bold text-[var(--app-text-secondary)]">SmartWay Solar Solutions</span>
            <span>— Kerala Approved Rooftop EPC Partner</span>
          </div>
          <div className="text-[11px] text-[var(--app-text-muted)]">
            Official Kerala Electricity Regulatory Commission (KERC) Tariff 2025/2026 Compliant
          </div>
        </div>
      </footer>

    </div>
  );
}
