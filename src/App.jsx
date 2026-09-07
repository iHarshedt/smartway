import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import PendingApprovalBanner from './components/PendingApprovalBanner';
import TeamPortalPage from './components/TeamPortalPage';
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
  BarChart3,
  LogOut,
  Shield
} from 'lucide-react';

function AppContent() {
  const { user, userProfile, role, isAdmin, isPending, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('sales'); // 'sales' | 'finance' | 'calculator' | 'lookup' | 'team'
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--app-bg,#0f172a)] flex flex-col items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-12 h-12 border-3 border-[var(--app-accent,#CC785C)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-bold text-[var(--app-text-muted,#94a3b8)]">
          Connecting to Smart Way Portal...
        </p>
      </div>
    );
  }

  // Not Logged In -> Show Google Sign-in Page
  if (!user) {
    return <LoginPage />;
  }

  // Logged In but Role is Pending & Not Admin -> Show Review Notice
  if (isPending && !isAdmin) {
    return <PendingApprovalBanner />;
  }

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
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Logo & Brand Identity */}
            <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('sales')}>
              <img 
                src="/logo-512.png" 
                alt="Smart Way" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-contain shadow-md shadow-[#CC785C]/20 shrink-0 p-0.5 bg-white border border-[var(--app-border)]"
              />
              <div className="shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[var(--app-text-primary)] font-['Outfit',sans-serif] whitespace-nowrap">
                    SMART WAY
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-[var(--app-accent-subtle)] text-[var(--app-accent-text)] border border-[var(--app-accent-border)] whitespace-nowrap">
                    CRM &amp; EPC
                  </span>
                </div>
                <p className="text-[10px] text-[var(--app-text-secondary)] font-medium hidden 2xl:block truncate max-w-[260px]">
                  Opp Malabar Gold &amp; Diamonds, Keethipadi Nilambur
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center bg-[var(--app-surface-subtle)] border border-[var(--app-border)] p-1 rounded-2xl shadow-inner overflow-x-auto scrollbar-none shrink">
              
              {/* Sales Page Tab */}
              <button
                onClick={() => setActiveTab('sales')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 relative whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'sales'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Sales</span>
                <span className={`hidden xl:inline-block text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'sales' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                }`}>
                  Master
                </span>
              </button>

              {/* Finance & Receipts Tab */}
              <button
                onClick={() => setActiveTab('finance')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'finance'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden xl:inline">Finance &amp; Receipts</span>
                <span className="xl:hidden">Finance</span>
                <span className={`hidden 2xl:inline-block text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activeTab === 'finance' ? 'bg-black/20 text-white' : 'bg-[var(--app-badge-bg)] text-[var(--app-text-secondary)]'
                }`}>
                  Ledger
                </span>
              </button>

              {/* KSEB Calculator Tab */}
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'calculator'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden lg:inline">KSEB Calculator</span>
                <span className="lg:hidden">Calculator</span>
                {selectedCustomerForCalc && (
                  <span className="w-2 h-2 rounded-full bg-[var(--app-sage)] animate-ping"></span>
                )}
              </button>

              {/* Consumer Lookup Tab */}
              <button
                onClick={() => setActiveTab('lookup')}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'lookup'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                }`}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden xl:inline">Consumer Lookup</span>
                <span className="xl:hidden">Lookup</span>
              </button>

              {/* Team Portal Tab (Accessible to Admins) */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('team')}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition duration-150 whitespace-nowrap cursor-pointer shrink-0 ${
                    activeTab === 'team'
                      ? 'bg-[var(--app-accent)] text-white font-bold shadow-sm'
                      : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface-hover)]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">Team</span>
                  <span className="hidden xl:inline"> Portal</span>
                  <span className={`hidden 2xl:inline-block text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'team' ? 'bg-black/20 text-white' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    Roles
                  </span>
                </button>
              )}

            </nav>

            {/* User Profile & Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              
              {/* THEME TOGGLE */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-[var(--app-surface-hover)] text-[var(--app-text-primary)] transition shadow-xs cursor-pointer shrink-0"
                title={theme === 'dark' ? 'Switch to White Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#D4A359]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#CC785C]" />
                )}
              </button>

              {/* LOGGED IN USER PROFILE CARD */}
              <div className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-[var(--app-border)] shrink-0">
                
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full border border-[var(--app-border)] object-cover shadow-xs shrink-0" 
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--app-accent)] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}

                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-[var(--app-text-primary)] truncate max-w-[110px]">
                    {user.displayName || 'Member'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      {role || 'Team'}
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <button
                  onClick={logout}
                  className="p-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] hover:bg-rose-500/15 hover:text-rose-400 text-[var(--app-text-muted)] transition shadow-xs cursor-pointer shrink-0"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>

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
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  financeSubTab === 'customers'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Customer Ledger</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('daily')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  financeSubTab === 'daily'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Daily Collections</span>
              </button>

              <button
                onClick={() => setFinanceSubTab('monthly')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  financeSubTab === 'monthly'
                    ? 'bg-[var(--app-accent)] text-white font-bold shadow-xs'
                    : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-surface)]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Monthly Summary</span>
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

        {activeTab === 'team' && isAdmin && (
          <TeamPortalPage />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[var(--app-border)] py-6 px-4 bg-[var(--app-footer-bg)] text-center text-xs text-[var(--app-text-muted)] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-[var(--app-accent)]" />
            <span className="font-bold text-[var(--app-text-secondary)]">Smart Way Solutions</span>
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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
